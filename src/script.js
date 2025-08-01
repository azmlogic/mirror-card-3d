const card = document.getElementById("card");

let isDragging = false;
let startX, startY;
let currentX = 0;
let currentY = 0;

let rotationX = 0;
let rotationY = 0;

// Für Auto-Rotation
let autoRotate = true;
let animationFrameId = null;

function animate() {
    if (autoRotate && !isDragging) {
        rotationY += 0.2; // Geschwindigkeit der Drehung
        card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
        currentY = rotationY;
    }
    animationFrameId = requestAnimationFrame(animate);
}

// animate() // Animation starten

card.addEventListener('pointerdown', (e) => {
    isDragging = true;
    startX = e.clientX;
    startY = e.clientY;
    card.setPointerCapture(e.pointerId);
    autoRotate = false;
});

card.addEventListener('pointermove', (e) => {
    if (!isDragging) return;

    // Abstand zur Startposition berechnen
    const dx = e.clientX - startX;
    const dy = e.clientY - startY;

    // neue Rotation basierend auf Bewegung
    rotationY = currentY + dx * 0.5; // L/R
    rotationX = currentX - dy * 0.5; // O/U

    card.style.transform = `rotateY(${rotationY}deg) rotateX(${rotationX}deg)`;
});

card.addEventListener('pointerup', (e) => {
    isDragging = false;
    currentX = rotationX;
    currentY = rotationY;
    card.releasePointerCapture(e.pointerId);

    setTimeout(() => {
        autoRotate = true;
    })
}, 2000);

card.addEventListener('click', () => {
  card.classList.toggle('is-flipped');
});