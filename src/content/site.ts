// Single source of truth for all portfolio content.
// Update text, links, projects, and experience here.

export type Accent = "lavender" | "butter" | "pink" | "blue";

// Tailwind class lookups so colors are JIT-safe (no dynamic class names).
export const accentClasses: Record<
  Accent,
  { text: string; soft: string; bg: string; border: string; dot: string }
> = {
  lavender: {
    text: "text-lavender",
    soft: "bg-lavender-soft",
    bg: "bg-lavender-bold",
    border: "border-lavender",
    dot: "bg-lavender-bold",
  },
  butter: {
    text: "text-butter",
    soft: "bg-butter-soft",
    bg: "bg-butter-bold",
    border: "border-butter",
    dot: "bg-butter-bold",
  },
  pink: {
    text: "text-pink",
    soft: "bg-pink-soft",
    bg: "bg-pink-bold",
    border: "border-pink",
    dot: "bg-pink-bold",
  },
  blue: {
    text: "text-blue",
    soft: "bg-blue-soft",
    bg: "bg-blue-bold",
    border: "border-blue",
    dot: "bg-blue-bold",
  },
};

export const skillPalette: Accent[] = ["lavender", "butter", "pink", "blue"];

export const profile = {
  name: "Rusha Bhavesh Mistry",
  shortName: "Rusha",
  initials: "RM",
  role: "Software Engineer",
  location: "Long Beach, CA",
  email: "rusha406@gmail.com",
  linkedin: "https://www.linkedin.com/in/rusha-mistry-b3b422229/",
  status: "exploring software engineering & data roles",
};

export const hero = {
  greeting: "Hi, I'm Rusha",
  headline: ["I build the systems", "behind the data."],
  subline:
    "Software engineer building Python backends, REST APIs, and AI-powered applications with a focus on LLM systems, RAG, and reliable, well-tested software.",
};

export const about = {
  paragraphs: [
    "I'm a software engineer building Python backends, REST APIs, and AI-powered applications. I focus on shipping reliable, scalable, and well-tested software from ETL pipelines and event-driven automation to services that stay dependable in production.",
    "I'm skilled in large language model (LLM) systems, retrieval-augmented generation (RAG), and machine learning, with hands-on work across semantic search, embeddings, prompt engineering, and model evaluation.",
  ],
  facts: [
    { label: "Open to", value: "Software engineering roles" },
    { label: "Based in", value: "Long Beach, CA" },
    { label: "Focus", value: "Backend · APIs · AI/ML" },
  ],
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location?: string;
  summary: string;
  highlights: string[];
  stack: string[];
  accent: Accent;
};

export const experience: Experience[] = [
  {
    company: "PayGURU Technosoft Private Limited",
    role: "Python Engineer",
    period: "Dec 2023 to Dec 2024",
    location: "Vadodara, India",
    accent: "pink",
    summary:
      "Built and maintained Python backend services and REST APIs across 25+ client sites for 5,000+ active users.",
    highlights: [
      "Built and maintained 10+ Python backend services and REST APIs (FastAPI) across 25+ client sites, cutting manual operations by 60%+ via automated onboarding, sync, and reporting.",
      "Designed ETL and data pipelines processing 50,000+ daily records into validated datasets, with monitoring and alerting that sustained 99.5%+ uptime in production.",
      "Developed event-driven automation services and scheduled jobs in Python to streamline repetitive operational workflows.",
      "Triaged and resolved 100+ defects via root-cause analysis and hotfix deployments for 5,000+ active users.",
    ],
    stack: ["Python", "FastAPI", "REST APIs", "ETL", "AsyncIO", "Event-Driven"],
  },
  {
    company: "SlashMark IT",
    role: "Data Science Intern",
    period: "Sep 2023 to Jan 2024",
    location: "Remote",
    accent: "blue",
    summary:
      "Developed Python and SQL backend APIs and data workflows supporting 2,000+ users.",
    highlights: [
      "Developed Python and SQL backend APIs and data workflows supporting 2,000+ users, taking 3+ features end-to-end from scoping to deployment.",
      "Built data processing and image classification modules with Python ML libraries, reducing manual review effort by approximately 35%.",
      "Refactored legacy services and added unit tests to eliminate recurring production failures.",
    ],
    stack: ["Python", "SQL", "ML", "pytest", "Git"],
  },
];

export type ProjectIcon = "flame" | "sprout";

export type Project = {
  title: string;
  tagline: string;
  description: string;
  highlights: string[];
  stack: string[];
  tag: string;
  accent: Accent;
  icon: ProjectIcon;
};

