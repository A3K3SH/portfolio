import { Section, SectionColors, Sections, SkillCategory } from './types';
import Home from '@/components/home';
import Projects from '@/components/projects';
import About from '@/components/about';
import Experiences from '@/components/experiences';
import Contact from '@/components/contact';

const thewaitercompany = '/assets/images/thewaitercompany-cover.webp';
const webalora = '/assets/images/webalora-cover.webp';
const Sparkonomy = '/assets/images/sparkonomy.webp';
const CryptoPriceTracker = '/assets/images/crypto-price-tracker.webp';
const CruiseShipManagement = '/assets/images/cruise-ship-management.webp';
const AkoraSwapCover = '/assets/images/akora-swap-cover.png';
const StudyTubeAICover = '/assets/images/studytube-ai-cover.png';
const ForkFireCover = '/assets/images/fork-fire-cover.png';

export const ANIMATION_DURATION = {
 SHORT: 0.2,
 MEDIUM: 0.4,
 LONG: 0.8,
 MOBILE: {
  SHORT: 0.15,
  MEDIUM: 0.3,
  LONG: 0.6,
 },
};

export const mobileButtonVariants = {
 hidden: { opacity: 0, y: 10 },
 visible: (i: number) => ({
  opacity: 1,
  y: 0,
  transition: {
   delay: i * 0.1,
   duration: 0.5,
  },
 }),
 exit: {
  opacity: 0,
  y: 10,
  transition: { duration: 0.3 },
 },
};

export const SECTIONS: Section[] = [
 { content: <Home />, title: 'Home' },
 { content: <Projects />, title: 'Projects' },
 { content: <About />, title: 'About' },
 { content: <Experiences />, title: 'Experiences' },
 { content: <Contact />, title: 'Contact' },
];

export const THEMES: Record<string, SectionColors> = {
 main: {
  background: 'var(--theme-1-background)',
  primary: 'var(--theme-1-primary)',
  secondary: 'var(--theme-1-secondary)',
  accent: 'var(--theme-1-accent)',
 },
 Aitriplanner: {
  background: 'var(--theme-2-background)',
  primary: 'var(--theme-2-primary)',
  secondary: 'var(--theme-2-secondary)',
  accent: 'var(--theme-2-accent)',
 },
 thewaitercompany: {
  background: 'var(--theme-3-background)',
  primary: 'var(--theme-3-primary)',
  secondary: 'var(--theme-3-secondary)',
  accent: 'var(--theme-3-accent)',
 },
 threepointonefour: {
  background: 'var(--theme-4-background)',
  primary: 'var(--theme-4-primary)',
  secondary: 'var(--theme-4-secondary)',
  accent: 'var(--theme-4-accent)',
 },
 experiences: {
  background: 'var(--theme-5-background)',
  primary: 'var(--theme-5-primary)',
  secondary: 'var(--theme-5-secondary)',
  accent: 'var(--theme-5-accent)',
 },
 metamorpher: {
  background: 'var(--theme-6-background)',
  primary: 'var(--theme-6-primary)',
  secondary: 'var(--theme-6-secondary)',
  accent: 'var(--theme-6-accent)',
 },
 aiTripPlanner: {
  background: 'var(--theme-7-background)',
  primary: 'var(--theme-7-primary)',
  secondary: 'var(--theme-7-secondary)',
  accent: 'var(--theme-7-accent)',
 },
 waiterWebsite: {
  background: 'var(--theme-8-background)',
  primary: 'var(--theme-8-primary)',
  secondary: 'var(--theme-8-secondary)',
  accent: 'var(--theme-8-accent)',
 },
 about: {
  background: 'var(--theme-9-background)',
  primary: 'var(--theme-9-primary)',
  secondary: 'var(--theme-9-secondary)',
  accent: 'var(--theme-9-accent)',
 },
 LocalGovAI: {
  background: 'var(--theme-10-background)',
  primary: 'var(--theme-10-primary)',
  secondary: 'var(--theme-10-secondary)',
  accent: 'var(--theme-10-accent)',
 },
 cryptoPriceTracker: {
  background: 'var(--theme-7-background)',
  primary: 'var(--theme-7-primary)',
  secondary: 'var(--theme-7-secondary)',
  accent: 'var(--theme-7-accent)',
 },
 pixelArtWebsite: {
  background: 'var(--theme-12-background)',
  primary: 'var(--theme-12-primary)',
  secondary: 'var(--theme-12-secondary)',
  accent: 'var(--theme-12-accent)',
 },
};

