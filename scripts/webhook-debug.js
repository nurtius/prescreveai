// Script melhorado para debug do webhook

const debugWebhook = async () => {
  console.log("🔍 DEBUG WEBHOOK DO MAKE.COM")
  console.log("============================")

  const webhookUrl = "https://hook.us2.make.com/onps9d7xs18k8jvdt5ae9e1zie1cngu2"

  // Teste 1: Mensagem simples
  console.log("\n📤 TESTE 1: Mensagem simples")
  await testMessage("Qual a dosagem de paracetamol para adultos?")

  // Teste 2: Mensagem com caracteres especiais
  console.log("\n📤 TESTE 2: Mensagem com quebras de linha")
  await testMessage("Qual a dosagem de paracetamol?\nPara adultos de 70kg?")

  // Teste 3: Mensagem com tabs e espaços
  console.log("\n📤 TESTE 3: Mensagem com tabs")
  await testMessage("Dosagem\tde\tparacetamol\t\tpara adultos?")

  async function testMessage(originalMessage) {
    try {
      // Sanitizar mensagem
      const sanitizedMessage = originalMessage
        .replace(/[\u0000-\u001F\u007F-\u009F]/g, "")
        .replace(/\n/g, " ")
        .replace(/\r/g, "")
        .replace(/\t/g, " ")
        .replace(/\s+/g, " ")
        .trim()

      console.log("Original:", JSON.stringify(originalMessage))
      console.log("Sanitizada:", JSON.stringify(sanitizedMessage))

      const payload = { mensagem: sanitizedMessage }
      console.log("Payload:", JSON.stringify(payload))

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      })

      console.log("Status:", response.status)

      const responseText = await response.text()
      console.log("Resposta bruta:", responseText)

      if (response.ok) {
        try {
          const data = JSON.parse(responseText)
          console.log("✅ SUCESSO:", data)
        } catch (parseError) {
          console.log("⚠️ Resposta não é JSON válido:", parseError.message)
        }
      } else {
        console.log("❌ ERRO HTTP:", response.status, response.statusText)
      }
    } catch (error) {
      console.error("❌ ERRO:", error.message)
    }
  }
}

// Executar debug
debugWebhook()

console.log("\n📋 DICAS DE DEBUG:")
console.log("1. Verifique se o Make.com scenario está ativo")
console.log("2. Confirme se a URL do webhook está correta")
console.log("3. Verifique se o scenario espera o campo 'mensagem'")
console.log("4. Confirme se o scenario retorna o campo 'resposta'")
console.log("5. Teste diretamente no Make.com com dados de exemplo")
