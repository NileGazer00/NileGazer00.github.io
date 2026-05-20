<p align="center">
  <img src="https://readme-typing-svg.demolab.com?font=Fira+Code&weight=600&size=28&pause=1000&color=0A0A0A&center=true&vCenter=true&width=700&lines=NileGazer00.github.io;Conversion-Focused+Portfolio+%26+Lead+Magnet+Site" alt="Typing SVG" />
</p>

<p align="center">
  <a href="https://github.com/NileGazer00/NileGazer00.github.io/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/License-MIT-blue.svg" alt="MIT License" />
  </a>
  <a href="https://github.com/NileGazer00/NileGazer00.github.io">
    <img src="https://img.shields.io/badge/Static-Site-111827.svg" alt="Static Site" />
  </a>
  <a href="https://github.com/NileGazer00/NileGazer00.github.io/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/NileGazer00/NileGazer00.github.io/ci.yml?branch=main" alt="CI" />
  </a>
  <a href="https://github.com/NileGazer00/NileGazer00.github.io/stargazers">
    <img src="https://img.shields.io/github/stars/NileGazer00/NileGazer00.github.io?style=social" alt="GitHub stars" />
  </a>
</p>

<p align="center">
  <strong>High-performance static portfolio website built to attract premium clients and capture qualified leads</strong><br />
  React • Next.js • TypeScript • Tailwind CSS • Framer Motion • HTML/CSS/JS
</p>

<p align="center">
  <a href="#about-this-project">About</a> •
  <a href="#how-it-works">How It Works</a> •
  <a href="#site-structure">Structure</a> •
  <a href="#lead-generation-flow">Lead Flow</a> •
  <a href="#free-tools">Tools</a> •
  <a href="#getting-started">Getting Started</a> •
  <a href="#deployment">Deployment</a>
</p>

---

## About This Project

**NileGazer00.github.io** is a conversion-focused static website designed to showcase Nile Gazer’s work, generate qualified leads, and provide free tools for developers and business owners. The site combines a portfolio-style homepage with gated utility tools and direct contact paths, making it both a personal brand site and a lead-generation engine.

The project is built for speed, simplicity, and reach. It uses pure HTML, CSS, and JavaScript, so it can be deployed easily on GitHub Pages without a backend.

## What It Includes

- A polished homepage with strong positioning and clear calls to action.
- A free project estimate flow for lead capture.
- A contact page for direct inquiries.
- Three interactive tools that help visitors while encouraging conversion.
- A thank-you page to complete the funnel.
- Responsive design for mobile, tablet, and desktop.

## How It Works

```mermaid
flowchart TD
    A[Visitor lands on homepage] --> B{Chooses a path}
    B --> C[Explore portfolio and services]
    B --> D[Use free tools]
    B --> E[Request project estimate]
    B --> F[Send direct contact message]

    D --> G[Freelance Rate Calculator]
    D --> H[Web Dev ROI Estimator]
    D --> I[Project Timeline Planner]

    G --> J[Lead capture prompt]
    H --> J
    I --> J

    E --> K[Web3Forms submission]
    F --> L[Formspree submission]

    J --> M[Email capture form]
    K --> N[Email notification / lead inbox]
    L --> N

    M --> O[Thank-you page]
    N --> O
    O --> P[Qualified lead or new client conversation]
```

## How The Site Works

The homepage introduces the developer brand and gives visitors a few clear choices. They can review the portfolio message, open one of the free tools, request a project estimate, or send a contact message.

The tools are designed as lead magnets. Each calculator gives useful output first, then encourages the user to submit an email or continue to a contact flow. That means the site delivers value before asking for conversion, which usually performs better than a simple contact form alone.

The lead capture pages use third-party form handling services, so there is no custom backend server to maintain. Once a visitor submits a form, the data is delivered directly to the chosen inbox or service endpoint, and the user is redirected to a thank-you page.

## Site Structure

```text
NileGazer00.github.io/
├── index.html
├── lead-capture.html
├── contact.html
├── thanks.html
├── styles.css
├── script.js
└── tools/
    ├── freelance-rate-calc.html
    ├── roi-calculator.html
    └── timeline-planner.html
```

### File roles

- `index.html` is the homepage and main entry point.
- `lead-capture.html` handles project estimate submissions.
- `contact.html` handles general contact messages.
- `thanks.html` confirms successful submission.
- `styles.css` contains the global responsive styling.
- `script.js` manages small interactions like smooth scrolling and logging.
- `tools/` contains the gated calculator pages.

## Lead Generation Flow

```mermaid
sequenceDiagram
    actor Visitor
    participant Site as Static Site
    participant Tool as Calculator Page
    participant Form as Lead Form Service
    participant Email as Inbox / Notification
    participant Thanks as Thank-You Page

    Visitor->>Site: Opens homepage
    Site->>Visitor: Shows tools and CTA buttons
    Visitor->>Tool: Uses a calculator
    Tool->>Visitor: Shows result and CTA gate
    Visitor->>Form: Submits email or project details
    Form->>Email: Sends captured lead
    Form->>Thanks: Redirects after success
    Thanks->>Visitor: Shows confirmation
```

## Free Tools

### Freelance Rate Calculator
Helps visitors estimate a realistic hourly or project rate based on experience, cost, and profit goals. This is useful for freelancers and consultants who want to price their work properly.

### Web Dev ROI Estimator
Helps businesses estimate return on investment for a website or web app. This makes the site useful to founders and business owners who are comparing development cost against revenue potential.

### Project Timeline Planner
Helps users estimate how long a web project may take based on scope, complexity, and team size. This is valuable for planning and also helps qualify serious prospects.

## Why This Site Converts

- The site gives value immediately through tools.
- The lead capture appears after the user sees a benefit.
- The layout is simple, fast, and mobile-friendly.
- The messaging targets both developers and business owners.
- The direct estimate and contact options create multiple conversion paths.

## Getting Started

### Local preview

Open `index.html` in a browser, or use a simple local server for a better development experience.

### Edit content

Update the homepage copy, tool text, contact details, and form endpoints to match your brand and services.

### Customize forms

Update the Web3Forms and Formspree keys in the relevant HTML files, then verify that submissions are routed correctly to your email inbox.

## Deployment

This site is built for GitHub Pages and works well as a static site. Push the repository to GitHub, enable Pages in the repository settings, and the site will deploy without any backend setup.

Because the project is static, it is also easy to move to other hosting providers such as Netlify or Vercel later if needed.

## Tech Stack

- HTML
- CSS
- JavaScript
- GitHub Pages
- Web3Forms
- Formspree

## Contact

If someone wants to hire you, the site gives them two paths:
- a project estimate form for higher-intent inquiries.
- a contact form for general messages.

The homepage also links to the live tools, helping visitors engage before they reach out.

## License

Released under the MIT License.
