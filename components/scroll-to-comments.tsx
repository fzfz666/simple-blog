"use client"

import { MessageSquare } from "lucide-react"
import { useEffect, useState } from "react"

export function ScrollToComments() {
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

  const scrollToComments = () => {
    const comments = document.getElementById('comments')
    if (comments) {
      comments.scrollIntoView({ behavior: 'smooth' })
    }
  }

  if (!showButton) return null

  return (
    <button
      onClick={scrollToComments}
      className="fixed bottom-16 right-4 w-10 h-10 
        flex items-center justify-center rounded-full 
        bg-zinc-100/80 dark:bg-zinc-700/80 
        backdrop-blur-md backdrop-saturate-150
        border border-zinc-200/50 dark:border-zinc-600/50
        hover:border-zinc-300/50 dark:hover:border-zinc-500/50
        shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] dark:shadow-[0_1px_3px_0_rgb(0,0,0,0.2)]
        hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.05)] dark:hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.2)]
        text-zinc-600 dark:text-zinc-300
        hover:text-zinc-800 dark:hover:text-zinc-100
        transition-all duration-300 ease-out"
      aria-label="跳转到评论"
    >
      <MessageSquare className="w-5 h-5" />
    </button>
  )
}