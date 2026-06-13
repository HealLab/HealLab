export type ProjectStatus = "featured" | "active" | "tba";

export type Project = {
  key: string;
  acronym: string;
  name: string;
  expansion: string;
  tagline: string;
  blurb: string;
  status: ProjectStatus;
  to?: string; // route path (omit for TBA)
};

export const PROJECTS: Project[] = [
  {
    key: "beacon",
    acronym: "BEACON",
    name: "BEACON",
    expansion: "Building Wearable & Mobile Edge Intelligence for Community Health",
    tagline: "A community-built edge-AI platform for wearables.",
    blurb:
      "A shared WearOS and Android edge-AI platform — the BEACON Commons — that a community co-builds. Students of all majors focus on responsible, on-device AI and human-centered design for real community health needs.",
    status: "featured",
    to: "/projects/beacon",
  },
  {
    key: "knot",
    acronym: "KNOT",
    name: "KNOT",
    expansion: "Knowledge-infused Nursing Oriented Training",
    tagline: "AI agents for simulation-based nursing education.",
    blurb:
      "Finding ways for AI agents to assist nursing instructors and students during simulation-based training — making high-stakes clinical education more adaptive, supportive, and scalable.",
    status: "active",
    to: "/projects/knot",
  },
  {
    key: "tba-1",
    acronym: "TBA",
    name: "To Be Announced",
    expansion: "New initiative in the works",
    tagline: "Coming soon.",
    blurb:
      "A new human-centered AI for health initiative is taking shape. Check back soon, or reach out if you'd like to collaborate.",
    status: "tba",
  },
  {
    key: "tba-2",
    acronym: "TBA",
    name: "To Be Announced",
    expansion: "New initiative in the works",
    tagline: "Coming soon.",
    blurb:
      "Another project is on the horizon as the lab grows its work across health, education, and AI.",
    status: "tba",
  },
];

export const TEAM = [
  {
    name: "Dr. Yike Zhang",
    href: "https://yikezhang.me",
    subtitle: "Director (PI) · Human-centered AI, medical imaging, human-in-the-loop systems",
    imageSrc: `${import.meta.env.BASE_URL}profiles/yike_zhang.jpeg`,
    external: true,
  },
  {
    name: "Dr. Eduardo Davalos",
    href: "https://edavalosanaya.github.io",
    subtitle: "Collaborator (Co-PI) · AI in education, HCI, human-AI collaboration",
    imageSrc: `${import.meta.env.BASE_URL}profiles/eduardo_davalos.webp`,
    external: true,
  },
  {
    name: "Dr. Wenbin Luo",
    subtitle: "Collaborator (Co-PI) · Embedded & computer engineering, IEEE Senior Member",
  },
];
