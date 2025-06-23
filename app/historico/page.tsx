"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { getUserConversations } from "@/lib/firebase-utils"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Bot, User, Calendar, MessageSquare, Loader2, Stethoscope } from "lucide-react"

interface Conversation {
  id: string
  email: string
  pergunta: string
  resposta: string
  data_hora: string
}

export default function HistoricoPage() {
  const { user, userData, loading } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [loadingConversations, setLoadingConversations] = useState(true)
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || !user.emailVerified)) {
      router.push("/login")
      return
    }

    if (userData?.email) {
      loadConversations()
    }
  }, [user, userData, loading, router])

  const loadConversations = async () => {
    if (!userData?.email) return

    try {
      setLoadingConversations(true)
      const userConversations = await getUserConversations(userData.email)
      setConversations(userConversations as Conversation[])
    } catch (error) {
      console.error("Error loading conversations:", error)
    } finally {
      setLoadingConversations(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500 rounded-full mb-4 animate-pulse">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mb-2 mx-auto" />
          <p className="text-white">Carregando...</p>
        </div>
      </div>
    )
  }

  if (!user || !user.emailVerified) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 p-4 lg:p-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={() => router.push("/dashboard")} className="p-2 hover:bg-slate-100">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold text-slate-800">Histórico de Conversas</h1>
              <p className="text-slate-600">Suas últimas 10 consultas médicas</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center">
              <Stethoscope className="w-4 h-4 text-white" />
            </div>
            <span className="text-sm font-medium text-slate-700">{userData?.name}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto p-4 lg:p-6">
        {loadingConversations ? (
          <div className="text-center py-12">
            <Loader2 className="w-8 h-8 animate-spin text-emerald-500 mx-auto mb-4" />
            <p className="text-slate-600">Carregando histórico...</p>
          </div>
        ) : conversations.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageSquare className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">Nenhuma conversa encontrada</h3>
            <p className="text-slate-600 mb-6">Você ainda não fez nenhuma consulta médica.</p>
            <Button
              onClick={() => router.push("/dashboard")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white"
            >
              Fazer primeira consulta
            </Button>
          </div>
        ) : (
          <div className="space-y-6">
            {conversations.map((conversation, index) => (
              <Card key={conversation.id} className="shadow-md hover:shadow-lg transition-shadow duration-200">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg font-semibold text-slate-800 flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2 text-emerald-500" />
                      Consulta #{conversations.length - index}
                    </CardTitle>
                    <div className="flex items-center text-sm text-slate-500">
                      <Calendar className="w-4 h-4 mr-1" />
                      {formatDate(conversation.data_hora)}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Pergunta do usuário */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="w-4 h-4 text-emerald-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-emerald-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-emerald-800 mb-1">Sua pergunta:</p>
                        <p className="text-slate-700 leading-relaxed">{conversation.pergunta}</p>
                      </div>
                    </div>
                  </div>

                  <Separator />

                  {/* Resposta da IA */}
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="w-4 h-4 text-blue-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="bg-blue-50 rounded-lg p-3">
                        <p className="text-sm font-medium text-blue-800 mb-1">Resposta do Prescreve AI:</p>
                        <ScrollArea className="max-h-48">
                          <p className="text-slate-700 leading-relaxed whitespace-pre-wrap">{conversation.resposta}</p>
                        </ScrollArea>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
