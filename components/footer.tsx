export function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="text-center text-zinc-400 dark:text-zinc-500 text-xs py-4">
        <div className="flex justify-center gap-4 items-center">
          <p>© {new Date().getFullYear()} Jimmy</p>
          <a
            href="https://github.com/Lily-404/blog"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            GitHub
          </a>
          <a
            href="/rss.xml"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
          >
            RSS
          </a>
        </div>
      </div>
    </footer>
  )
}