"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/lib/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Plus, LogOut, Crown, User } from "lucide-react"
import { collection, query, where, orderBy, limit, getDocs } from "firebase/firestore"
import { db } from "@/lib/firebase"

interface Conversation {
  id: string
  title: string
  timestamp: string
}

interface ChatSidebarProps {
  onNewChat: () => void
  onSelectConversation: (id: string) => void
  currentConversationId?: string
}

export function ChatSidebar({ onNewChat, onSelectConversation, currentConversationId }: ChatSidebarProps) {
  const { userData, signOut } = useAuth()
  const [conversations, setConversations] = useState<Conversation[]>([])

  useEffect(() => {
    if (userData) {
      loadConversations()
    }
  }, [userData])

  const loadConversations = async () => {
    if (!userData) return

    try {
      const q = query(
        collection(db, "Consultations"),
        where("userId", "==", userData.uid),
        orderBy("timestamp", "desc"),
        limit(10),
      )

      const querySnapshot = await getDocs(q)
      const convs: Conversation[] = []

      querySnapshot.forEach((doc) => {
        const data = doc.data()
        convs.push({
          id: doc.id,
          title: data.question?.substring(0, 50) + "..." || "Nova conversa",
          timestamp: data.timestamp,
        })
      })

      setConversations(convs)
    } catch (error) {
      console.error("Error loading conversations:", error)
    }
  }

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diffTime = Math.abs(now.getTime() - date.getTime())
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays === 1) return "Hoje"
    if (diffDays === 2) return "Ontem"
    if (diffDays <= 7) return `${diffDays} dias atrás`
    return date.toLocaleDateString("pt-BR")
  }

  if (!userData) return null

  return (
    <div className="w-64 bg-[#0B132B] text-white flex flex-col h-full">
      {/* Header */}
      <div className="p-4 border-b border-gray-700">
        <Button onClick={onNewChat} className="w-full bg-[#00C49A] hover:bg-[#00A085] text-white">
          <Plus className="w-4 h-4 mr-2" />
          Nova Conversa
        </Button>
      </div>

      {/* Conversations */}
      <ScrollArea className="flex-1 p-4">
        <div className="space-y-2">
          {conversations.map((conv) => (
            <Button
              key={conv.id}
              variant={currentConversationId === conv.id ? "secondary" : "ghost"}
              className="w-full justify-start text-left h-auto p-3 text-white hover:bg-gray-700"
              onClick={() => onSelectConversation(conv.id)}
            >
              <div className="truncate">
                <div className="font-medium text-sm truncate">{conv.title}</div>
                <div className="text-xs text-gray-400">{formatDate(conv.timestamp)}</div>
              </div>
            </Button>
          ))}
        </div>
      </ScrollArea>

      <Separator className="bg-gray-700" />

      {/* User Profile */}
      <div className="p-4 space-y-3">
        <div className="flex items-center space-x-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-[#00C49A] text-white">{userData.name.charAt(0).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userData.name}</p>
            <div className="flex items-center space-x-2">
              {userData.premium ? (
                <Badge className="bg-[#E2B93B] text-black text-xs">
                  <Crown className="w-3 h-3 mr-1" />
                  Premium
                </Badge>
              ) : (
                <Badge variant="secondary" className="text-xs">
                  <User className="w-3 h-3 mr-1" />
                  Gratuito
                </Badge>
              )}
            </div>
          </div>
        </div>

        {!userData.premium && <div className="text-xs text-gray-400">{userData.dailyCount}/2 perguntas hoje</div>}

        <Button
          onClick={signOut}
          variant="ghost"
          className="w-full justify-start text-gray-300 hover:text-white hover:bg-gray-700"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Sair
        </Button>
      </div>
    </div>
  )
}
