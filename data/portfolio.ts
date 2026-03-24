export type SkillGroup = {
  label: string;
  items: string[];
};

export type ExperienceItem = {
  period: string;
  role: string;
  company: string;
  companyUrl: string;
  description: string;
  highlights: string[];
};

export type Project = {
  title: string;
  description: string;
  stack: string[];
  github?: string;
  live?: string;
  publication?: string;
  featured?: boolean;
};

export const portfolio = {
  name: "Dhriti Shah",
  title: "Backend Engineer",
  tagline:
    "I build backend systems that handle real workloads — payment pipelines, IoT telemetry, and APIs that teams in production actually depend on.",
  headline: {
    prefix: "Building systems that",
    emphasis: "actually scale.",
  },
  location: "Pune, Maharashtra, India",
  email: "dhritishah03@gmail.com",
  github: "https://github.com/Dhritishah03",
  linkedin: "https://www.linkedin.com/in/dhriti-shah-636969224/",
  resumeUrl: "/resume.pdf",
  available: true,

  about: {
    paragraphs: [
      "I'm a backend engineer with production experience building payment systems, IoT data pipelines, and internal tooling at Repos Energy — India's largest portable fuel delivery network. I work across the full lifecycle of a feature, from system design to deployment, and I'm comfortable owning complex third-party integrations end-to-end.",
      "One project I'm proud of: I designed Repos' MQTT-based IoT ingestion pipeline from scratch, configuring the AWS MQTT broker and a two-topic system per connected device. It brought real-time volume totalizer refresh rates up by 60% and runs in production handling telemetry from hundreds of live stations.",
      "I also co-authored a published research paper on sports foul detection using EfficientNetB0, achieving 98% accuracy — a project that came out of a Capgemini collaboration. Outside engineering, I led Innovation Hub's hackathon department, managing 40+ members and running three major tech events.",
    ],
  },

  skills: [
    {
      label: "LANGUAGES",
      items: ["Python", "JavaScript", "C++", "SQL", "C"],
    },
    {
      label: "BACKEND & INFRA",
      items: [
        "Django",
        "Node.js",
        "Express.js",
        "Next.js",
        "PostgreSQL",
        "Redis",
        "MongoDB",
        "Docker",
        "AWS",
        "MQTT",
      ],
    },
    {
      label: "AI & ML",
      items: [
        "TensorFlow",
        "PyTorch",
        "OpenCV",
        "YOLOv8",
        "Pandas",
        "NumPy",
        "Scikit-Learn",
        "spaCy",
      ],
    },
    {
      label: "FRONTEND & TOOLS",
      items: ["React.js", "Tailwind CSS", "Figma", "Git", "GitHub Actions"],
    },
  ] satisfies SkillGroup[],

  experience: [
    {
      period: "June 2025 — Present",
      role: "Associate Backend Engineer",
      company: "Repos Energy",
      companyUrl: "https://reposenergy.com",
      description:
        "Building backend systems for India's largest portable fuel delivery network. Scope spans payment gateway integrations, IoT data pipelines, subscription billing, and new product onboarding.",
      highlights: [
        "Designed MQTT-based IoT ingestion pipeline on AWS — improved telemetry refresh rates by 60%",
        "Built CCAvenue + HDFC Standing Instruction subscription system for Datum analytics products",
        "Reduced manual payment processing by 70% with Razorpay multi-transaction reconciliation",
        "Implemented SSR-based dynamic API rendering, cutting UI rendering time by 50%",
      ],
    },
    {
      period: "July 2024 — May 2025",
      role: "Backend Intern",
      company: "Repos Energy",
      companyUrl: "https://reposenergy.com",
      description:
        "Built the internal operations portal from scratch — 50+ APIs in Django REST Framework, covering dashboards, CSV imports, lead management, and document generation.",
      highlights: [
        "Integrated Repos with SAP for real-time data sync, achieving 40% faster transmission",
        "Built async Node.js system for WhatsApp order notifications with 100% delivery accuracy",
      ],
    },
    {
      period: "Oct 2023 — Dec 2023",
      role: "AI/ML Intern",
      company: "ABCOM Information Systems",
      companyUrl: "https://abcominfo.com",
      description:
        "Worked on neural network model optimisation and LLM-based prompt engineering using OpenAI API and PaLM API. Improved TensorFlow codebase efficiency by 25%.",
      highlights: [],
    },
  ] satisfies ExperienceItem[],

  projects: [
    {
      title: "Fall & Foul Detection",
      description:
        "Built in collaboration with Capgemini — a real-time fall and foul detection system for sports video. YOLOv8 handles pose estimation (15% speed improvement), EfficientNetB0 achieves 98% foul classification accuracy. Published in TIJER International Research Journal.",
      stack: ["Python", "YOLOv8", "TensorFlow", "OpenCV", "EfficientNetB0"],
      github: "https://github.com/Dhritishah03/Capgemini",
      publication: "https://tijer.org/tijer/papers/TIJER2404197.pdf",
      featured: true,
    },
    {
      title: "Basketball Trajectory Prediction",
      description:
        "A computer vision system that processes video input to predict whether a basketball shot trajectory will result in a basket or miss, modelling real-world physics. Achieves 86.9% prediction accuracy.",
      stack: ["Python", "OpenCV", "NumPy"],
      github: "https://github.com/Dhritishah03",
    },
    {
      title: "Twitter Sentiment Analysis",
      description:
        "NLP pipeline processing 400,000 tweet entries to surface topic clusters and sentiment signals using LDA, gensim, and spaCy. Built for structured analysis of public discourse patterns at scale.",
      stack: ["Python", "spaCy", "gensim", "LDA", "Pandas"],
      github: "https://github.com/Dhritishah03",
    },
    {
      title: "Acre Craft",
      description:
        "A zero-cost automated property inquiry platform — routes enquiries directly to agents using Node.js and Nodemailer with no recurring SaaS fees. Delivered as a freelance project and running live.",
      stack: ["Node.js", "Nodemailer", "JavaScript"],
      github: "https://github.com/Dhritishah03",
    },
  ] satisfies Project[],
};
