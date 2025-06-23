"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import { Bot, Loader2, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ResponseFormatter } from "@/lib/response-formatter"
import { MedicalResponseProcessor } from "@/lib/medical-response-processor"

interface EnhancedMarkdownResponseProps {
  rawResponse: string | { resposta: string }
  onAnimationComplete?: () => void
  className?: string
}

export function EnhancedMarkdownResponse({
  rawResponse,
  onAnimationComplete,
  className = "",
}: EnhancedMarkdownResponseProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [copied, setCopied] = useState(false)

  // Processa a resposta bruta
  const processedResponse = (() => {
    let raw = ""

    // Extrai o texto da resposta
    if (typeof rawResponse === "string") {
      raw = rawResponse
    } else if (rawResponse && typeof rawResponse === "object" && "resposta" in rawResponse) {
      raw = rawResponse.resposta
    }

    // Aplica pós-processamento completo
    let processed = ResponseFormatter.processCompleteResponse(raw)
    processed = MedicalResponseProcessor.applyMedicalTemplate(processed)

    return processed
  })()

  useEffect(() => {
    if (!processedResponse) return

    setDisplayedText("")
    setCurrentIndex(0)
    setIsTyping(true)

    const typingSpeed = 12 // Velocidade mais rápida para melhor UX
    let timeoutId: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex < processedResponse.length) {
        setDisplayedText(processedResponse.slice(0, currentIndex + 1))
        setCurrentIndex((prev) => prev + 1)
        timeoutId = setTimeout(typeText, typingSpeed)
      } else {
        setIsTyping(false)
        onAnimationComplete?.()
      }
    }

    // Delay inicial
    timeoutId = setTimeout(typeText, 500)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [processedResponse, currentIndex, onAnimationComplete])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(processedResponse)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
    }
  }

  // Componentes customizados para ReactMarkdown
  const components = {
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-slate-800 mb-6 pb-3 border-b-2 border-emerald-300 flex items-center">
        {children}
      </h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-emerald-700 mb-4 mt-8 flex items-center">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold text-slate-700 mb-4 mt-6 flex items-center bg-slate-50 p-3 rounded-lg border-l-4 border-emerald-500">
        {children}
      </h3>
    ),
    h4: ({ children }: any) => <h4 className="text-base font-semibold text-slate-700 mb-3 mt-4">{children}</h4>,

    p: ({ children }: any) => <p className="text-slate-700 mb-4 leading-relaxed text-base">{children}</p>,

    ul: ({ children }: any) => <ul className="space-y-3 mb-6 ml-2">{children}</ul>,
    ol: ({ children }: any) => <ol className="space-y-3 mb-6 ml-6 list-decimal">{children}</ol>,
    li: ({ children }: any) => (
      <li className="text-slate-700 flex items-start leading-relaxed">
        <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2.5 mr-4 flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    strong: ({ children }: any) => (
      <strong className="font-bold text-slate-800 bg-yellow-50 px-1 rounded">{children}</strong>
    ),
    em: ({ children }: any) => <em className="italic text-slate-600">{children}</em>,

    code: ({ children }: any) => (
      <code className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm font-mono border">{children}</code>
    ),

    pre: ({ children }: any) => (
      <pre className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-6 overflow-x-auto shadow-inner">
        <code className="text-sm font-mono text-slate-700">{children}</code>
      </pre>
    ),

    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-orange-400 bg-orange-50 pl-6 py-4 mb-6 rounded-r-lg shadow-sm">
        <div className="text-orange-800 font-medium">{children}</div>
      </blockquote>
    ),

    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-emerald-600 hover:text-emerald-700 underline font-medium hover:bg-emerald-50 px-1 rounded transition-colors"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-6 rounded-lg border border-slate-200">
        <table className="min-w-full">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-emerald-50">{children}</thead>,
    tbody: ({ children }: any) => <tbody className="divide-y divide-slate-200">{children}</tbody>,
    tr: ({ children }: any) => <tr className="hover:bg-slate-50 transition-colors">{children}</tr>,
    th: ({ children }: any) => (
      <th className="px-6 py-4 text-left font-semibold text-slate-700 border-b border-slate-200">{children}</th>
    ),
    td: ({ children }: any) => <td className="px-6 py-4 text-slate-700">{children}</td>,

    hr: () => <hr className="border-slate-300 my-8" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`bg-white rounded-2xl shadow-xl border border-slate-200 overflow-hidden ${className}`}
    >
      {/* Header da mensagem */}
      <div className="flex items-center justify-between p-5 bg-gradient-to-r from-emerald-50 via-blue-50 to-emerald-50 border-b border-slate-200">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center shadow-lg">
            <Bot className="w-5 h-5 text-white" />
          </div>
          <div>
            <h4 className="font-bold text-slate-800">Prescreve AI</h4>
            <div className="flex items-center space-x-2">
              {isTyping ? (
                <>
                  <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                  <span className="text-xs text-slate-500 font-medium">Processando resposta médica...</span>
                </>
              ) : (
                <span className="text-xs text-emerald-600 font-semibold">✓ Resposta completa</span>
              )}
            </div>
          </div>
        </div>

        {/* Botão de copiar */}
        <Button
          onClick={handleCopy}
          size="sm"
          variant="ghost"
          className="h-9 px-3 hover:bg-white/80 transition-all duration-200"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-emerald-600 font-medium">Copiado!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 mr-2 text-slate-600" />
              <span className="text-slate-600">Copiar</span>
            </>
          )}
        </Button>
      </div>

      {/* Conteúdo da mensagem */}
      <div className="p-6 lg:p-8">
        <AnimatePresence>
          {displayedText && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-slate max-w-none">
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                className="medical-content"
              >
                {displayedText}
              </ReactMarkdown>

              {/* Cursor piscando durante a digitação */}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-6 bg-emerald-500 ml-1"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder enquanto não há texto */}
        {!displayedText && (
          <div className="flex items-center justify-center space-x-3 text-slate-500 py-8">
            <Loader2 className="w-5 h-5 animate-spin text-emerald-600" />
            <span className="text-base font-medium">Preparando resposta médica...</span>
          </div>
        )}
      </div>

      {/* Footer com timestamp e status */}
      <div className="px-6 lg:px-8 pb-5">
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Resposta gerada por IA médica especializada</span>
          <span>
            {new Date().toLocaleTimeString("pt-BR", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>
        </div>
      </div>
    </motion.div>
  )
}
