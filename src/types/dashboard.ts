export type PracticeModeCardProps = {
    id: number;
    title: string;
    subtitle: string;
    color: string;
    image: string;
    badge: string | null;
    premium: boolean;
}



export type PracticeModeProps = {
    isPremium: boolean;
    mode: PracticeModeCardProps
}

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

