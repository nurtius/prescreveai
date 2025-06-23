"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Bot, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface CleanMedicalResponseProps {
  content: string
  onAnimationComplete?: () => void
}

export function CleanMedicalResponse({ content, onAnimationComplete }: CleanMedicalResponseProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!content) return

    setDisplayedText("")
    setIsTyping(true)

    // ANIMAÇÃO MAIS RÁPIDA - 3ms por caractere
    const typingSpeed = 3
    let timeoutId: NodeJS.Timeout
    let index = 0

    const typeText = () => {
      if (index < content.length) {
        setDisplayedText(content.slice(0, index + 1))
        index++
        timeoutId = setTimeout(typeText, typingSpeed)
      } else {
        setIsTyping(false)
        onAnimationComplete?.()
      }
    }

    // Delay inicial menor
    timeoutId = setTimeout(typeText, 200)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [content, onAnimationComplete])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
    }
  }

  // Componentes markdown customizados - SEM MARCAÇÃO LARANJA
  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b border-slate-200">{children}</h1>
    ),

    // Títulos médicos principais - MAIORES E EM NEGRITO
    h2: ({ children }: any) => (
      <h2 className="text-lg font-bold text-slate-800 mb-4 mt-6 flex items-center bg-gradient-to-r from-emerald-50 to-blue-50 p-4 rounded-lg border-l-4 border-emerald-500 shadow-sm">
        {children}
      </h2>
    ),

    // Subtítulos para medicações (Posologia, Ajustes)
    h3: ({ children }: any) => (
      <h3 className="text-base font-semibold text-slate-700 mb-2 mt-4 ml-4 text-emerald-700">{children}</h3>
    ),

    // Parágrafos - para explicação de patologia
    p: ({ children }: any) => <p className="text-slate-700 mb-4 leading-relaxed text-justify">{children}</p>,

    ul: ({ children }: any) => <ul className="mb-4 space-y-2">{children}</ul>,

    // Tópicos limpos - SEM ANINHAMENTO
    li: ({ children }: any) => (
      <li className="text-slate-700 flex items-start leading-relaxed">
        <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Negrito mais destacado - para medicações e termos importantes
    strong: ({ children }: any) => (
      <strong className="font-bold text-slate-800 bg-yellow-100 px-1 py-0.5 rounded text-emerald-800">
        {children}
      </strong>
    ),

    // Itálico para disclaimer
    em: ({ children }: any) => <em className="italic text-slate-500 text-sm">{children}</em>,

    // REMOVIDO: blockquote que causava marcação laranja
    // blockquote: ({ children }: any) => (
    //   <blockquote className="border-l-4 border-orange-400 bg-orange-50 pl-4 py-3 mb-4 rounded-r">
    //     <div className="text-orange-800 font-medium">{children}</div>
    //   </blockquote>
    // ),

    // Linha horizontal para separar disclaimer
    hr: () => <hr className="border-slate-300 my-6 opacity-50" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-xl shadow-md border border-slate-200 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
            <Bot className="w-4 h-4 text-white" />
          </div>
          <div>
            <h4 className="font-semibold text-slate-800">Prescreve AI</h4>
            {isTyping ? (
              <div className="flex items-center space-x-2">
                <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                <span className="text-xs text-slate-500">Processando resposta médica...</span>
              </div>
            ) : (
              <span className="text-xs text-emerald-600 font-medium">✓ Resposta médica completa</span>
            )}
          </div>
        </div>

        <Button onClick={handleCopy} size="sm" variant="ghost" className="h-8 px-3">
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4 text-slate-600" />}
        </Button>
      </div>

      {/* Conteúdo */}
      <div className="p-6">
        {displayedText && (
          <div className="prose prose-slate max-w-none">
            <ReactMarkdown components={components} remarkPlugins={[remarkGfm]}>
              {displayedText}
            </ReactMarkdown>

            {/* Cursor */}
            {isTyping && (
              <motion.span
                animate={{ opacity: [1, 0] }}
                transition={{
                  duration: 0.6,
                  repeat: Number.POSITIVE_INFINITY,
                  repeatType: "reverse",
                }}
                className="inline-block w-0.5 h-5 bg-emerald-500 ml-1"
              />
            )}
          </div>
        )}

        {!displayedText && (
          <div className="flex items-center space-x-3 text-slate-500 py-4">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span>Preparando resposta médica especializada...</span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 pb-4">
        <div className="text-xs text-slate-400 text-right">
          Resposta gerada em{" "}
          {new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  )
}
