import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Sticker {
  id: number
  emoji: string
  x: number
  y: number
  rotate: number
}

const STICKER_PACK = ["💖", "⭐", "🌸", "✨", "🎵", "🍝", "🏖️", "📚", "✈️", "🎬", "💛", "🌈", "🌺", "🦋", "🍕", "🌊", "☕", "🎀"]

const STORAGE_KEY = "draggable-stickers"

function loadStickers(): Sticker[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) return JSON.parse(saved)
  } catch {}
  return []
}

export default function DraggableStickers() {
  const [stickers, setStickers] = useState<Sticker[]>(loadStickers)
  const [packOpen, setPackOpen] = useState(false)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stickers))
  }, [stickers])

  const addSticker = useCallback(
    (emoji: string) => {
      const sticker: Sticker = {
        id: Date.now() + Math.random(),
        emoji,
        x: 100 + Math.random() * (typeof window !== "undefined" ? window.innerWidth - 200 : 400),
        y: 100 + Math.random() * 300,
        rotate: (Math.random() - 0.5) * 20,
      }
      setStickers((prev) => [...prev, sticker])
    },
    []
  )

  const removeSticker = useCallback((id: number) => {
    setStickers((prev) => prev.filter((s) => s.id !== id))
  }, [])

  const clearAll = useCallback(() => {
    setStickers([])
  }, [])

  return (
    <>
      {/* Sticker pack toggle button */}
      <motion.button
        onClick={() => setPackOpen(!packOpen)}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 left-6 z-40 w-12 h-12 bg-white rounded-2xl shadow-lg flex items-center justify-center text-xl hover:shadow-xl transition-shadow border border-cafe/10"
      >
        {packOpen ? "✕" : "🎨"}
      </motion.button>

      {/* Sticker pack panel */}
      <AnimatePresence>
        {packOpen && (
          <motion.div
            initial={{ opacity: 0, x: -60, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -60, scale: 0.9 }}
            className="fixed bottom-20 left-6 z-40 bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-4 border border-cafe/10 max-w-[200px]"
          >
            <div className="flex items-center justify-between mb-2">
              <p className="font-display text-xs font-semibold text-pizarra">
                Stickers
              </p>
              {stickers.length > 0 && (
                <button
                  onClick={clearAll}
                  className="font-body text-[9px] text-pizarra/30 hover:text-coral transition-colors"
                >
                  Limpiar
                </button>
              )}
            </div>
            <div className="grid grid-cols-5 gap-1.5">
              {STICKER_PACK.map((emoji) => (
                <motion.button
                  key={emoji}
                  onClick={() => addSticker(emoji)}
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.85 }}
                  className="w-8 h-8 flex items-center justify-center text-lg rounded-lg hover:bg-coral/5 transition-colors"
                >
                  {emoji}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Placed stickers */}
      {stickers.map((sticker) => (
        <motion.div
          key={sticker.id}
          drag
          dragMomentum={false}
          onDoubleClick={() => removeSticker(sticker.id)}
          initial={{ opacity: 0, scale: 0.5, x: sticker.x, y: sticker.y }}
          animate={{ opacity: 1, scale: 1, x: sticker.x, y: sticker.y }}
          exit={{ opacity: 0, scale: 0.5 }}
          whileHover={{ scale: 1.15, rotate: 0 }}
          whileDrag={{ scale: 1.2, cursor: "grabbing" }}
          className="fixed z-30 cursor-grab active:cursor-grabbing select-none text-2xl md:text-3xl hover:drop-shadow-lg transition-shadow"
          style={{ rotate: sticker.rotate }}
          title="Doble click para eliminar"
        >
          {sticker.emoji}
        </motion.div>
      ))}
    </>
  )
}
