"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { MoreVertical, Trash2 } from "lucide-react"

interface Conversation {
  id: string
  pergunta: string
  resposta: string
  data_hora: string
}

interface ConversationItemProps {
  conversation: Conversation
  isActive: boolean
  onClick: () => void
  onDelete: (id: string) => void
  formatDate: (timestamp: string) => string
}

export function ConversationItem({ conversation, isActive, onClick, onDelete, formatDate }: ConversationItemProps) {
  const [isDeleting, setIsDeleting] = useState(false)

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation()
    setIsDeleting(true)
    try {
      await onDelete(conversation.id)
    } catch (error) {
      console.error("Erro ao deletar conversa:", error)
      setIsDeleting(false)
    }
  }

  const truncateText = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text
    return text.substring(0, maxLength) + "..."
  }

  return (
    <div
      className={`
        group relative p-3 rounded-xl cursor-pointer transition-all duration-200 hover:scale-[1.02]
        ${
          isActive
            ? "bg-slate-800 text-white shadow-lg border border-slate-700"
            : "bg-slate-100 text-slate-700 hover:bg-slate-200 border border-slate-200"
        }
      `}
      onClick={onClick}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0 pr-2">
          <p className={`text-sm font-medium truncate mb-1 ${isActive ? "text-white" : "text-slate-800"}`}>
            {truncateText(conversation.pergunta, 40)}
          </p>
          <p className={`text-xs ${isActive ? "text-slate-300" : "text-slate-500"}`}>
            {formatDate(conversation.data_hora)}
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="sm"
              className={`
                h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200
                ${isActive ? "hover:bg-slate-700 text-slate-300" : "hover:bg-slate-300 text-slate-600"}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="h-3 w-3" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-32">
            <DropdownMenuItem
              onClick={handleDelete}
              disabled={isDeleting}
              className="text-red-600 hover:text-red-700 hover:bg-red-50 cursor-pointer"
            >
              <Trash2 className="h-3 w-3 mr-2" />
              {isDeleting ? "Deletando..." : "Deletar"}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
