// Render Into My Mind cards
const mindGrid = document.getElementById("mind-grid");

if (mindGrid) {
    mindGrid.innerHTML = mindCards.map(card => `
        <button class="mind-card" data-card-id="${card.id}" type="button" aria-pressed="false">
            <div class="mind-card-front">
                <div class="mind-card-icon">${card.icon}</div>
                <h3>${card.title}</h3>
                <p>${card.teaser}</p>
            </div>

            <div class="mind-card-back">
                <div class="mind-card-heading">
                    <span>${card.icon}</span>
                    <h3>${card.title}</h3>
                </div>
                <p>
                ${card.description}
                ${card.easterEgg ? `
                    <span class="typo-easter-egg" tabindex="0">
                        ${card.easterEgg}
                        <span class="typo-message">You found me!</span>
                    </span>
                 ` : ""}
                </p>
            </div>
        </button>
    `).join("");
}

mindGrid.addEventListener("click", event => {
    const card = event.target.closest(".mind-card");

    if (!card) return;

    const isRevealed = card.classList.toggle("revealed");
    card.setAttribute("aria-pressed", isRevealed);
});


// Journey timeline
const journeyTimeline = document.getElementById("journey-timeline");

if (journeyTimeline) {
    journeyTimeline.innerHTML = journeyChapters.map((chapter, index) => `
        <button
            class="journey-milestone"
            data-chapter-index="${index}"
            type="button"
            aria-label="${chapter.year} - ${chapter.title}"
            aria-pressed="false">
            <span class="journey-milestone-dot"></span>
            <span class="journey-milestone-year">${chapter.year}</span>
        </button>
    `).join("");
}


// Journey chapter display
const journeyYear = document.getElementById("journey-year");
const journeyTitle = document.getElementById("journey-title");
const journeyDescription = document.getElementById("journey-description");
const journeyQuote = document.getElementById("journey-quote");
const journeyCardContent = document.getElementById("journey-card-content");

// Journey navigation
const journeyPrev = document.getElementById("journey-prev");
const journeyNext = document.getElementById("journey-next");

let currentChapterIndex = 0;

function renderJourneyChapter(index) {
    const chapter = journeyChapters[index];

    journeyYear.textContent = chapter.year;
    journeyTitle.textContent = chapter.title;
    journeyDescription.textContent = chapter.description;
    journeyQuote.textContent = `"${chapter.quote}"`;
    updateGalaxyUsage(index);

    journeyTimeline.querySelectorAll(".journey-milestone").forEach((button, i) => {
        const isActive = i === index;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", isActive);
    });

    journeyPrev.disabled = index === 0;
    journeyNext.disabled = index === journeyChapters.length - 1;
}

function animateJourneyChapter(index, direction) {
    const slideOutClass = direction === "next"
        ? "slide-out-left"
        : "slide-out-right";

    const slideInClass = direction === "next"
        ? "slide-in-right"
        : "slide-in-left";

    journeyCardContent.classList.add(slideOutClass);

    setTimeout(() => {
        renderJourneyChapter(index);

        journeyCardContent.classList.remove(slideOutClass);
        journeyCardContent.classList.add(slideInClass);

        // Allow the browser to register the starting position
        journeyCardContent.offsetWidth;

        requestAnimationFrame(() => {
            journeyCardContent.classList.remove(slideInClass);
        });

    }, 500);
}

// Display the first chapter
renderJourneyChapter(currentChapterIndex);

// Select a journey chapter
journeyTimeline.addEventListener("click", (event) => {
    const milestone = event.target.closest(".journey-milestone");

    if (!milestone) return;

    const index = Number(milestone.dataset.chapterIndex);

    currentChapterIndex = index;
    renderJourneyChapter(currentChapterIndex);
});


// Journey navigation
journeyPrev.addEventListener("click", () => {
    if (currentChapterIndex > 0) {
        currentChapterIndex--;
        animateJourneyChapter(currentChapterIndex, "previous");
    }
});

journeyNext.addEventListener("click", () => {
    if (currentChapterIndex < journeyChapters.length - 1) {
        currentChapterIndex++;
        animateJourneyChapter(currentChapterIndex, "next");
    }
});

// Technology galaxy configuration
const galaxyConfig = {
    padding: 8,          // Minimum distance from container edges (%)
    minDistance: 8,      // Minimum distance between stars (%)
    clusterRadius: 20,  // Radius for clustering stars (%)
    maxAttempts: 100     // Placement attempts before retrying
};

function createSeededRandom(seed) {
    let state = seed;

    return function () {
        state = (state + 0x6D2B79F5) | 0;

        let value = state;
        value = Math.imul(value ^ (value >>> 15), value | 1);
        value ^= value + Math.imul(value ^ (value >>> 7), value | 61);

        return ((value ^ (value >>> 14)) >>> 0) / 4294967296;
    };
}