export const PROJECT_THEME_SEQUENCE: SectionColors[] = [
 THEMES.cryptoPriceTracker,
 THEMES.pixelArtWebsite,
 THEMES.aiTripPlanner,
 THEMES.waiterWebsite,
];

const PROJECT_THEME_MAP = PROJECT_THEME_SEQUENCE.reduce(
 (acc, theme, index) => {
  acc[index] = theme;
  return acc;
 },
 {} as Record<number, SectionColors>
);

export const SECTION_THEME_MAP: {
 [key: number]: SectionColors | { [subKey: number]: SectionColors };
} = {
 [Sections.Home]: THEMES.main,
 [Sections.Projects]: PROJECT_THEME_MAP,
 [Sections.About]: THEMES.about,
 [Sections.Experience]: THEMES.experiences,
 [Sections.Contact]: THEMES.main,
};

export const WORKS_ITEMS = [
 {
  cover: webalora,
  title: 'WebAlora',
  subject: 'Web Development and Maintenance',
  description:
   'Webalora is a Professional IT solutions for finance and legal sectors, delivering excellence in technology services.',
  link: 'https://webalora.com/',
  techStack: ['Next.js', 'Typescript', 'Strapi', 'SEO Optimization'],
 },
 {
  cover: Sparkonomy,
  title: 'StepNex Technologies',
  subject: 'Frontend Developer Intern',
  description:
   'Involved in the design and development of ERP system. Working on any frontend task assigned including UI design, coding, and debugging',
  link: 'https://www.sparkonomy.com/',
  techStack: ['Vite', 'TypeScript', 'WebGL', 'Three.js', 'GSAP'],
 },
 {
  cover: thewaitercompany,
  title: 'TheWaiterCompany',
  subject: 'Prototyping and Implementation',
  description:
   'TheWaiterCompany is a QR code-based platform that simplifies restaurant operations through digital ordering and inventory management.',
  link: 'https://www.thewaitercompany.in/',
  techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'MongoDB', 'REST APIs'],
 },
];

