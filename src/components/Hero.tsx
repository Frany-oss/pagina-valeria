import { useState, useCallback, useMemo, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { START_DATE } from "../data/relationship"

const EASTER_EGG_THRESHOLD = 5

function heartBurst() {
  const defaults = {
    spread: 60,
    ticks: 60,
    gravity: 0.4,
    decay: 0.94,
    startVelocity: 25,
    colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA"],
  }
  confetti({ ...defaults, particleCount: 15, origin: { x: 0.5, y: 0.5 } })
  confetti({ ...defaults, particleCount: 15, origin: { x: 0.4, y: 0.5 }, angle: 240 })
  confetti({ ...defaults, particleCount: 15, origin: { x: 0.6, y: 0.5 }, angle: 300 })
}

export default function Hero() {
  const years = useMemo(() => {
    const now = new Date()
    const [sY, sM, sD] = START_DATE.split("T")[0].split("-").map(Number)
    let y = now.getFullYear() - sY
    const m = now.getMonth() - (sM - 1)
    const d = now.getDate() - sD
    if (m < 0 || (m === 0 && d < 0)) y--
    return y
  }, [])

  useEffect(() => {
    document.title = `${years} años de nosotros 💖`
  }, [years])

  const [heartClicks, setHeartClicks] = useState(0)
  const [easterEggRevealed, setEasterEggRevealed] = useState(false)

  const handleHeartClick = useCallback(() => {
    const next = heartClicks + 1
    setHeartClicks(next)
    heartBurst()

    if (next >= EASTER_EGG_THRESHOLD) {
      setEasterEggRevealed(true)
      setHeartClicks(0)
    }
  }, [heartClicks])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-4 py-16 bg-gradient-to-b from-warm-white via-coral/[0.03] to-warm-white">
      {/* Background blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-coral/[0.07] rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-mint/[0.07] rounded-full blur-[80px]" />
        <div className="absolute top-1/3 right-1/4 w-48 h-48 bg-lilac/[0.07] rounded-full blur-[80px]" />
      </div>

      {/* Main heart — clickable easter egg */}
      <motion.div
        initial={{ opacity: 0, scale: 0.3, rotate: -15 }}
        animate={{ opacity: 1, scale: 1, rotate: 0 }}
        transition={{ duration: 0.7, ease: "backOut" }}
      >
        <motion.button
          onClick={handleHeartClick}
          className="relative cursor-pointer focus:outline-none"
          whileTap={{ scale: 0.85 }}
          aria-label="Toca el corazón"
        >
          <motion.svg
            viewBox="0 0 24 24"
            className="w-20 h-20 md:w-24 md:h-24 text-coral drop-shadow-lg"
            fill="currentColor"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
          {heartClicks > 0 && heartClicks < EASTER_EGG_THRESHOLD && (
            <motion.span
              initial={{ opacity: 1, y: 0 }}
              animate={{ opacity: 0, y: -20 }}
              className="absolute -top-6 left-1/2 -translate-x-1/2 font-display text-sm text-coral whitespace-nowrap"
            >
              {EASTER_EGG_THRESHOLD - heartClicks} más
            </motion.span>
          )}
        </motion.button>
      </motion.div>

      {/* Easter egg reveal */}
      <AnimatePresence>
        {easterEggRevealed && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-xl p-5 mb-6 border-2 border-mustard/40 max-w-sm mx-auto text-center"
          >
            <span className="text-2xl block mb-1">💫</span>
            <p className="font-display text-coral font-semibold text-sm">
              [Aquí va tu mensaje secreto]
            </p>
            <p className="font-body text-xs text-pizarra/40 mt-1">
              {/* TODO: reemplazar con mensaje real */}
              Tocaste el corazón {EASTER_EGG_THRESHOLD} veces ❤️
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "backOut" }}
        className="relative"
      >
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-center leading-tight">
          <span className="text-coral drop-shadow-sm">{years} años</span>
          <br />
          <span className="text-pizarra relative">
            de nosotros
            <motion.svg
              viewBox="0 0 120 20"
              className="absolute -bottom-2 left-0 right-0 w-full h-3 text-mustard/60"
              preserveAspectRatio="none"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <path d="M0 10 Q 30 0, 60 10 Q 90 20, 120 10" stroke="currentColor" strokeWidth="3" fill="none" strokeLinecap="round" />
            </motion.svg>
          </span>
        </h1>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="font-body text-lg md:text-xl text-pizarra/60 mt-6 text-center max-w-md leading-relaxed"
      >
        Y por muchos muchos {" "}
        <span className="font-semibold text-coral">más</span>
        <br />a tu lado.
      </motion.p>

      {/* CTA button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="mt-10"
      >
        <motion.button
          onClick={() => document.getElementById("counter")?.scrollIntoView({ behavior: "smooth" })}
          className="group inline-flex items-center gap-2 font-display text-base bg-coral text-white px-6 py-3 rounded-full shadow-lg hover:shadow-xl hover:bg-coral/90 transition-all cursor-pointer"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <span>Comenzar</span>
          <motion.svg
            className="w-4 h-4"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}
            animate={{ y: [0, 3, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </motion.svg>
        </motion.button>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8"
      >
        <motion.a
          href="#counter"
          className="flex flex-col items-center gap-1 text-cafe/50 hover:text-coral transition-colors text-xs font-body"
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span>Desplázate</span>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </motion.a>
      </motion.div>
    </section>
  )
}
