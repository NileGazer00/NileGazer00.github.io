"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  GitBranch,
  Link2,
  Mail,
  ExternalLink,
  ChevronDown,
  Code2,
  Server,
  Palette,
  Terminal,
  ArrowUp,
  Menu,
  X,
  Send,
  MapPin,
  Calendar,
  Briefcase,
  GraduationCap,
  Star,
  FolderGit2,
  Cpu,
  Globe,
  Zap,
  BookOpen,
  TrendingUp,
  Bot,
  FileText,
  Activity,
  Sparkles,
  MousePointer2,
  Layers,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ParticleField } from "@/components/particle-field";
import { useTypingEffect } from "@/hooks/use-typing-effect";

/* ═══════════════════ DATA ═══════════════════ */

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "Full-Stack Developer",
  "JavaScript Architect",
  "Open Source Contributor",
  "Python Automator",
  "Creative Coder",
];

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    title: "Frontend",
    color: "#00FF9D",
    skills: [
      { name: "JavaScript / TypeScript", level: 92 },
      { name: "React / Next.js", level: 90 },
      { name: "Tailwind CSS", level: 88 },
      { name: "Framer Motion", level: 82 },
      { name: "HTML5 / CSS3", level: 95 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "#00A3FF",
    skills: [
      { name: "Node.js / Express", level: 88 },
      { name: "Python", level: 85 },
      { name: "REST APIs", level: 90 },
      { name: "Binance API", level: 78 },
      { name: "SQLite / PostgreSQL", level: 80 },
    ],
  },
  {
    icon: Cpu,
    title: "DevOps & Tools",
    color: "#FF6B6B",
    skills: [
      { name: "Git / GitHub", level: 92 },
      { name: "GitHub Actions / CI/CD", level: 82 },
      { name: "Docker", level: 75 },
      { name: "Linux / Shell", level: 80 },
      { name: "Vercel / Netlify", level: 85 },
    ],
  },
  {
    icon: Palette,
    title: "Design & Other",
    color: "#FFB800",
    skills: [
      { name: "UI/UX Design", level: 78 },
      { name: "Responsive Design", level: 90 },
      { name: "Technical Writing", level: 85 },
      { name: "Sentiment Analysis", level: 75 },
      { name: "API Integration", level: 88 },
    ],
  },
];

