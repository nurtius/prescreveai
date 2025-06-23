// Utilitário para processar respostas do webhook independentemente do formato

export class ResponseProcessor {
  /**
   * Processa resposta do webhook, tentando JSON primeiro e fallback manual
   */
  static processWebhookResponse(rawText: string): string {
    console.log("🔄 Processando resposta bruta:", rawText)

    // Primeiro, tentar parse como JSON
    try {
      const json = JSON.parse(rawText)
      console.log("✅ JSON parseado com sucesso:", json)

      // Procurar campo de resposta em diferentes formatos
      const response = json.resposta || json.response || json.answer || json.content || json.message

      if (response && typeof response === "string") {
        return this.cleanResponseText(response)
      }

      console.log("⚠️ Campo de resposta não encontrado no JSON")
    } catch (error) {
      console.log("⚠️ Não é JSON válido, tentando limpeza manual...")
    }

    // Se JSON falhou, tentar limpeza manual
    return this.manualCleanup(rawText)
  }

  /**
   * Limpeza manual para texto que não é JSON válido
   */
  private static manualCleanup(text: string): string {
    const cleaned = text
      // Substitui \\n por quebras de linha reais
      .replace(/\\n/g, "\n")
      // Substitui \" por aspas normais
      .replace(/\\"/g, '"')
      // Remove aspas extras no início/fim
      .replace(/^"|"$/g, "")
      // Tenta remover estrutura JSON quebrada
      .replace(/^\{.*"resposta":\s*"/, "")
      .replace(/^\{.*"response":\s*"/, "")
      .replace(/"\}$/, "")
      .replace(/"}$/, "")
      // Remove escapes desnecessários
      .replace(/\\t/g, "\t")
      .replace(/\\r/g, "\r")
      .trim()

    console.log("🔧 Texto limpo manualmente:", cleaned)
    return cleaned || "Resposta não pôde ser processada"
  }

  /**
   * Limpa texto de resposta removendo caracteres indesejados
   */
  private static cleanResponseText(text: string): string {
    return text
      .replace(/\\n/g, "\n") // Converte \\n em quebras de linha
      .replace(/\\t/g, "\t") // Converte \\t em tabs
      .replace(/\\"/g, '"') // Converte \" em aspas
      .replace(/\\\\/g, "\\") // Converte \\\\ em \
      .trim()
  }

  /**
   * Valida se a resposta processada é válida
   */
  static isValidResponse(response: string): boolean {
    return response && response.trim().length > 0 && response !== "undefined" && response !== "null"
  }

  /**
   * Processa resposta com fallback para mensagem padrão
   */
  static processWithFallback(rawText: string, fallbackMessage?: string): string {
    const processed = this.processWebhookResponse(rawText)

    if (this.isValidResponse(processed)) {
      return processed
    }

    return (
      fallbackMessage ||
      "Desculpe, não consegui processar sua pergunta no momento. Tente reformular ou tente novamente."
    )
  }
}
