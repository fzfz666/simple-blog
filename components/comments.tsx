'use client'

import Giscus from '@giscus/react';
import { useTheme } from 'next-themes';

export function Comments() {
  const { theme } = useTheme();
  
  return (
    <div className="mt-10 max-w-none prose dark:prose-invert giscus-wrapper">
      <Giscus
        id="comments"
        repo="Lily-404/blog"
        repoId="R_kgDOOUg36g"
        category="Announcements"
        categoryId="DIC_kwDOOUg36s4CpCnB"
        mapping="pathname"
        strict="0"
        reactionsEnabled="1"
        emitMetadata="0"
        inputPosition="top"
        theme={theme === 'dark' ? 'dark' : 'light'}
        lang="zh-CN"
        loading="lazy"
      />
    </div>
  );
}
