// Processador MÉDICO ESPECIALIZADO - versão simplificada e limpa

export class ResponseFormatter {
  /**
   * Processa completamente a resposta médica
   */
  static processCompleteResponse(rawResponse: string): string {
    console.log("🔄 INICIANDO PROCESSAMENTO MÉDICO LIMPO:", rawResponse)

    let processed = rawResponse

    // 1. LIMPEZA BÁSICA E REMOÇÃO DE JSON
    processed = this.removeJsonAndClean(processed)

    // 2. CONVERSÃO DE CARACTERES DE ESCAPE
    processed = this.convertEscapeCharacters(processed)

    // 3. LIMPEZA PROFUNDA DE CARACTERES INDESEJADOS
    processed = this.deepCleanText(processed)

    // 4. ESTRUTURAÇÃO MÉDICA SIMPLES
    processed = this.createCleanMedicalStructure(processed)

    // 5. ADICIONAR DISCLAIMER
    processed = this.addMedicalDisclaimer(processed)

    // 6. LIMPEZA FINAL
    processed = this.finalPolish(processed)

    console.log("✅ PROCESSAMENTO MÉDICO LIMPO CONCLUÍDO:", processed)
    return processed
  }

  /**
   * Remove JSON e faz limpeza básica
   */
  private static removeJsonAndClean(text: string): string {
    return (
      text
        .trim()
        // Remove estrutura JSON completa
        .replace(/^\s*\{\s*"resposta"\s*:\s*"?/i, "")
        .replace(/"\s*\}\s*$/i, "")
        // Remove padrões específicos
        .replace(/^"resposta":\s*###/i, "")
        .replace(/^"resposta":\s*/i, "")
        .replace(/^resposta:\s*###/i, "")
        .replace(/^resposta:\s*/i, "")
        // Remove aspas extras
        .replace(/^"|"$/g, "")
        .trim()
    )
  }

  /**
   * Converte caracteres de escape
   */
  private static convertEscapeCharacters(text: string): string {
    return text
      .replace(/\\n/g, "\n")
      .replace(/\\"/g, '"')
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "")
      .replace(/\\\\/g, "\\")
  }

  /**
   * LIMPEZA PROFUNDA - Remove todos os caracteres indesejados
   */
  private static deepCleanText(text: string): string {
    return (
      text
        // Remove TODOS os asteriscos
        .replace(/\*/g, "")
        // Remove hífens múltiplos
        .replace(/--+/g, "-")
        // Remove underscores múltiplos
        .replace(/__+/g, "")
        // Remove números com pontos soltos (ex: 1. 2. 3.)
        .replace(/^\s*\d+\.\s*$/gm, "")
        // Remove linhas com apenas símbolos
        .replace(/^\s*[-_=+#@!%&*(){}[\]|\\:;"'<>,.?/~`]+\s*$/gm, "")
        // Remove múltiplas quebras de linha
        .replace(/\n{3,}/g, "\n\n")
        // Remove espaços extras
        .replace(/[ \t]+/g, " ")
        // Remove espaços no início/fim de linhas
        .replace(/^[ \t]+|[ \t]+$/gm, "")
        // Remove linhas vazias com espaços
        .replace(/^\s+$/gm, "")
    )
  }

  /**
   * Cria estrutura médica limpa e simples
   */
  private static createCleanMedicalStructure(text: string): string {
    console.log("🏗️ Criando estrutura médica limpa")

    // Dividir em linhas e limpar
    const lines = text
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
      .filter((line) => !this.isJunkLine(line))

    if (lines.length === 0) {
      return "Resposta não pôde ser processada adequadamente."
    }

    let structured = ""
    let currentContent: string[] = []

    // Detectar se já tem estrutura de títulos
    const hasExistingStructure = lines.some(
      (line) => line.startsWith("##") || line.startsWith("#") || this.detectMedicalSection(line),
    )

    if (hasExistingStructure) {
      // Processar estrutura existente
      for (const line of lines) {
        if (this.isTitle(line)) {
          // Finalizar seção anterior
          if (currentContent.length > 0) {
            structured += this.formatContentLines(currentContent) + "\n\n"
            currentContent = []
          }
          // Adicionar título limpo
          structured += this.cleanTitle(line) + "\n\n"
        } else {
          currentContent.push(line)
        }
      }

      // Finalizar última seção
      if (currentContent.length > 0) {
        structured += this.formatContentLines(currentContent)
      }
    } else {
      // Criar estrutura básica
      structured = "## Orientações Médicas\n\n"
      structured += this.formatContentLines(lines)
    }

    return structured.trim()
  }

  /**
   * Verifica se é uma linha lixo
   */
  private static isJunkLine(line: string): boolean {
    const junkPatterns = [
      /^\s*[-_=+#@!%&*(){}[\]|\\:;"'<>,.?/~`]+\s*$/, // Apenas símbolos
      /^\s*\d+\.\s*$/, // Apenas números
      /^\s*[a-zA-Z]\.\s*$/, // Apenas letras
      /^resposta:/i, // Palavra "resposta:"
    ]

    return junkPatterns.some((pattern) => pattern.test(line)) || line.length < 3
  }

  /**
   * Verifica se é um título
   */
  private static isTitle(line: string): boolean {
    return line.startsWith("##") || line.startsWith("#") || this.detectMedicalSection(line) !== null
  }

  /**
   * Limpa título removendo símbolos desnecessários
   */
  private static cleanTitle(line: string): string {
    return line
      .replace(/^#+\s*/, "## ") // Padronizar títulos
      .replace(/[*_]/g, "") // Remove formatação
      .trim()
  }

  /**
   * Detecta seções médicas específicas
   */
  private static detectMedicalSection(line: string): string | null {
    const cleanLine = line
      .replace(/^#+\s*/, "")
      .replace(/[*_]/g, "")
      .toLowerCase()
      .trim()

    const medicalSections = [
      "orientações",
      "orientação",
      "medicação",
      "medicações",
      "prescrição",
      "tratamento",
      "contraindicações",
      "cuidados",
      "diagnóstico",
      "patologia",
      "posologia",
      "dosagem",
    ]

    return medicalSections.find((section) => cleanLine.includes(section)) || null
  }

  /**
   * Formata linhas de conteúdo de forma simples
   */
  private static formatContentLines(lines: string[]): string {
    return lines
      .map((line) => {
        const cleaned = line.trim()

        // Se já começa com hífen, manter
        if (cleaned.startsWith("-")) {
          return cleaned
        }

        // Se é uma frase completa, adicionar hífen
        if (cleaned.length > 10 && (cleaned.includes(" ") || cleaned.endsWith("."))) {
          return `- ${cleaned}`
        }

        // Caso contrário, retornar como está
        return cleaned
      })
      .filter((line) => line.trim().length > 0)
      .join("\n")
  }

  /**
   * Adiciona disclaimer médico
   */
  private static addMedicalDisclaimer(text: string): string {
    const disclaimer = `\n\n---\n\n*Este aplicativo tem apenas a função de facilitar a prática médica, lembre-se que podem existir erros e não deve ser utilizado como fonte primária de pesquisa. Considere verificar informações importantes. Uso por conta e risco.*`

    return text + disclaimer
  }

  /**
   * Polimento final
   */
  private static finalPolish(text: string): string {
    return (
      text
        // Remove linhas vazias excessivas
        .replace(/\n{3,}/g, "\n\n")
        // Remove espaços extras
        .replace(/[ \t]+/g, " ")
        // Remove espaços no início/fim de linhas
        .replace(/^[ \t]+|[ \t]+$/gm, "")
        // Garante espaçamento após títulos
        .replace(/^(##[^\n]+)$/gm, "$1\n")
        // Remove linhas vazias no início e fim
        .trim()
    )
  }

  /**
   * Método público para formatação médica
   */
  static formatMedicalResponse(rawText: string): string {
    return this.processCompleteResponse(rawText)
  }
}
