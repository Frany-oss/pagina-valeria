import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Bubble {
  id: number
  emoji: string
  x: number
  size: number
  delay: number
  drift: number
}

const EMOJIS = ["💖", "🍝", "🏖️", "📚", "✈️", "🎬", "✨", "⭐", "🌊", "🎵", "🍷", "🌍"]

export default function FloatingEmojis() {
  const idRef = useRef(0)
  const bubblesRef = useRef<Bubble[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const spawn = useCallback(() => {
    const bubble: Bubble = {
      id: idRef.current++,
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth : 400),
      size: 14 + Math.random() * 18,
      delay: Math.random() * 0.5,
      drift: (Math.random() - 0.5) * 80,
    }
    bubblesRef.current.push(bubble)
    setTimeout(() => {
      bubblesRef.current = bubblesRef.current.filter((b) => b.id !== bubble.id)
    }, 7000)
  }, [])

  useEffect(() => {
    const interval = setInterval(spawn, 800)
    for (let i = 0; i < 3; i++) setTimeout(spawn, i * 300)
    return () => clearInterval(interval)
  }, [spawn])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-20 overflow-hidden">
      <AnimatePresence>
        {bubblesRef.current.map((b) => (
          <motion.span
            key={b.id}
            initial={{ opacity: 0, y: "100vh", x: b.x }}
            animate={{
              opacity: [0, 0.8, 0.6, 0.3, 0],
              y: ["100vh", "80vh", "50vh", "20vh", "-10vh"],
              x: [b.x, b.x + b.drift * 0.3, b.x + b.drift * 0.6, b.x + b.drift, b.x + b.drift * 0.8],
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 6 + Math.random() * 2, delay: b.delay, ease: "easeOut" }}
            className="absolute bottom-0 text-center select-none"
            style={{ fontSize: b.size, left: b.x }}
          >
            {b.emoji}
          </motion.span>
        ))}
      </AnimatePresence>
    </div>
  )
}
