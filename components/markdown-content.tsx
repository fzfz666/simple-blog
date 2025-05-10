"use client"

import { useEffect, useState } from "react"
import katex from 'katex'
import 'katex/dist/katex.min.css'


interface MarkdownContentProps {
  content: string
}

export function MarkdownContent({ content }: MarkdownContentProps) {
  const [copiedCodeBlocks, setCopiedCodeBlocks] = useState<Record<string, boolean>>({})

  const renderMath = (tex: string, displayMode: boolean): string => {
    try {
      return katex.renderToString(tex, {
        displayMode: displayMode,
        throwOnError: false
      })
    } catch (error) {
      console.error('KaTeX error:', error)
      return tex
    }
  }

  const processContent = (content: string): string => {
    // 处理块级公式 $$...$$
    content = content.replace(/\$\$([\s\S]+?)\$\$/g, (_, tex) => {
      return `<div class="katex-block">${renderMath(tex.trim(), true)}</div>`
    })

    // 处理行内公式 $...$
    content = content.replace(/\$([^\$]+?)\$/g, (_, tex) => {
      return `<span class="katex-inline">${renderMath(tex.trim(), false)}</span>`
    })

    return content
  }

  useEffect(() => {
    // 为所有代码块添加复制按钮
    const codeBlocks = document.querySelectorAll('pre')
    
    codeBlocks.forEach((pre, index) => {
      // 创建外层容器
      const wrapper = document.createElement('div')
      wrapper.className = 'relative mb-6 group'
      
      // 创建复制按钮容器
      const buttonContainer = document.createElement('div')
      buttonContainer.className = 'absolute right-3 top-3 flex items-center gap-1 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200'
      
      // 创建复制按钮
      const copyButton = document.createElement('button')
      copyButton.className = 'p-1.5 rounded-md bg-black hover:bg-zinc-800 text-white hover:text-white transition-all duration-200 shadow-sm hover:shadow-md dark:bg-white dark:text-black dark:hover:bg-zinc-100'
      copyButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>'
      
      // 创建成功提示按钮
      const successButton = document.createElement('button')
      successButton.className = 'p-1.5 rounded-md bg-black hover:bg-zinc-800 text-white hover:text-white transition-all duration-200 shadow-sm hover:shadow-md dark:bg-white dark:text-black dark:hover:bg-zinc-100 hidden'
      successButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>'
      
      // 添加点击事件
      copyButton.addEventListener('click', async () => {
        const code = pre.querySelector('code')?.textContent || ''
        try {
          await navigator.clipboard.writeText(code)
          
          // 立即更新UI状态
          copyButton.style.display = 'none'
          successButton.style.display = 'block'
          
          // 2秒后恢复原始状态
          setTimeout(() => {
            copyButton.style.display = 'block'
            successButton.style.display = 'none'
          }, 2000)
        } catch (err) {
          console.error('Failed to copy code:', err)
        }
      })
      
      // 添加元素到容器
      buttonContainer.appendChild(copyButton)
      buttonContainer.appendChild(successButton)
      
      // 将代码块包装在外层容器中
      pre.parentNode?.insertBefore(wrapper, pre)
      wrapper.appendChild(pre)
      wrapper.appendChild(buttonContainer)
    })
    
    // 清理函数
    return () => {
      const wrappers = document.querySelectorAll('div.relative.mb-6.group')
      wrappers.forEach(wrapper => {
        const pre = wrapper.querySelector('pre')
        if (pre) {
          wrapper.parentNode?.insertBefore(pre, wrapper)
        }
        wrapper.remove()
      })
    }
  }, [content])

  return (
    <div 
      className="prose prose-zinc dark:prose-invert prose-sm max-w-none dark:text-zinc-200"
      dangerouslySetInnerHTML={{ __html: processContent(content) }}
    />
  )
}