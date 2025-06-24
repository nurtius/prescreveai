"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { useRouter } from "next/navigation"
import { saveConversation, getUserConversations, deleteConversation } from "@/lib/firebase-utils"
import {
  Loader2,
  Plus,
  LogOut,
  Crown,
  Send,
  Bot,
  Menu,
  X,
  User,
  MessageSquare,
  AlertTriangle,
  Sparkles,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ConversationItem } from "@/components/chat/conversation-item"
import Image from "next/image"

interface Message {
  id: string
  type: "user" | "assistant"
  content: string
  timestamp: string
  isProcessed?: boolean
}

interface Conversation {
  id: string
  pergunta: string
  resposta: string
  data_hora: string
}

// Componente para renderizar HTML da IA de forma segura e responsiva
function HtmlMedicalResponse({ content }: { content: string }) {
  const [processedContent, setProcessedContent] = useState("")

  useEffect(() => {
    // Processar o conteúdo HTML
    let processed = content

    // Se o conteúdo já vem como HTML completo, usar diretamente
    if (processed.includes("<html>") || processed.includes("<body>")) {
      // Extrair apenas o conteúdo do body
      const bodyMatch = processed.match(/<body[^>]*>([\s\S]*?)<\/body>/i)
      if (bodyMatch) {
        processed = bodyMatch[1]
      }
    }

    // Limpar tags html e body se existirem
    processed = processed
      .replace(/<\/?html[^>]*>/gi, "")
      .replace(/<\/?body[^>]*>/gi, "")
      .trim()

    setProcessedContent(processed)
  }, [content])

  return (
    <Card className="bg-white border-2 border-slate-300 p-4 sm:p-6 shadow-xl rounded-2xl hover:shadow-2xl transition-all duration-300 w-full overflow-hidden">
      <div className="flex items-start space-x-3 sm:space-x-4">
        <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center flex-shrink-0 border border-emerald-200">
          <Bot className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-700" />
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="medical-response prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: processedContent }}
          />

          {/* Estilos CSS globais para a resposta médica */}
          <style jsx global>{`
            .medical-response {
              color: #1e293b !important;
              line-height: 1.6;
              font-size: 14px;
            }
            
            .medical-response h1,
            .medical-response h2,
            .medical-response h3,
            .medical-response h4 {
              font-weight: bold !important;
              color: #1e293b !important;
              margin: 16px 0 8px 0 !important;
              font-size: 1.1rem !important;
            }
            
            .medical-response p {
              margin: 8px 0 !important;
              color: #334155 !important;
            }
            
            .medical-response strong {
              font-weight: bold !important;
              color: #1e293b !important;
            }
            
            .medical-response ul,
            .medical-response ol {
              margin: 8px 0 !important;
              padding-left: 20px !important;
              list-style-type: disc !important;
            }
            
            .medical-response li {
              margin: 4px 0 !important;
              color: #334155 !important;
              list-style-type: disc !important;
              display: list-item !important;
            }
            
            /* ESTILOS ESPECÍFICOS PARA TABELAS */
            .medical-response table {
              width: 100% !important;
              border-collapse: collapse !important;
              margin: 16px 0 !important;
              font-size: 12px !important;
              border: 2px solid #334155 !important;
              background: white !important;
              display: table !important;
            }
            
            .medical-response th,
            .medical-response td {
              border: 2px solid #475569 !important;
              padding: 12px 8px !important;
              text-align: left !important;
              vertical-align: top !important;
              word-wrap: break-word !important;
              line-height: 1.4 !important;
              background-color: white !important;
            }
            
            .medical-response th {
              background-color: #f1f5f9 !important;
              font-weight: bold !important;
              color: #1e293b !important;
              font-size: 13px !important;
            }
            
            .medical-response td {
              color: #1e293b !important;
              font-weight: 500 !important;
            }
            
            /* Responsividade para mobile - SCROLL APENAS NA TABELA */
            @media (max-width: 639px) {
              .medical-response {
                font-size: 13px;
              }
              
              .medical-response table {
                min-width: 500px !important;
                font-size: 11px !important;
                display: block !important;
                overflow-x: auto !important;
                white-space: nowrap !important;
                -webkit-overflow-scrolling: touch !important;
                border: 2px solid #334155 !important;
                border-radius: 8px !important;
              }
              
              .medical-response thead,
              .medical-response tbody,
              .medical-response tr {
                display: table !important;
                width: 100% !important;
                table-layout: fixed !important;
              }
              
              .medical-response th,
              .medical-response td {
                padding: 8px 6px !important;
                font-size: 10px !important;
                min-width: 120px !important;
                border: 1px solid #475569 !important;
                white-space: normal !important;
                word-wrap: break-word !important;
              }
              
              .medical-response th:first-child,
              .medical-response td:first-child {
                min-width: 150px !important;
                position: sticky !important;
                left: 0 !important;
                background-color: #f8fafc !important;
                z-index: 2 !important;
                border-right: 2px solid #334155 !important;
              }
            }
            
            @media (min-width: 640px) {
              .medical-response {
                font-size: 15px;
              }
              
              .medical-response table {
                font-size: 13px !important;
                min-width: auto !important;
                display: table !important;
                overflow-x: visible !important;
              }
              
              .medical-response th,
              .medical-response td {
                padding: 12px 10px !important;
                font-size: 13px !important;
                min-width: auto !important;
                white-space: normal !important;
              }
            }
          `}</style>

          {/* Disclaimer discreto */}
          <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-slate-200">
            <p className="text-xs text-slate-500 leading-relaxed">
              <em>
                Este aplicativo tem apenas a função de facilitar a prática médica, lembre-se que podem existir erros e
                não deve ser utilizado como fonte primária de pesquisa. Considere verificar informações importantes. Uso
                por conta e risco.
              </em>
            </p>
          </div>
        </div>
      </div>
    </Card>
  )
}

