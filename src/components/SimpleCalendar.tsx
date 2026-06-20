import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function SimpleCalendar() {
  const [open, setOpen] = useState(false)
  const [title, setTitle] = useState("")
  const [note, setNote] = useState("")
  const [date, setDate] = useState("")
  const [time, setTime] = useState("")

  const handleSchedule = () => {
    if (!date || !time) return

    const [y, m, d] = date.split("-").map(Number)
    const [hh, mm] = time.split(":").map(Number)
    const start = new Date(y, m - 1, d, hh, mm)
    const end = new Date(start.getTime() + 120 * 60000)

    const fmt = (dt: Date) =>
      dt.toISOString().replace(/[-:]/g, "").split(".")[0] + "Z"

    const params = new URLSearchParams({
      action: "TEMPLATE",
      text: title || "Cita con vos 💖",
      dates: `${fmt(start)}/${fmt(end)}`,
      details: note || "Una cita especial",
    })

    window.open(
      `https://calendar.google.com/calendar/render?${params.toString()}`,
      "_blank"
    )
    setOpen(false)
    setTitle("")
    setNote("")
    setDate("")
    setTime("")
  }

  return (
    <section id="schedule" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Agenda una cita 🗓️
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Elige cuándo y qué quieres hacer. Lo ponemos en el calendario.
      </p>

      <div className="text-center">
        <motion.button
          onClick={() => setOpen(true)}
          whileHover={{ scale: 1.05, rotate: -1 }}
          whileTap={{ scale: 0.95 }}
          className="font-display bg-coral text-white px-8 py-3.5 rounded-full shadow-lg hover:shadow-xl transition-all inline-flex items-center gap-2 text-lg"
        >
          <span>📅</span>
          <span>Agendar cita</span>
        </motion.button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-white rounded-2xl shadow-2xl p-6 md:p-8 max-w-sm w-full"
            >
              <div className="flex items-center justify-between mb-5">
                <h3 className="font-display text-xl font-bold text-pizarra">
                  Agenda tu cita 💕
                </h3>
                <button
                  onClick={() => setOpen(false)}
                  className="w-7 h-7 rounded-full bg-cafe/10 flex items-center justify-center text-pizarra/40 hover:bg-cafe/20 transition-colors text-sm"
                >
                  ✕
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-xs text-pizarra/50 mb-1 block">
                    ¿Qué quieres hacer?
                  </label>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Ej: Noche de pasta y vino 🍝"
                    className="w-full font-body text-sm bg-warm-white border border-cafe/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-coral/50 transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="font-body text-xs text-pizarra/50 mb-1 block">
                      Día
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full font-body text-sm bg-warm-white border border-cafe/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-coral/50 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="font-body text-xs text-pizarra/50 mb-1 block">
                      Hora
                    </label>
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => setTime(e.target.value)}
                      className="w-full font-body text-sm bg-warm-white border border-cafe/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-coral/50 transition-colors"
                    />
                  </div>
                </div>
                <div>
                  <label className="font-body text-xs text-pizarra/50 mb-1 block">
                    Nota (opcional)
                  </label>
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Algo especial que quieras agregar..."
                    rows={3}
                    className="w-full font-body text-sm bg-warm-white border border-cafe/20 rounded-xl px-4 py-2.5 focus:outline-none focus:border-coral/50 transition-colors resize-none"
                  />
                </div>
                <button
                  onClick={handleSchedule}
                  disabled={!date || !time}
                  className="w-full font-display bg-coral text-white py-3 rounded-full hover:bg-coral/90 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-md text-sm"
                >
                  Abrir en Google Calendar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
