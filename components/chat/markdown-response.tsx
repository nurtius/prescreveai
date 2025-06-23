"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import ReactMarkdown from "react-markdown"
import remarkGfm from "remark-gfm"
import rehypeSanitize from "rehype-sanitize"
import { Bot, Loader2 } from "lucide-react"

interface MarkdownResponseProps {
  response: {
    resposta: string
  }
  onAnimationComplete?: () => void
  className?: string
}

export function MarkdownResponse({ response, onAnimationComplete, className = "" }: MarkdownResponseProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isTyping, setIsTyping] = useState(true)
  const [currentIndex, setCurrentIndex] = useState(0)

  const fullText = response.resposta || ""

  useEffect(() => {
    if (!fullText) return

    setDisplayedText("")
    setCurrentIndex(0)
    setIsTyping(true)

    const typingSpeed = 15 // Velocidade de digitação (ms por caractere)
    let timeoutId: NodeJS.Timeout

    const typeText = () => {
      if (currentIndex < fullText.length) {
        setDisplayedText(fullText.slice(0, currentIndex + 1))
        setCurrentIndex((prev) => prev + 1)
        timeoutId = setTimeout(typeText, typingSpeed)
      } else {
        setIsTyping(false)
        onAnimationComplete?.()
      }
    }

    // Pequeno delay antes de começar a digitação
    timeoutId = setTimeout(typeText, 300)

    return () => {
      if (timeoutId) clearTimeout(timeoutId)
    }
  }, [fullText, currentIndex, onAnimationComplete])

  // Componentes customizados para o ReactMarkdown
  const components = {
    // Títulos
    h1: ({ children }: any) => (
      <h1 className="text-2xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-emerald-200">{children}</h1>
    ),
    h2: ({ children }: any) => (
      <h2 className="text-xl font-bold text-slate-800 mb-3 mt-6 text-emerald-700">{children}</h2>
    ),
    h3: ({ children }: any) => (
      <h3 className="text-lg font-semibold text-slate-700 mb-3 mt-5 flex items-center">
        <span className="w-1 h-6 bg-emerald-500 mr-3 rounded-full"></span>
        {children}
      </h3>
    ),
    h4: ({ children }: any) => <h4 className="text-base font-semibold text-slate-700 mb-2 mt-4">{children}</h4>,

    // Parágrafos
    p: ({ children }: any) => <p className="text-slate-700 mb-3 leading-relaxed">{children}</p>,

    // Listas
    ul: ({ children }: any) => <ul className="space-y-2 mb-4 ml-4">{children}</ul>,
    ol: ({ children }: any) => <ol className="space-y-2 mb-4 ml-4 list-decimal">{children}</ol>,
    li: ({ children }: any) => (
      <li className="text-slate-700 flex items-start">
        <span className="w-2 h-2 bg-emerald-500 rounded-full mt-2 mr-3 flex-shrink-0"></span>
        <span className="flex-1">{children}</span>
      </li>
    ),

    // Texto em negrito
    strong: ({ children }: any) => <strong className="font-semibold text-slate-800">{children}</strong>,

    // Texto em itálico
    em: ({ children }: any) => <em className="italic text-slate-600">{children}</em>,

    // Código inline
    code: ({ children }: any) => (
      <code className="bg-slate-100 text-emerald-700 px-2 py-1 rounded text-sm font-mono">{children}</code>
    ),

    // Bloco de código
    pre: ({ children }: any) => (
      <pre className="bg-slate-50 border border-slate-200 rounded-lg p-4 mb-4 overflow-x-auto">
        <code className="text-sm font-mono text-slate-700">{children}</code>
      </pre>
    ),

    // Links
    a: ({ href, children }: any) => (
      <a
        href={href}
        className="text-emerald-600 hover:text-emerald-700 underline font-medium"
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),

    // Citações
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-emerald-300 bg-emerald-50 pl-4 py-2 mb-4 italic text-slate-700">
        {children}
      </blockquote>
    ),

    // Tabelas
    table: ({ children }: any) => (
      <div className="overflow-x-auto mb-4">
        <table className="min-w-full border border-slate-200 rounded-lg">{children}</table>
      </div>
    ),
    thead: ({ children }: any) => <thead className="bg-slate-50">{children}</thead>,
    tbody: ({ children }: any) => <tbody>{children}</tbody>,
    tr: ({ children }: any) => <tr className="border-b border-slate-200">{children}</tr>,
    th: ({ children }: any) => <th className="px-4 py-3 text-left font-semibold text-slate-700">{children}</th>,
    td: ({ children }: any) => <td className="px-4 py-3 text-slate-700">{children}</td>,

    // Linha horizontal
    hr: () => <hr className="border-slate-200 my-6" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`bg-white rounded-2xl shadow-lg border border-slate-200 overflow-hidden ${className}`}
    >
      {/* Header da mensagem */}
      <div className="flex items-center space-x-3 p-4 bg-gradient-to-r from-emerald-50 to-blue-50 border-b border-slate-200">
        <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
          <Bot className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1">
          <h4 className="font-semibold text-slate-800">Prescreve AI</h4>
          <div className="flex items-center space-x-2">
            {isTyping ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin text-emerald-600" />
                <span className="text-xs text-slate-500">Digitando...</span>
              </>
            ) : (
              <span className="text-xs text-emerald-600 font-medium">Resposta completa</span>
            )}
          </div>
        </div>
      </div>

      {/* Conteúdo da mensagem */}
      <div className="p-6">
        <AnimatePresence>
          {displayedText && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="prose prose-slate max-w-none">
              <ReactMarkdown
                components={components}
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSanitize]}
                className="markdown-content"
              >
                {displayedText}
              </ReactMarkdown>

              {/* Cursor piscando durante a digitação */}
              {isTyping && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ duration: 0.8, repeat: Number.POSITIVE_INFINITY, repeatType: "reverse" }}
                  className="inline-block w-0.5 h-5 bg-emerald-500 ml-1"
                />
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Placeholder enquanto não há texto */}
        {!displayedText && (
          <div className="flex items-center space-x-3 text-slate-500">
            <Loader2 className="w-4 h-4 animate-spin" />
            <span className="text-sm">Preparando resposta...</span>
          </div>
        )}
      </div>

      {/* Footer com timestamp */}
      <div className="px-6 pb-4">
        <div className="text-xs text-slate-400 text-right">
          {new Date().toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </motion.div>
  )
}
