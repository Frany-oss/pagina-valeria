import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { START_DATE } from "../data/relationship"

function getTimeSince(start: Date) {
  const now = new Date()

  let years = now.getFullYear() - start.getFullYear()
  let months = now.getMonth() - start.getMonth()
  let days = now.getDate() - start.getDate()

  if (days < 0) {
    months--
    const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0)
    days += prevMonth.getDate()
  }

  if (months < 0) {
    years--
    months += 12
  }

  const ms = now.getTime() - start.getTime()
  const totalSec = Math.floor(Math.max(0, ms) / 1000)
  const hours = Math.floor(totalSec / 3600) % 24
  const minutes = Math.floor(totalSec / 60) % 60
  const seconds = totalSec % 60

  return { years, months, days, hours, minutes, seconds }
}

function AnimatedNumber({ value, label }: { value: number; label: string }) {
  const display = String(value).padStart(2, "0")

  return (
    <div className="flex flex-col items-center">
      <div className="relative overflow-hidden bg-white/60 rounded-xl px-3 py-2 min-w-[56px] shadow-inner">
        <motion.span
          key={display}
          initial={{ y: 24, opacity: 0, rotateX: -90 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          transition={{ duration: 0.35, ease: "backOut" }}
          className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-coral block tabular-nums text-center"
        >
          {display}
        </motion.span>
      </div>
      <span className="font-body text-[10px] md:text-xs text-pizarra/50 uppercase tracking-widest mt-1.5 font-semibold">
        {label}
      </span>
    </div>
  )
}

export default function Counter() {
  const [time, setTime] = useState(() => getTimeSince(new Date(START_DATE)))

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(getTimeSince(new Date(START_DATE)))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <section id="counter" className="relative py-16 md:py-24 px-4 overflow-hidden section-mustard">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-48 h-48 bg-coral/[0.05] rounded-full blur-[60px]" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-mint/[0.05] rounded-full blur-[60px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2"
      >
        Todo este tiempo juntos 💫
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Desde el 25 de junio del 2022
      </p>

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        whileInView={{ opacity: 1, scale: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "backOut" }}
        className="max-w-3xl mx-auto bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-10 border border-coral/15 relative"
      >
        {/* Washi tape corners */}
        <div className="absolute -top-2 -left-2 w-10 h-2 bg-coral/80 rounded-sm rotate-[-15deg]" />
        <div className="absolute -top-2 -right-2 w-10 h-2 bg-mint/80 rounded-sm rotate-[15deg]" />

        <div className="grid grid-cols-3 md:grid-cols-6 gap-3 md:gap-3">
          <AnimatedNumber value={time.years} label="Años" />
          <AnimatedNumber value={time.months} label="Meses" />
          <AnimatedNumber value={time.days} label="Días" />
          <AnimatedNumber value={time.hours} label="Horas" />
          <AnimatedNumber value={time.minutes} label="Minutos" />
          <AnimatedNumber value={time.seconds} label="Segundos" />
        </div>
      </motion.div>
    </section>
  )
}
