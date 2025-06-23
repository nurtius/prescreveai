"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MessageSquare, Trash2, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface ConversationItemProps {
  conversation: {
    id: string
    pergunta: string
    data_hora: string
  }
  isActive: boolean
  onClick: () => void
  onDelete: (id: string) => void
  formatDate: (timestamp: string) => string
}

export function ConversationItem({ conversation, isActive, onClick, onDelete, formatDate }: ConversationItemProps) {
  const [isSwipeActive, setIsSwipeActive] = useState(false)
  const [swipeDistance, setSwipeDistance] = useState(0)
  const [startX, setStartX] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const itemRef = useRef<HTMLDivElement>(null)

  const maxSwipeDistance = 80
  const deleteThreshold = 60

  // Reset swipe when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (itemRef.current && !itemRef.current.contains(event.target as Node)) {
        resetSwipe()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const resetSwipe = () => {
    setSwipeDistance(0)
    setIsSwipeActive(false)
    setIsDragging(false)
  }

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartX(e.touches[0].clientX)
    setIsDragging(true)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return

    const currentX = e.touches[0].clientX
    const diff = startX - currentX

    if (diff > 0) {
      // Swiping left
      const distance = Math.min(diff, maxSwipeDistance)
      setSwipeDistance(distance)
      setIsSwipeActive(distance > 10)
    }
  }

  const handleTouchEnd = () => {
    setIsDragging(false)

    if (swipeDistance >= deleteThreshold) {
      // Auto delete if swiped far enough
      handleDelete()
    } else if (swipeDistance < 20) {
      // Reset if not swiped enough
      resetSwipe()
    }
    // Keep partially swiped state if between 20 and deleteThreshold
  }

  const handleDelete = () => {
    onDelete(conversation.id)
    resetSwipe()
  }

  const handleItemClick = () => {
    if (isSwipeActive) {
      resetSwipe()
    } else {
      onClick()
    }
  }

  return (
    <div
      ref={itemRef}
      className="relative overflow-hidden rounded-lg bg-slate-800 hover:bg-slate-700 transition-colors duration-200"
    >
      {/* Main content */}
      <div
        className={`
          relative z-10 transition-transform duration-200 ease-out cursor-pointer
          ${isDragging ? "transition-none" : ""}
        `}
        style={{
          transform: `translateX(-${swipeDistance}px)`,
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onClick={handleItemClick}
      >
        <div
          className={`
            p-3 transition-all duration-200 transform
            ${isActive ? "bg-emerald-50 border-emerald-200 scale-105" : "hover:scale-105"}
            ${isSwipeActive ? "bg-red-50" : ""}
          `}
        >
          {/* Corrigir a estrutura do menu dropdown */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <MessageSquare className="w-4 h-4 text-emerald-500 flex-shrink-0" />
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm truncate text-white">
                  {conversation.pergunta.substring(0, 40)}...
                </div>
                <div className="text-xs text-slate-400">{formatDate(conversation.data_hora)}</div>
              </div>
            </div>

            {/* Menu sempre visível */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 text-slate-400 hover:text-white hover:bg-slate-600 opacity-100"
                  onClick={(e) => e.stopPropagation()}
                >
                  <MoreVertical className="w-4 h-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuItem
                  onClick={(e) => {
                    e.stopPropagation()
                    onDelete(conversation.id)
                  }}
                  className="text-red-600 focus:text-red-600 focus:bg-red-50"
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  Excluir
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Delete background (iOS style) */}
      <div
        className={`
          absolute inset-y-0 right-0 flex items-center justify-center
          bg-red-500 transition-all duration-200 ease-out lg:hidden
          ${isSwipeActive ? "opacity-100" : "opacity-0"}
        `}
        style={{
          width: `${Math.min(swipeDistance, maxSwipeDistance)}px`,
        }}
      >
        <div
          className={`
            flex items-center justify-center transition-all duration-200
            ${swipeDistance >= deleteThreshold ? "scale-110" : "scale-100"}
          `}
        >
          <Trash2
            className={`
              w-5 h-5 text-white transition-all duration-200
              ${swipeDistance >= deleteThreshold ? "animate-pulse" : ""}
            `}
          />
        </div>
      </div>

      {/* Delete button (appears when swiped) */}
      {isSwipeActive && swipeDistance >= 20 && (
        <div className="absolute inset-y-0 right-0 flex items-center pr-4 lg:hidden">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              handleDelete()
            }}
            size="sm"
            className="bg-red-500 hover:bg-red-600 text-white h-8 px-3 rounded-full shadow-lg"
          >
            <Trash2 className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
