import { Mentor, VaultProfessional } from './types';

export const MENTORS_DATA: Mentor[] = [
  {
    id: "np-1",
    name: "Zara M.",
    university: "University of Edinburgh",
    year: "3rd Year",
    major: "Biomedical Science",
    role: "Biomedical Science Student",
    sessions: 47,
    rating: 4.9,
    bio: "I almost switched out of BioMed in first year. I stayed. Here's what I'd tell you.",
    available: true,
    initials: "ZM",
  },
  {
    id: "np-2",
    name: "Liam S.",
    university: "King's College London",
    year: "4th Year",
    major: "Computer Science",
    role: "Computer Science Student",
    sessions: 82,
    rating: 5.0,
    bio: "Tech is more than just coding. Let's talk about the reality of CS degrees.",
    available: true,
    initials: "LS"
  },
  {
    id: "np-3",
    name: "Maya T.",
    university: "UCL",
    year: "2nd Year",
    major: "Law",
    role: "Law Student",
    sessions: 19,
    rating: 4.8,
    bio: "The reading list is brutal, but the case studies are fascinating.",
    available: false,
    initials: "MT"
  },
  {
    id: "np-4",
    name: "Noah H.",
    university: "Imperial College",
    year: "3rd Year",
    major: "Mechanical Engineering",
    role: "Engineering Student",
    sessions: 34,
    rating: 4.7,
    bio: "Bridging the gap between theory and practical application.",
    available: true,
    initials: "NH"
  },
  {
    id: "np-5",
    name: "Chloe B.",
    university: "LSE",
    year: "4th Year",
    major: "Economics",
    role: "Economics Student",
    sessions: 56,
    rating: 4.9,
    bio: "Finance isn't just math, it's understanding human behavior.",
    available: true,
    initials: "CB"
  },
  {
    id: "np-6",
    name: "Ethan W.",
    university: "University of Warwick",
    year: "3rd Year",
    major: "Psychology",
    role: "Psychology Student",
    sessions: 28,
    rating: 4.6,
    bio: "Why we do what we do. Unpacking the human mind.",
    available: false,
    initials: "EW"
  },
  {
    id: "np-7",
    name: "Sophia P.",
    university: "University of Manchester",
    year: "2nd Year",
    major: "Architecture",
    role: "Architecture Student",
    sessions: 12,
    rating: 4.5,
    bio: "Designing spaces that impact people's lives.",
    available: true,
    initials: "SP"
  },
  {
    id: "np-8",
    name: "Oliver J.",
    university: "University of Bristol",
    year: "4th Year",
    major: "Physics",
    role: "Physics Student",
    sessions: 41,
    rating: 4.8,
    bio: "Understanding the universe, one equation at a time.",
    available: true,
    initials: "OJ"
  }
];

export const PRO_MENTORS_DATA: Mentor[] = [
  {
    id: "pro-1",
    name: "David K.",
    role: "Senior Software Engineer",
    company: "Tech Giant",
    bio: "10+ years building scalable systems. I'll tell you what a CS degree misses.",
    rating: 5.0,
    sessions: 120,
    available: true,
    initials: "DK",
    specialties: ["System Design", "Career Growth", "Interviewing"]
  },
  {
    id: "pro-2",
    name: "Sarah L.",
    role: "Corporate Lawyer",
    company: "Magic Circle Firm",
    bio: "The reality of M&A law vs what you see on TV.",
    rating: 4.9,
    sessions: 85,
    available: true,
    initials: "SL",
    specialties: ["Corporate Law", "Work-Life Balance", "Commercial Awareness"]
  },
  {
    id: "pro-3",
    name: "Michael R.",
    role: "Investment Banker",
    company: "Bulge Bracket IB",
    bio: "Navigating the fast-paced world of high finance.",
    rating: 4.8,
    sessions: 92,
    available: false,
    initials: "MR",
    specialties: ["M&A", "Financial Modeling", "Burnout Prevention"]
  },
  {
    id: "pro-4",
    name: "Emily C.",
    role: "UX Design Lead",
    company: "Global Agency",
    bio: "Creating products that people actually want to use.",
    rating: 4.9,
    sessions: 105,
    available: true,
    initials: "EC",
    specialties: ["User Research", "Portfolio Review", "Design Thinking"]
  }
]

