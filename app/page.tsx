import { HomeContent } from "@/components/home-content"

// 预加载数据
export function generateStaticParams() {
  return [
    { page: "1" },
    { page: "2" },
    { page: "3" }
  ]
}

// 设置为完全静态生成
export const dynamic = 'force-static'
export const revalidate = false // 禁用重新验证，因为数据只在部署时更新

export default function Home() {
  return <HomeContent />
}

