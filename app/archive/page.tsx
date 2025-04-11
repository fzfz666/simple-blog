import { Suspense } from "react"
import { ArchiveContent } from "@/components/archive-content"
import { getPostsByYearAction, getAllTagsAction } from "@/app/actions/posts"

// 设置为完全静态生成
export const dynamic = 'force-static'
export const revalidate = false

// 预加载数据
async function getInitialData() {
  try {
    const [postsByYear, tags] = await Promise.all([
      getPostsByYearAction(null),
      getAllTagsAction()
    ])
    return { postsByYear, tags }
  } catch (error) {
    console.error('Error fetching initial data:', error)
    return { postsByYear: {}, tags: [] }
  }
}

export default async function Archive() {
  const initialData = await getInitialData()
  return (
    <Suspense>
      <ArchiveContent initialData={initialData} />
    </Suspense>
  )
}

