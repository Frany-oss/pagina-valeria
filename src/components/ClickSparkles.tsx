import { useEffect, useRef, useCallback } from "react"

const COLORS = ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA", "#D4A574"]

export default function ClickSparkles() {
  const containerRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(0)

  const createSparkles = useCallback((x: number, y: number) => {
    const container = containerRef.current
    if (!container) return

    const count = 8
    const fragment = document.createDocumentFragment()

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div")
      const angle = (360 / count) * i + Math.random() * 20
      const dist = 30 + Math.random() * 40
      const size = 4 + Math.random() * 6
      const color = COLORS[Math.floor(Math.random() * COLORS.length)]
      idRef.current++

      el.style.cssText = `
        position: fixed;
        left: ${x}px;
        top: ${y}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        transition: all ${0.4 + Math.random() * 0.3}s cubic-bezier(0.25, 0.46, 0.45, 0.94);
        opacity: 1;
      `

      fragment.appendChild(el)

      requestAnimationFrame(() => {
        el.style.transform = `translate(${Math.cos(angle * Math.PI / 180) * dist}px, ${Math.sin(angle * Math.PI / 180) * dist}px) scale(0.2)`
        el.style.opacity = "0"
      })

      setTimeout(() => el.remove(), 800)
    }

    container.appendChild(fragment)
  }, [])

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      createSparkles(e.clientX, e.clientY)
    }
    window.addEventListener("click", handler)
    return () => window.removeEventListener("click", handler)
  }, [createSparkles])

  return <div ref={containerRef} className="fixed inset-0 pointer-events-none z-[9999]" />
}
