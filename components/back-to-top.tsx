"use client"

import { ArrowUp } from "lucide-react"
import { useEffect, useState } from "react"

export function BackToTop() {
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setShowButton(true)
      } else {
        setShowButton(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  if (!showButton) return null

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-4 right-4 w-10 h-10 flex items-center justify-center rounded-full transition-colors
        bg-zinc-100/50 dark:bg-zinc-800/50
        hover:bg-zinc-200/50 dark:hover:bg-zinc-700/50
        border border-zinc-200/50 dark:border-zinc-700/50
        hover:border-zinc-300/50 dark:hover:border-zinc-600/50
        text-zinc-600 dark:text-zinc-400
        hover:text-zinc-800 dark:hover:text-zinc-200"
      aria-label="返回顶部"
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  )
} 