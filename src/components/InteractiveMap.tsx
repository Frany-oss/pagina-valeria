import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { mapLocations } from "../data/mapLocations"

function createColoredIcon(emoji: string) {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 36px; height: 36px;
      background: #FF6B6B;
      border: 3px solid white;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.25);
      transform-origin: center;
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  })
}

const icons = mapLocations.reduce(
  (acc, loc) => {
    acc[loc.id] = createColoredIcon(loc.emoji)
    return acc
  },
  {} as Record<string, L.DivIcon>
)

export default function InteractiveMap() {
  const [selected, setSelected] = useState<typeof mapLocations[0] | null>(null)

  return (
    <section id="map" className="relative py-16 md:py-24 px-4 overflow-hidden">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-3xl md:text-4xl font-bold text-center text-pizarra mb-2 washi-tape pt-4"
      >
        Nuestro mapamundi 🌍
      </motion.h2>
      <p className="font-body text-pizarra/50 text-center mb-6 max-w-md mx-auto">
        Los lugares que hemos marcado con nuestro amor
      </p>

      <div className="max-w-4xl mx-auto">
        <div className="w-full h-[400px] md:h-[450px] rounded-2xl overflow-hidden border-2 border-cafe/15 shadow-lg">
          <MapContainer
            center={[-5, -75]}
            zoom={4}
            scrollWheelZoom={false}
            style={{ width: "100%", height: "100%" }}
            zoomControl={true}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {mapLocations.map((loc) => (
              <Marker
                key={loc.id}
                position={[loc.lat, loc.lng]}
                icon={icons[loc.id]}
                eventHandlers={{
                  click: () =>
                    setSelected(
                      selected?.id === loc.id ? null : loc
                    ),
                }}
              >
                <Popup>
                  <div className="font-body text-sm">
                    <strong className="font-display text-coral">
                      {loc.emoji} {loc.name}
                    </strong>
                    <br />
                    <span className="text-pizarra/60 text-xs">
                      {loc.lat.toFixed(2)}°, {loc.lng.toFixed(2)}°
                    </span>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>

        <AnimatePresence mode="wait">
          {selected && (
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -20, scale: 0.95 }}
              className="mt-4 bg-white rounded-xl shadow-md p-5 border border-cafe/10"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-2xl">{selected.emoji}</span>
                <div>
                  <h3 className="font-display text-base font-semibold text-pizarra">
                    {selected.name}
                  </h3>
                </div>
              </div>
              <p className="font-body text-sm text-pizarra/60 leading-relaxed">
                {selected.story}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  )
}