export default function DashboardPage() {
  const { user, userData, loading, signOut } = useAuth()
  const router = useRouter()
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [sendingMessage, setSendingMessage] = useState(false)
  const [conversations, setConversations] = useState<Conversation[]>([])
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null)
  const [redirectToLogin, setRedirectToLogin] = useState(false)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [webhookError, setWebhookError] = useState(false)
  const [loadingConversations, setLoadingConversations] = useState(false)

  useEffect(() => {
    if (!loading) {
      if (!user) {
        console.log("No user, redirecting to login...")
        setRedirectToLogin(true)
      } else if (!user.emailVerified) {
        console.log("Email not verified, redirecting to login...")
        setRedirectToLogin(true)
      } else if (!userData?.premium) {
        console.log("No premium access, redirecting to payment...")
        router.push("/tela-pagamento")
      }
    }
  }, [user, userData, loading, router])

  useEffect(() => {
    if (redirectToLogin) {
      router.push("/login")
    }
  }, [redirectToLogin, router])

  useEffect(() => {
    if (userData?.email) {
      loadConversations()
    }
  }, [userData])

  // Fechar sidebar ao clicar fora (mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById("mobile-sidebar")
      const menuButton = document.getElementById("menu-button")

      if (
        sidebarOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        menuButton &&
        !menuButton.contains(event.target as Node)
      ) {
        setSidebarOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [sidebarOpen])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-950 relative overflow-hidden">
        {/* Enhanced Background */}
        <div className="absolute inset-0 bg-gradient-to-tr from-blue-900/30 via-transparent to-emerald-900/20" />
        <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-slate-900/50 to-blue-950/40" />

        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-full">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative z-10 flex items-center justify-center min-h-screen">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-xl rounded-3xl mb-6 animate-pulse">
              <Image src="/prescreve-ai-logo.png" alt="Prescreve AI" width={48} height={48} className="rounded-xl" />
            </div>
            <div className="relative mb-4">
              <Loader2 className="w-10 h-10 animate-spin text-emerald-500 mx-auto" />
            </div>
            <p className="text-white text-lg" style={{ fontFamily: "Inter, sans-serif" }}>
              Carregando dashboard...
            </p>
          </div>
        </div>
      </div>
    )
  }

  if (!user || !user.emailVerified || !userData?.premium) {
    return null
  }

  const loadConversations = async () => {
    if (!userData?.email) return

    try {
      setLoadingConversations(true)
      const userConversations = await getUserConversations(userData.email)
      setConversations(userConversations as Conversation[])
    } catch (error) {
      console.error("❌ Erro ao carregar conversas:", error)
    } finally {
      setLoadingConversations(false)
    }
  }

  const handleDeleteConversation = async (conversationId: string) => {
    try {
      setConversations((prev) => prev.filter((conv) => conv.id !== conversationId))

      if (currentConversationId === conversationId) {
        setMessages([])
        setCurrentConversationId(null)
      }

      await deleteConversation(conversationId)
    } catch (error) {
      console.error("❌ Erro ao deletar conversa:", error)
      loadConversations()
    }
  }

  const sendMessage = async () => {
    if (!input.trim() || !userData || sendingMessage) return

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input.trim(),
      timestamp: new Date().toISOString(),
      isProcessed: true,
    }

    setMessages((prev) => [...prev, userMessage])
    const currentInput = input.trim()
    setInput("")
    setSendingMessage(true)
    setWebhookError(false)

    try {
      const respostaBruta = await fetch("https://hook.us2.make.com/onps9d7xs18k8jvdt5ae9e1zie1cngu2", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          mensagem: currentInput,
        }),
      })

      if (!respostaBruta.ok) {
        throw new Error(`Webhook retornou status ${respostaBruta.status}: ${respostaBruta.statusText}`)
      }

      const texto = await respostaBruta.text()
      let respostaLimpa = ""

      try {
        const json = JSON.parse(texto)
        respostaLimpa = json.resposta || json.response || "Resposta não encontrada no JSON"
      } catch (err) {
        respostaLimpa = texto
      }

      // Limpar apenas aspas externas e estrutura JSON, mantendo HTML interno
      respostaLimpa = respostaLimpa
        .replace(/^\s*\{\s*"resposta"\s*:\s*/i, "")
        .replace(/\s*\}\s*$/i, "")
        .replace(/^"|"$/g, "")
        .trim()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: respostaLimpa,
        timestamp: new Date().toISOString(),
        isProcessed: true,
      }

      setMessages((prev) => [...prev, assistantMessage])

      try {
        await saveConversation(userData.email, currentInput, respostaLimpa)
        await loadConversations()
      } catch (saveError) {
        console.error("❌ Erro específico ao salvar:", saveError)
      }
    } catch (error) {
      console.error("❌ Error sending message:", error)
      setWebhookError(true)

      let errorMessage = "Desculpe, ocorreu um erro ao processar sua pergunta."

      if (error instanceof Error) {
        if (error.message.includes("fetch")) {
          errorMessage = "Erro de conexão. Verifique sua internet e tente novamente."
        } else if (error.message.includes("timeout")) {
          errorMessage = "O servidor demorou para responder. Tente novamente."
        } else if (error.message.includes("status")) {
          errorMessage = "Erro no servidor. Tente novamente em alguns instantes."
        }
      }

      const errorMessageObj: Message = {
        id: (Date.now() + 1).toString(),
        type: "assistant",
        content: errorMessage,
        timestamp: new Date().toISOString(),
        isProcessed: true,
      }

      setMessages((prev) => [...prev, errorMessageObj])
    } finally {
      setSendingMessage(false)
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }

  const newChat = () => {
    setMessages([])
    setCurrentConversationId(null)
    setSidebarOpen(false)
    setWebhookError(false)
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    })
  }

  const loadConversation = (conversation: Conversation) => {
    const conversationMessages: Message[] = [
      {
        id: `${conversation.id}-question`,
        type: "user",
        content: conversation.pergunta,
        timestamp: conversation.data_hora,
        isProcessed: true,
      },
      {
        id: `${conversation.id}-response`,
        type: "assistant",
        content: conversation.resposta,
        timestamp: conversation.data_hora,
        isProcessed: true,
      },
    ]

    setMessages(conversationMessages)
    setCurrentConversationId(conversation.id)
    setSidebarOpen(false)
    setWebhookError(false)
  }

  return (
    <div className="h-screen flex bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/5 via-transparent to-emerald-500/5" />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl" />

      {/* Overlay para mobile */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-all duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        id="mobile-sidebar"
        className={`
          fixed lg:relative inset-y-0 left-0 z-50 w-80 bg-white/95 backdrop-blur-xl text-slate-800 flex flex-col border-r border-slate-200/50 shadow-2xl
          transform transition-transform duration-300 ease-in-out
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
        `}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Image src="/prescreve-ai-logo.png" alt="Prescreve AI" width={40} height={40} className="rounded-xl" />
                <div className="absolute inset-0 bg-blue-500/20 rounded-xl blur-md -z-10 animate-pulse" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-slate-800" style={{ fontFamily: "Poppins, sans-serif" }}>
                  Prescreve AI
                </h1>
                <p className="text-sm text-slate-500">Assistente Médico</p>
              </div>
            </div>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <Button
            onClick={newChat}
            className="w-full bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 rounded-xl"
          >
            <Plus className="w-4 h-4 mr-2" />
            Nova Conversa
          </Button>
        </div>

        {/* Conversations */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-2">
            <h3 className="text-sm font-medium text-slate-600 mb-4 flex items-center">
              <MessageSquare className="w-4 h-4 mr-2" />
              Conversas Recentes
            </h3>

            {loadingConversations ? (
              <div className="text-center py-8">
                <Loader2 className="w-6 h-6 animate-spin text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-500">Carregando conversas...</p>
              </div>
            ) : conversations.length > 0 ? (
              conversations
                .slice(0, 5)
                .map((conv) => (
                  <ConversationItem
                    key={conv.id}
                    conversation={conv}
                    isActive={currentConversationId === conv.id}
                    onClick={() => loadConversation(conv)}
                    onDelete={handleDeleteConversation}
                    formatDate={formatDate}
                  />
                ))
            ) : (
              <div className="text-center text-slate-400 py-8">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">Nenhuma conversa ainda</p>
              </div>
            )}
          </div>
        </div>

        {/* User Profile */}
        <div className="p-6 border-t border-slate-200/50 bg-gradient-to-r from-white/80 to-white/60 backdrop-blur-xl">
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <span className="text-emerald-600 font-semibold text-lg">{userData.name.charAt(0).toUpperCase()}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate text-slate-800">{userData.name}</p>
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 text-xs border-0 shadow-sm">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          </div>

          <Button
            onClick={signOut}
            variant="ghost"
            className="w-full justify-start text-slate-600 hover:text-slate-800 hover:bg-slate-100 transition-all duration-200 rounded-xl"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sair
          </Button>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        {/* Header */}
        <div className="bg-white/80 backdrop-blur-xl border-b border-slate-200/50 p-4 sm:p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <button
                id="menu-button"
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden p-2 rounded-xl hover:bg-slate-100 transition-colors duration-200"
              >
                <Menu className="w-6 h-6 text-slate-600" />
              </button>

              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-600" />
                </div>
                <div>
                  <h2
                    className="text-lg sm:text-2xl font-bold text-slate-800"
                    style={{ fontFamily: "Poppins, sans-serif" }}
                  >
                    Prescreve AI
                  </h2>
                  <p
                    className="text-xs sm:text-sm text-slate-600 leading-tight"
                    style={{ fontFamily: "Inter, sans-serif" }}
                  >
                    Inteligência artificial especializada em medicina
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-yellow-900 border-0 shadow-sm text-xs">
                <Crown className="w-3 h-3 mr-1" />
                Premium
              </Badge>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {messages.length === 0 ? (
            <div className="text-center mt-12 sm:mt-20 animate-in fade-in duration-1000">
              <div className="w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-3xl flex items-center justify-center mx-auto mb-4 sm:mb-6 backdrop-blur-sm animate-pulse">
                <Bot className="w-8 h-8 sm:w-10 sm:h-10 text-emerald-600" />
              </div>
              <h3
                className="text-xl sm:text-2xl font-semibold text-slate-800 mb-2 sm:mb-3"
                style={{ fontFamily: "Poppins, sans-serif" }}
              >
                Olá, Dr(a). {userData.name.split(" ")[0]}! 👋
              </h3>
              <p
                className="text-slate-600 max-w-md mx-auto px-4 leading-relaxed text-sm sm:text-base"
                style={{ fontFamily: "Inter, sans-serif" }}
              >
                Estou aqui para ajudar com prescrições, dosagens, interações medicamentosas e condutas clínicas.
              </p>
              {conversations.length > 0 && (
                <div className="mt-6 sm:mt-8">
                  <p className="text-sm text-slate-500">Você tem {conversations.length} conversa(s) salva(s)</p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-4 sm:space-y-6 max-w-4xl mx-auto">
              {messages.map((message, index) => (
                <div
                  key={message.id}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"} animate-in fade-in slide-in-from-bottom duration-500`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  {message.type === "user" && (
                    <Card
                      className={`max-w-[90%] sm:max-w-[85%] lg:max-w-[80%] p-3 sm:p-4 transition-all duration-200 hover:scale-105 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-xl rounded-2xl`}
                    >
                      <div className="flex items-start space-x-2 sm:space-x-3">
                        <div className="w-6 h-6 sm:w-8 sm:h-8 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0 backdrop-blur-sm">
                          <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm whitespace-pre-wrap leading-relaxed break-words">{message.content}</p>
                          <p className={`text-xs mt-2 text-emerald-100`}>
                            {new Date(message.timestamp).toLocaleTimeString("pt-BR", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>
                        </div>
                      </div>
                    </Card>
                  )}
                  {message.type === "assistant" && (
                    <div className="flex justify-start w-full">
                      <div className="max-w-[95%] sm:max-w-[90%] lg:max-w-[85%] w-full">
                        <HtmlMedicalResponse content={message.content} />
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {sendingMessage && (
                <div className="flex justify-start animate-pulse">
                  <Card className="bg-white/95 backdrop-blur-xl border border-slate-200/50 p-4 shadow-xl rounded-2xl">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-emerald-500/20 to-emerald-600/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                        <Bot className="w-4 h-4 text-emerald-600" />
                      </div>
                      <div className="flex items-center space-x-2">
                        <Loader2 className="w-4 h-4 animate-spin text-emerald-600" />
                        <span className="text-slate-700">Pensando na sua resposta...</span>
                      </div>
                    </div>
                  </Card>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Input */}
        <div className="bg-white/80 backdrop-blur-xl border-t border-slate-200/50 p-4 sm:p-6 shadow-sm">
          <div className="max-w-4xl mx-auto">
            {/* Alerta de erro do webhook */}
            {webhookError && (
              <Alert className="mb-4 border-red-200 bg-red-50/80 backdrop-blur-sm rounded-xl">
                <AlertTriangle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-800 font-medium">
                  Erro de conexão com o servidor. Verifique sua internet e tente novamente.
                </AlertDescription>
              </Alert>
            )}

            <div className="flex space-x-3 sm:space-x-4">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Digite sua pergunta médica..."
                className="flex-1 h-12 sm:h-14 border-slate-200 focus:border-emerald-400 focus:ring-emerald-400/20 focus:ring-4 rounded-2xl bg-white/80 backdrop-blur-sm text-slate-800 placeholder:text-slate-400 transition-all duration-200 shadow-sm text-sm sm:text-base"
                style={{ fontFamily: "Inter, sans-serif" }}
                disabled={sendingMessage}
              />
              <Button
                onClick={sendMessage}
                disabled={sendingMessage || !input.trim()}
                className="h-12 sm:h-14 px-4 sm:px-6 bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-emerald-500/25 rounded-2xl"
              >
                {sendingMessage ? (
                  <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                ) : (
                  <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                )}
              </Button>
            </div>

            <div
              className="mt-2 sm:mt-3 text-xs text-slate-500 text-center"
              style={{ fontFamily: "Inter, sans-serif" }}
            >
              Conectado ao sistema de IA médica • Respostas em tempo real
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
