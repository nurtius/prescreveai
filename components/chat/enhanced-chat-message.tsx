"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MarkdownResponse } from "./markdown-response"
import { TypingIndicator } from "./typing-indicator"
import { User, Copy, Check } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessage {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface EnhancedChatMessageProps {
  message: ChatMessage
  isLatest?: boolean
}

export function EnhancedChatMessage({ message, isLatest = false }: EnhancedChatMessageProps) {
  const [copied, setCopied] = useState(false)
  const [showTyping, setShowTyping] = useState(isLatest && message.type === "assistant")

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(message.content)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (error) {
      console.error("Erro ao copiar:", error)
    }
  }

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
          >
            <TypingIndicator />
          </motion.div>
        )}

        {/* Resposta em Markdown */}
        <div className="relative group">
          <MarkdownResponse
            response={{ resposta: message.content }}
            onAnimationComplete={handleAnimationComplete}
            className="shadow-xl hover:shadow-2xl transition-shadow duration-300"
          />

          {/* Botão de copiar */}
          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <Button
              onClick={handleCopy}
              size="sm"
              variant="ghost"
              className="h-8 w-8 p-0 bg-white/80 hover:bg-white shadow-md"
            >
              {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-600" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
