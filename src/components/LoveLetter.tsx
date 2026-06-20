import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function LoveLetter() {
  const [opened, setOpened] = useState(false)

  return (
    <section id="love-letter" className="relative py-16 md:py-24 px-4 overflow-hidden">
      {/* Decorative blobs */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 w-52 h-52 bg-coral/[0.04] rounded-full blur-[70px]" />
        <div className="absolute bottom-10 right-10 w-48 h-48 bg-mustard/[0.05] rounded-full blur-[70px]" />
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Una carta para ti ✉️
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-10 max-w-md mx-auto">
        Toca el sobre para abrirlo
      </p>

      {/* Floating hearts around */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {[...Array(5)].map((_, i) => (
          <motion.svg
            key={i}
            viewBox="0 0 24 24"
            className={`absolute w-4 h-4 text-coral/20`}
            style={{
              top: `${15 + i * 18}%`,
              left: `${i % 2 === 0 ? 5 : 90}%`,
            }}
            fill="currentColor"
            animate={{ y: [0, -20, 0], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3 + i, repeat: Infinity, delay: i * 0.5 }}
          >
            <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
          </motion.svg>
        ))}
      </div>

      <div className="max-w-lg mx-auto relative">
        {!opened ? (
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.04, rotate: -1 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpened(true)}
            className="w-full card p-10 md:p-14 cursor-pointer text-center relative group"
          >
            {/* Tape */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-16 h-2.5 bg-coral/70 rounded-sm rotate-[-3deg]" />

            <motion.div
              animate={{ y: [0, -6, 0], rotate: [0, -3, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl mb-6"
            >
              ✉️
            </motion.div>
            <p className="font-display text-xl text-coral font-semibold mb-2">
              Toca para abrir
            </p>
            <p className="font-body text-sm text-pizarra/40">
              Hay algo escrito especialmente para ti
            </p>
          </motion.button>
        ) : (
          <AnimatePresence>
            <motion.div
              initial={{ opacity: 0, rotateX: -95, transformOrigin: "top center" }}
              animate={{ opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.7, ease: "backOut" }}
              className="card p-8 md:p-10 relative"
            >
              {/* Tape */}
              <div className="absolute -top-2 right-6 w-10 h-2.5 bg-mint/70 rounded-sm rotate-3" />

              <div className="text-center mb-6">
                <span className="text-5xl block mb-2">💌</span>
              </div>

              <div className="font-body text-pizarra/85 leading-relaxed space-y-4">
                <p className="text-center font-display text-xl text-coral font-semibold">
                  Para Pollita,
                </p>

                <div className="space-y-3 text-[15px]">
                  <p>
                    Quería escribirte esta carta para expresarte todo lo que siento por ti. A veces las palabras se quedan cortas para describir lo que el corazón siente, pero quiero intentarlo de todas formas.
                  </p>
                  <p>
                    En estos 4 años juntos hemos compartido tantos momentos increíbles que no me imagino como hubiera sido mi vida sin ti. Gracias a ti me esfuerzo más, sueño más y soy más feliz. Eres mi compañera, mi amiga y el amor de mi vida. Gracias por ser mi motor todos los días, por comprenderme y amarme incondicionalmente, aunque no siempre sea facil. Prometo seguir construyendo esta hermosa historia juntos, aprendiendo, creciendo y amándonos cada día más. 
                  </p>
                  <p>
                    Te amo con todo mi corazón, y estoy emocionado por todo lo que nos espera en el futuro. Gracias por ser tú, por elegirme y por hacerme tan feliz. Me inspiras a ser mejor persona, me inspiras con tu fuerza, tu alegría y tu amor, siempre te lo digo y te lo seguiré diciendo, eres la persona más increíble que conozco y me siento tan afortunado de tenerte a mi lado. Estoy inmensamente orgulloso de ti, de todo lo que has logrado y de la persona maravillosa que eres, porque sigues luchando y amando ante todo y ante todos, y eso es algo que admiro profundamente.
                    </p>
                    <p>
                    Creo que siempre te lo pongo en todas las cartas, pero no me canso de decirte cuanto me haz ayudado en estos 4 años juntos. Por ti soy mas empatico, paciente, más soñador, más feliz, más todo. Me has ayudado a crecer como persona y a ser mejor cada día, y no solo eso, sino que me has ayudado a creer en mi mismo, a creer que puedo lograr lo que me proponga, y eso es algo que siempre te agradeceré. Gracias por siempre ayudarme a ser mejor persona y por siempre creer en mi, incluso cuando yo no lo hago. Se que todavia tengo mucho por mejorar y aprender, pero te prometo que seguiré esforzandome para ser el mejor compañero para ti, porque te lo mereces. Eres la persona más increíble que conozco, y me siento tan afortunado de tenerte a mi lado.
                  </p>
                  <p>
                    Han sido 4 años de amor, aprendizaje, crecimiento y felicidad contigo. Me muero de ganas de seguir viviendo esta aventura juntos, de seguir construyendo recuerdos y toda una vida contigo. De poder vivir juntos, tener una casa, una familia llena de amor, y estar rodeado de personas que nos amen y nos apoyen como te mereces. Yo seguire esforzandome para darte la vida que te mereces, y no hablo solo de lo material (que también), sino esforzarme para ser el mejor compañero, el mejor amigo, porque te lo mereces. Estoy seguro que tendremos una vida y una familia llena de amor, cariño y comprensión.
                  </p>
                  <p>
                    Te amo, por hoy, mañana y siempre.
                  </p>
                </div>

                <p className="text-center font-display text-coral mt-6">Te amo 💖</p>
              </div>

              <motion.svg
                viewBox="0 0 24 24"
                className="w-7 h-7 mx-auto mt-6 text-coral"
                fill="currentColor"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </motion.svg>
            </motion.div>
          </AnimatePresence>
        )}
      </div>
    </section>
  )
}