export const VAULT_DATA: VaultProfessional[] = [
  {
    id: 1, name: "Aisha K.", role: "Cybersecurity Analyst", exp: "8 yrs",
    field: "technology", initials: "AK",
    question: "What does your actual Tuesday look like?",
    locked: false,
    careers: ["cybersecurity", "technology", "infosec"]
  },
  {
    id: 2, name: "Marcus T.", role: "Biomedical Engineer", exp: "6 yrs",
    field: "engineering", initials: "MT",
    question: "What would you tell yourself at 17?",
    locked: false,
    careers: ["engineering", "biomedical", "science"]
  },
  {
    id: 3, name: "Priya M.", role: "Corporate Lawyer", exp: "11 yrs",
    field: "law", initials: "PM",
    question: "Biggest misconception about your field?",
    locked: true
  },
  {
    id: 4, name: "James O.", role: "Senior UX Designer", exp: "7 yrs",
    field: "design", initials: "JO",
    question: "The most tedious part of your job?",
    locked: true
  },
  {
    id: 5, name: "Leila R.", role: "Nurse Practitioner", exp: "9 yrs",
    field: "medicine", initials: "LR",
    question: "What almost made you quit?",
    locked: true
  },
  {
    id: 6, name: "Daniel C.", role: "Investment Analyst", exp: "5 yrs",
    field: "finance", initials: "DC",
    question: "What didn't your degree prepare you for?",
    locked: true
  },
  {
    id: 7, name: "Sofia B.", role: "Data Scientist", exp: "4 yrs",
    field: "technology", initials: "SB",
    question: "What does 'a good day at work' actually look like?",
    locked: true
  },
  {
    id: 8, name: "Kwame A.", role: "Structural Engineer", exp: "12 yrs",
    field: "engineering", initials: "KA",
    question: "What's the part of your job nobody talks about?",
    locked: true
  },
  {
    id: 9, name: "Nina V.", role: "Child Psychologist", exp: "8 yrs",
    field: "science", initials: "NV",
    question: "How emotionally draining is the work, really?",
    locked: true
  },
  {
    id: 10, name: "Omar F.", role: "Startup Founder", exp: "6 yrs",
    field: "finance", initials: "OF",
    question: "When did you almost give up? What happened?",
    locked: true
  },
  {
    id: 11, name: "Yuna K.", role: "Game Designer", exp: "5 yrs",
    field: "design", initials: "YK",
    question: "Is it actually fun to work in games?",
    locked: true
  },
  {
    id: 12, name: "Ravi S.", role: "Epidemiologist", exp: "10 yrs",
    field: "science", initials: "RS",
    question: "What does your work look like during a crisis?",
    locked: true
  }
];

export const CAREER_FIELDS = [
  "All", "Technology", "Medicine", "Law", "Finance", "Design", "Engineering", "Science"
];

export const NAV_LINKS = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "The Vault", href: "/vault" },
  { label: "For Mentors", href: "/for-mentors" },
  { label: "For Schools", href: "/for-schools" },
];

export const FOOTER_LINKS = {
  product: [
    { label: "How It Works", href: "/how-it-works" },
    { label: "Discovery Engine", href: "/discover" },
    { label: "The Vault", href: "/vault" },
    { label: "Your Matrix", href: "/matrix" },
  ],
  platform: [
    { label: "For Students", href: "/discover" },
    { label: "For Mentors", href: "/for-mentors" },
    { label: "For Schools", href: "/for-schools" },
    { label: "Book a Session", href: "/session" },
  ],
  legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Cookie Policy", href: "/privacy#cookies" },
  ]
};
