
function createPortalParticles() {
    const container = document.querySelector(".portal-particles");
    const particleCount = 18;

    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement("div");
        particle.classList.add("portal-particle");

        const size = 1 + Math.random() * 2;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;

        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        const driftX = (Math.random() - 0.5) * 24;
        const driftY = (Math.random() - 0.5) * 24;

        particle.style.setProperty("--drift-x", `${driftX}px`);
        particle.style.setProperty("--drift-y", `${driftY}px`);
        particle.style.setProperty("--particle-speed", `${3 + Math.random() * 5}s`); particle.style.animationDelay = `${-Math.random() * 8}s`;

        container.appendChild(particle);
    }
}

createPortalParticles();