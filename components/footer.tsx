export function Footer() {
  return (
    <footer className="mt-12 pt-6 border-t border-zinc-100 dark:border-zinc-800">
      <div className="text-center text-zinc-400 dark:text-zinc-500 text-xs py-4">
        <p>© {new Date().getFullYear()} Jimmy</p>
      </div>
    </footer>
  )
}