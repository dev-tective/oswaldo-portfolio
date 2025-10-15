import { Mesh, Texture, TextureLoader } from "three";
import { useEffect, useRef, useState } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { randomVelocity, squareRandomPosition } from "./move.ts";

const MAX_SPEED = 0.14;
const ROTATION_SPEED = 2;
const Z_BOUNDS = 5;
    
function useYGOCard3DMove(textures: Texture[]) {
    const back = useLoader(TextureLoader, "/back_card.webp");
    const [front, setFront] = useState<Texture>(textures[Math.floor(Math.random() * textures.length)]);
    
    const meshRef = useRef<Mesh>(null);
    const baseRotaRef = useRef(0)
    const baseVeloRef = useRef(0);

    useEffect(() => {
        if (!meshRef.current) return;

        baseRotaRef.current = Math.random() * Math.PI * 2;
        baseVeloRef.current = randomVelocity();

        const rotation = { x: Math.random() * Math.PI * 5, y: baseRotaRef.current, z: 0 };
        meshRef.current.position.copy(squareRandomPosition(Z_BOUNDS));
        meshRef.current.rotation.set(rotation.x, rotation.y, rotation.z);
    }, [front]);

    useFrame((state, delta) => {
        const mesh = meshRef.current;

        if (!mesh) return;

        // Movimiento en Z
        const velocity = baseVeloRef.current * (0.7 + 0.3 * Math.cos(state.clock.elapsedTime * 0.3));
        mesh.position.z += Math.max(delta, velocity* MAX_SPEED);

        // Reset si pasa el límite
        if (mesh.position.z > Z_BOUNDS) {
            setFront(textures[Math.floor(Math.random() * textures.length)]);
        }

        // Rotaciones
        mesh.rotation.y = baseRotaRef.current + state.clock.elapsedTime * ROTATION_SPEED;
        // mesh.rotation.x = Math.sin(state.clock.elapsedTime * ROTATION_SPEED * 0.5) * 0.6;
        // mesh.rotation.z = baseRotationRef.current + state.clock.elapsedTime * ROTATION_SPEED;
    });

    return {
        meshRef,
        front,
        back,
    }
}

export default useYGOCard3DMove;