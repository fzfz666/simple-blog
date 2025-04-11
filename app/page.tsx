import { Suspense } from "react"
import { HomeContent } from "@/components/home-content"

// 预加载数据
export function generateStaticParams() {
  return [
    { page: "1" },
    { page: "2" },
    { page: "3" }
  ]
}

// 设置重新验证时间
export const revalidate = 60 // 60秒

export default function Home() {
  return (
    <Suspense>
      <HomeContent />
    </Suspense>
  )
}

