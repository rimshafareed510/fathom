# rimsha.dev — Personal Portfolio

A responsive personal portfolio website for Rimsha Fareed, built with vanilla HTML, CSS, and JavaScript — no frameworks, no build tools, just semantic markup and hand-written styles.

🔗 **Live site:** [add your Vercel/GitHub Pages link here]

## About

Portfolio site for a Computer Science student with a focus on front-end development, AI, and problem-solving. Showcases skills across web development and Python/ML, along with a small selection of projects.

## Features

- Semantic HTML5 structure (`header`, `nav`, `main`, `section`, `footer`) — no layout divs
- Responsive Flexbox layout with a mobile breakpoint at 768px
- Light / dark mode toggle powered by CSS custom properties
- Smooth-scrolling navigation to page sections
- Two live API integrations with loading and error states:
  - [Official Joke API](https://official-joke-api.appspot.com/) — random developer joke
  - [Bored API](https://www.boredapi.com/) — random activity suggestion
- Hover animations on cards (lift + shadow) using CSS transitions
- Styled contact form (name, email, message)
- Respects `prefers-reduced-motion` for accessibility

## Sections

- **About** — a short bio
- **Skills** — HTML5, CSS3, JavaScript, Git & GitHub, Python, and AI & ML
- **Projects** — Student Management System, Daily Digest CLI, and this portfolio itself
- **Live Data** — real-time joke and activity fetched from public APIs
- **Contact** — a contact form plus a direct email link

## Tech Stack

- HTML5
- CSS3 (Flexbox, custom properties, media queries)
- Vanilla JavaScript (DOM, events, `fetch`)
- Fonts: [Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk), [Inter](https://fonts.google.com/specimen/Inter), and [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) via Google Fonts

## Project Structure

```
my-portfolio/
├── index.html          # Page structure and content
├── styles.css           # Styling, layout, themes, and responsiveness
├── script.js             # Interactivity: dark mode, fetch calls, form handling
├── images/
│   └── profile.jpg     # Profile photo used in the hero section
└── README.md
```

> **Note:** `index.html` references `images/profile.jpg` for the profile photo. Make sure that file exists in an `images/` folder before deploying, or the avatar won't load.

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/YOUR-USERNAME/my-portfolio.git
   ```
2. Open the folder and launch `index.html` in your browser — no build step or dependencies required.
   ```bash
   cd my-portfolio
   open index.html   # or just double-click the file
   ```

## Customizing

- Update the bio, skills, and project cards in `index.html`
- Replace `images/profile.jpg` with your own photo
- Adjust the color palette by editing the CSS custom properties at the top of `styles.css`
- Update the `mailto:` link and form action with your real contact details

## Deployment

This site is a static export with no server dependencies, so it deploys directly to [Vercel](https://vercel.com), [Netlify](https://netlify.com), or [GitHub Pages](https://pages.github.com/) — just connect the repository and deploy.

## License

Free to use as a starting point for your own portfolio.
