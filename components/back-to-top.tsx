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
      className="fixed bottom-4 right-4 w-10 h-10 
        flex items-center justify-center rounded-full 
        bg-white/70 dark:bg-zinc-800/70 
        backdrop-blur-md backdrop-saturate-150
        border border-zinc-200/50 dark:border-zinc-700/50
        hover:border-zinc-300/50 dark:hover:border-zinc-600/50
        shadow-[0_1px_3px_0_rgb(0,0,0,0.05)] dark:shadow-[0_1px_3px_0_rgb(0,0,0,0.2)]
        hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.05)] dark:hover:shadow-[0_5px_15px_0_rgb(0,0,0,0.2)]
        text-zinc-600 dark:text-zinc-400
        hover:text-zinc-800 dark:hover:text-zinc-200
        transition-all duration-300 ease-out"
      aria-label="返回顶部"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  )
} 