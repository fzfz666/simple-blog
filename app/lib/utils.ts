// 格式化日期为中文格式
export function formatDate(dateString: string): string {
  const date = new Date(dateString)

  // 检查日期是否有效
  if (isNaN(date.getTime())) {
    return "日期无效"
  }

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}年${month}月${day}日`
}

// 其他工具函数...
export function cn(...classes: string[]) {
  return classes.filter(Boolean).join(" ")
}

export async function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

