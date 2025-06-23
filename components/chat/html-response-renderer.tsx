"use client"

import { useEffect, useState } from "react"
import DOMPurify from "dompurify"

interface HtmlResponseRendererProps {
  htmlContent: string
  className?: string
}

export function HtmlResponseRenderer({ htmlContent, className = "" }: HtmlResponseRendererProps) {
  const [sanitizedHtml, setSanitizedHtml] = useState("")
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && htmlContent) {
      // Configuração do DOMPurify para permitir tags médicas comuns
      const cleanHtml = DOMPurify.sanitize(htmlContent, {
        ALLOWED_TAGS: [
          "h1",
          "h2",
          "h3",
          "h4",
          "h5",
          "h6",
          "p",
          "br",
          "hr",
          "ul",
          "ol",
          "li",
          "table",
          "thead",
          "tbody",
          "tr",
          "th",
          "td",
          "strong",
          "b",
          "em",
          "i",
          "u",
          "div",
          "span",
          "blockquote",
          "code",
          "pre",
        ],
        ALLOWED_ATTR: ["class", "id", "style"],
        ALLOW_DATA_ATTR: false,
      })

      setSanitizedHtml(cleanHtml)
    }
  }, [htmlContent, isClient])

  if (!isClient) {
    return (
      <div className="animate-pulse">
        <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-200 rounded w-5/6"></div>
      </div>
    )
  }

  return (
    <div
      className={`
        prose prose-slate max-w-none
        prose-headings:text-slate-800 prose-headings:font-semibold
        prose-h2:text-lg prose-h2:mt-6 prose-h2:mb-3
        prose-h3:text-base prose-h3:mt-4 prose-h3:mb-2
        prose-p:text-slate-700 prose-p:leading-relaxed prose-p:mb-3
        prose-ul:my-3 prose-li:my-1 prose-li:text-slate-700
        prose-ol:my-3 prose-ol:text-slate-700
        prose-table:my-4 prose-table:border-collapse
        prose-th:border prose-th:border-slate-300 prose-th:bg-slate-50 prose-th:p-2 prose-th:text-left
        prose-td:border prose-td:border-slate-300 prose-td:p-2
        prose-strong:text-slate-800 prose-strong:font-semibold
        prose-em:text-slate-600 prose-em:italic
        prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:pl-4 prose-blockquote:italic
        prose-code:bg-slate-100 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
        ${className}
      `}
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  )
}
