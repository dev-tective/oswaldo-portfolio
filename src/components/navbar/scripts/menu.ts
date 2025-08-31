const btnMenu = document.getElementById("btn-menu") as HTMLButtonElement;
const menuMobile = document.getElementById("menu") as HTMLElement;

let touchStartX = 0;
let justSwiped = false;

const openMenu = () => menuMobile.classList.add("active");
const closeMenu = () => menuMobile.classList.remove("active");

const handleClickOutside = (event: MouseEvent) => {
    if (justSwiped) return;

    const target = event.target;

    if (
        menuMobile.classList.contains("active") &&
        target instanceof Node &&
        !menuMobile.contains(target) &&
        !btnMenu.contains(target)
    ) {
        closeMenu();
    }
};

const handleSwipe = (startX: number, endX: number) => {
    const swipeDistance = startX - endX;
    const minSwipeDistance = 80;

    if (Math.abs(swipeDistance) < minSwipeDistance) return;

    justSwiped = true;

    if (swipeDistance > 0 && !menuMobile.classList.contains("active")) {
        openMenu();
    } else if (swipeDistance < 0 && menuMobile.classList.contains("active")) {
        closeMenu();
    }

    setTimeout(() => justSwiped = false, 300);
};

const handleScroll = () => {
    if (menuMobile.classList.contains("active")) {
        closeMenu();
    }
};

const handleTouchStart = (e: TouchEvent) => {
    touchStartX = e.changedTouches[0].screenX;
};

const handleTouchEnd = (e: TouchEvent) => {
    const touchEndX = e.changedTouches[0].screenX;
    handleSwipe(touchStartX, touchEndX);
};

const setupListeners = () => {
    btnMenu.addEventListener("click", openMenu);
    document.addEventListener("click", handleClickOutside);
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("touchstart", handleTouchStart, { passive: true });
    document.addEventListener("touchend", handleTouchEnd);
};

setupListeners();