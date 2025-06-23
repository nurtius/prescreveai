"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { HtmlResponseRenderer } from "./html-response-renderer"
import { TypingIndicator } from "./typing-indicator"
import { User } from "lucide-react"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface MedicalHtmlMessageProps {
  message: ChatMessage
  isLatest?: boolean
}

export function MedicalHtmlMessage({ message, isLatest = false }: MedicalHtmlMessageProps) {
  const [showTyping, setShowTyping] = useState(isLatest && message.type === "assistant")

  const handleAnimationComplete = () => {
    setShowTyping(false)
  }

  if (message.type === "user") {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
        className="flex justify-end mb-6"
      >
        <div className="max-w-[85%] lg:max-w-[70%]">
          <div className="bg-emerald-500 text-white rounded-2xl rounded-tr-md p-4 shadow-lg">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-3 h-3" />
              </div>
              <div className="flex-1">
                <p className="text-sm lg:text-base leading-relaxed break-words">{message.content}</p>
                <p className="text-xs text-emerald-100 mt-2">
                  {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <div className="flex justify-start mb-6">
      <div className="max-w-[95%] lg:max-w-[85%]">
        {/* Indicador de digitação */}
        {showTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-3"
            onAnimationComplete={handleAnimationComplete}
          >
            <TypingIndicator />
          </motion.div>
        )}

        {/* Resposta em HTML */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: showTyping ? 1.5 : 0 }}
          className="bg-white rounded-2xl rounded-tl-md p-6 shadow-xl border border-slate-200"
        >
          <HtmlResponseRenderer htmlContent={message.content} className="text-slate-700" />

          {/* Timestamp */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-400">
              {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
          </div>

          {/* Disclaimer médico */}
          <div className="mt-4 pt-3 border-t border-slate-100">
            <p className="text-xs text-slate-500 italic">
              Este aplicativo tem apenas a função de facilitar a prática médica, lembre-se que podem existir erros e não
              deve ser utilizado como fonte primária de pesquisa. Considere verificar informações importantes. Uso por
              conta e risco.
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
