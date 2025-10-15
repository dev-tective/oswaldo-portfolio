import { Canvas } from "@react-three/fiber";
import AboutMeBG from "./AboutMeBG.tsx";
import AboutMeCard from "./AboutMeCard.tsx";

const AboutMe = () => {
    return (
        <Canvas
            dpr={window.devicePixelRatio > 1 ? 1.5 : 1}
            camera={{
                fov: 75,        // Reducido de 100 para menos distorsión
                near: 0.002,
                far: 200,
            }}
            gl={{powerPreference: 'high-performance', antialias: false}}
        >
            <AboutMeBG />
            <AboutMeCard />
        </Canvas>
    )
};

export default AboutMe;