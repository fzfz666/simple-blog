"use client"

import { useState, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function BackToTop() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShow(window.scrollY > 300)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  if (!show) return null

  return (
    <Button
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-6 right-10 z-50",
        "h-10 w-10 p-0 rounded-full",
        "bg-zinc-900 text-white hover:bg-zinc-800",
        "dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-200",
        "shadow-lg transition-all duration-300",
        "flex items-center justify-center"
      )}
    >
      <ArrowUp className="h-4 w-4" />
    </Button>
  )
} 