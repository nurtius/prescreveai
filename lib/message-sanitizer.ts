// Utilitário para sanitizar mensagens antes de enviar para o webhook

export class MessageSanitizer {
  /**
   * Remove caracteres de controle e sanitiza texto para JSON
   */
  static sanitizeForJSON(text: string): string {
    if (!text || typeof text !== "string") {
      return ""
    }

    return (
      text
        // Remove caracteres de controle (0x00-0x1F e 0x7F-0x9F)
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        // Substitui quebras de linha por espaços
        .replace(/\n/g, " ")
        // Remove carriage returns
        .replace(/\r/g, "")
        // Substitui tabs por espaços
        .replace(/\t/g, " ")
        // Remove espaços múltiplos
        .replace(/\s+/g, " ")
        // Remove espaços no início e fim
        .trim()
    )
  }

  /**
   * Valida se o texto é seguro para JSON
   */
  static isValidForJSON(text: string): boolean {
    try {
      JSON.stringify({ test: text })
      return true
    } catch {
      return false
    }
  }

  /**
   * Sanitiza e valida mensagem
   */
  static prepareMedicalMessage(message: string): string {
    const sanitized = this.sanitizeForJSON(message)

    if (!sanitized) {
      throw new Error("Mensagem vazia após sanitização")
    }

    if (!this.isValidForJSON(sanitized)) {
      throw new Error("Mensagem contém caracteres inválidos")
    }

    return sanitized
  }

  /**
   * Limita tamanho da mensagem
   */
  static limitMessageSize(message: string, maxLength = 1000): string {
    if (message.length <= maxLength) {
      return message
    }

    return message.substring(0, maxLength - 3) + "..."
  }
}
