import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const sections = [
  { id: "counter", label: "Contador", icon: "⏱️" },
  { id: "timeline", label: "Historia", icon: "📖" },
  { id: "gallery", label: "Fotos", icon: "📸" },
  { id: "schedule", label: "Agendar", icon: "🗓️" },
  { id: "memory", label: "Memoria", icon: "🧠" },
  { id: "predictions", label: "Predicción", icon: "🔮" },
  { id: "map", label: "Mapa", icon: "🌍" },
  { id: "reasons", label: "Razones", icon: "💌" },
  { id: "love-letter", label: "Carta", icon: "✉️" },
]

export default function Navbar() {
  const [visible, setVisible] = useState(false)
  const [activeSection, setActiveSection] = useState("")
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const heroH = window.innerHeight * 0.8
      setVisible(window.scrollY > heroH)

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id)
        if (el && el.getBoundingClientRect().top < 250) {
          setActiveSection(sections[i].id)
          break
        }
      }
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileOpen(false)
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -80, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="fixed top-0 left-0 right-0 z-[1000] bg-white/85 backdrop-blur-lg border-b border-cafe/15 shadow-lg"
        >
          <div className="max-w-6xl mx-auto px-4 h-14 flex items-center justify-between">
            <button
              onClick={() => scrollTo("counter")}
              className="flex items-center gap-2 text-coral font-display font-semibold hover:scale-105 active:scale-95 transition-transform"
            >
              <motion.svg
                viewBox="0 0 24 24"
                className="w-6 h-6"
                fill="currentColor"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
              <span className="hidden sm:inline text-lg">Nuestro lugar</span>
            </button>

            <div className="hidden md:flex items-center gap-1">
              {sections.map((s) => (
                <button
                  key={s.id}
                  onClick={() => scrollTo(s.id)}
                  className={`relative px-3 py-1.5 rounded-full text-sm font-body transition-all ${
                    activeSection === s.id
                      ? "text-coral font-semibold"
                      : "text-pizarra/50 hover:text-pizarra/80"
                  }`}
                >
                  {activeSection === s.id && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 bg-coral/10 rounded-full"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {s.icon} {s.label}
                  </span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden relative w-8 h-8 flex flex-col items-center justify-center gap-1"
              aria-label="Menú"
            >
              <motion.span
                animate={mobileOpen ? { rotate: 45, y: 4 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-pizarra rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { opacity: 0 } : { opacity: 1 }}
                className="w-5 h-0.5 bg-pizarra rounded-full block"
              />
              <motion.span
                animate={mobileOpen ? { rotate: -45, y: -4 } : { rotate: 0, y: 0 }}
                className="w-5 h-0.5 bg-pizarra rounded-full block"
              />
            </button>
          </div>

          <AnimatePresence>
            {mobileOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="md:hidden bg-white/95 backdrop-blur-md border-t border-cafe/10 overflow-hidden"
              >
                <div className="px-4 py-2 flex flex-col gap-1">
                  {sections.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => scrollTo(s.id)}
                      className={`px-4 py-2.5 rounded-xl text-left font-body transition-colors flex items-center gap-3 ${
                        activeSection === s.id
                          ? "bg-coral/10 text-coral font-semibold"
                          : "text-pizarra/60 hover:bg-cafe/5"
                      }`}
                    >
                      <span>{s.icon}</span>
                      <span>{s.label}</span>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      )}
    </AnimatePresence>
  )
}
