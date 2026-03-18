import { useLocation } from "react-router-dom"
import { useEffect } from "react"

export const ScrollToTop = () => {
  const { pathname } = useLocation()
  useEffect(() => {
    document.getElementById('root')?.scrollTo(0, 0)
  }, [pathname])
  return null
}