export const projects: Project[] = [
  {
    title: "LLM-Powered Knowledge Assistant",
    tagline: "RAG over a large knowledge base",
    accent: "lavender",
    icon: "sprout",
    description:
      "An LLM-powered retrieval-augmented generation (RAG) application that answers natural-language questions over a large knowledge base using semantic search and source-grounded generation.",
    highlights: [
      "Engineered the retrieval pipeline, including chunking, embeddings, and vector search over pgvector with reranking, to improve relevance and minimize hallucinations.",
      "Added a RAGAS-style evaluation harness to catch quality regressions and flag low-confidence responses before output.",
      "Containerized the service with Docker.",
    ],
    stack: ["Python", "FastAPI", "LangChain", "OpenAI API", "pgvector", "Docker"],
    tag: "LLM · RAG",
  },
  {
    title: "Real-Time Risk Detection & Alerting Pipeline",
    tagline: "Vision + weather fused for context-aware alerts",
    accent: "pink",
    icon: "flame",
    description:
      "A real-time pipeline that trains a CNN image classifier and fuses predictions with live weather APIs to generate context-aware risk alerts.",
    highlights: [
      "Cut end-to-end inference latency by 50%+ using AsyncIO-based concurrent fetching and batched TensorFlow inference.",
      "Structured modular, independently testable components (ingestion, validation, inference, alerting) for reliable deployment.",
    ],
    stack: ["Python", "TensorFlow", "OpenCV", "AsyncIO", "REST APIs"],
    tag: "ML · Real-Time",
  },
  {
    title: "NLP Sentiment Analysis & Triage System",
    tagline: "Dual-model classification with SQL persistence",
    accent: "blue",
    icon: "sprout",
    description:
      "A dual-model NLP pipeline combining lexicon scoring and fine-tuned BERT for sentiment classification, with results persisted to a normalized SQL schema.",
    highlights: [
      "Built a dual-model NLP pipeline (lexicon scoring plus fine-tuned BERT) for sentiment classification, benchmarking accuracy trade-offs and persisting results to a normalized SQL schema.",
    ],
    stack: ["Python", "Hugging Face", "BERT", "NLTK", "SQL"],
    tag: "NLP · Data",
  },
];

export type SkillGroup = {
  label: string;
  items: string[];
  accent: Accent;
};

export const skills: SkillGroup[] = [
  {
    label: "Languages",
    accent: "lavender",
    items: ["Python", "Java", "C/C++", "SQL", "JavaScript/TypeScript", "HTML/CSS"],
  },
  {
    label: "AI / ML / LLM",
    accent: "butter",
    items: [
      "LLM Applications",
      "RAG",
      "Prompt Engineering",
      "Embeddings",
      "Semantic Search",
      "NLP",
      "Transformers",
      "TensorFlow",
      "Hugging Face",
      "scikit-learn",
      "OpenAI API",
      "LangChain",
    ],
  },
  {
    label: "Backend & APIs",
    accent: "pink",
    items: [
      "FastAPI",
      "Flask",
      "REST API Design",
      "AsyncIO",
      "Event-Driven Architecture",
    ],
  },
  {
    label: "Data & DevOps",
    accent: "blue",
    items: [
      "PostgreSQL (pgvector)",
      "MySQL",
      "MongoDB",
      "Vector Databases",
      "Data Pipelines",
      "Pandas",
      "NumPy",
      "AWS",
      "Azure",
      "Docker",
      "CI/CD (GitHub Actions)",
      "Git",
      "pytest",
      "Postman",
      "RAGAS",
    ],
  },
];

export type Education = {
  school: string;
  degree: string;
  detail: string;
  period: string;
  location: string;
};

export const education: Education[] = [
  {
    school: "California State University, Long Beach (CSULB)",
    degree: "M.S., Computer Science",
    detail:
      "GPA 3.7 / 4.0 · Coursework: Advanced AI, Machine Learning, NLP, Algorithms, Database Systems, Distributed Systems",
    period: "Expected 2027",
    location: "Long Beach, CA",
  },
  {
    school: "Parul Institute of Engineering & Technology",
    degree: "B.Tech, Computer Science & Engineering",
    detail: "GPA 8.04 / 10",
    period: "2024",
    location: "Vadodara, India",
  },
];

export const certifications: string[] = [
  "Microsoft AZ-900 (Azure Fundamentals)",
  "Microsoft PL-900 (Power Platform)",
  "Machine Learning Specialization (Coursera)",
  "Google Data Analytics (Coursera)",
  "Winner, Pseudo Heist regional tech fest",
];

// Coffee recommendations around LA. Add your favorite spots here —
// fill in name + neighborhood (and an optional one-line note).
export type CoffeeSpot = {
  name: string;
  area: string;
  note?: string;
};

export const coffeePlaces: CoffeeSpot[] = [
  { name: "La La Land Kind Cafe", area: "Los Angeles" },
  { name: "Chamberlain Coffee", area: "Los Angeles" },
  { name: "Salted Butter Company", area: "Los Angeles" },
  { name: "Reinne's Place", area: "Long Beach" },
  { name: "BLK Dot Coffee", area: "Long Beach" },
];

export const navLinks = [
  { label: "About", href: "#about" },
  { label: "Work", href: "#work" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];
