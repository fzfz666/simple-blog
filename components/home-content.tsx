"use client"

import { useState, useEffect } from "react"
import type { PostsData } from "@/types/post"
import Link from "next/link"
import { ThemeToggle } from "@/components/theme-toggle"
import { getPaginatedPostsAction, getAllTagsAction } from "@/app/actions/posts"
import { Button } from "@/components/ui/button"
import { formatDate, delay } from "@/app/lib/utils"
import { Skeleton } from "@/components/ui/skeleton"
import { List } from "lucide-react"
import { Footer } from "@/components/footer"
import { PaginationButtons } from "@/components/pagination-buttons"
import { HeaderNav } from "@/components/header-nav"
import { Tags } from "@/components/tag"
import { Tag } from "@/components/tag"
import { Header } from "@/components/header"

export function HomeContent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [postsData, setPostsData] = useState<PostsData>({ posts: [], total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [allTags, setAllTags] = useState<Array<{ tag: string; count: number }>>([]);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const layout = 'list';

  // 只在组件挂载时获取标签列表
  useEffect(() => {
    const fetchTags = async () => {
      try {
        const tags = await getAllTagsAction();
        setAllTags(tags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    };
    fetchTags();
  }, []);

  // 获取文章列表
  useEffect(() => {
    const fetchData = async () => {
      if (isTransitioning) return;
      
      setLoading(true);
      const startTime = Date.now();
      
      try {
        const posts = await getPaginatedPostsAction(currentPage, 10, selectedTag);
        
        // 计算已经过去的时间
        const elapsedTime = Date.now() - startTime;
        // 如果加载时间少于100ms，则等待剩余时间
        if (elapsedTime < 100) {
          await delay(100 - elapsedTime);
        }
        
        setPostsData(posts as PostsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [currentPage, selectedTag, isTransitioning]);

  // 处理标签点击
  const handleTagClick = async (tag: string | null) => {
    setIsTransitioning(true);
    setSelectedTag(tag);
    setCurrentPage(1); // 重置页码
    
    // 添加平滑过渡效果
    await new Promise(resolve => setTimeout(resolve, 300));
    setIsTransitioning(false);
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <Header isHome={true} />

      <main>
        {/* 标签云区域 */}
        {allTags.length > 0 && (
          <div className="mb-8">
            <div className="flex flex-wrap gap-2">
              <Tag
                tag="全部"
                onClick={() => handleTagClick(null)}
                interactive={true}
                className={selectedTag === null ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' : ''}
              />
              {allTags.map(({ tag }) => (
                <Tag
                  key={tag}
                  tag={tag}
                  onClick={() => handleTagClick(tag)}
                  interactive={true}
                  className={selectedTag === tag ? 'bg-zinc-200 dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200' : ''}
                />
              ))}
            </div>
          </div>
        )}

        {/* 文章列表 */}
        <div className={`space-y-6 transition-opacity duration-300 ${isTransitioning ? 'opacity-50' : 'opacity-100'}`}>
          {loading ? (
            <>
              {/* 文章列表骨架 */}
              {Array.from({ length: 10 }).map((_, index) => (
                <article key={index} className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0">
                  <div className="space-y-2">
                    <Skeleton className="h-5 w-2/3" />
                    <Skeleton className="h-3 w-1/4" />
                  </div>
                </article>
              ))}
            </>
          ) : (
            <>
              {postsData.posts.length > 0 ? (
                postsData.posts.map((post) => (
                  <article
                    key={post.id}
                    className="border-b border-zinc-100 dark:border-zinc-800 pb-6 last:border-0 last:pb-0"
                  >
                    <Link href={`/posts/${post.id}`} className="group block">
                      <h2 className="text-base font-normal group-hover:text-zinc-700 dark:group-hover:text-zinc-300 transition-colors duration-200 relative inline-block">
                        {post.title}
                        <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-zinc-700 dark:bg-zinc-300 group-hover:w-full transition-all duration-500"></span>
                      </h2>
                      <time className="text-xs text-zinc-400 dark:text-zinc-500 mt-1 block">
                        {formatDate(post.date)}
                      </time>
                    </Link>
                  </article>
                ))
              ) : (
                <p className="text-zinc-500 dark:text-zinc-400 text-sm">
                  暂无文章。
                </p>
              )}
            </>
          )}
        </div>

        {/* 分页控制 */}
        {!loading && postsData.totalPages > 1 && (
          <div className="mt-8">
            <PaginationButtons 
              currentPage={currentPage} 
              totalPages={postsData.totalPages} 
              onPageChange={setCurrentPage} 
              className="animate-in fade-in duration-300"
            />
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
} 