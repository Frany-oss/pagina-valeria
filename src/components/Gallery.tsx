import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { galleryImages } from "../data/gallery"

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section id="gallery" className="relative py-16 md:py-24 px-4 overflow-hidden section-lilac">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 right-10 w-48 h-48 bg-coral/[0.04] rounded-full blur-[60px]" />
        <div className="absolute bottom-10 left-10 w-52 h-52 bg-mint/[0.04] rounded-full blur-[60px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Nuestros recuerdos 📸
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Cada foto guarda una historia que quiero recordar siempre
      </p>

      <div className="max-w-6xl mx-auto columns-2 sm:columns-3 lg:columns-4 gap-4 px-2">
        {galleryImages.map((image, index) => (
          <motion.button
            key={image.id}
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.4, delay: index * 0.04 }}
            whileHover={{ scale: 1.04, rotate: 0, y: -6 }}
            onClick={() => setSelectedImage(image.src)}
            className="mb-4 break-inside-avoid bg-white rounded-xl p-2.5 shadow-lg hover:shadow-2xl transition-shadow cursor-pointer block w-full text-left group relative"
            style={{
              transform: `rotate(${index % 4 === 0 ? -1.5 : index % 4 === 1 ? 1 : index % 4 === 2 ? -0.5 : 0.8}deg)`,
            }}
          >
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full object-cover group-hover:scale-110 transition-transform duration-500"
                loading="lazy"
              />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-2xl drop-shadow-lg">
                  🔍
                </span>
              </div>
            </div>
            <p className="font-body text-xs text-pizarra/40 text-center mt-1.5 pb-0.5 truncate">
              {image.alt}
            </p>
          </motion.button>
        ))}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center z-[1001] p-4 cursor-pointer"
          >
            <motion.div
              key={selectedImage}
              initial={{ scale: 0.7, opacity: 0, rotate: -5 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 5 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="relative"
            >
              <img
                src={selectedImage}
                alt="Foto ampliada"
                className="max-w-[90vw] max-h-[90vh] rounded-2xl shadow-2xl"
                onClick={(e) => e.stopPropagation()}
              />
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-3 -right-3 w-8 h-8 bg-white rounded-full shadow-md flex items-center justify-center text-pizarra text-lg font-bold hover:bg-coral hover:text-white transition-colors"
              >
                ×
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
