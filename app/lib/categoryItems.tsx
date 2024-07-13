import { BrainCircuit, Camera, VideoIcon } from "lucide-react";
import { ReactNode } from "react";

interface iAppProps {
    name: string;
    title: string;
    image: ReactNode;
    id: number;
}

export const categoryItems: iAppProps[] = [
    {
        id: 0,
        name: 'photographer',
        title: 'Photographer',
        image: <Camera/>,
    },
    {
        id: 1,
        name: 'filmmaker',
        title: 'Filmmaker',
        image: <VideoIcon/>,
    },
    {
        id: 2,
        name: 'aiartist',
        title: 'AI Artist',
        image: <BrainCircuit/>,
    },
]