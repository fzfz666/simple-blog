import Link from "next/link"
import { ArrowLeft, Github, Twitter, Mail } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Footer } from "@/components/footer"

export default function About() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <header className="flex justify-between items-center mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-300 transition-colors duration-200"
        >
          <ArrowLeft className="mr-1 h-3 w-3" />
          返回
        </Link>
        <ThemeToggle />
      </header>

      <main>
        <div className="mb-8">
          <h1 className="text-2xl font-semibold mb-2">关于我</h1>
          <p className="text-zinc-600 dark:text-zinc-400">O Captain! My Captain!</p>
        </div>

        <div className="prose prose-zinc dark:prose-invert prose-sm max-w-none text-zinc-800 dark:text-zinc-200">
          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">个人简介</h2>
            <p>你好，我是 Jimmy，一名热爱技术和分享的开发者。</p>
            <p>喜欢探索新技术，关注开发体验和工程化，同时也热衷于写作和分享。</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">关于本站</h2>
            <p>这个博客使用 Next.js构建，主要记录我在技术学习和工作中的心得体会。</p>
            <p>同时也会分享一些关于生活、阅读的想法。</p>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-medium mb-4">联系方式</h2>
            <div className="flex space-x-4">
              <a
                href="https://github.com/Lily-404"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200"
              >
                <Github className="h-5 w-5 mr-2" />
                GitHub
              </a>
        
    
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

