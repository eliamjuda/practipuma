// Examen Simulacro, Hardcore, Materia, Subtema, Aleatorio, Recientes 

import { PracticeModeProps } from "@/types/practice";

export const practiceModesData: PracticeModeProps[] = [
    {
        id: 1,
        mode: "recent",
        title: "¡Más recientes!",
        description: "¡Practica con las últimas preguntas agregadas!",
        premium: true,
        badge: "2025"
    },
    {
        id: 2,
        mode: "exam",
        title: "Examen simulacro",
        description: "Practica un examen muy parecido al que harás, sin miedo al éxito.",
        premium: false,
        badge: null
    },
    {
        id: 3,
        mode: "subject",
        title: "Materia",
        description: "Practica con una materia de tu elección y domínala 🔥",
        premium: false,
        badge: null
    },
    {
        id: 4,
        mode: "subtopic",
        title: "Subtema",
        description: "¿Nos vamos más específico 🎯? Va ",
        premium: true,
        badge: null
    },
    {
        id: 5,
        mode: "random",
        title: "Aleatorio",
        description:
        "Selecciona las materias a practicar y saldrán preguntas aleatorias 🔀",
        premium: true,
        badge: null
    },
    {
        id: 6,
        mode: "hardcore",
        title: "Hardcore",
        description:
        "Como en el minecraft, vidas limitadas, ¡no te equivoques!",
        premium: true,
        badge: null
    }
]

export const practiceModeDecoration = {
    recent: {
        color: "#3ABEFF",
        image: "/images/practice/recent.svg"
    },
    exam: {
        color: "#E63946	",
        image: "/images/practice/exam.svg"
    },
    subject: {
        color: "#264653",
        image: "/images/practice/subject.svg"
    },
    subtopic: {
        color: "#43AA8B",
        image: "/images/practice/subtopic.svg"
    },
    random: {
        color: "#F4A261",
        image: "/images/practice/random.svg"
    },
    hardcore: {
        color: "#9B5DE5",
        image: "/images/practice/hardcore.svg"
    }
}