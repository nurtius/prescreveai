// Serviço para comunicação com o webhook do Make.com

interface WebhookRequest {
  mensagem: string
}

interface WebhookResponse {
  resposta: string
}

export class WebhookService {
  private static readonly WEBHOOK_URL = "https://hook.us2.make.com/onps9d7xs18k8jvdt5ae9e1zie1cngu2"
  private static readonly TIMEOUT = 30000 // 30 segundos

  static async sendMessage(mensagem: string): Promise<string> {
    try {
      console.log("🚀 Enviando mensagem para webhook:", mensagem)

      const controller = new AbortController()
      const timeoutId = setTimeout(() => controller.abort(), this.TIMEOUT)

      const response = await fetch(this.WEBHOOK_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          mensagem: mensagem,
        } as WebhookRequest),
        signal: controller.signal,
      })

      clearTimeout(timeoutId)

      console.log("📡 Status da resposta:", response.status)

      if (!response.ok) {
        throw new Error(`Webhook retornou status ${response.status}: ${response.statusText}`)
      }

      const data: WebhookResponse = await response.json()
      console.log("✅ Resposta recebida:", data)

      if (!data.resposta) {
        throw new Error("Resposta do webhook não contém o campo 'resposta'")
      }

      return data.resposta
    } catch (error) {
      console.error("❌ Erro no webhook:", error)

      if (error instanceof Error) {
        if (error.name === "AbortError") {
          throw new Error("Timeout: O servidor demorou muito para responder")
        }
        throw error
      }

      throw new Error("Erro desconhecido ao comunicar com o servidor")
    }
  }

  static async testConnection(): Promise<boolean> {
    try {
      await this.sendMessage("teste de conexão")
      return true
    } catch (error) {
      console.error("Teste de conexão falhou:", error)
      return false
    }
  }
}
