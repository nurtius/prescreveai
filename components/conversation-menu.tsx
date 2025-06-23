"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { MoreVertical, Trash2, Loader2 } from "lucide-react"
import { createPortal } from "react-dom"

interface ConversationMenuProps {
  conversationId: string
  onDelete: (id: string) => void
  isDeleting: boolean
}

export function ConversationMenu({ conversationId, onDelete, isDeleting }: ConversationMenuProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 })
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
      return () => document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation()

    if (!isOpen && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect()
      setMenuPosition({
        top: rect.bottom + 4,
        left: rect.right - 140, // 140px é a largura do menu
      })
    }

    setIsOpen(!isOpen)
  }

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation()
    onDelete(conversationId)
    setIsOpen(false)
  }

  return (
    <>
      <button
        ref={buttonRef}
        onClick={handleToggle}
        className="p-2 rounded-full hover:bg-slate-600 transition-colors opacity-0 group-hover:opacity-100 lg:opacity-100 z-10 relative"
      >
        <MoreVertical className="w-4 h-4 text-slate-400" />
      </button>

      {isOpen &&
        createPortal(
          <>
            {/* Overlay para fechar o menu */}
            <div className="fixed inset-0 z-[100]" onClick={() => setIsOpen(false)} />

            {/* Menu */}
            <div
              className="fixed z-[101] bg-white rounded-lg shadow-2xl border border-slate-200 py-2 min-w-[140px] overflow-hidden animate-dropdown-appear"
              style={{
                top: `${menuPosition.top}px`,
                left: `${menuPosition.left}px`,
                boxShadow:
                  "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04), 0 0 0 1px rgba(0, 0, 0, 0.05)",
              }}
            >
              <button
                onClick={handleDelete}
                className="w-full px-4 py-3 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-3 transition-colors duration-200"
                disabled={isDeleting}
              >
                {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
                <span className="font-medium">Excluir</span>
              </button>
            </div>
          </>,
          document.body,
        )}
    </>
  )
}
