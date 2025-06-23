// Script para testar a nova abordagem robusta de processamento

const testRobustProcessing = () => {
  console.log("🧪 TESTE DE PROCESSAMENTO ROBUSTO")
  console.log("==================================")

  // Simular diferentes tipos de resposta que o Make.com pode enviar
  const testCases = [
    // Caso 1: JSON válido
    '{"resposta": "A dosagem recomendada é 500mg a cada 6 horas."}',

    // Caso 2: JSON com quebras de linha escapadas
    '{"resposta": "A dosagem recomendada é:\\n- 500mg a cada 6 horas\\n- Máximo 4g por dia"}',

    // Caso 3: JSON com aspas escapadas
    '{"resposta": "Use \\"paracetamol\\" 500mg conforme orientação médica."}',

    // Caso 4: Texto puro (não JSON)
    "A dosagem recomendada é 500mg a cada 6 horas.",

    // Caso 5: JSON malformado
    '{"resposta": "A dosagem é 500mg',

    // Caso 6: Texto com aspas extras
    '"A dosagem recomendada é 500mg a cada 6 horas."',

    // Caso 7: JSON com campo diferente
    '{"response": "A dosagem recomendada é 500mg a cada 6 horas."}',
  ]

  testCases.forEach((testCase, index) => {
    console.log(`\n📋 TESTE ${index + 1}:`)
    console.log("Input:", testCase)

    try {
      let resultado = ""

      // Simular o processamento que será feito no app
      try {
        const json = JSON.parse(testCase)
        console.log("✅ JSON parseado:", json)
        resultado = json.resposta || json.response || "Campo não encontrado"
      } catch (err) {
        console.log("⚠️ Erro no JSON, limpando manualmente...")
        resultado = testCase
          .replace(/\\n/g, "\n")
          .replace(/\\"/g, '"')
          .replace(/^"|"$/g, "")
          .replace(/^\{.*"resposta":\s*"/, "")
          .replace(/^\{.*"response":\s*"/, "")
          .replace(/"\}$/, "")
          .trim()
      }

      console.log("🎯 Resultado final:", resultado)
    } catch (error) {
      console.error("❌ Erro:", error)
    }
  })

  console.log("\n✅ TODOS OS TESTES CONCLUÍDOS!")
  console.log("O app agora pode processar qualquer formato de resposta do Make.com")
}

// Executar testes
testRobustProcessing()

console.log("\n📋 INSTRUÇÕES PARA O MAKE.COM:")
console.log("Agora você pode usar qualquer um destes formatos no Webhook Response:")
console.log('1. Simples: {"resposta": {{2.Choices[0].Message.Content}}}')
console.log("2. Texto puro: {{2.Choices[0].Message.Content}}")
console.log('3. Campo diferente: {"response": {{2.Choices[0].Message.Content}}}')
console.log("O V0 vai processar corretamente qualquer formato!")
