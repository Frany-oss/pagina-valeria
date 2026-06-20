import { motion } from "framer-motion"
import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Counter from "./components/Counter"
import Timeline from "./components/Timeline"
import Gallery from "./components/Gallery"
import SimpleCalendar from "./components/SimpleCalendar"
import MemoryGame from "./components/MemoryGame"
import PredictionGenerator from "./components/PredictionGenerator"
import InteractiveMap from "./components/InteractiveMap"
import ReasonsWhy from "./components/ReasonsWhy"
import LoveLetter from "./components/LoveLetter"
import ClickSparkles from "./components/ClickSparkles"
import VinylPlayer from "./components/VinylPlayer"
import FloatingPolaroids from "./components/FloatingPolaroids"
import FloatingEmojis from "./components/FloatingEmojis"
import DraggableStickers from "./components/DraggableStickers"

function App() {
  return (
    <main className="min-h-screen">
      <FloatingEmojis />
      <FloatingPolaroids />
      <ClickSparkles />
      <DraggableStickers />
      <VinylPlayer />
      <Navbar />
      <Hero />
      <div className="doodle-divider"><span>✂️</span></div>
      <Counter />
      <div className="doodle-divider"><span>✂️</span></div>
      <Timeline />
      <div className="doodle-divider"><span>✂️</span></div>
      <Gallery />
      <div className="doodle-divider"><span>✂️</span></div>
      <SimpleCalendar />
      <div className="doodle-divider"><span>✂️</span></div>
      <MemoryGame />
      <div className="doodle-divider"><span>✂️</span></div>
      <PredictionGenerator />
      <div className="doodle-divider"><span>✂️</span></div>
      <InteractiveMap />
      <div className="doodle-divider"><span>✂️</span></div>
      <ReasonsWhy />
      <div className="doodle-divider"><span>✂️</span></div>
      <LoveLetter />

      <footer className="relative py-10 text-center overflow-hidden bg-gradient-to-t from-coral/5 to-transparent">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-96 h-24 bg-coral/[0.03] rounded-full blur-[60px]" />
        </div>

        <motion.svg
          viewBox="0 0 24 24"
          className="w-6 h-6 mx-auto mb-3 text-coral"
          fill="currentColor"
          animate={{ scale: [1, 1.15, 1], y: [0, -3, 0] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
        </motion.svg>

        <p className="font-body text-sm text-pizarra/30">
          Hecho con 💖 para Valeria
        </p>
        <p className="font-body text-xs text-pizarra/20 mt-1">
          25 junio 2022
        </p>
      </footer>
    </main>
  )
}

export default App
