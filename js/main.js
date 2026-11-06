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

// Regenerate the shooting star every hour
const shootingStar = document.querySelector(".shooting-star");
const shootingStar2 = shootingStar.cloneNode();
shootingStar.after(shootingStar2);

function launchShootingStar(star) {
    const maxX = Math.max(0, window.innerWidth - 500);
    const maxY = Math.max(0, window.innerHeight - 350);

    const startX = Math.random() * maxX;
    const startY = Math.random() * maxY;

    star.style.left = `${startX}px`;
    star.style.top = `${startY}px`;

    star.style.animation = "none";
    star.offsetWidth;
    star.style.animation = "shootingStar 2s ease-out forwards";
}

function scheduleShootingStars() {
    launchShootingStar(shootingStar);

    // 20% chance of a second shooting star
    if (Math.random() < 0.2) {
        setTimeout(() => {
            launchShootingStar(shootingStar2);
        }, 300 + Math.random() * 500);
    }

    const nextDelay = 5000 + Math.random() * 10000;
    setTimeout(scheduleShootingStars, nextDelay);
}

setTimeout(scheduleShootingStars, 3000);


// Companion hover effect
const companion = document.querySelector(".companion");

const interactiveSelector = [
    "a",
    "button",
    "input",
    "select",
    "textarea",
    "label",
    "summary",
    "[role='button']",
    "[role='link']",
    "[onclick]",
    "[tabindex]:not([tabindex='-1'])",
    "[contenteditable='true']"
].join(",");

const mimiSrc = "assets/images/companion64.gif";
const wynautSrc = "assets/images/wynaut64.gif";

document.addEventListener("mousemove", (event) => {
    const target = event.target.closest(interactiveSelector);

    if (target) {
        const isWhatIfCard = target.closest('[data-card-id="what-if"]');

        companion.src = isWhatIfCard ? wynautSrc : mimiSrc;

        companion.style.left = `${event.clientX}px`;
        companion.style.top = `${event.clientY}px`;
        companion.style.opacity = "1";
    } else {
        companion.style.opacity = "0";
        companion.src = mimiSrc;
    }
});

document.addEventListener("mouseleave", () => {
    companion.style.opacity = "0";
});