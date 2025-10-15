import { useEffect, useRef } from "react";
import { type Mesh, TextureLoader } from "three";
import { useFrame, useLoader } from "@react-three/fiber";

const ROTATION_SPEED = 0.7;
const STOP_ANGLE = Math.PI;
const DELAY = 5; // segundos

function useAboutMeCard() {
    const back = useLoader(TextureLoader, "/back_card.webp");
    const front = useLoader(TextureLoader, "/front_oswaldo.jpeg");
    const meshRef = useRef<Mesh>(null);

    // Refs auxiliares
    const startTimeRef = useRef<number | null>(null);
    const stoppedRef = useRef(false);

    const handleOpenAboutMeCard = () => {
        if (!stoppedRef.current) return;
    }

    useEffect(() => {
        if (!meshRef.current) return;

        meshRef.current.rotation.set(0, 0.5 * Math.PI, Math.PI * 2.14);
        meshRef.current.position.set(0, 0, 4.72);
    }, []);

    // useFrame((state) => {
    //     const mesh = meshRef.current;
    //     if (!mesh || stoppedRef.current) return;
    //
    //     // Inicializar tiempo de inicio al primer frame
    //     if (startTimeRef.current === null) {
    //         startTimeRef.current = state.clock.elapsedTime;
    //     }
    //
    //     // Verificar si ya pasaron los 5 segundos
    //     const elapsed = state.clock.elapsedTime - startTimeRef.current;
    //     if (elapsed < DELAY) return; // aún no empieza la animación
    //
    //     // Rotación
    //     const timeSinceDelay = elapsed - DELAY;
    //     mesh.rotation.y = 0.5 * Math.PI + timeSinceDelay * ROTATION_SPEED;
    //
    //     // Detener al llegar al frente
    //     if (Math.abs(mesh.rotation.y - STOP_ANGLE) < 0.02) {
    //         mesh.rotation.y = STOP_ANGLE;
    //         stoppedRef.current = true;
    //     }
    // });

    return {
        meshRef,
        front,
        back,
        handleOpenAboutMeCard,
    };
}

export default useAboutMeCard;