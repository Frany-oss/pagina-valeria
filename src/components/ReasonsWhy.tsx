import { useState } from "react"
import { motion } from "framer-motion"
import { reasons } from "../data/reasons"

function FlipCard({ reason, index }: { reason: string; index: number }) {
  const [flipped, setFlipped] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.03 }}
      className="perspective-1000 cursor-pointer"
      onClick={() => setFlipped(!flipped)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      <div
        className={`relative w-full aspect-[4/3] transition-transform duration-500 ease-in-out preserve-3d ${
          flipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front */}
        <div className="absolute inset-0 backface-hidden rounded-xl shadow-md flex items-center justify-center p-6 border-2 border-white/20 overflow-hidden"
          style={{
            background: `linear-gradient(135deg, 
              ${index % 4 === 0 ? "#FF6B6B" : index % 4 === 1 ? "#4ECDC4" : index % 4 === 2 ? "#A78BFA" : "#FFE66D"} 0%, 
              ${index % 4 === 0 ? "#e55a5a" : index % 4 === 1 ? "#3dbdb5" : index % 4 === 2 ? "#9678e8" : "#f0d85a"} 100%)`,
          }}
        >
          <span className="font-display text-5xl text-white/90 drop-shadow-md">{index + 1}</span>
        </div>
        {/* Back */}
        <div className="absolute inset-0 backface-hidden rotate-y-180 bg-white rounded-xl shadow-lg flex items-center justify-center p-5 border-2 border-mint/20">
          <p className="font-body text-pizarra/85 text-center text-sm md:text-sm leading-relaxed">
            {reason}
          </p>
        </div>
      </div>
    </motion.div>
  )
}

export default function ReasonsWhy() {
  return (
    <section id="reasons" className="relative py-16 md:py-24 px-4 overflow-hidden section-coral">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-52 h-52 bg-mint/[0.05] rounded-full blur-[70px]" />
        <div className="absolute bottom-10 left-10 w-48 h-48 bg-lilac/[0.05] rounded-full blur-[70px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        {reasons.length} razones por las que te amo 💌
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Pasa el cursor o toca cada tarjeta para descubrir una razón
      </p>

      <div className="max-w-5xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
        {reasons.map((reason, index) => (
          <FlipCard key={index} reason={reason} index={index} />
        ))}
      </div>
    </section>
  )
}
