import type React from "react"
import type { Metadata } from "next"
import { Noto_Sans_SC } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const notoSansSC = Noto_Sans_SC({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
})

export const metadata: Metadata = {
  title: "Jimmy's Blog",
  description: "关于设计与简约的思考集",
  generator: 'v0.dev',
  icons: {
    icon: '/logo5.png'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh" suppressHydrationWarning>
      <body
        className={`${notoSansSC.className} bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-100 antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'