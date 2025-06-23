"use client"

import { useState } from "react"
import { MarkdownResponse } from "./markdown-response"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function DemoMarkdownResponse() {
  const [key, setKey] = useState(0)

  const sampleResponse = {
    resposta: `### **Orientações Gerais para Tosse Seca:**

**Hidratação** é fundamental para o tratamento:
- Beba pelo menos **2-3 litros de água** por dia
- Chás mornos com mel podem ajudar a acalmar a garganta
- Evite bebidas geladas ou muito quentes

### **Medicações Recomendadas:**

1. **Dropropizina** (Atossion)
   - Dosagem: 40mg, 3x ao dia
   - Tomar após as refeições
   - Duração: 5-7 dias

2. **Levodropropizina** (Antux)
   - Dosagem: 60mg, 2x ao dia
   - Preferencialmente pela manhã e noite
   - Pode ser usado por até 10 dias

### **Cuidados Importantes:**

> ⚠️ **Atenção**: Se a tosse persistir por mais de 2 semanas ou apresentar sangue, procure atendimento médico imediatamente.

**Evitar:**
- Ambientes com fumaça ou poluição
- Ar condicionado muito frio
- Alimentos irritantes (condimentos fortes)

### **Quando Retornar:**

- Febre acima de 38°C
- Dificuldade para respirar
- Tosse com sangue
- Piora dos sintomas após 3 dias de tratamento

---

*Prescrição válida por 30 dias. Mantenha acompanhamento médico regular.*`,
  }

  const handleRestart = () => {
    setKey((prev) => prev + 1)
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-slate-800 mb-2">Demo: Resposta Médica em Markdown</h2>
        <p className="text-slate-600 mb-4">Veja como as respostas da IA são renderizadas com animação de digitação</p>
        <Button onClick={handleRestart} className="mb-6">
          <RefreshCw className="w-4 h-4 mr-2" />
          Reiniciar Animação
        </Button>
      </div>

      <MarkdownResponse
        key={key}
        response={sampleResponse}
        onAnimationComplete={() => console.log("Animação concluída!")}
      />
    </div>
  )
}
