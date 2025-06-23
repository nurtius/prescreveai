"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card } from "@/components/ui/card"
import { Send, Loader2, Bot, User } from "lucide-react"
import { collection, addDoc, doc, updateDoc, increment } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
}

interface ChatInterfaceProps {
  onLimitReached: () => void
}

export function ChatInterface({ onLimitReached }: ChatInterfaceProps) {
  const { userData, refreshUserData } = useAuth()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTop = scrollAreaRef.current.scrollHeight
    }
  }, [messages])

  const checkDailyLimit = async () => {
    if (!userData || userData.premium) return true

    const today = new Date().toISOString().split("T")[0]

    if (userData.lastUsed !== today) {
      // Reset daily count for new day
      await updateDoc(doc(db, "Users", userData.uid), {
        dailyCount: 0,
        lastUsed: today,
      })
      await refreshUserData()
      return true
    }

    return userData.dailyCount < 2
  }

  const sendMessage = async () => {
    if (!input.trim() || !userData || loading) return

    const canSend = await checkDailyLimit()
    if (!canSend) {
      onLimitReached()
      return
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setLoading(true)

    try {
      // Save consultation to Firestore
      const consultationData = {
        userId: userData.uid,
        question: userMessage.content,
        timestamp: userMessage.timestamp,
        userEmail: userData.email,
      }

      const docRef = await addDoc(collection(db, "Consultations"), consultationData)

      // Update daily count for non-premium users
      if (!userData.premium) {
        await updateDoc(doc(db, "Users", userData.uid), {
          dailyCount: increment(1),
          lastUsed: new Date().toISOString().split("T")[0],
        })
        await refreshUserData()
      }

      // Call Make.com webhook (replace with your actual webhook URL)
      const webhookUrl = "https://hook.us1.make.com/your-webhook-url"

      const response = await fetch(webhookUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: userMessage.content,
          userId: userData.uid,
          consultationId: docRef.id,
        }),
      })

      let aiResponse = ""

      if (response.ok) {
        const data = await response.json()
        aiResponse = data.response || "Desculpe, não consegui processar sua pergunta no momento."
      } else {
        aiResponse = "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente."
      }

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: aiResponse,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, assistantMessage])

      // Update consultation with response
      await updateDoc(docRef, {
        response: aiResponse,
        responseTimestamp: assistantMessage.timestamp,
      })
    } catch (error) {
      console.error("Error sending message:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua pergunta. Tente novamente.",
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Header */}
      <div className="p-6 border-b bg-[#F5F6FA]">
        <h1 className="text-2xl font-bold text-[#0B132B] mb-2">Prescreve AI</h1>
        <p className="text-gray-600">Seu assistente de prescrição clínica especializado</p>
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 p-6" ref={scrollAreaRef}>
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-20">
            <Bot className="w-16 h-16 mx-auto mb-4 text-[#00C49A]" />
            <h3 className="text-lg font-medium mb-2">Olá! Como posso ajudar?</h3>
            <p className="text-sm">Faça perguntas sobre medicamentos, dosagens, interações e condutas clínicas.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}>
                <Card
                  className={`max-w-[80%] p-4 ${
                    message.type === "user" ? "bg-[#00C49A] text-white" : "bg-[#F5F6FA] text-[#0B132B]"
                  }`}
                >
                  <div className="flex items-start space-x-2">
                    {message.type === "assistant" && <Bot className="w-5 h-5 mt-0.5 text-[#00C49A]" />}
                    {message.type === "user" && <User className="w-5 h-5 mt-0.5" />}
                    <div className="flex-1">
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <p className={`text-xs mt-2 ${message.type === "user" ? "text-green-100" : "text-gray-500"}`}>
                        {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  </div>
                </Card>
              </div>
            ))}

            {loading && (
              <div className="flex justify-start">
                <Card className="bg-[#F5F6FA] p-4">
                  <div className="flex items-center space-x-2">
                    <Bot className="w-5 h-5 text-[#00C49A]" />
                    <div className="flex items-center space-x-1">
                      <Loader2 className="w-4 h-4 animate-spin text-[#00C49A]" />
                      <span className="text-[#0B132B]">Analisando sua pergunta...</span>
                    </div>
                  </div>
                </Card>
              </div>
            )}
          </div>
        )}
      </ScrollArea>

      {/* Input */}
      <div className="p-6 border-t bg-[#F5F6FA]">
        <div className="flex space-x-4">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Digite sua pergunta sobre prescrições médicas..."
            className="flex-1 min-h-[60px] resize-none"
            disabled={loading}
          />
          <Button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="bg-[#00C49A] hover:bg-[#00A085] px-6"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          </Button>
        </div>

        {!userData?.premium && (
          <p className="text-xs text-gray-500 mt-2">
            Você tem {2 - (userData?.dailyCount || 0)} pergunta(s) restante(s) hoje
          </p>
        )}
      </div>
    </div>
  )
}
