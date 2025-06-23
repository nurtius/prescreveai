// Script para testar a conexão com o webhook do Make.com
// Execute este script no console do navegador para testar

const testWebhook = async () => {
  console.log("🧪 TESTANDO WEBHOOK DO MAKE.COM")
  console.log("================================")

  const webhookUrl = "https://hook.us2.make.com/onps9d7xs18k8jvdt5ae9e1zie1cngu2"

  try {
    console.log("📤 Enviando mensagem de teste...")

    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        mensagem: "Teste de conexão - qual a dosagem de paracetamol para adultos?",
      }),
    })

    console.log("📡 Status:", response.status)
    console.log("📡 Headers:", Object.fromEntries(response.headers.entries()))

    if (!response.ok) {
      throw new Error(`Status ${response.status}: ${response.statusText}`)
    }

    const data = await response.json()
    console.log("✅ SUCESSO! Resposta recebida:")
    console.log(data)

    if (data.resposta) {
      console.log("🎯 Campo 'resposta' encontrado:", data.resposta)
    } else {
      console.log("⚠️ Campo 'resposta' não encontrado na resposta")
    }
  } catch (error) {
    console.error("❌ ERRO:", error)
  }
}

// Executar teste
testWebhook()

console.log("📋 ESTRUTURA ESPERADA:")
console.log("Envio: { mensagem: 'texto do usuário' }")
console.log("Resposta: { resposta: 'texto da IA' }")
