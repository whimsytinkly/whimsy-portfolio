
const techStack = [
    // Languages & Web
    { id: "java", name: "Java", category: "languages" },
    { id: "sql", name: "SQL", category: "languages" },
    { id: "javascript", name: "JavaScript", category: "languages" },
    { id: "typescript", name: "TypeScript", category: "languages" },
    { id: "python", name: "Python", category: "languages" },
    { id: "html", name: "HTML", category: "languages" },
    { id: "css", name: "CSS", category: "languages" },

    // Frameworks & Libraries
    { id: "angularjs", name: "AngularJS", category: "frameworks" },
    { id: "react", name: "React", category: "frameworks" },
    { id: "jsp", name: "JSP", category: "frameworks" },

    // Platforms & Development
    { id: "android", name: "Android", category: "platforms" },
    { id: "pega", name: "Pega", category: "platforms" },
    { id: "openshift", name: "OpenShift", category: "platforms" },

    // Databases & Data
    { id: "mssql", name: "MSSQL", category: "databases" },
    { id: "db2", name: "DB2", category: "databases" },
    { id: "oracle", name: "Oracle", category: "databases" },
    { id: "cp4d", name: "CP4D", category: "databases" },

    // Messaging & Search
    { id: "kafka", name: "Kafka / Confluent", category: "messaging" },
    { id: "elastic", name: "Elastic", category: "search" },
    { id: "qliksense", name: "Qlik Sense", category: "analytics" },

    // Backend & Cloud Services
    { id: "firebase", name: "Firebase", category: "services" },

    // Backend & Cloud Services
    { id: "powerautomate", name: "Power Automate", category: "services" },

    // AI Tools
    { id: "chatgpt", name: "ChatGPT", category: "ai" },
    { id: "copilot", name: "Copilot", category: "ai" },
    { id: "claude", name: "Claude", category: "ai" }
];



const journeyChapters = [
    {
        id: "beginning",
        year: "2018",
        title: "The Beginning",
        description: "Stepping into the world of software engineering.",
        quote: "Every adventure starts with a first step.",
        technologies: [
            { id: "java", usage: 2 },
            { id: "sql", usage: 3 },
            { id: "javascript", usage: 2 },
            { id: "html", usage: 2 },
            { id: "css", usage: 2 },
            { id: "jsp", usage: 2 },
            { id: "angularjs", usage: 4 },
            { id: "android", usage: 5 },
            { id: "firebase", usage: 4 },
            { id: "pega", usage: 4 },
            { id: "oracle", usage: 3 },
            { id: "qliksense", usage: 4 }
        ]
    },
    {
        id: "explorer",
        year: "2019-2022",
        title: "The Explorer",
        description: "Exploring, learning, experimenting and giving things a go. Figuring things out, one challenge at a time.",
        quote: "Let's see what I can do.",
        technologies: [
            { id: "java", usage: 3 },
            { id: "sql", usage: 4 },
            { id: "javascript", usage: 3 },
            { id: "html", usage: 2 },
            { id: "css", usage: 2 },
            { id: "jsp", usage: 2 },
            { id: "android", usage: 5 },
            { id: "firebase", usage: 4 },
            { id: "pega", usage: 4 },
            { id: "oracle", usage: 3 },
            { id: "mssql", usage: 4 },
            { id: "qliksense", usage: 4 }
        ]
    },
    {
        id: "questioner",
        year: "2022-2025",
        title: "The Questioner",
        description: "Looking beyond whether something works. Questioning solutions, challenging approaches and wondering if there's a better way.",
        quote: "But... is there a better way?",
        technologies: [
            { id: "java", usage: 4 },
            { id: "sql", usage: 5 },
            { id: "javascript", usage: 3 },
            { id: "python", usage: 3 },
            { id: "html", usage: 3 },
            { id: "css", usage: 3 },
            { id: "jsp", usage: 2 },
            { id: "react", usage: 1 },
            { id: "pega", usage: 5 },
            { id: "mssql", usage: 3 },
            { id: "db2", usage: 4 },
            { id: "cp4d", usage: 3 },
            { id: "openshift", usage: 3 },
            { id: "kafka", usage: 3 },
            { id: "elastic", usage: 3 }
        ]
    },
    {
        id: "possibilities",
        year: "2026-",
        title: "The Possibilities",
        description: "With AI opening up new possibilities, ideas that once seemed out of reach are now things I can actually explore and build.",
        quote: "WAIT. I CAN DO THAT TOO?!",
        technologies: [
            { id: "java", usage: 4 },
            { id: "sql", usage: 5 },
            { id: "javascript", usage: 3 },
            { id: "typescript", usage: 2 },
            { id: "python", usage: 4 },
            { id: "html", usage: 5 },
            { id: "css", usage: 5 },
            { id: "jsp", usage: 2 },
            { id: "react", usage: 1 },
            { id: "pega", usage: 5 },
            { id: "mssql", usage: 4 },
            { id: "db2", usage: 4 },
            { id: "cp4d", usage: 4 },
            { id: "openshift", usage: 4 },
            { id: "kafka", usage: 3 },
            { id: "elastic", usage: 3 },
            { id: "powerautomate", usage: 4 },
            { id: "chatgpt", usage: 4 },
            { id: "copilot", usage: 2 },
            { id: "claude", usage: 4 }
        ]
    }
];


window.techStack = techStack;
window.journeyChapters = journeyChapters;