export const PROJECTS_ITEMS = [
 {
  cover: AkoraSwapCover,
  title: 'Akora Swap',
  subject: 'Decentralized Token Swap Interface',
  description:
   'Decentralized swap frontend built on CoW Protocol with multi-wallet support, cross-chain swaps, and optimized UX.',
  demoLink: 'https://akora-swap.netlify.app/',
  techStack: [
   'React',
   'TypeScript',
   'WalletConnect v2',
   'Web3-React',
   'Ethers.js',
   'CoW Protocol SDK',
  ],
 },
 {
    cover: StudyTubeAICover,
  title: 'StudyTube AI',
  subject: 'AI-Powered Study Notes Generator',
  description:
   'StudyTube AI is an AI-powered study assistant that creates structured notes from user prompts. It takes user input, generates notes using AI APIs, and includes login, PDF export, and payment for premium access.',
  demoLink: 'https://studytubeai.netlify.app/',
  techStack: [
   'React',
   'Tailwind CSS',
   'Node.js',
   'Firebase',
   'Razorpay',
   'Grok API',
   
  ],
 },
 {
    cover: CryptoPriceTracker,
    title: 'Crypto Price Tracker',
    subject: 'Real-Time Cryptocurrency Market Analytics Dashboard',
    description:
     'A real-time cryptocurrency tracking dashboard built for traders with live Binance data, technical indicators, and Fear & Greed Index insights.',
    demoLink: 'https://crypto-price-tracker-rouge.vercel.app/',
    techStack: [
     'React',
     'Tailwind CSS',
     'Vite',
     'Binance WebSocket API',
     'Fear & Greed Index API',
     'ESLint',
    ],
 },
 {
  cover: ForkFireCover,
  title: 'Fork & Fire',
  subject: 'Food Recipe Web App',
  description:
   'A modern recipe discovery web app where users can search meals, explore categories, view detailed recipe instructions, and save favorites. Built with smooth animations and a responsive UI.',
  demoLink: 'https://fork-fire-zeta.vercel.app/',
  techStack: [
   'React ',
   'Vite',
   'Tailwind CSS ',
   'Framer Motion',
   'TheMealDB API',
   'Font Awesome',
   'Context API',
  ],
 },
 {
  cover: CruiseShipManagement,
  title: 'Cruise Ship Management System',
  subject: 'Service & Booking Management Web Application',
  description:
   'A modern web application for managing cruise ship services and operations. It includes role-based authentication, multi-service booking, cart and order management, and separate dashboards for admin and staff, all delivered through a responsive and user-friendly interface.',
  demoLink: 'https://cruiseshipmanagement.netlify.app/',
  techStack: ['React', 'Vite', 'TypeScript', 'Context API', 'CSS'],
 },
];

export const WORK_SUBSECTIONS = WORKS_ITEMS.length;
export const PROJECT_SUBSECTIONS = PROJECTS_ITEMS.length;

export const experiences = [
 {
  date: 'Feb 2025 – May 2025',
  title: 'Unified Mentorship',
  role: 'Frontend Development Intern',
 },
 {
  date: 'Apr 2024 – Dec 2024',
  title: 'InternPe',
  role: 'Frontend Development Intern',
 },
];

export const SKILLS: SkillCategory[] = [
 {
   category: 'Frontend',
  items: [
    { name: 'HTML5' },
    { name: 'CSS3' },
    { name: 'JavaScript' },
    { name: 'TypeScript' },
    { name: 'React' },
    { name: 'Tailwind CSS' },
    { name: 'Shadcn UI' },
    { name: 'Responsive Design' },
  ],
 },
 {
   category: 'Backend',
  items: [
    { name: 'Node.js' },
    { name: 'Express.js' },
    { name: 'REST API' },
    { name: 'Firebase' },
    { name: 'Supabase' },
    { name: 'Authentication' },
  ],
 },
 {
   category: 'Web3 / Blockchain',
  items: [
    { name: 'Ethers.js' },
    { name: 'Web3.js' },
    { name: 'WalletConnect' },
    { name: 'MetaMask Integration' },
    { name: 'CoW Protocol SDK' },
    { name: 'Smart Contract Interaction' },
   ],
 },
 {
   category: 'AI / LLM',
   items: [
    { name: 'OpenAI API' },
    { name: 'LLM APIs' },
    { name: 'Prompt Engineering' },
    { name: 'AI Integration' },
    { name: 'API Integration' },
   ],
 },
 {
   category: 'Tools & Platforms',
   items: [
    { name: 'Git' },
    { name: 'GitHub' },
    { name: 'VS Code' },
    { name: 'Netlify' },
    { name: 'Vercel' },
    { name: 'Render' },
    { name: 'Postman' },
    { name: 'npm' },
    { name: 'Vite' },
  ],
 },
];

export const EDUCATION = [
 {
  degree: 'Master of Computer Applications (MCA)',
  institution: 'SGT University, Gurugram, Haryana',
  duration: '2023 – 2025',
 },
 {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'DPGITM, Gurugram, Haryana',
  duration: '2020 – 2023',
 },
];
