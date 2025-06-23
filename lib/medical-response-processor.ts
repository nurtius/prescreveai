// Processador específico para respostas médicas

export class MedicalResponseProcessor {
  /**
   * Templates de estrutura médica
   */
  private static readonly MEDICAL_TEMPLATES = {
    prescription: {
      title: "📋 Prescrição Médica",
      sections: ["Medicação", "Posologia", "Orientações", "Cuidados"],
    },
    orientation: {
      title: "🩺 Orientações Médicas",
      sections: ["Orientações Gerais", "Cuidados", "Quando Retornar"],
    },
    diagnosis: {
      title: "🔍 Avaliação Clínica",
      sections: ["Diagnóstico", "Tratamento", "Prognóstico"],
    },
  }

  /**
   * Detecta o tipo de resposta médica
   */
  static detectResponseType(content: string): keyof typeof MedicalResponseProcessor.MEDICAL_TEMPLATES {
    const lowerContent = content.toLowerCase()

    if (lowerContent.includes("medicação") || lowerContent.includes("prescrição") || lowerContent.includes("mg")) {
      return "prescription"
    }

    if (lowerContent.includes("diagnóstico") || lowerContent.includes("avaliação")) {
      return "diagnosis"
    }

    return "orientation"
  }

  /**
   * Aplica template médico específico
   */
  static applyMedicalTemplate(content: string): string {
    const responseType = this.detectResponseType(content)
    const template = this.MEDICAL_TEMPLATES[responseType]

    // Se já tem estrutura, apenas melhora
    if (content.includes("###") || content.includes("##")) {
      return this.enhanceExistingStructure(content)
    }

    // Se não tem estrutura, cria uma
    return this.createStructuredResponse(content, template)
  }

  /**
   * Melhora estrutura existente
   */
  private static enhanceExistingStructure(content: string): string {
    let enhanced = content

    // Adiciona ícones aos títulos existentes
    const iconMap: Record<string, string> = {
      medicação: "💊",
      posologia: "📏",
      orientação: "📋",
      cuidado: "⚠️",
      importante: "❗",
      atenção: "🚨",
      diagnóstico: "🔍",
      tratamento: "🩺",
      sintoma: "🤒",
      efeito: "⚡",
      contraindicação: "🚫",
    }

    Object.entries(iconMap).forEach(([keyword, icon]) => {
      const regex = new RegExp(`(###?\\s*)(.*?${keyword}.*?)(?=\\n|$)`, "gi")
      enhanced = enhanced.replace(regex, `$1${icon} $2`)
    })

    return enhanced
  }

  /**
   * Cria resposta estruturada
   */
  private static createStructuredResponse(content: string, template: any): string {
    const lines = content.split("\n").filter((line) => line.trim())
    let structured = `# ${template.title}\n\n`

    let currentSection = ""
    let sectionContent: string[] = []

    for (const line of lines) {
      const trimmedLine = line.trim()
      const detectedSection = this.detectLineSection(trimmedLine)

      if (detectedSection && detectedSection !== currentSection) {
        // Finaliza seção anterior
        if (currentSection && sectionContent.length > 0) {
          structured += this.formatSection(currentSection, sectionContent)
        }

        // Inicia nova seção
        currentSection = detectedSection
        sectionContent = [trimmedLine]
      } else {
        sectionContent.push(trimmedLine)
      }
    }

    // Finaliza última seção
    if (currentSection && sectionContent.length > 0) {
      structured += this.formatSection(currentSection, sectionContent)
    }

    return structured
  }

  /**
   * Detecta seção da linha
   */
  private static detectLineSection(line: string): string {
    const lowerLine = line.toLowerCase()

    if (lowerLine.includes("medicação") || lowerLine.includes("mg") || lowerLine.includes("dose")) {
      return "medicação"
    }

    if (lowerLine.includes("orientação") || lowerLine.includes("recomendação")) {
      return "orientação"
    }

    if (lowerLine.includes("cuidado") || lowerLine.includes("atenção") || lowerLine.includes("importante")) {
      return "cuidado"
    }

    if (lowerLine.includes("posologia") || lowerLine.includes("administrar") || lowerLine.includes("tomar")) {
      return "posologia"
    }

    return ""
  }

  /**
   * Formata seção específica
   */
  private static formatSection(sectionName: string, content: string[]): string {
    const icons: Record<string, string> = {
      medicação: "💊",
      orientação: "📋",
      cuidado: "⚠️",
      posologia: "📏",
    }

    const icon = icons[sectionName] || "📌"
    let formatted = `\n### ${icon} ${sectionName.charAt(0).toUpperCase() + sectionName.slice(1)}\n\n`

    content.forEach((line) => {
      if (line.startsWith("-") || line.match(/^\d+\./)) {
        formatted += `${line}\n`
      } else {
        formatted += `- ${line}\n`
      }
    })

    return formatted + "\n"
  }
}
