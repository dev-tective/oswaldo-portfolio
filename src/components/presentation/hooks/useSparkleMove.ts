import { useEffect, useRef, useState } from "react";
import { InstancedMesh } from "three";
import { useFrame } from "@react-three/fiber";
import { circleRandomPosition, randomVelocity, temp, tempColor, tempObject, tempPos } from "./move.ts";

const MAX_SCALE = 170;
const MAX_SPEED = 2;
const Z_BOUNDS = 20;

const randomCount = () => {
    return Math.floor(Math.random() * 10) + 1;
}

function useSparkleMove() {
    const [countStarship, setCountStarship] = useState(randomCount())
    const meshRef = useRef<InstancedMesh>(null);
    const velocityRef = useRef<number>(0);

    useEffect(() => {
        const resetStarship = () => {
            if (!meshRef.current) return;

            velocityRef.current = randomVelocity();

            for (let i = 0; i < countStarship; i++) {
                tempPos.copy(circleRandomPosition(Z_BOUNDS))
                tempObject.position.copy(tempPos)
                tempObject.updateMatrix();
                meshRef.current.setMatrixAt(i, tempObject.matrix);
            }
        }

        resetStarship();
    }, [countStarship]);

    useFrame((state, delta) => {
        if (!meshRef.current) return;

        for (let i = 0; i < countStarship; i++) {
            meshRef.current.getMatrixAt(i, temp);

            const velocity = velocityRef.current * (0.7 + 0.3 * Math.cos(state.clock.elapsedTime * 0.3));

            // update scale
            tempObject.scale.set(1, 1, Math.max(1, velocity * MAX_SCALE));

            // update position
            tempPos.setFromMatrixPosition(temp);

            if (tempPos.z > Z_BOUNDS / 4) {
                setCountStarship(randomCount());
                return;
            }

            tempPos.z += Math.max(delta, velocity * MAX_SPEED);
            tempObject.position.copy(tempPos);

            // apply transforms
            tempObject.updateMatrix();
            meshRef.current.setMatrixAt(i, tempObject.matrix);

            // update and apply color
            // tempColor.r = tempColor.g = tempColor.b = 1 - tempPos.z / (-Z_BOUNDS / 2);

            meshRef.current.setColorAt(i, tempColor);
        }

        meshRef.current.instanceMatrix.needsUpdate = true;

        if (meshRef.current.instanceColor)
            meshRef.current.instanceColor.needsUpdate = true;
    });

    return {
        meshRef,
        countStarship,
    }
}

export default useSparkleMove;