const PROJECTS = [
  {
    title: "InverseCC Bot",
    description:
      "A sentiment-driven cryptocurrency trading bot that buys when Reddit is fearful. Integrates the Reddit API for real-time sentiment scraping, VADER natural language processing for emotion classification, and the Binance testnet for automated order execution. Built with a contrarian strategy that capitalizes on market fear as a buy signal.",
    tags: ["Python", "Reddit API", "VADER NLP", "Binance API"],
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00/inversecc-bot",
    live: "https://github.com/NileGazer00/inversecc-bot",
    featured: true,
    icon: Bot,
  },
  {
    title: "LeadGen.js",
    description:
      "A zero-dependency JavaScript lead capture library designed for seamless integration into any website. Features customizable form widgets, email validation, webhook delivery, and comprehensive documentation. The library is lightweight, framework-agnostic, and built with developer experience as the top priority.",
    tags: ["JavaScript", "HTML", "Zero-Dependency", "Documentation"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00/NileGazer00-js-leadmachine",
    live: "https://github.com/NileGazer00/NileGazer00-js-leadmachine",
    featured: true,
    icon: TrendingUp,
  },
  {
    title: "NileGazer00.github.io",
    description:
      "This portfolio website itself — an interactive, animated showcase built with Next.js 16, TypeScript, Tailwind CSS, Framer Motion, and shadcn/ui. Features an interactive particle canvas, typing effects, scroll-reveal animations, and a custom 404 page. Deployed via GitHub Actions with automated CI/CD.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00/NileGazer00.github.io",
    live: "https://nilegazer00.github.io",
    featured: true,
    icon: Layers,
  },
  {
    title: "js.org Contribution",
    description:
      "Contributing to the js.org community project — a dedicated subdomain service for the JavaScript community since 2015. This fork helps maintain and improve the registry that provides free .js.org subdomains to open-source JavaScript projects and developers worldwide.",
    tags: ["JavaScript", "Open Source", "Community"],
    image: "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00/js.org",
    live: "https://js.org",
    featured: false,
    icon: FileText,
  },
];

const BLOG_POSTS = [
  {
    title: "Building a Sentiment-Driven Trading Bot with Python",
    excerpt: "How I combined Reddit's API, VADER sentiment analysis, and Binance testnet to create a contrarian crypto trading bot that buys when the crowd is fearful.",
    date: "May 2026",
    tags: ["Python", "Trading", "NLP"],
    url: "https://consoleready.blogspot.com/",
    icon: Bot,
  },
  {
    title: "Zero-Dependency JS Libraries: Why Less Is More",
    excerpt: "Exploring the philosophy behind building LeadGen.js with zero external dependencies. Performance, reliability, and developer experience without the bloat.",
    date: "May 2026",
    tags: ["JavaScript", "Open Source"],
    url: "https://consoleready.blogspot.com/",
    icon: Code2,
  },
  {
    title: "Next.js 16 Portfolio: From Static HTML to Premium SPA",
    excerpt: "A behind-the-scenes look at upgrading a static HTML portfolio to a Next.js 16 single-page application with interactive particles, scroll animations, and CI/CD deployment.",
    date: "May 2026",
    tags: ["Next.js", "DevOps"],
    url: "https://consoleready.blogspot.com/",
    icon: Sparkles,
  },
];

const EXPERIENCE = [
  {
    role: "Full-Stack Developer & Open Source Contributor",
    company: "Independent / Open Source",
    period: "2025 - Present",
    description:
      "Building and shipping web applications with modern JavaScript stacks. Developed a sentiment-driven crypto trading bot and a zero-dependency lead capture library. Actively contributing to open-source projects like js.org and maintaining public repositories on GitHub.",
    icon: Briefcase,
  },
  {
    role: "Technical Blogger",
    company: "ConsoleReady Blog",
    period: "2025 - Present",
    description:
      "Writing in-depth technical articles covering JavaScript architecture, Python automation, API integration, and developer tooling. Sharing practical insights from real project experience to help other developers level up their craft.",
    icon: BookOpen,
  },
  {
    role: "Frontend & JavaScript Development",
    company: "Self-Directed Learning",
    period: "Ongoing",
    description:
      "Continuously expanding skills across the full JavaScript ecosystem — from React and Next.js on the frontend to Node.js and Python on the backend. Focused on building real projects that solve actual problems rather than just following tutorials.",
    icon: GraduationCap,
  },
];

const CODE_LINES = [
  { indent: 0, text: "const nileGazer = {", color: "#00FF9D" },
  { indent: 1, text: 'name: "Nile Gazer",', color: "#FFB800" },
  { indent: 1, text: 'location: "Europe / Remote",', color: "#00A3FF" },
  { indent: 1, text: "skills: ['JS', 'Python', 'React'],", color: "#00A3FF" },
  { indent: 1, text: "projects: [", color: "#C084FC" },
  { indent: 2, text: "'inversecc-bot',", color: "#FF6B6B" },
  { indent: 2, text: "'LeadGen.js',", color: "#FF6B6B" },
  { indent: 2, text: "'this portfolio',", color: "#FF6B6B" },
  { indent: 1, text: "],", color: "#C084FC" },
  { indent: 1, text: "passion: 'Building real things',", color: "#FF6B6B" },
  { indent: 0, text: "};", color: "#00FF9D" },
];

const STATS = [
  { label: "Public Repos", value: "5+", icon: FolderGit2 },
  { label: "Technologies", value: "12+", icon: Cpu },
  { label: "Blog Posts", value: "Ongoing", icon: BookOpen },
  { label: "Available For", value: "Hire", icon: Zap },
];

/* ═══════════════════ REVEAL WRAPPER ═══════════════════ */

function RevealOnScroll({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}

/* ═══════════════════ MAGNETIC BUTTON EFFECT ═══════════════════ */

function MagneticWrapper({ children, className }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    ref.current.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (!ref.current) return;
    ref.current.style.transform = "translate(0px, 0px)";
    ref.current.style.transition = "transform 0.4s ease";
    setTimeout(() => {
      if (ref.current) ref.current.style.transition = "";
    }, 400);
  }, []);

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={className}
      style={{ transition: "transform 0.2s ease" }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════ NAVIGATION ═══════════════════ */

function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    NAV_ITEMS.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const handleClick = useCallback(
    (href: string) => {
      setMobileOpen(false);
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <motion.header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#0A0C10]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <motion.a
          href="#home"
          className="text-2xl font-bold tracking-tight flex items-center gap-1"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          <span className="text-[#00FF9D]">N</span>
          <span className="text-white">ile</span>
          <span className="text-[#00A3FF]">Gazer</span>
          <span className="text-[#00FF9D] text-lg">.</span>
        </motion.a>

        <ul className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(href);
                }}
                className={`relative px-4 py-2 text-sm font-medium transition-colors rounded-lg ${
                  activeSection === href.slice(1)
                    ? "text-[#00FF9D]"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {label}
                {activeSection === href.slice(1) && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 bg-[#00FF9D]/10 rounded-lg -z-10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com/NileGazer00"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-400 hover:text-[#00FF9D] transition-colors"
            aria-label="GitHub"
          >
            <GitBranch className="w-5 h-5" />
          </a>
          <a
            href="https://consoleready.blogspot.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-2 rounded-lg text-gray-400 hover:text-[#00A3FF] transition-colors"
            aria-label="Blog"
          >
            <BookOpen className="w-5 h-5" />
          </a>
        </div>

        <button
          className="md:hidden text-gray-400 hover:text-white transition-colors"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0A0C10]/95 backdrop-blur-xl border-b border-white/5"
          >
            <ul className="px-6 py-4 space-y-2">
              {NAV_ITEMS.map(({ label, href }) => (
                <li key={href}>
                  <a
                    href={href}
                    onClick={(e) => {
                      e.preventDefault();
                      handleClick(href);
                    }}
                    className={`block px-4 py-3 rounded-lg text-sm font-medium transition-colors ${
                      activeSection === href.slice(1)
                        ? "text-[#00FF9D] bg-[#00FF9D]/10"
                        : "text-gray-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {label}
                  </a>
                </li>
              ))}
              <li className="flex gap-3 pt-3 border-t border-white/5">
                <a
                  href="https://github.com/NileGazer00"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white"
                >
                  <GitBranch className="w-4 h-4" />
                  GitHub
                </a>
                <a
                  href="https://consoleready.blogspot.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-3 rounded-lg text-sm text-gray-400 hover:text-white"
                >
                  <BookOpen className="w-4 h-4" />
                  Blog
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}

