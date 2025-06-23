"use client"

import { useState } from "react"
import { EnhancedMarkdownResponse } from "./enhanced-markdown-response"
import { Button } from "@/components/ui/button"
import { RefreshCw, Zap } from "lucide-react"

export function DemoEnhancedResponse() {
  const [key, setKey] = useState(0)
  const [currentDemo, setCurrentDemo] = useState(0)

  const demoResponses = [
    // Resposta crua como vem do webhook (com problemas)
    `{
      "resposta": "### **Orientações Gerais para Tosse Seca Persistente**\\n- Hidratação adequada (ingestão de água, chás mornos).\\n- Evitar agentes irritantes (fumaça, poeira, ar condicionado).\\n- Umidificar o ambiente (se possível).\\n- Avaliar necessidade de investigação de causas subjacentes (ex.: asma, DRGE, efeito adverso de IECA, etc.).\\n\\n### **Medicação Recomendada**\\n**Dropropizina (Xarope) – SUS (Disponível)**\\n- **Posologia:** Adultos: 15-30 mg (5-10 mL) via oral a cada 6-8h. Crianças: 1 mg/kg/dose, máx. 30 mg/dia.\\n- **Ajustes:** Idosos e insuficiência hepática/renal – reduzir dose.\\n- **Contraindicações:** Hipersensibilidade, gestação (1º trimestre)."
    }`,

    // Resposta com caracteres de escape
    `"### **Medicação Recomendada**\\n\\n**Paracetamol**\\n- Dosagem: 500-1000mg a cada 6-8 horas\\n- Máximo: 4g/dia\\n- Via: Oral\\n\\n**Importante:** Não exceder dose máxima diária."`,

    // Resposta sem estrutura
    `Hidratação adequada, beber bastante água. Paracetamol 500mg de 6 em 6 horas. Evitar exposição ao frio. Repouso. Se piorar, procurar médico.`,
  ]

  const handleRestart = () => {
    setKey((prev) => prev + 1)
  }

  const handleNextDemo = () => {
    setCurrentDemo((prev) => (prev + 1) % demoResponses.length)
    setKey((prev) => prev + 1)
  }

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Header */}
      <div className="text-center bg-gradient-to-r from-emerald-50 to-blue-50 p-8 rounded-2xl border border-emerald-200">
        <h2 className="text-3xl font-bold text-slate-800 mb-3">🩺 Demo: Pós-Processamento de Respostas Médicas</h2>
        <p className="text-slate-600 mb-6 text-lg">
          Veja como respostas cruas da IA são transformadas em conteúdo médico profissional e bem estruturado
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Button onClick={handleRestart} className="bg-emerald-500 hover:bg-emerald-600">
            <RefreshCw className="w-4 h-4 mr-2" />
            Reiniciar Animação
          </Button>
          <Button onClick={handleNextDemo} variant="outline" className="border-emerald-500 text-emerald-600">
            <Zap className="w-4 h-4 mr-2" />
            Próximo Exemplo ({currentDemo + 1}/3)
          </Button>
        </div>
      </div>

      {/* Resposta Original (Crua) */}
      <div className="bg-red-50 border border-red-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-red-800 mb-3 flex items-center">❌ Resposta Original (Crua)</h3>
        <div className="bg-white p-4 rounded-lg border border-red-200 font-mono text-sm text-slate-700 overflow-x-auto">
          <pre className="whitespace-pre-wrap">{demoResponses[currentDemo]}</pre>
        </div>
        <p className="text-red-600 text-sm mt-2 font-medium">
          ⚠️ Problemas: JSON visível, caracteres de escape (\\n, \\"), formatação quebrada
        </p>
      </div>

      {/* Seta indicativa */}
      <div className="text-center">
        <div className="inline-flex items-center space-x-2 bg-emerald-100 px-6 py-3 rounded-full">
          <span className="text-emerald-700 font-semibold">Pós-Processamento Automático</span>
          <span className="text-2xl">⬇️</span>
        </div>
      </div>

      {/* Resposta Processada */}
      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-6">
        <h3 className="text-lg font-bold text-emerald-800 mb-4 flex items-center">
          ✅ Resposta Processada e Formatada
        </h3>

        <EnhancedMarkdownResponse
          key={key}
          rawResponse={demoResponses[currentDemo]}
          onAnimationComplete={() => console.log("Animação concluída!")}
        />

        <div className="mt-4 p-4 bg-emerald-100 rounded-lg">
          <p className="text-emerald-700 text-sm font-medium">
            ✨ <strong>Melhorias aplicadas:</strong> Remoção de JSON, conversão de caracteres de escape, estruturação
            automática, ícones médicos, formatação profissional, animação de digitação
          </p>
        </div>
      </div>

      {/* Recursos */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-blue-800 mb-3">🔧 Processamento Automático</h4>
          <ul className="space-y-2 text-blue-700 text-sm">
            <li>
              • Remove estrutura JSON {"{"}"resposta": "..."{"}"}
            </li>
            <li>• Converte caracteres de escape (\\n, \\", etc.)</li>
            <li>• Normaliza quebras de linha</li>
            <li>• Formata títulos e seções</li>
            <li>• Organiza listas e medicações</li>
            <li>• Adiciona estrutura médica padrão</li>
          </ul>
        </div>

        <div className="bg-purple-50 border border-purple-200 rounded-xl p-6">
          <h4 className="text-lg font-bold text-purple-800 mb-3">✨ Formatação Médica</h4>
          <ul className="space-y-2 text-purple-700 text-sm">
            <li>• Ícones específicos para seções médicas</li>
            <li>• Destaque para medicações e dosagens</li>
            <li>• Avisos importantes em blocos especiais</li>
            <li>• Estrutura hierárquica clara</li>
            <li>• Design responsivo e profissional</li>
            <li>• Animação de digitação realista</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
