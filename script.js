const map = document.getElementById("strategy-map");
let scale = 1;
let positionX = 0;
let positionY = 0;
let isDragging = false;
let startX, startY;

map.style.transform = `translate(${positionX}px, ${positionY}px) scale(${scale})`;

// Zoom Functionality
map.addEventListener("wheel", (event) => {
    event.preventDefault();
    let zoomIntensity = 0.1;
    let newScale = scale + (event.deltaY < 0 ? zoomIntensity : -zoomIntensity);

    // Set Zoom Limits
    if (newScale >= 0.5 && newScale <= 2.5) {
        scale = newScale;
        map.style.transform = `translate(${positionX}px, ${positionY}px) scale(${scale})`;
    }
});

// Drag/Pan Functionality
map.addEventListener("mousedown", (event) => {
    isDragging = true;
    startX = event.clientX - positionX;
    startY = event.clientY - positionY;
    map.style.cursor = "grabbing";
});

window.addEventListener("mousemove", (event) => {
    if (!isDragging) return;
    positionX = event.clientX - startX;
    positionY = event.clientY - startY;
    map.style.transform = `translate(${positionX}px, ${positionY}px) scale(${scale})`;
});

window.addEventListener("mouseup", () => {
    isDragging = false;
    map.style.cursor = "grab";
});

// Mobile Touch Controls (Pinch Zoom & Drag)
let touchStartDistance = 0;
let lastScale = scale;

map.addEventListener("touchstart", (event) => {
    if (event.touches.length === 2) {
        touchStartDistance = getTouchDistance(event);
        lastScale = scale;
    }
});

map.addEventListener("touchmove", (event) => {
    event.preventDefault();
    if (event.touches.length === 2) {
        let newDistance = getTouchDistance(event);
        let newScale = lastScale * (newDistance / touchStartDistance);

        if (newScale >= 0.5 && newScale <= 2.5) {
            scale = newScale;
            map.style.transform = `translate(${positionX}px, ${positionY}px) scale(${scale})`;
        }
    }
});

// Function to calculate distance between two touches
function getTouchDistance(event) {
    let dx = event.touches[0].clientX - event.touches[1].clientX;
    let dy = event.touches[0].clientY - event.touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
}
