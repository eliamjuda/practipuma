type PracticeModeCardProps = {
    id: number;
    title: string;
    subtitle: string;
    color: string;
    image: string;
    badge: string | null;
    premium: boolean;
}



type PracticeModeProps = {
    isPremium: boolean;
    mode: PracticeModeCardProps
}

type PracticeCardProps = {
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

