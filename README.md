# Aakash Swain - Frontend Developer Portfolio

A modern, animated portfolio website showcasing frontend development projects and experience. Built with Next.js, React, Framer Motion, and Tailwind CSS.

**Live Demo:** [https://aakashswain.dev](https://aakashswain.dev)

---

## Features

✨ **Modern Design**
- Smooth section-based navigation with scroll/swipe support
- Dynamic color themes that change per section/project
- Animated overlays and transitions using Framer Motion
- Custom cursor with interactive hover effects (desktop)
- Responsive design for mobile, tablet, and desktop

🎯 **Interactive Elements**
- Welcome overlay with multilingual greetings
- Scroll down indicator with auto-dismiss
- Fuzzy noise overlay for visual polish
- Project carousel with image overlays
- Contact form with email integration
- Social media links (GitHub, LinkedIn)

📱 **Mobile-First & Accessible**
- Touch-friendly navigation and controls
- Swipe gestures for section/project navigation
- Optimized for iOS (100vh fix, safe area insets)
- Performance optimizations (lazy loading, device detection)
- Accessible form controls with proper labels
- Prefers-reduced-motion support

⚡ **Performance**
- Built with Next.js 15 & React 19
- Image optimization with Next.js Image component
- Turbopack for fast development
- Optimized animations for mobile devices
- Lazy image loading for adjacent sections

---

## Tech Stack

- **Framework:** [Next.js 15](https://nextjs.org/) with App Router
- **Runtime:** Node.js / Cloudflare Pages
- **UI Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS](https://tailwindcss.com/)
- **Animations:** [Framer Motion](https://www.framer.com/motion/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/), [Lucide React](https://lucide.dev/)
- **Effects:** [PowerGlitch](https://github.com/pqina/powerglitch) (text glitch effect)
- **Email Service:** [Basin](https://usebasin.com/) for contact form
- **Analytics:** Vercel Analytics & Speed Insights
- **TypeScript:** Full type safety
- **Deployment:** [Cloudflare Pages](https://pages.cloudflare.com/)

---

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/A3K3SH/Portfolio-master.git
   cd Portfolio-master
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_WEBSITE_DOMAIN=http://localhost:3001
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
   NEXT_PUBLIC_GTM_ID=your-gtm-id-optional
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

   The site will be available at `http://localhost:3001`

---

## Development

### Available Scripts

```bash
# Start development server with Turbopack
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run ESLint checks
npm run lint

# Build for Cloudflare Pages
npm run pages:build

# Preview Cloudflare Pages build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

### Project Structure

```
Portfolio-master/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Main page with section setup
│   │   ├── globals.css         # Global styles and CSS variables
│   │   └── robots.ts           # SEO robots.txt
│   │
│   ├── components/
│   │   ├── home.tsx            # Hero section
│   │   ├── projects.tsx        # Projects carousel
│   │   ├── about.tsx           # About & skills section
│   │   ├── experiences.tsx     # Experience timeline
│   │   ├── contact.tsx         # Contact section
│   │   ├── section.tsx         # Section container with transitions
│   │   ├── section-provider.tsx # Navigation context & scroll logic
│   │   ├── frame.tsx           # Header, logo, socials, curves
│   │   ├── navigation.tsx      # Desktop/mobile nav with subsections
│   │   ├── enhanced-navigation.tsx # Enhanced mobile nav
│   │   ├── welcome-overlay.tsx # First-visit multilingual greeting
│   │   ├── EnhancedOverlay.tsx # Fuzzy overlay + scroll indicator
│   │   ├── EmailForm.tsx       # Contact form with modal
│   │   ├── error-boundary.tsx  # Error handling
│   │   ├── ui/                 # Reusable UI components
│   │   │   ├── cursor.tsx      # Custom interactive cursor
│   │   │   ├── button.tsx
│   │   │   ├── input.tsx
│   │   │   ├── textarea.tsx
│   │   │   ├── card.tsx
│   │   │   └── ... (other UI components)
│   │
│   ├── lib/
│   │   ├── constants.tsx       # Site data (projects, skills, education)
│   │   ├── hooks.tsx           # useSection context hook
│   │   ├── types/              # TypeScript type definitions
│   │   ├── performance.tsx     # Device detection & optimization hooks
│   │   └── utils.ts            # Utility functions
│   │
│   └── hooks/
│       └── use-toast.ts        # Toast notifications hook
│
├── public/
│   ├── assets/
│   │   └── images/             # Project covers, profile picture
│   └── noise.webp              # Noise texture for overlay
│
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.mjs
├── postcss.config.mjs
├── components.json             # Shadcn/ui config
└── README.md
```

### Key Components

**SectionProvider** (`section-provider.tsx`)
- Manages global section/subsection state
- Handles scroll and swipe navigation with throttling
- Applies theme colors dynamically
- Manages transitions and scroll locking

**Section** (`section.tsx`)
- Animates section entry/exit with direction-aware slides
- Renders current section content with AnimatePresence

**Navigation** (`navigation.tsx`)
- Desktop sidebar with section dots
- Mobile hamburger menu with slides
- Projects subsection indicators (4 dots for carousel)

**Home** (`home.tsx`)
- Glitch image effect using PowerGlitch
- BubbleText animated hero text
- CTA buttons for Contact and Projects navigation

**Projects** (`projects.tsx`)
- Image carousel with 4 projects
- Image overlay animations
- Tech stack badges
- Visit button with safe navigation
- Previous/Next arrows with disabled states

**Contact** (`contact.tsx`)
- Contact section with NeonFigure decoration
- EmailForm modal integration
- Social links

**EmailForm** (`EmailForm.tsx`)
- Modal dialog with form controls
- Integration with Basin email service
- React Toastify notifications
- Form validation and error handling

---

## Customization

### Update Portfolio Content

Edit `src/lib/constants.tsx` to customize:

```typescript
export const PROJECTS_ITEMS = [
  {
    cover: '/path/to/image.webp',
    title: 'Project Name',
    subject: 'Category',
    description: 'Project description...',
    demoLink: 'https://...',
    techStack: ['Tech1', 'Tech2'],
  },
  // Add more projects
];

export const EDUCATION = [
  {
    degree: 'Your Degree',
    institution: 'Your University',
    duration: '2020 – 2023',
  },
];

export const SKILLS: SkillCategory[] = [
  {
    category: 'Frontend Technologies',
    items: [
      { name: 'React', icon: 'SiReact' },
      // More skills
    ],
  },
];

export const experiences = [
  {
    date: 'Start – End',
    title: 'Company Name',
    role: 'Your Role',
  },
];
```

### Update Site Metadata

Edit `src/app/layout.tsx` for:
- Page title and description
- Open Graph images
- Twitter card settings
- JSON-LD structured data

### Change Color Themes

Edit `src/lib/constants.tsx` > `THEMES` and `SECTION_THEME_MAP`:

```typescript
export const THEMES: Record<string, SectionColors> = {
  main: {
    background: 'var(--theme-1-background)',
    primary: 'var(--theme-1-primary)',
    secondary: 'var(--theme-1-secondary)',
    accent: 'var(--theme-1-accent)',
  },
  // Add more themes
};
```

CSS variables are defined in `src/app/globals.css`.

### Email Service Setup

1. Go to [usebasin.com](https://usebasin.com)
2. Create a free form endpoint
3. Get your form ID (e.g., `https://usebasin.com/f/YOUR_FORM_ID`)
4. Update the form action in `EmailForm.tsx` line 27:
   ```typescript
   fetch('https://usebasin.com/f/YOUR_FORM_ID', { ... })
   ```

---

## Deployment

### Deploy to Cloudflare Pages

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Your message"
   git push origin main
   ```

2. **Connect to Cloudflare Pages**
   - Go to [Cloudflare Dashboard](https://dash.cloudflare.com/)
   - Navigate to **Pages** → **Create a project**
   - Select your GitHub repository
   - Build settings:
     - Framework: **Next.js**
     - Build command: `npm run pages:build`
     - Build output directory: `.vercel/output/static`
   - Click **Deploy**

3. **Configure Environment Variables** (in Cloudflare Pages settings)
   ```
   NEXT_PUBLIC_WEBSITE_DOMAIN=https://your-domain.com
   NEXT_PUBLIC_CONTACT_EMAIL=your-email@example.com
   ```

4. **Connect Custom Domain**
   - In Pages settings, add your custom domain
   - Update nameservers or CNAME records as instructed

### Deploy to Vercel (Alternative)

1. **Push to GitHub**
2. Go to [vercel.com](https://vercel.com) and import your repository
3. Configure environment variables
4. Deploy

---

## Testing

### Lint & Build

```bash
# Check for code issues
npm run lint

# Build for production (test build)
npm run build

# Preview build locally
npm run preview
```

### Manual QA Checklist

See the comprehensive testing checklist in the documentation:

- Global overlays and navigation
- All 5 sections (Home, Projects, About, Experiences, Contact)
- Form validation and submission
- Responsive behavior (mobile, tablet, desktop)
- Scroll/swipe navigation
- Animations and transitions
- Browser compatibility

---

## Performance

### Optimizations Implemented

- **Image Optimization:** Next.js Image component with lazy loading
- **Code Splitting:** Automatic with Next.js App Router
- **Device Detection:** Adapts animations based on device type
- **Throttled Scroll:** Prevents excessive section jumps
- **Safe Area Insets:** Handles notched phones (iOS)
- **Reduced Motion:** Respects user's motion preferences
- **Touch Optimizations:** Improved scrolling on mobile

### Lighthouse Targets

- ⚡ Performance: > 90
- ♿ Accessibility: > 90
- ✅ Best Practices: > 90
- 📊 SEO: > 90

---

## Browser Support

| Browser | Support |
|---------|---------|
| Chrome/Edge (latest) | ✅ Full |
| Firefox (latest) | ✅ Full |
| Safari (macOS) | ✅ Full |
| Safari (iOS 13+) | ✅ Full |
| Mobile browsers | ✅ Full |

---

## Troubleshooting

### Port 3000 Already in Use

The dev server will automatically try port 3001. If you want to use port 3000:

```bash
# Kill process on port 3000
npx kill-port 3000
npm run dev
```

### Extension Conflicts (Chrome)

If you see `Cannot redefine property: ethereum` error:
- This is caused by Web3 wallet extensions
- Test in Incognito mode (disables extensions) or disable the extension

### Slow Build

First build with Turbopack will take longer. Subsequent builds are cached.

### Images Not Loading

- Check that images exist in `public/assets/images/`
- Use `.webp` format for better performance
- Ensure image paths in `constants.tsx` are correct

---

## Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is open source and available under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Contact & Social

- **Email:** [swainaakash18@gmail.com](mailto:swainaakash18@gmail.com)
- **GitHub:** [@A3K3SH](https://github.com/A3K3SH)
- **LinkedIn:** [@aakashswain18](https://www.linkedin.com/in/aakashswain18/)

---

## Acknowledgments

- **Next.js** for the amazing framework
- **Framer Motion** for smooth animations
- **Tailwind CSS** for utility-first styling
- **Vercel** for Analytics and Speed Insights
- **Cloudflare** for Pages hosting
- **Basin** for email form handling
- All open source libraries and contributors

---

**Made with ❤️ by Aakash Swain**

Last updated: January 12, 2026
