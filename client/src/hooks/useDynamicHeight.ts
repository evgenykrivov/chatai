import { useCallback, useEffect, useRef, useState } from "react"

export const useDynamicHeight = () => {
  const elementRef = useRef<HTMLElement>(null)
  const [height, setHeight] = useState(0)

  const updateHeight = useCallback(() => {
    if (elementRef.current) {
      elementRef.current.style.height = "auto" // Сбрасываем высоту
      setHeight(elementRef.current.scrollHeight) // Сохраняем высоту
      elementRef.current.style.height = `${elementRef.current.scrollHeight}px` // Устанавливаем новую высоту
    }
  }, [])

  useEffect(() => {
    updateHeight()
    window.addEventListener("resize", updateHeight)
    return () => {
      window.removeEventListener("resize", updateHeight)
    }
  }, [updateHeight])

  return { elementRef, height, updateHeight }
}