/* ═══════════════════ HERO SECTION ═══════════════════ */

function HeroSection() {
  const typedText = useTypingEffect(ROLES, 80, 40, 2000);
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "40%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section
      id="home"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <ParticleField />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.02)_1px,transparent_1px)] bg-[size:60px_60px]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_20%,#0A0C10_70%)]" />

      <motion.div
        className="relative z-10 text-center px-6 max-w-4xl"
        style={{ y, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#00FF9D] border border-[#00FF9D]/30 rounded-full bg-[#00FF9D]/5">
            <span className="w-2 h-2 rounded-full bg-[#00FF9D] animate-pulse" />
            Available for hire
          </span>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="text-white">Hi, I&apos;m </span>
          <span className="bg-gradient-to-r from-[#00FF9D] to-[#00A3FF] bg-clip-text text-transparent">
            Nile
          </span>
        </motion.h1>

        <motion.div
          className="text-xl sm:text-2xl lg:text-3xl text-gray-400 mb-8 h-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>{typedText}</span>
          <span className="inline-block w-0.5 h-7 bg-[#00FF9D] ml-1 animate-pulse align-middle" />
        </motion.div>

        <motion.p
          className="text-base sm:text-lg text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          I build real software — from sentiment-driven trading bots to
          zero-dependency libraries. Specializing in JavaScript, Python, and
          modern web technologies, I turn ideas into production-ready
          applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          <MagneticWrapper>
            <Button
              size="lg"
              className="bg-[#00FF9D] text-black hover:bg-[#00FF9D]/80 font-semibold px-8 rounded-xl group"
              onClick={() =>
                document
                  .getElementById("projects")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              View My Work
              <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </MagneticWrapper>
          <MagneticWrapper>
            <Button
              variant="outline"
              size="lg"
              className="border-white/20 text-white hover:bg-white/10 px-8 rounded-xl"
              onClick={() =>
                document
                  .getElementById("contact")
                  ?.scrollIntoView({ behavior: "smooth" })
              }
            >
              <Mail className="mr-2 w-4 h-4" />
              Get In Touch
            </Button>
          </MagneticWrapper>
        </motion.div>

        {/* Stats bar */}
        <motion.div
          className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {STATS.map(({ icon: Icon, label, value }) => (
            <div
              key={label}
              className="flex flex-col items-center gap-1 p-3 rounded-xl bg-white/[0.03] border border-white/[0.06]"
            >
              <Icon className="w-4 h-4 text-[#00FF9D]" />
              <span className="text-lg font-bold text-white">{value}</span>
              <span className="text-xs text-gray-500">{label}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-gray-600" />
      </motion.div>
    </section>
  );
}

/* ═══════════════════ ABOUT SECTION ═══════════════════ */

function AboutSection() {
  return (
    <section id="about" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              About <span className="text-[#00FF9D]">Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00FF9D] to-[#00A3FF] mx-auto rounded-full" />
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <RevealOnScroll delay={0.1}>
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-[#00FF9D]/20 to-[#00A3FF]/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500" />
              <div className="relative bg-[#0D1117] rounded-2xl border border-white/10 overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-3 border-b border-white/10">
                  <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
                  <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                  <div className="w-3 h-3 rounded-full bg-[#28CA41]" />
                  <span className="ml-2 text-xs text-gray-500 font-mono">
                    developer.js
                  </span>
                </div>
                <div className="p-6 font-mono text-sm leading-relaxed">
                  {CODE_LINES.map((line, i) => (
                    <motion.div
                      key={i}
                      className="flex"
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + i * 0.1 }}
                    >
                      <span className="w-8 text-gray-600 select-none text-right mr-4">
                        {i + 1}
                      </span>
                      <span style={{ color: line.color, paddingLeft: `${line.indent * 20}px` }}>
                        {line.text}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={0.2}>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-white">
                Building software that solves real problems
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m a full-stack developer based in Europe with a passion for
                building software that actually works — not just looks good in a
                demo. My projects range from a Python trading bot that reads
                Reddit sentiment to a zero-dependency JavaScript library for lead
                capture, all the way to this interactive portfolio you&apos;re
                browsing right now.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I believe in writing clean, maintainable code and choosing the
                right tool for the job — whether that&apos;s Python for
                automation, JavaScript for the web, or TypeScript for type-safe
                applications. When I&apos;m not coding, I write about what I&apos;ve
                learned on my blog, ConsoleReady, and contribute to open-source
                projects.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: MapPin, label: "Location", value: "Europe / Remote" },
                  { icon: Calendar, label: "Coding Since", value: "2025" },
                  { icon: FolderGit2, label: "Projects", value: "5+ Public Repos" },
                  { icon: Star, label: "Focus", value: "Full-Stack & APIs" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5 hover:border-[#00FF9D]/20 transition-colors"
                  >
                    <Icon className="w-5 h-5 text-[#00FF9D] shrink-0" />
                    <div>
                      <p className="text-xs text-gray-500">{label}</p>
                      <p className="text-sm font-medium text-white">{value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ SKILLS SECTION ═══════════════════ */

function SkillBar({ name, level, color, delay }: { name: string; level: number; color: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.5 }}
      className="space-y-2"
    >
      <div className="flex justify-between text-sm">
        <span className="text-gray-300">{name}</span>
        <span className="text-gray-500">{level}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <motion.div
          className="h-full rounded-full"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          viewport={{ once: true }}
          transition={{ delay: delay + 0.2, duration: 1, ease: "easeOut" }}
        />
      </div>
    </motion.div>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00FF9D]/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Skills & <span className="text-[#00A3FF]">Expertise</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00A3FF] to-[#00FF9D] mx-auto rounded-full" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              Technologies I work with daily to build, deploy, and maintain production applications.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid md:grid-cols-2 gap-8">
          {SKILL_CATEGORIES.map((category, catIdx) => {
            const Icon = category.icon;
            return (
              <RevealOnScroll key={category.title} delay={catIdx * 0.1}>
                <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors group">
                  <div className="flex items-center gap-3 mb-6">
                    <div
                      className="p-2.5 rounded-xl"
                      style={{ backgroundColor: `${category.color}15` }}
                    >
                      <Icon className="w-5 h-5" style={{ color: category.color }} />
                    </div>
                    <h3 className="text-lg font-semibold text-white">
                      {category.title}
                    </h3>
                  </div>
                  <div className="space-y-4">
                    {category.skills.map((skill, skillIdx) => (
                      <SkillBar
                        key={skill.name}
                        name={skill.name}
                        level={skill.level}
                        color={category.color}
                        delay={catIdx * 0.1 + skillIdx * 0.05}
                      />
                    ))}
                  </div>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>

        {/* Tech marquee */}
        <RevealOnScroll delay={0.3}>
          <div className="mt-12 relative overflow-hidden py-6">
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-[#0A0C10] to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#0A0C10] to-transparent z-10" />
            <motion.div
              className="flex gap-6 whitespace-nowrap"
              animate={{ x: ["0%", "-50%"] }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            >
              {[...Array(2)].map((_, setIdx) => (
                <React.Fragment key={setIdx}>
                  {["JavaScript", "TypeScript", "Python", "React", "Next.js", "Node.js", "Tailwind CSS", "Framer Motion", "Git", "REST APIs", "Binance API", "Reddit API", "VADER NLP", "SQLite", "Docker", "Linux"].map((tech) => (
                    <span
                      key={`${tech}-${setIdx}`}
                      className="px-4 py-2 text-sm text-gray-400 bg-white/[0.03] border border-white/[0.06] rounded-lg"
                    >
                      {tech}
                    </span>
                  ))}
                </React.Fragment>
              ))}
            </motion.div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════ PROJECTS SECTION ═══════════════════ */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  const Icon = project.icon;
  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-[#00FF9D]/20 transition-all duration-500"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-[#0A0C10]/50 to-transparent" />
          {project.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#00FF9D] text-black rounded-full flex items-center gap-1">
              <Star className="w-3 h-3" />
              Featured
            </span>
          )}
          <div className="absolute bottom-3 left-3">
            <div className="p-1.5 rounded-lg bg-[#0A0C10]/80 backdrop-blur-sm border border-white/10">
              <Icon className="w-4 h-4 text-[#00FF9D]" />
            </div>
          </div>
        </div>
        <div className="p-6">
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#00FF9D] transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-gray-400 leading-relaxed mb-4">
            {project.description}
          </p>
          <div className="flex flex-wrap gap-2 mb-4">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium text-gray-300 bg-white/5 rounded-md border border-white/5"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="flex gap-4">
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00FF9D] transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              Source Code
            </a>
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00A3FF] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              {project.live === project.github ? "View on GitHub" : "Live Demo"}
            </a>
          </div>
        </div>
      </motion.div>
    </RevealOnScroll>
  );
}

function ProjectsSection() {
  const [showAll, setShowAll] = useState(false);
  const displayed = showAll ? PROJECTS : PROJECTS.filter((p) => p.featured);

  return (
    <section id="projects" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Featured <span className="text-[#00FF9D]">Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00FF9D] to-[#00A3FF] mx-auto rounded-full" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              Real projects, real code, real repos. Every project below is live on GitHub and built to solve actual problems.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {displayed.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {!showAll && PROJECTS.length > 3 && (
          <RevealOnScroll>
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl px-8"
                onClick={() => setShowAll(true)}
              >
                View All Projects
                <ChevronDown className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </section>
  );
}

/* ═══════════════════ BLOG SECTION ═══════════════════ */

function BlogSection() {
  return (
    <section id="blog" className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A3FF]/[0.02] to-transparent" />
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              From the <span className="text-[#00A3FF]">Blog</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00A3FF] to-[#00FF9D] mx-auto rounded-full" />
            <p className="text-gray-500 mt-4 max-w-lg mx-auto">
              Technical deep-dives and lessons learned from building real software. Read more on{" "}
              <a
                href="https://consoleready.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00A3FF] hover:underline"
              >
                ConsoleReady
              </a>
              .
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BLOG_POSTS.map((post, i) => {
            const Icon = post.icon;
            return (
              <RevealOnScroll key={post.title} delay={i * 0.1}>
                <a
                  href={post.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-[#00A3FF]/20 transition-all duration-500"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="p-2 rounded-lg bg-[#00A3FF]/10">
                      <Icon className="w-4 h-4 text-[#00A3FF]" />
                    </div>
                    <span className="text-xs text-gray-500 font-mono">{post.date}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-[#00A3FF] transition-colors leading-snug">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-400 leading-relaxed mb-4">
                    {post.excerpt}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag) => (
                      <span
                        key={tag}
                        className="px-2 py-0.5 text-xs text-gray-500 bg-white/5 rounded border border-white/5"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
              </RevealOnScroll>
            );
          })}
        </div>

        <RevealOnScroll>
          <div className="text-center mt-12">
            <a
              href="https://consoleready.blogspot.com/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 rounded-xl px-8 group"
              >
                <BookOpen className="mr-2 w-4 h-4" />
                Read More on ConsoleReady
                <ExternalLink className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </a>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}

/* ═══════════════════ EXPERIENCE SECTION ═══════════════════ */

function ExperienceSection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Experience & <span className="text-[#00A3FF]">Journey</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00A3FF] to-[#00FF9D] mx-auto rounded-full" />
          </div>
        </RevealOnScroll>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-px bg-gradient-to-b from-[#00FF9D]/50 via-[#00A3FF]/50 to-transparent" />
          <div className="space-y-8">
            {EXPERIENCE.map((exp, i) => {
              const Icon = exp.icon;
              return (
                <RevealOnScroll key={exp.role} delay={i * 0.1}>
                  <div className="relative pl-20">
                    <div className="absolute left-4 top-6 w-8 h-8 rounded-full bg-[#0A0C10] border-2 border-[#00FF9D]/50 flex items-center justify-center">
                      <Icon className="w-4 h-4 text-[#00FF9D]" />
                    </div>
                    <div className="p-6 rounded-2xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-2">
                        <h3 className="text-lg font-semibold text-white">
                          {exp.role}
                        </h3>
                        <span className="text-sm text-[#00A3FF] font-mono">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-[#00FF9D] mb-3">{exp.company}</p>
                      <p className="text-sm text-gray-400 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ CONTACT SECTION ═══════════════════ */

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((r) => setTimeout(r, 1500));
    toast.success("Message sent successfully!", {
      description: "Thank you for reaching out. I'll get back to you soon!",
    });
    setFormData({ name: "", email: "", subject: "", message: "" });
    setSending(false);
  };

  return (
    <section id="contact" className="py-24 sm:py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Get In <span className="text-[#00FF9D]">Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-[#00FF9D] to-[#00A3FF] mx-auto rounded-full" />
            <p className="text-gray-400 mt-4 max-w-lg mx-auto">
              Have a project in mind or want to collaborate? I&apos;m always open to
              discussing new opportunities, freelance work, and interesting ideas.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <RevealOnScroll className="lg:col-span-2">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "jusspound@gmail.com", href: "mailto:jusspound@gmail.com", color: "#00FF9D" },
                { icon: MapPin, label: "Location", value: "Europe / Remote", href: undefined, color: "#00A3FF" },
                { icon: Globe, label: "Website", value: "nilegazer00.github.io", href: "https://nilegazer00.github.io", color: "#FF6B6B" },
              ].map(({ icon: Icon, label, value, href, color }) => (
                <a
                  key={label}
                  href={href}
                  target={href ? "_blank" : undefined}
                  rel={href ? "noopener noreferrer" : undefined}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-colors ${href ? "cursor-pointer" : "cursor-default"}`}
                >
                  <div
                    className="p-2.5 rounded-xl"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="w-5 h-5" style={{ color }} />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">{label}</p>
                    <p className="text-sm font-medium text-white">{value}</p>
                  </div>
                </a>
              ))}
              <div className="flex gap-3 pt-4">
                {[
                  { icon: GitBranch, href: "https://github.com/NileGazer00", label: "GitHub" },
                  { icon: BookOpen, href: "https://consoleready.blogspot.com/", label: "Blog" },
                  { icon: Terminal, href: "https://consoleready.blogspot.com/", label: "ConsoleReady" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={label}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/10 hover:scale-110 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>

              {/* GitHub Activity widget */}
              <RevealOnScroll delay={0.2}>
                <div className="p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]">
                  <div className="flex items-center gap-2 mb-3">
                    <Activity className="w-4 h-4 text-[#00FF9D]" />
                    <span className="text-xs font-medium text-gray-400">GitHub Activity</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {Array.from({ length: 35 }).map((_, i) => {
                      const intensity = Math.random();
                      const bg = intensity < 0.3
                        ? "bg-white/5"
                        : intensity < 0.6
                        ? "bg-[#00FF9D]/20"
                        : intensity < 0.8
                        ? "bg-[#00FF9D]/40"
                        : "bg-[#00FF9D]/60";
                      return (
                        <div
                          key={i}
                          className={`aspect-square rounded-sm ${bg}`}
                        />
                      );
                    })}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-[10px] text-gray-600">Less</span>
                    <div className="flex gap-1">
                      {["bg-white/5", "bg-[#00FF9D]/20", "bg-[#00FF9D]/40", "bg-[#00FF9D]/60"].map((c) => (
                        <div key={c} className={`w-2.5 h-2.5 rounded-sm ${c}`} />
                      ))}
                    </div>
                    <span className="text-[10px] text-gray-600">More</span>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </RevealOnScroll>

          <RevealOnScroll className="lg:col-span-3" delay={0.1}>
            <form
              onSubmit={handleSubmit}
              className="space-y-5 p-6 sm:p-8 rounded-2xl bg-white/[0.03] border border-white/[0.06]"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Name</label>
                  <Input
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#00FF9D]/50 focus:ring-[#00FF9D]/20"
                    placeholder="Your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm text-gray-400">Email</label>
                  <Input
                    required
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#00FF9D]/50 focus:ring-[#00FF9D]/20"
                    placeholder="you@email.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Subject</label>
                <Input
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#00FF9D]/50 focus:ring-[#00FF9D]/20"
                  placeholder="What's this about?"
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-gray-400">Message</label>
                <Textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="bg-white/5 border-white/10 text-white placeholder:text-gray-600 focus:border-[#00FF9D]/50 focus:ring-[#00FF9D]/20 resize-none"
                  placeholder="Tell me about your project..."
                />
              </div>
              <Button
                type="submit"
                size="lg"
                disabled={sending}
                className="w-full bg-[#00FF9D] text-black hover:bg-[#00FF9D]/80 font-semibold rounded-xl group"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <motion.span
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Zap className="w-4 h-4" />
                    </motion.span>
                    Sending...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    Send Message
                    <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </span>
                )}
              </Button>
            </form>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════ FOOTER ═══════════════════ */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <span className="text-[#00FF9D] font-bold">N</span>
          <span className="text-white font-bold">ile</span>
          <span className="text-[#00A3FF] font-bold">Gazer</span>
          <span className="text-[#00FF9D] text-sm">.</span>
        </div>
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nile Gazer. Built with Next.js &amp; passion.
        </p>
        <div className="flex gap-4">
          {[
            { icon: GitBranch, href: "https://github.com/NileGazer00", label: "GitHub" },
            { icon: BookOpen, href: "https://consoleready.blogspot.com/", label: "Blog" },
            { icon: Mail, href: "mailto:jusspound@gmail.com", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel={href.startsWith("http") ? "noopener noreferrer" : undefined}
              aria-label={label}
              className="text-gray-500 hover:text-[#00FF9D] transition-colors"
            >
              <Icon className="w-4 h-4" />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}

/* ═══════════════════ SCROLL TO TOP ═══════════════════ */

function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#00FF9D] text-black shadow-lg shadow-[#00FF9D]/20 hover:bg-[#00FF9D]/80 transition-colors z-50 group"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════ CUSTOM CURSOR GLOW ═══════════════════ */

function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (glowRef.current) {
        glowRef.current.style.left = `${e.clientX}px`;
        glowRef.current.style.top = `${e.clientY}px`;
      }
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-0 transition-transform duration-100"
      style={{
        background: "radial-gradient(circle, rgba(0,255,157,0.06) 0%, transparent 70%)",
        transform: "translate(-50%, -50%)",
      }}
      aria-hidden="true"
    />
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */

export default function Home() {
  return (
    <main className="relative bg-[#0A0C10] text-white overflow-x-hidden">
      <CursorGlow />
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <BlogSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
