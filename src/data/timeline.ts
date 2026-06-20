export interface TimelineEvent {
  date: string
  title: string
  description: string
  image?: string
  tags?: string[]
}

export const timelineEvents: TimelineEvent[] = [
  {
    date: "2022-06-25",
    title: "El día que todo empezó 💖",
    description:
      "El día que te pedi ser mi enamorada en 500 grados. El inicio de esta aventura que ha sido la mejor de mi vida.",
    image: "/images/01_2022.jpg",
  },
  {
    date: "2022-08-15",
    title: "Tu primer cumpleaños juntos 🎂",
    description:
      "La primera vez que salimos como pareja. Nervios, sonrisas y la certeza de que esto era special.",
    image: "/images/02_2022.jpg",
  },
  {
    date: "2023-01-10",
    title: "La primera vez que vivimos juntos",
    description:
      "Nuestra primera vez viviendo un mes completo juntos!",
    image: "/images/01_2023.jpg",
  },
  {
    date: "2023-05-07",
    title: "Nuestro primer viaje",
    description:
      "Nuestra primea aventura juntos. Lo que nos hizo conectar.",
    image: "/images/02_2023.jpeg",
  },
  {
    date: "2025-03-07",
    title: "Viendo una maravilla con mi maravilla",
    description:
      "De los viajes que mas disfruté. Poder conocer una maravilla del mundo contigo fue un sueño hecho realidad.",
    image: "/images/02_2025.jpg",
  },
]
