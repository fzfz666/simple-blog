'use client'

import { useState, useEffect } from 'react'
import { ArrowUp } from "lucide-react"  // 添加这行导入
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedNotesAction } from "@/app/actions/notes"
import { NoteCard } from "@/components/note-card"
import { Footer } from "@/components/footer"
import { HeaderNav } from "@/components/header-nav"
import { InfiniteScroll } from "@/components/infinite-scroll"
import type { NotesData } from "@/types/note"

export default function NotesPage() {
  const [currentPage, setCurrentPage] = useState(1)
  const [notesData, setNotesData] = useState<NotesData>({ notes: [], total: 0, totalPages: 0 })
  const [loading, setLoading] = useState(true)
  const [showScrollTop, setShowScrollTop] = useState(false)  // 添加这行

  // 添加返回顶部函数
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  // 添加滚动监听函数
  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const loadNotes = async (page: number) => {
    setLoading(true)
    try {
      const data = await getPaginatedNotesAction(page, 5)
      if (page === 1) {
        setNotesData(data)
      } else {
        setNotesData(prev => ({
          ...data,
          notes: [...prev.notes, ...data.notes]
        }))
      }
    } catch (error) {
      console.error('Failed to load notes:', error)
    } finally {
      setLoading(false)
    }
  }

  const loadMore = async () => {
    if (currentPage < notesData.totalPages) {
      const nextPage = currentPage + 1
      setCurrentPage(nextPage)
      await loadNotes(nextPage)
    }
  }

  useEffect(() => {
    loadNotes(1)
  }, [])

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-3">
          <Link href="/" className="relative group w-10 h-10 block">
            <img
              src="/cat.jpg"
              alt="Jimmy's avatar"
              className="w-10 h-10 rounded-full object-cover transition duration-300 group-hover:blur-sm"
            />

            <div className="absolute inset-0 flex items-center justify-center 
            opacity-0 group-hover:opacity-100 transition duration-300">
              
              <div className="w-6 h-6 rounded-full bg-zinc-800 bg-opacity-40 flex 
              items-center justify-center shadow-md">
                <ArrowLeft className="w-3 h-3 text-white" />
              </div>
            </div>
          </Link>
          
          <div>
            <h1 className="text-base font-medium">Jimmy</h1>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              记录一些想法和感受
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <HeaderNav />
          <ThemeToggle />
        </div>
      </header>

      <main>
        <InfiniteScroll
          loadMore={loadMore}
          hasMore={currentPage < notesData.totalPages}
          loading={loading}
          className="space-y-3"
        >
          {notesData.notes.length > 0 ? (
            notesData.notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))
          ) : (
            <p className="text-center text-zinc-500 dark:text-zinc-400 py-8">
              {loading ? '加载中...' : '还没有随笔内容...'}
            </p>
          )}
        </InfiniteScroll>
      </main>

      <Footer />
      
      {/* 添加返回顶部按钮 */}
      <button
        onClick={scrollToTop}
        className={`fixed bottom-6 right-6 md:bottom-8 md:right-10 
          bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 
          dark:hover:bg-zinc-700 rounded-full p-2 md:p-3 
          shadow-lg transition-all duration-300 z-50
          ${showScrollTop ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'}`}
        aria-label="返回顶部"
      >
        <ArrowUp className="w-5 h-5 md:w-6 md:h-6 text-zinc-600 dark:text-zinc-300" />
      </button>
    </div>
  )
}