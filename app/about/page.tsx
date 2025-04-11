import { Suspense } from "react"
import { AboutContent } from "@/components/about-content"

// 设置为完全静态生成
export const dynamic = 'force-static'
export const revalidate = false // 禁用重新验证，因为内容是静态的

export default function AboutPage() {
  return (
    <Suspense>
      <AboutContent />
    </Suspense>
  )
}

