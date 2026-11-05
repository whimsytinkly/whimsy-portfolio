// ========================================
// WHIMSY PORTFOLIO — STARFIELD
// ========================================

// Creates a repeatable random number generator
function createRandomGenerator(seed) {
    let value = seed;

    return function () {
        value = (value * 16807) % 2147483647;
        return (value - 1) / 2147483646;
    };
}

// Give each visitor a unique ID
function getVisitorId() {
    let visitorId = localStorage.getItem("whimsyVisitorId");

    if (!visitorId) {
        visitorId = crypto.randomUUID();
        localStorage.setItem("whimsyVisitorId", visitorId);
    }

    return visitorId;
}

const visitorId = getVisitorId();

// Create a seed based on visitor + current hour
function getHourlySeed(visitorId) {
    const now = new Date();

    const year = now.getUTCFullYear();
    const month = now.getUTCMonth();
    const day = now.getUTCDate();
    const hour = now.getUTCHours();

    const timeKey = `${year}-${month}-${day}-${hour}`;

    const combined = `${visitorId}-${timeKey}`;

    // Convert the combined string into a number
    let seed = 0;

    for (let i = 0; i < combined.length; i++) {
        seed = (seed * 31 + combined.charCodeAt(i)) >>> 0;
    }

    return seed;
}

const hourlySeed = getHourlySeed(visitorId);
const random = createRandomGenerator(hourlySeed);

// Create a single star
function createStar() {
    const star = document.createElement("div");
    star.classList.add("star");

    // Random position
    star.style.left = `${random() * 100}%`;
    star.style.top = `${random() * 100}%`;

    // Random size: 1px to 3px
    const size = 1 + random() * 2;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;

    // Random brightness
    const brightness = 0.3 + random() * 0.7;
    star.style.setProperty("--star-brightness", brightness);
    star.style.setProperty("--star-dim", brightness * 0.35);

    // Random twinkle timing
    star.style.animationDuration = `${2 + random() * 5}s`;
    star.style.animationDelay = `${-random() * 7}s`;

    return star;
}

// Populate the starfield
function generateStarfield() {
    const starfield = document.getElementById("starfield");

    // Clear existing stars
    starfield.innerHTML = "";

    // Create 120 stars
    const starCount = 120;

    for (let i = 0; i < starCount; i++) {
        const star = createStar();
        starfield.appendChild(star);
    }
}

// Generate our universe!
generateStarfield();


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


const portalcore = document.querySelector(".portal-core");
const companion = document.querySelector(".portal-companion");

portalcore.addEventListener("mouseenter", () => {
    companion.style.opacity = "1";
});

portalcore.addEventListener("mouseleave", () => {
    companion.style.opacity = "0";
});

portalcore.addEventListener("mousemove", (event) => {
    companion.style.left = `${event.clientX}px`;
    companion.style.top = `${event.clientY}px`;
});