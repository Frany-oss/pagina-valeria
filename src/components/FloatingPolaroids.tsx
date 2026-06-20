import { useEffect, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { galleryImages } from "../data/gallery"

interface Polaroid {
  id: number
  x: number
  rotate: number
  image: string
  alt: string
}

export default function FloatingPolaroids() {
  const idRef = useRef(0)
  const polaroidsRef = useRef<Polaroid[]>([])
  const containerRef = useRef<HTMLDivElement>(null)

  const spawn = useCallback(() => {
    const polaroid: Polaroid = {
      id: idRef.current++,
      x: Math.random() * (typeof window !== "undefined" ? window.innerWidth - 160 : 400),
      rotate: (Math.random() - 0.5) * 12,
      image: galleryImages[Math.floor(Math.random() * galleryImages.length)].src,
      alt: "Recuerdo flotante",
    }
    polaroidsRef.current.push(polaroid)
    setTimeout(() => {
      polaroidsRef.current = polaroidsRef.current.filter((p) => p.id !== polaroid.id)
    }, 6000)
  }, [])

  useEffect(() => {
    const interval = setInterval(spawn, 5000)
    // Spawn one immediately
    setTimeout(spawn, 1000)
    return () => clearInterval(interval)
  }, [spawn])

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-30 overflow-hidden">
      <AnimatePresence>
        {polaroidsRef.current.map((p) => (
          <motion.div
            key={p.id}
            initial={{ opacity: 0, y: -60, x: p.x, rotate: p.rotate, scale: 0.7 }}
            animate={{
              opacity: [0, 1, 1, 1, 1, 0],
              y: [0, 20, 60, 120, 200, 280],
              scale: [0.7, 1, 1, 1, 0.9, 0.6],
              rotate: [p.rotate, p.rotate + 2, p.rotate - 1, p.rotate + 3, p.rotate - 2, p.rotate + 5],
            }}
            exit={{ opacity: 0, scale: 0.5, y: 300 }}
            transition={{ duration: 6, ease: "easeInOut" }}
            className="absolute top-0"
            style={{ left: p.x }}
          >
            <div className="bg-white rounded-lg p-2 shadow-xl rotate-1">
              <img
                src={p.image}
                alt={p.alt}
                className="w-28 h-36 md:w-36 md:h-44 object-cover rounded"
              />
              <div className="h-6 flex items-center justify-center">
                <span className="font-body text-[8px] text-pizarra/30">❤️</span>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  )
}