function generateClusterCenters(random) {
    const categories = [...new Set(techStack.map(tech => tech.category))];

    return categories.reduce((centers, category) => {
        centers[category] = {
            x: galaxyConfig.padding + galaxyConfig.clusterRadius +
                random() * (100 - 2 * (galaxyConfig.padding + galaxyConfig.clusterRadius)),

            y: galaxyConfig.padding + galaxyConfig.clusterRadius +
                random() * (100 - 2 * (galaxyConfig.padding + galaxyConfig.clusterRadius))
        };

        return centers;
    }, {});
}

function generateStarPosition(existingPositions, random, center) {
    for (let attempt = 0; attempt < galaxyConfig.maxAttempts; attempt++) {
        const angle = random() * Math.PI * 2;
        const distance = Math.sqrt(random()) * galaxyConfig.clusterRadius;

        const position = {
            x: center.x + Math.cos(angle) * distance,
            y: center.y + Math.sin(angle) * distance
        };

        const isFarEnough = existingPositions.every(star => {
            const dx = position.x - star.x;
            const dy = position.y - star.y;

            const distance = Math.sqrt(dx * dx + dy * dy);

            return distance >= galaxyConfig.minDistance;
        });

        if (isFarEnough) {
            return position;
        }
    }

    return null;
}

// Generate technology star positions
function generateGalaxyLayout() {
    const random = createSeededRandom(12345);
    const positions = [];
    const clusterCenters = generateClusterCenters(random);

    techStack.forEach(tech => {
        const center = clusterCenters[tech.category];
        const position = generateStarPosition(positions, random, center);

        if (position) {
            positions.push({
                id: tech.id,
                category: tech.category,
                ...position
            });
        }
    });

    return positions;
}


const galaxyLayout = generateGalaxyLayout();

// Render technology stars
const techGalaxy = document.getElementById("tech-galaxy");

if (techGalaxy) {
    techGalaxy.innerHTML = `
        <button
            class="galaxy-expand"
            type="button"
            aria-label="Expand galaxy"
            title="Explore full screen">
            <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M8 3H3v5M16 3h5v5M3 16v5h5M21 16v5h-5"
                    fill="none"
                    stroke="currentColor"
                    stroke-width="1.8"
                    stroke-linecap="round"
                    stroke-linejoin="round"/>
            </svg>
        </button>
        <div class="galaxy-zoom-controls">
            <button class="galaxy-zoom-out" type="button" aria-label="Zoom out">−</button>
            <button class="galaxy-zoom-in" type="button" aria-label="Zoom in">+</button>
        </div>
        <div class="galaxy-world">
            <svg class="constellation-layer"></svg>
            ${galaxyLayout.map(star => `
                <div
                    class="tech-star"
                    data-tech-id="${star.id}"
                    data-usage="0"
                    style="
                        left: ${star.x}%;
                        top: ${star.y}%;
                    ">
                    <span class="tech-label">
                        ${techStack.find(tech => tech.id === star.id).name}
                    </span>
                </div>
            `).join("")}
        </div>
    `;
}


// Update technology star usage
function updateGalaxyUsage(chapterIndex) {
    const chapter = journeyChapters[chapterIndex];

    document.querySelectorAll(".tech-star").forEach(star => {
        const technology = chapter.technologies.find(
            tech => tech.id === star.dataset.techId
        );

        star.dataset.usage = technology?.usage ?? 0;
    });
}

// Apply usage for the initial chapter
updateGalaxyUsage(currentChapterIndex);

// Generate constellation connections
function generateConstellationLines(layout) {
    const categories = [...new Set(
        layout.map(star => star.category)
    )];

    const connections = [];

    categories.forEach(category => {
        const stars = layout.filter(
            star => star.category === category
        );

        if (stars.length < 2) return;

        const connected = [stars[0]];
        const remaining = stars.slice(1);

        while (remaining.length > 0) {
            let shortestDistance = Infinity;
            let closestPair = null;

            connected.forEach(from => {
                remaining.forEach(to => {
                    const dx = from.x - to.x;
                    const dy = from.y - to.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < shortestDistance) {
                        shortestDistance = distance;
                        closestPair = { from, to };
                    }
                });
            });

            connections.push({
                from: closestPair.from.id,
                to: closestPair.to.id
            });

            connected.push(closestPair.to);

            remaining.splice(
                remaining.indexOf(closestPair.to), 1
            );
        }
    });

    return connections;
}

const constellationLines = generateConstellationLines(galaxyLayout);


// Render constellation lines
const constellationLayer = techGalaxy.querySelector(
    ".constellation-layer"
);

if (constellationLayer) {
    constellationLayer.innerHTML = constellationLines.map(line => {
        const from = galaxyLayout.find(star => star.id === line.from);
        const to = galaxyLayout.find(star => star.id === line.to);

        return `
            <line
                x1="${from.x}%"
                y1="${from.y}%"
                x2="${to.x}%"
                y2="${to.y}%"
            />
        `;
    }).join("");
}

// Galaxy fullscreen toggle
const galaxyExpand = techGalaxy.querySelector(".galaxy-expand");

