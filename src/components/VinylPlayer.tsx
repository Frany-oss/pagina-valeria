import { useState, useRef, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

const SONG_SRC = "/music/your-song.m4a"

export default function VinylPlayer() {
  const [playing, setPlaying] = useState(false)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  const toggle = useCallback(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(SONG_SRC)
      audioRef.current.loop = true
      audioRef.current.volume = 0.7
    }

    if (playing) {
      audioRef.current.pause()
      setPlaying(false)
    } else {
      audioRef.current.currentTime = 0
      audioRef.current.play().catch(() => {})
      setPlaying(true)
    }
  }, [playing])

  return (
    <div className="fixed bottom-6 right-6 z-[999] flex flex-col items-end gap-2">
      {/* Now playing tooltip */}
      <AnimatePresence>
        {playing && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.9 }}
            className="bg-white/90 backdrop-blur-sm rounded-xl shadow-lg px-4 py-2 border border-coral/20 text-right"
          >
            <p className="font-display text-xs text-coral font-semibold leading-tight">
              Sonando ahora
            </p>
            <p className="font-body text-[11px] text-pizarra/60">
              Your Song
            </p>
            <p className="font-body text-[9px] text-pizarra/30">
              Elton John
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Vinyl record */}
      <motion.button
        onClick={toggle}
        whileTap={{ scale: 0.92 }}
        className="relative w-16 h-16 md:w-20 md:h-20 rounded-full shadow-xl cursor-pointer focus:outline-none"
      >
        {/* Outer ring */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-gray-800 via-gray-900 to-black shadow-inner" />

        {/* Spinning record */}
        <motion.div
          className="absolute inset-[3px] rounded-full bg-gradient-to-br from-gray-700 via-gray-800 to-gray-900 flex items-center justify-center"
          animate={{ rotate: playing ? 360 : 0 }}
          transition={
            playing
              ? { rotate: { duration: 2, repeat: Infinity, ease: "linear" } }
              : { duration: 0.3, ease: "easeOut" }
          }
        >
          <div className="absolute inset-[6px] rounded-full border border-gray-600/30" />
          <div className="absolute inset-[12px] rounded-full border border-gray-600/20" />
          <div className="absolute inset-[18px] rounded-full border border-gray-600/10" />

          <div className="relative w-[30px] h-[30px] md:w-[38px] md:h-[38px] rounded-full bg-coral flex items-center justify-center shadow-inner">
            <span className="text-white font-display text-[6px] md:text-[7px] font-bold leading-none text-center">
              {playing ? "♪" : "▶"}
            </span>
          </div>
        </motion.div>

        {!playing && (
          <div className="absolute -top-2 -right-2 w-4 h-8 origin-bottom-right">
            <div className="w-0.5 h-full bg-gray-600 rounded-full rotate-[30deg] origin-bottom-right" />
            <div className="w-2 h-2 bg-gray-500 rounded-full absolute -top-1 -right-0.5" />
          </div>
        )}

        {playing && (
          <motion.span
            className="absolute inset-0 rounded-full border-2 border-coral/40"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0, 0.4] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
      </motion.button>
    </div>
  )
}
