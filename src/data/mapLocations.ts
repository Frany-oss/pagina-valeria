export interface MapLocation {
  id: string
  name: string
  lat: number
  lng: number
  emoji: string
  story: string
}

export const mapLocations: MapLocation[] = [
  {
    id: "miami",
    name: "Miami",
    lat: 25.7617,
    lng: -80.1918,
    emoji: "🌴",
    story: "El sol de Miami, el calor, y la energía de la ciudad. Un viaje inolvidable juntos.",
  },
  {
    id: "lima",
    name: "Lima",
    lat: -12.0464,
    lng: -77.0428,
    emoji: "🍝",
    story: "La ciudad que nos vio crecer. Nuestro punto de partida para todas las aventuras.",
  },
  {
    id: "cuzco",
    name: "Cuzco",
    lat: -13.5319,
    lng: -71.9675,
    emoji: "🏛️",
    story: "Historias milenarias y calles de piedra. Caminar por Cuzco es caminar por la historia, juntos.",
  },
  {
    id: "huaraz",
    name: "Huaraz",
    lat: -9.5278,
    lng: -77.5278,
    emoji: "🏔️",
    story: "Montañas, lagos y el cielo más estrellado que hemos visto. La naturaleza en su máxima expresión.",
  },
  {
    id: "punta-cana",
    name: "Punta Cana",
    lat: 18.5818,
    lng: -68.4045,
    emoji: "🏖️",
    story: "Arena blanca, agua turquesa y un atardecer que pintó de naranja nuestro amor.",
  },
]
