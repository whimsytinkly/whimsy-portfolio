// Generate Strands for Portal (whirl whirl)
function generateStrandSVG() {
    return `
        <svg class="portal-strands" viewBox="0 0 240 240" aria-hidden="true">
                            <g fill="none" stroke="#b49aff" stroke-linecap="round">

                                <!-- Main intertwined loops -->
                                <path d="M 120 20
                 C 177 18, 224 73, 205 125
                 C 187 177, 130 213, 83 183
                 C 36 153, 43 91, 83 67
                 C 117 47, 158 65, 166 101" stroke-width="1.7" opacity="0.75" />

                                <path d="M 46 43
                 C 91 2, 164 27, 193 75
                 C 223 125, 184 190, 133 202
                 C 80 215, 29 171, 39 119
                 C 47 77, 89 56, 119 81" stroke-width="1.4" opacity="0.65" />

                                <path d="M 18 113
                 C 27 54, 94 20, 143 47
                 C 191 73, 198 133, 157 168
                 C 116 203, 58 184, 52 143
                 C 47 109, 78 83, 108 94" stroke-width="1.2" opacity="0.7" />

                                <path d="M 84 12
                 C 145 3, 211 53, 218 111
                 C 225 171, 164 222, 107 214
                 C 51 206, 17 155, 35 105
                 C 51 61, 96 48, 132 72" stroke-width="1.8" opacity="0.55" />

                                <!-- Secondary weaving loops -->
                                <path d="M 35 76
                 C 65 22, 145 25, 181 72
                 C 214 116, 178 166, 137 159
                 C 96 152, 83 113, 111 85
                 C 139 57, 176 77, 190 111" stroke-width="0.9" opacity="0.8" />

                                <path d="M 57 190
                 C 17 151, 32 82, 80 52
                 C 127 23, 185 52, 198 101
                 C 211 149, 169 190, 124 181
                 C 86 174, 73 139, 91 113" stroke-width="1.1" opacity="0.6" />

                                <path d="M 12 137
                 C 38 192, 102 226, 158 194
                 C 207 166, 215 102, 176 65
                 C 145 35, 102 46, 91 78" stroke-width="0.8" opacity="0.55" />

                            </g>
                        </svg>
    `;
}

// Generate Portal 
function createPortalMarkup(project) {
    return `
    <div class="project-item">
        <div class="project-portal is-interactive project-portal-${project.id}" data-project-id="${project.id}">
            <div class="portal-aura"></div>
            ${generateStrandSVG()}
            <div class="portal-opening">
                ${project.icon ? `<span class="portal-icon">${project.icon}</span>` : ""}
            </div>
            <div class="portal-wisps"></div>
        </div>
        <span class="project-name">${project.name}</span>
    </div>
`;
}

// Generate all project portals
function renderProjects() {
    const portalContainer = document.querySelector(".projects-portals");

    portalContainer.innerHTML = projects
        .map(project => createPortalMarkup(project))
        .join("");
}

// Summon the portals!
renderProjects();

// ==============================
// Project Modal
// ==============================

const projectModal = document.getElementById("project-modal");
const modalClose = document.querySelector(".modal-close");

const modalTitle = document.getElementById("modal-title");
const modalDescription = document.getElementById("modal-description");
const modalQuote = document.getElementById("modal-quote");
const modalTechStack = document.getElementById("modal-tech-stack");
const modalLink = document.getElementById("modal-link");

const originalParent = companion.parentElement;
const originalNextSibling = companion.nextSibling;

// Open project modal
function openProjectModal(projectId) {
    const project = projects.find(project => project.id === projectId);

    if (!project) return;

    modalTitle.textContent = `${project.icon} ${project.name}`;
    modalDescription.textContent = project.description;
    modalQuote.textContent = project.quote;

    // Generate tech stack labels
    modalTechStack.innerHTML = project.techStack
        .map(tech => `<span class="tech-tag">${tech}</span>`)
        .join("");

    // Configure project link
    modalLink.href = project.url;
    modalLink.style.display = project.status === "wip" ? "none" : "inline-flex";

    projectModal.showModal();
    projectModal.appendChild(companion);
}

// Close project modal
function closeProjectModal() {
    originalParent.insertBefore(companion, originalNextSibling);
    projectModal.close();
}

// Portal click listener
document.querySelector(".projects-portals").addEventListener("click", event => {
    const portal = event.target.closest(".project-portal");

    if (!portal) return;

    openProjectModal(portal.dataset.projectId);
});

// Close button
modalClose.addEventListener("click", closeProjectModal);

// Close when clicking backdrop
projectModal.addEventListener("click", event => {
    if (event.target === projectModal) {
        closeProjectModal();
    }
});