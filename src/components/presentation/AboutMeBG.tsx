import { useLoader } from "@react-three/fiber";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { type ReactNode, useEffect, useState } from "react";
import { TextureLoader } from "three";
import YgoCard3D from "./components/YGOCard3D.tsx";
import Sparkle from "./components/Sparkle.tsx";

const cardImages = [
    "/cards/6327734.jpg",
    "/cards/8251996.jpg",
    "/cards/12482652.jpg",
    "/cards/18377261.jpg",
    "/cards/23995346.jpg",
    "/cards/24643836.jpg",
    "/cards/38033125.jpg",
    "/cards/42941100.jpg",
    "/cards/43527730.jpg",
    "/cards/44649322.jpg",
    "/cards/46986418.jpg",
    "/cards/53174748.jpg",
    "/cards/54862960.jpg",
    "/cards/55410871.jpg",
    "/cards/57736667.jpg",
    "/cards/75771170.jpg",
    "/cards/78199891.jpg",
    "/cards/79335209.jpg",
    "/cards/80044027.jpg",
    "/cards/81260679.jpg",
    "/cards/90140980.jpg"
];

const AboutMeBG = () => {
    const fronts = useLoader(TextureLoader, cardImages);
    const [cards, setCards] = useState<ReactNode[]>([])

    useEffect(() => {
        const addCard = () => {
            setCards(prev => {
                if (prev.length >= 20) return prev;
                setTimeout(addCard, 700);
                return [...prev, <YgoCard3D key={prev.length} fronts={fronts} />];
            });
        }
        addCard();
    }, []);

    return (
        <>
            {/*<color args={["#04041f"]} attach="background"/>*/}
            {cards}

            {Array.from({ length: 5 })
                .map((_, i) => (
                    <Sparkle key={i} />
                ))
            }

            <EffectComposer multisampling={0}>
                <Bloom luminanceThreshold={2} mipmapBlur />
            </EffectComposer>
        </>
    )
};

export default AboutMeBG;