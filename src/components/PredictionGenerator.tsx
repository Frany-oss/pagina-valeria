import { useState, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import confetti from "canvas-confetti"
import { predictions } from "../data/predictions"

export default function PredictionGenerator() {
  const [prediction, setPrediction] = useState("")
  const [spinning, setSpinning] = useState(false)
  const [showResult, setShowResult] = useState(false)

  const spin = useCallback(() => {
    if (spinning) return
    setSpinning(true)
    setShowResult(false)
    setPrediction("")

    // Slot machine sound-like effect: rapid placeholder changes
    let count = 0
    const interval = setInterval(() => {
      setPrediction(predictions[Math.floor(Math.random() * predictions.length)])
      count++
      if (count >= 8) {
        clearInterval(interval)
        const final = predictions[Math.floor(Math.random() * predictions.length)]
        setPrediction(final)
        setSpinning(false)
        setShowResult(true)

        confetti({
          particleCount: 40,
          spread: 100,
          origin: { x: 0.5, y: 0.4 },
          colors: ["#FF6B6B", "#4ECDC4", "#FFE66D", "#A78BFA"],
        })
      }
    }, 120)
  }, [spinning])

  return (
    <section id="predictions" className="relative py-16 md:py-24 px-4 overflow-hidden section-coral">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Predicción para el año 5 🔮
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Toca la máquina para saber qué nos espera este año
      </p>

      <div className="max-w-lg mx-auto text-center">
        {/* Slot machine */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-xl p-6 md:p-8 border-2 border-coral/10 relative overflow-hidden"
        >
          {/* Decorative top bar */}
          <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-coral/70 rounded-sm rotate-[-2px]" />

          <div className="text-4xl mb-4">🎰</div>

          {/* Prediction display */}
          <div className="bg-warm-white rounded-xl p-4 md:p-6 min-h-[100px] flex items-center justify-center border border-cafe/10 mb-5">
            <AnimatePresence mode="wait">
              <motion.p
                key={prediction || "empty"}
                initial={{ opacity: 0, y: 20, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ duration: 0.15 }}
                className={`font-body text-base md:text-lg leading-relaxed ${
                  spinning
                    ? "text-coral/60"
                    : showResult
                      ? "text-pizarra font-semibold"
                      : "text-pizarra/30"
                }`}
              >
                {spinning
                  ? "🎰 ✨ 🎰"
                  : showResult
                    ? prediction
                    : "¡Tira la palanca!"}
              </motion.p>
            </AnimatePresence>
          </div>

          {/* Lever button */}
          <motion.button
            onClick={spin}
            disabled={spinning}
            whileHover={{ scale: 1.05, rotate: spinning ? 0 : -3 }}
            whileTap={{ scale: 0.95 }}
            className={`font-display text-lg px-10 py-3 rounded-full shadow-lg transition-all inline-flex items-center gap-2 ${
              spinning
                ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                : "bg-coral text-white hover:bg-coral/90 hover:shadow-xl"
            }`}
          >
            <span>{spinning ? "🎰" : "🎯"}</span>
            <span>{spinning ? "Girando..." : "¡Tirar!"}</span>
          </motion.button>
        </motion.div>
      </div>
    </section>
  )
}
