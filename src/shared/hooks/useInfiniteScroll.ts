import { useEffect, useRef, useCallback } from 'react'

interface UseInfiniteScrollOptions {
  hasNextPage: boolean | undefined
  isFetchingNextPage: boolean
  fetchNextPage: () => void
  threshold?: number
}

export default function useInfiniteScroll({
  hasNextPage,
  isFetchingNextPage,
  fetchNextPage,
  threshold = 0.1,
}: UseInfiniteScrollOptions) {
  const observerRef = useRef<HTMLDivElement>(null)

  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const [entry] = entries
      if (entry.isIntersecting && hasNextPage && !isFetchingNextPage) {
        fetchNextPage()
      }
    },
    [hasNextPage, isFetchingNextPage, fetchNextPage]
  )

  useEffect(() => {
    const element = observerRef.current
    if (!element) return

    const observer = new IntersectionObserver(handleObserver, { threshold })
    observer.observe(element)

    return () => observer.disconnect()
  }, [handleObserver, threshold])

  return observerRef
}
