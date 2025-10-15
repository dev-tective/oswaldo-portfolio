const card = document.getElementById("card")!;
const back = document.getElementById("back")!;
const left = document.getElementById("left")!;
const right = document.getElementById("right")!;
const bottom = document.getElementById("bottom")!;
const top = document.getElementById("top")!;

let w = card.clientWidth;
let h = card.clientHeight;

function updateDepth() {
    w = card.clientWidth;
    h = card.clientHeight;
    const depth = w * 0.025;

    // Dorso
    back.style.transform = `translate3d(0,0,-${depth}px) rotateY(180deg)`;

    // Lados verticales
    left.style.width = `${depth}px`;
    left.style.transform = `rotate3d(0,1,0, 90deg)`;

    right.style.width = `${depth}px`;
    right.style.transform = `rotate3d(0,1,0, -90deg) translate3d(0,0, ${depth - w}px)`;

    // Lados horizontales
    bottom.style.height = `${depth}px`;
    bottom.style.transform = `rotate3d(1,0,0, 90deg) translate3d(0,0, ${depth - h}px)`;

    top.style.height = `${depth}px`;
    top.style.transform = `rotate3d(1,0,0, -90deg)`;
}

updateDepth();
window.addEventListener("resize", updateDepth);