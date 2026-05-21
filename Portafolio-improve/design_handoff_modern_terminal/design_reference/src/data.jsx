// Portfolio data — content sourced from existing translations.

const SKILLS = [
  { title: "Frontend",  letter: "F", items: ["React", "Next.js", "TypeScript", "Tailwind CSS"] },
  { title: "Backend",   letter: "B", items: [".NET", "Entity Framework", "Node.js", "Nest.js", "FastAPI"] },
  { title: "Databases", letter: "D", items: ["PostgreSQL", "SQL Server", "MongoDB", "Redis", "Supabase"] },
  { title: "Cloud & DevOps", letter: "C", items: ["Docker", "Ubuntu Server", "CI/CD", "GitHub Actions", "GCP"] },
  { title: "Tools",     letter: "T", items: ["Git", "Postman", "Swagger", "Jira", "Claude Code", "Codex"] },
  { title: "Concepts",  letter: "K", items: ["Clean Architecture", "Multi-tenancy", "Event-Driven", "Microservices", "Caching"] },
];

const PROJECTS = [
  {
    key: "slive",
    name: "Slive",
    glyph: "SL",
    tech: [".NET", "Next.js", "MongoDB", "PostgreSQL", "Redis", "Docker"],
    url: "https://slive.ai/",
    github: null,
    summary: "Comprehensive cloud-based administrative system for retail — sales, inventory, POS, and proprietary AI for predictive analytics and strategic business guidance.",
    long: "Enterprise-grade retail management suite orchestrating point-of-sale, inventory, CRM, and analytics from a unified cloud console. Includes proprietary AI for predictive forecasting, anomaly detection, and a recommendation engine tuned to each merchant's catalog.",
    gallery: ["assets/slive/sliveMenu.png", "assets/slive/sliveChat.png", "assets/slive/SLIVE2.png"],
    cover: "assets/slive/SLIVE2.png",
  },
  {
    key: "sentiment",
    name: "Sentiment Analyzer",
    glyph: "SA",
    tech: ["Python", "Next.js", "FastAPI"],
    url: "https://happy-face-sentiment-analyzer.vercel.app/",
    github: "https://github.com/raulmalagarriga/sentimentAnalyzer",
    summary: "API that determines the emotional tone of text — positive, neutral, or negative — and assigns a polarity score.",
    long: "Full-stack sentiment analysis toolkit that scores customer feedback in real time through an intuitive dashboard. Backed by a FastAPI service, a Next.js frontend, and a tunable polarity model with batch and streaming endpoints.",
    gallery: ["assets/sentiment/SentimentNeutral.png", "assets/sentiment/SentimentHappy.png"],
    cover: "assets/sentiment/SentimentHappy.png",
  },
  {
    key: "battleship",
    name: "Battleship Game",
    glyph: "BS",
    tech: ["Node.js", "JavaScript", "Express", "Socket.io"],
    github: "https://github.com/raulmalagarriga/Battleship_game",
    summary: "Classic multiplayer battleship game with integrated real-time chat.",
    long: "Multiplayer Battleship experience featuring synchronized gameplay, room-based matchmaking, persistent match state, and an integrated real-time chat over websockets.",
    gallery: ["assets/battleship/Playing.png", "assets/battleship/Waiting.png"],
    cover: "assets/battleship/Playing.png",
  },
  {
    key: "pulse",
    name: "PULSE",
    glyph: "PL",
    tech: ["Node.js", "TypeScript", "MongoDB", "React Native", "Next.js", "Docker"],
    url: "https://www.pulsefit.app/en",
    github: null,
    summary: "Mobile app for personal trainers — automates client management, payments, and progress metrics, with an AI workout-plan generator.",
    long: "Mobile-first platform empowering personal trainers to manage clients, programs, and billing effortlessly. Includes an AI workout-plan generator that produces precise programs adapted to each client's goals and constraints.",
    gallery: ["assets/pulse/landing.png", "assets/pulse/landing2.png", "assets/pulse/pulseinterfaz.png"],
    cover: "assets/pulse/landing.png",
  },
];

const LINKS = [
  { name: "GitHub",   icon: "github",   desc: "Check out my code repositories and contributions", url: "https://github.com/raulmalagarriga" },
  { name: "LinkedIn", icon: "linkedin", desc: "Connect with me professionally",                    url: "https://www.linkedin.com/in/rjmalagarrigat/" },
  { name: "Blog",     icon: "medium",   desc: "Read my articles and tutorials",                     url: "https://medium.com/@rjmalagarrigat" },
  { name: "Resume",   icon: "download", desc: "Download my resume in PDF format",                   url: "#" },
];

const TITLES = ["Fullstack Developer.", "Software Architect.", "Computer Engineer."];

const SECTIONS = [
  { id: "home",     label: "home",     file: "index.tsx",     num: "01" },
  { id: "about",    label: "about",    file: "about.tsx",     num: "02" },
  { id: "projects", label: "projects", file: "projects.tsx",  num: "03" },
  { id: "links",    label: "links",    file: "links.tsx",     num: "04" },
  { id: "contact",  label: "contact",  file: "contact.tsx",   num: "05" },
];

// Deterministic pseudo-random heatmap (so it doesn't flicker on rerender)
function makeHeatmap(weeks = 26, daysPerWeek = 7, seed = 7) {
  let s = seed;
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280; };
  const arr = [];
  for (let i = 0; i < weeks * daysPerWeek; i++) {
    const v = rnd();
    const level = v < 0.45 ? 0 : v < 0.7 ? 1 : v < 0.86 ? 2 : v < 0.96 ? 3 : 4;
    arr.push(level);
  }
  return arr;
}

Object.assign(window, { SKILLS, PROJECTS, LINKS, TITLES, SECTIONS, makeHeatmap });
