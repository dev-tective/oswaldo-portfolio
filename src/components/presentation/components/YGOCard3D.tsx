import * as THREE from "three";
import useYGOCard3DMove from "../hooks/useYGOCard3DMove.ts";

const scale = 0.4;

interface Props {
    fronts: THREE.Texture[];
}

const YgoCard3D = ({ fronts }: Props) => {
    const { meshRef, front, back } = useYGOCard3DMove(fronts);

    return (
        <mesh ref={meshRef}>
            <boxGeometry args={[0.295 * scale, 0.43 * scale, 0.005 * scale]}/>
            <meshBasicMaterial attach="material-0" color="gray"/>
            <meshBasicMaterial attach="material-1" color="gray"/>
            <meshBasicMaterial attach="material-2" color="gray"/>
            <meshBasicMaterial attach="material-3" color="gray"/>
            <meshBasicMaterial attach="material-4" map={back}/>
            <meshBasicMaterial attach="material-5" map={front}/>
        </mesh>
    )
};

export default YgoCard3D;