function centreGalaxyWorld() {
    galaxyOffsetX = 0;
    galaxyOffsetY = 0;

    galaxyWorld.style.setProperty("--galaxy-x", "0px");
    galaxyWorld.style.setProperty("--galaxy-y", "0px");
}

function toggleGalaxyFullscreen() {
    const isFullscreen = techGalaxy.classList.toggle("is-fullscreen");

    document.body.classList.toggle("galaxy-open", isFullscreen);

    galaxyExpand.setAttribute(
        "aria-label",
        isFullscreen ? "Close galaxy" : "Expand galaxy"
    );

    galaxyExpand.title = isFullscreen
        ? "Close full screen"
        : "Explore full screen";

    galaxyExpand.querySelector("path").setAttribute(
        "d",
        isFullscreen
            ? "M8 3v5H3 M16 3v5h5 M3 16h5v5 M21 16h-5v5"
            : "M8 3H3v5 M16 3h5v5 M3 16v5h5 M21 16v5h-5"
    );
    centreGalaxyWorld();
}

galaxyExpand.addEventListener("click", toggleGalaxyFullscreen);

// Close with Escape
document.addEventListener("keydown", event => {
    if (event.key === "Escape" &&
        techGalaxy.classList.contains("is-fullscreen")) {
        toggleGalaxyFullscreen();
    }
});

const galaxyWorld = techGalaxy.querySelector(".galaxy-world");

const galaxyZoomIn = techGalaxy.querySelector(".galaxy-zoom-in");
const galaxyZoomOut = techGalaxy.querySelector(".galaxy-zoom-out");

let galaxyZoom = 1;

function updateGalaxyZoom() {
    galaxyWorld.style.setProperty("--galaxy-zoom", galaxyZoom);
}

techGalaxy.addEventListener("wheel", (event) => {
    event.preventDefault();

    const zoomChange = event.deltaY < 0 ? 0.1 : -0.1;

    galaxyZoom = Math.max(
        0.6,
        Math.min(galaxyZoom + zoomChange, 2)
    );

    updateGalaxyZoom();
}, { passive: false });

galaxyZoomIn.addEventListener("click", () => {
    galaxyZoom = Math.min(galaxyZoom + 0.2, 2);
    updateGalaxyZoom();
});

galaxyZoomOut.addEventListener("click", () => {
    galaxyZoom = Math.max(galaxyZoom - 0.2, 0.6);
    updateGalaxyZoom();
});

let isDraggingGalaxy = false;
let galaxyStartX = 0;
let galaxyStartY = 0;
let galaxyOffsetX = 0;
let galaxyOffsetY = 0;

const galaxyPointers = new Map();

let pinchStartDistance = 0;
let pinchStartZoom = 1;

function getPinchDistance() {
    const points = [...galaxyPointers.values()];
    const dx = points[0].x - points[1].x;
    const dy = points[0].y - points[1].y;

    return Math.sqrt(dx * dx + dy * dy);
}

galaxyWorld.addEventListener("pointerdown", (event) => {
    galaxyPointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });

    galaxyWorld.setPointerCapture(event.pointerId);

    if (galaxyPointers.size === 2) {
        isDraggingGalaxy = false;
        pinchStartDistance = getPinchDistance();
        pinchStartZoom = galaxyZoom;
    } else if (galaxyPointers.size === 1) {
        isDraggingGalaxy = true;
        galaxyStartX = event.clientX - galaxyOffsetX;
        galaxyStartY = event.clientY - galaxyOffsetY;
    }
});

galaxyWorld.addEventListener("pointermove", (event) => {
    if (!galaxyPointers.has(event.pointerId)) return;

    galaxyPointers.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY
    });

    if (galaxyPointers.size >= 2) {
        const currentDistance = getPinchDistance();

        galaxyZoom = Math.max(
            0.6,
            Math.min(
                pinchStartZoom * currentDistance / pinchStartDistance,
                2
            )
        );

        updateGalaxyZoom();
        return;
    }

    if (isDraggingGalaxy) {
        galaxyOffsetX = event.clientX - galaxyStartX;
        galaxyOffsetY = event.clientY - galaxyStartY;

        galaxyWorld.style.setProperty("--galaxy-x", `${galaxyOffsetX}px`);
        galaxyWorld.style.setProperty("--galaxy-y", `${galaxyOffsetY}px`);
    }
});

function endGalaxyPointer(event) {
    galaxyPointers.delete(event.pointerId);

    if (galaxyPointers.size === 1) {
        const remainingPointer = [...galaxyPointers.values()][0];

        isDraggingGalaxy = true;
        galaxyStartX = remainingPointer.x - galaxyOffsetX;
        galaxyStartY = remainingPointer.y - galaxyOffsetY;
    } else {
        isDraggingGalaxy = false;
    }
}

galaxyWorld.addEventListener("pointerup", endGalaxyPointer);
galaxyWorld.addEventListener("pointercancel", endGalaxyPointer);