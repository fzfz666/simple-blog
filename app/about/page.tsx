import { Suspense } from "react"
import { AboutContent } from "@/components/about-content"

export const revalidate = 60

export default function AboutPage() {
  return (
    <Suspense>
      <AboutContent />
    </Suspense>
  )
}

