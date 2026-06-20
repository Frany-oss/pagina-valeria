import { useState, useCallback, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { galleryImages } from "../data/gallery"

interface Card {
  id: number
  image: string
  flipped: boolean
  matched: boolean
}

function shuffleArray<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function buildCards(count: number): Card[] {
  const pairs = galleryImages.slice(0, count)
  const doubled = [...pairs, ...pairs].map((img, i) => ({
    id: i,
    image: img.src,
    flipped: false,
    matched: false,
  }))
  return shuffleArray(doubled)
}

function fireWin() {
  const defaults = {
    spread: 60,
    ticks: 60,
    gravity: 0.4,
    decay: 0.94,
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA"],
  }
  for (let i = 0; i < 5; i++) {
    setTimeout(() => {
      confetti({ ...defaults, particleCount: 20, origin: { x: 0.1 + i * 0.2, y: 0.6 } })
    }, i * 150)
  }
}

const PAIRS_COUNT = 8

export default function MemoryGame() {
  const [cards, setCards] = useState<Card[]>(() => buildCards(PAIRS_COUNT))
  const [flippedId, setFlippedId] = useState<number | null>(null)
  const [locked, setLocked] = useState(false)
  const [moves, setMoves] = useState(0)
  const [won, setWon] = useState(false)
  const [started, setStarted] = useState(false)

  const matchedCount = cards.filter((c) => c.matched).length

  useEffect(() => {
    if (matchedCount === cards.length && matchedCount > 0) {
      setWon(true)
      fireWin()
    }
  }, [matchedCount, cards.length])

  const handleCardClick = useCallback(
    (id: number) => {
      if (locked || won) return
      const card = cards.find((c) => c.id === id)
      if (!card || card.flipped || card.matched) return

      if (!started) setStarted(true)

      if (flippedId === null) {
        setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)))
        setFlippedId(id)
      } else {
        const firstCard = cards.find((c) => c.id === flippedId)!
        const secondCard = card

        setCards((prev) => prev.map((c) => (c.id === id ? { ...c, flipped: true } : c)))
        setMoves((m) => m + 1)
        setLocked(true)

        if (firstCard.image === secondCard.image) {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.image === firstCard.image ? { ...c, matched: true } : c
              )
            )
            setFlippedId(null)
            setLocked(false)
          }, 500)
        } else {
          setTimeout(() => {
            setCards((prev) =>
              prev.map((c) =>
                c.id === flippedId || c.id === id ? { ...c, flipped: false } : c
              )
            )
            setFlippedId(null)
            setLocked(false)
          }, 1000)
        }
      }
    },
    [cards, flippedId, locked, won, started]
  )

  const reset = useCallback(() => {
    setCards(buildCards(PAIRS_COUNT))
    setFlippedId(null)
    setLocked(false)
    setMoves(0)
    setWon(false)
    setStarted(false)
  }, [])

  return (
    <section id="memory" className="relative py-16 md:py-24 px-4 overflow-hidden section-mint">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Juego de memoria 🧠
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-2 max-w-md mx-auto">
        Encuentra los pares de fotos
      </p>

      <div className="flex justify-center gap-4 mb-6">
        <span className="font-body text-xs text-pizarra/40 bg-white/60 rounded-full px-3 py-1">
          Movimientos: {moves}
        </span>
        <span className="font-body text-xs text-pizarra/40 bg-white/60 rounded-full px-3 py-1">
          {cards.filter((c) => c.matched).length / 2}/{PAIRS_COUNT} pares
        </span>
      </div>

      <div className="max-w-lg mx-auto grid grid-cols-4 gap-2 md:gap-3">
        {cards.map((card) => (
          <motion.button
            key={card.id}
            onClick={() => handleCardClick(card.id)}
            whileTap={{ scale: 0.95 }}
            className="aspect-[3/4] rounded-xl perspective-1000 cursor-pointer focus:outline-none"
            disabled={card.matched || locked || won}
          >
            <div
              className={`relative w-full h-full transition-transform duration-[600ms] ease-in-out preserve-3d ${
                card.flipped || card.matched ? "rotate-y-180" : ""
              }`}
            >
              {/* Back */}
              <div className="absolute inset-0 backface-hidden bg-gradient-to-br from-coral to-coral/70 rounded-xl flex items-center justify-center shadow-md border-2 border-white/20">
                <span className="font-display text-2xl text-white/80">?</span>
              </div>
              {/* Front */}
              <div className="absolute inset-0 backface-hidden rotate-y-180 rounded-xl overflow-hidden shadow-md border-2 border-white/30">
                <img
                  src={card.image}
                  alt="Memory"
                  className="w-full h-full object-cover"
                />
                {card.matched && (
                  <div className="absolute inset-0 bg-mint/30 flex items-center justify-center">
                    <span className="text-2xl">✓</span>
                  </div>
                )}
              </div>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {won && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            className="text-center mt-6"
          >
            <div className="bg-white rounded-2xl shadow-lg p-5 max-w-xs mx-auto border-2 border-mint/30">
              <span className="text-3xl block mb-2">🎉</span>
              <p className="font-display text-lg font-semibold text-pizarra mb-1">
                ¡Completaste el juego!
              </p>
              <p className="font-body text-sm text-pizarra/50 mb-3">
                {moves} movimientos — {PAIRS_COUNT} pares encontrados
              </p>
              <button
                onClick={reset}
                className="font-display bg-coral text-white px-6 py-2 rounded-full hover:bg-coral/90 active:scale-95 transition-all text-sm shadow-sm"
              >
                Jugar de nuevo
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!won && started && (
        <div className="text-center mt-4">
          <button
            onClick={reset}
            className="font-body text-xs text-pizarra/30 hover:text-pizarra/60 transition-colors"
          >
            Reiniciar
          </button>
        </div>
      )}
    </section>
  )
}
