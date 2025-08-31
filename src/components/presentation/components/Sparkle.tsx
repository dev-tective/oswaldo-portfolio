import useSparkleMove, { type SparkleMove } from "../hooks/useSparkleMove.ts";

const colors: [number, number, number][] = [
    [1.5, 2, 8],   // azul eléctrico
    [10, 2, 8],    // fucsia neón
    [2, 8, 2],     // verde brillante
    [8, 4, 1.5],   // naranja fuego
    [6, 1.5, 8],   // púrpura intenso
    [1.5, 8, 7],   // turquesa
    [8, 8, 1.5],   // amarillo neón
    [8, 3, 3],     // rojo carmesí
    [3, 6, 8],     // azul celeste
    [5, 8, 4],     // verde lima
];

const Sparkle = () => {
    const {meshRef, countStarship} = useSparkleMove();

    return (
        <instancedMesh ref={meshRef}
                       args={[undefined, undefined, countStarship]}
        >
            <capsuleGeometry args={[0.015,0]}/>
            <meshBasicMaterial color={colors[Math.floor(Math.random() * colors.length)]}/>
        </instancedMesh>
    )
};

export default Sparkle;