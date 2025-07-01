export type PracticeModeProps = {
    id: number;
    mode: string;
    title: string;
    description: string;
    premium: boolean;
    badge: string | null;
}

export type PracticeModeCardProps = {
    mode: PracticeModeProps;
    isPremium: boolean;
}

// Qué es lo que me importa recibir de un modo de práctica?
// * id 
// * mode 
// * title 
// * description 
// * premium 
// * badge (opcional, puede ser null)

// export type PracticeModeProps = {
//     isPremium: boolean;
//     mode: PracticeModeCardProps
// }

export type PracticeCardProps = {
    item : {
        id: number,
        title: string,
        subtitle: string,
        priority: string,
        subject: string,
        color: string,
        completed: boolean
    }
}

