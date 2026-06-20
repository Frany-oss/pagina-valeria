import { motion } from "framer-motion"
import { timelineEvents } from "../data/timeline"

const variants = (index: number) => ({
  hidden: { opacity: 0, y: 50, rotate: index % 2 === 0 ? -4 : 4, scale: 0.95 },
  visible: { opacity: 1, y: 0, rotate: 0, scale: 1 },
})

export default function Timeline() {
  return (
    <section id="timeline" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-0 w-64 h-64 bg-mint/[0.05] rounded-full blur-[80px]" />
        <div className="absolute bottom-20 right-0 w-72 h-72 bg-lilac/[0.04] rounded-full blur-[80px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Nuestra historia
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-12 max-w-md mx-auto">
        Cada momento importante que hemos vivido juntos
      </p>

      <div className="relative max-w-4xl mx-auto">
        {/* Vertical line with gradient */}
        <div className="absolute left-5 md:left-1/2 top-0 bottom-0 w-[3px] bg-gradient-to-b from-coral/40 via-mint/40 to-lilac/40 rounded-full md:-translate-x-1/2" />

        {timelineEvents.map((event, index) => {
          const isLeft = index % 2 === 0
          return (
            <motion.div
              key={event.date}
              variants={variants(index)}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "backOut" }}
              className={`relative flex items-start gap-6 mb-10 md:mb-14 last:mb-0 ${
                isLeft ? "md:flex-row" : "md:flex-row-reverse"
              }`}
            >
              {/* Dot */}
              <motion.div
                className="absolute left-5 md:left-1/2 w-4 h-4 rounded-full border-[3px] border-warm-white shadow-md z-10 md:-translate-x-1/2 mt-1"
                style={{
                  background: index % 3 === 0 ? "var(--color-coral)" : index % 3 === 1 ? "var(--color-mint)" : "var(--color-lilac)",
                }}
                whileInView={{ scale: [0, 1.3, 1] }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
              />

              {/* Spacer */}
              <div className="hidden md:block md:w-1/2" />

              {/* Card */}
              <div className="ml-14 md:ml-0 md:w-1/2">
                <div className="card p-5 relative">
                  {/* Tape decoration on card corner */}
                  <div className="absolute -top-2 right-4 w-8 h-2 bg-mustard/70 rounded-sm rotate-6" />

                  <span className="font-body text-xs font-semibold text-cafe uppercase tracking-wider">
                    {(() => {
                      const [y, m, d] = event.date.split("-").map(Number)
                      return new Date(y, m - 1, d).toLocaleDateString("es-ES", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    })()}
                  </span>
                  <h3 className="font-display text-lg md:text-xl font-semibold text-pizarra mt-0.5">
                    {event.title}
                  </h3>
                  <p className="font-body text-pizarra/60 text-sm leading-relaxed mt-2">
                    {event.description}
                  </p>
                  {event.image && (
                    <div className="mt-3 rounded-lg overflow-hidden shadow-sm ring-1 ring-black/5">
                      <img
                        src={event.image}
                        alt={event.title}
                        className="w-full h-auto hover:scale-105 transition-transform duration-500 rounded-lg"
                        loading="lazy"
                      />
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )
        })}
      </div>
    </section>
  )
}
