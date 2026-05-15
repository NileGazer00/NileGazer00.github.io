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
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { ParticleField } from "@/components/particle-field";
import { useTypingEffect } from "@/hooks/use-typing-effect";

/* ─────────────── Data ─────────────── */

const NAV_ITEMS = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const ROLES = [
  "Full-Stack Developer",
  "UI/UX Enthusiast",
  "Open Source Contributor",
  "Creative Coder",
  "Problem Solver",
];

const SKILL_CATEGORIES = [
  {
    icon: Code2,
    title: "Frontend",
    color: "#00FF9D",
    skills: [
      { name: "React / Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 92 },
      { name: "Framer Motion", level: 85 },
      { name: "Vue.js", level: 78 },
    ],
  },
  {
    icon: Server,
    title: "Backend",
    color: "#00A3FF",
    skills: [
      { name: "Node.js", level: 90 },
      { name: "Python / Django", level: 85 },
      { name: "PostgreSQL", level: 88 },
      { name: "REST / GraphQL", level: 87 },
      { name: "Redis", level: 75 },
    ],
  },
  {
    icon: Cpu,
    title: "DevOps & Tools",
    color: "#FF6B6B",
    skills: [
      { name: "Docker", level: 85 },
      { name: "CI/CD Pipelines", level: 82 },
      { name: "AWS / Cloud", level: 80 },
      { name: "Git / GitHub", level: 95 },
      { name: "Linux", level: 88 },
    ],
  },
  {
    icon: Palette,
    title: "Design",
    color: "#FFB800",
    skills: [
      { name: "Figma", level: 80 },
      { name: "UI/UX Design", level: 78 },
      { name: "Responsive Design", level: 92 },
      { name: "Accessibility", level: 85 },
      { name: "Design Systems", level: 82 },
    ],
  },
];
const PROJECTS = [
  {
    title: "CloudSync Pro",
    description:
      "A real-time collaborative cloud storage platform with end-to-end encryption, live file editing, and seamless team sharing. Built with WebSocket-powered sync engine and conflict resolution.",
    tags: ["Next.js", "WebSocket", "PostgreSQL", "AWS S3"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: true,
  },
  {
    title: "DevMetrics Dashboard",
    description:
      "An analytics dashboard for engineering teams that visualizes code quality, deployment frequency, and team productivity metrics with real-time data streaming.",
    tags: ["React", "D3.js", "Node.js", "MongoDB"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: true,
  },
  {
    title: "AI Code Reviewer",
    description:
      "An AI-powered code review tool that analyzes pull requests, suggests improvements, detects potential bugs, and enforces coding standards automatically.",
    tags: ["Python", "OpenAI API", "FastAPI", "Redis"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: true,
  },
  {
    title: "EcoTracker",
    description:
      "A sustainability tracking app that helps individuals monitor their carbon footprint, set eco-goals, and discover greener alternatives for daily activities.",
    tags: ["React Native", "Firebase", "Chart.js"],
    image: "https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: false,
  },
  {
    title: "Markdown Studio",
    description:
      "A feature-rich markdown editor with live preview, custom themes, export to PDF/HTML, and plugin support for extended functionality.",
    tags: ["Vue.js", "CodeMirror", "Express"],
    image: "https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: false,
  },
  {
    title: "TaskForge CLI",
    description:
      "A powerful command-line task management tool with Git integration, time tracking, project templates, and customizable workflows.",
    tags: ["Rust", "SQLite", "CLI", "Git"],
    image: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=600&h=400&fit=crop",
    github: "https://github.com/NileGazer00",
    live: "#",
    featured: false,
  },
];

const EXPERIENCE = [
  {
    role: "Senior Full-Stack Developer",
    company: "TechNova Inc.",
    period: "2023 - Present",
    description:
      "Leading the development of cloud-native applications, architecting microservices, and mentoring junior developers. Spearheaded migration to Next.js reducing load times by 40%.",
    icon: Briefcase,
  },
  {
    role: "Full-Stack Developer",
    company: "DigitalCraft Labs",
    period: "2021 - 2023",
    description:
      "Built and maintained SaaS products serving 50K+ users. Implemented real-time features using WebSockets and optimized database queries for 3x performance improvement.",
    icon: Briefcase,
  },
  {
    role: "Frontend Developer",
    company: "PixelWave Studio",
    period: "2019 - 2021",
    description:
      "Developed responsive web applications and interactive dashboards. Introduced component-driven development and design system that reduced UI development time by 30%.",
    icon: Briefcase,
  },
  {
    role: "B.Sc. Computer Science",
    company: "University of Technology",
    period: "2015 - 2019",
    description:
      "Graduated with honors. Focused on software engineering and human-computer interaction. Published research on accessible web design patterns.",
    icon: GraduationCap,
  },
];

const CODE_LINES = [
  { indent: 0, text: "const developer = {", color: "#00FF9D" },
  { indent: 1, text: 'name: "Nile Gazer",', color: "#FFB800" },
  { indent: 1, text: "skills: ['React', 'Node', 'Python'],", color: "#00A3FF" },
  { indent: 1, text: "passion: 'Building the future,',", color: "#FF6B6B" },
  { indent: 1, text: "  one commit at a time", color: "#FF6B6B" },
  { indent: 0, text: "};", color: "#00FF9D" },
];
/* ─────────────── Reveal Wrapper ─────────────── */

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

/* ─────────────── Navigation ─────────────── */

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
          className="text-2xl font-bold tracking-tight"
          whileHover={{ scale: 1.05 }}
          onClick={(e) => {
            e.preventDefault();
            handleClick("#home");
          }}
        >
          <span className="text-[#00FF9D]">N</span>
          <span className="text-white">ile</span>
          <span className="text-[#00A3FF]">.</span>
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
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
/* ─────────────── Hero Section ─────────────── */

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
          <span className="inline-block px-4 py-1.5 text-xs font-semibold tracking-widest uppercase text-[#00FF9D] border border-[#00FF9D]/30 rounded-full bg-[#00FF9D]/5">
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
          I craft exceptional digital experiences with clean code and creative
          design. Specializing in modern web technologies, I turn ideas into
          polished, production-ready applications.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
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

/* ─────────────── About Section ─────────────── */

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
                      transition={{ delay: 0.5 + i * 0.15 }}
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
                Passionate about crafting digital experiences
              </h3>
              <p className="text-gray-400 leading-relaxed">
                I&apos;m a full-stack developer with over 5 years of experience
                building web applications that are both beautiful and
                performant. My journey began with curiosity about how things
                work on the internet, and it evolved into a deep passion for
                creating software that makes a real difference.
              </p>
              <p className="text-gray-400 leading-relaxed">
                I believe in writing clean, maintainable code and designing
                intuitive user interfaces. When I&apos;m not coding, you can find me
                contributing to open-source projects, exploring new
                technologies, or sharing knowledge through technical writing and
                community meetups.
              </p>
              <div className="grid grid-cols-2 gap-4 pt-4">
                {[
                  { icon: MapPin, label: "Location", value: "Global / Remote" },
                  { icon: Calendar, label: "Experience", value: "5+ Years" },
                  { icon: FolderGit2, label: "Projects", value: "50+ Completed" },
                  { icon: Star, label: "Focus", value: "Full-Stack & UX" },
                ].map(({ icon: Icon, label, value }) => (
                  <div
                    key={label}
                    className="flex items-center gap-3 p-3 rounded-xl bg-white/5 border border-white/5"
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

/* ─────────────── Skills Section ─────────────── */

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
      </div>
    </section>
  );
}

/* ─────────────── Projects Section ─────────────── */

function ProjectCard({
  project,
  index,
}: {
  project: (typeof PROJECTS)[0];
  index: number;
}) {
  return (
    <RevealOnScroll delay={index * 0.1}>
      <motion.div
        className="group relative rounded-2xl overflow-hidden bg-white/[0.03] border border-white/[0.06] hover:border-white/10 transition-all duration-500"
        whileHover={{ y: -5 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative overflow-hidden h-48">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C10] via-transparent to-transparent" />
          {project.featured && (
            <span className="absolute top-3 right-3 px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-[#00FF9D] text-black rounded-full">
              Featured
            </span>
          )}
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
          <div className="flex gap-3">
            <a
              href={project.github}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00FF9D] transition-colors"
            >
              <GitBranch className="w-4 h-4" />
              Code
            </a>
            <a
              href={project.live}
              className="flex items-center gap-1.5 text-sm text-gray-400 hover:text-[#00A3FF] transition-colors"
            >
              <ExternalLink className="w-4 h-4" />
              Live
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

/* ─────────────── Experience Section ─────────────── */

function ExperienceSection() {
  return (
    <section className="py-24 sm:py-32 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00A3FF]/[0.02] to-transparent" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <RevealOnScroll>
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-5xl font-bold text-white mb-4">
              Experience & <span className="text-[#00A3FF]">Education</span>
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

/* ─────────────── Contact Section ─────────────── */

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
              Have a project in mind or want to collaborate? Feel free to reach
              out. I&apos;m always open to discussing new opportunities and ideas.
            </p>
          </div>
        </RevealOnScroll>

        <div className="grid lg:grid-cols-5 gap-12 max-w-5xl mx-auto">
          <RevealOnScroll className="lg:col-span-2">
            <div className="space-y-6">
              {[
                { icon: Mail, label: "Email", value: "jusspound@gmail.com", color: "#00FF9D" },
                { icon: MapPin, label: "Location", value: "Remote / Worldwide", color: "#00A3FF" },
                { icon: Globe, label: "Website", value: "nilegazer00.github.io", color: "#FF6B6B" },
              ].map(({ icon: Icon, label, value, color }) => (
                <div
                  key={label}
                  className="flex items-center gap-4 p-4 rounded-xl bg-white/[0.03] border border-white/[0.06]"
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
                </div>
              ))}
              <div className="flex gap-3 pt-4">
                {[
                  { icon: GitBranch, href: "#", label: "GitHub" },
                  { icon: Link2, href: "https://consoleready.blogspot.com/", label: "Blog" },
                  { icon: Terminal, href: "https://consoleready.blogspot.com/", label: "Blog" },
                ].map(({ icon: Icon, href, label }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="p-3 rounded-xl bg-white/[0.03] border border-white/[0.06] text-gray-400 hover:text-white hover:border-white/10 transition-all"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                ))}
              </div>
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

/* ─────────────── Footer ─────────────── */

function Footer() {
  return (
    <footer className="border-t border-white/5 py-8">
      <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-sm text-gray-500">
          &copy; {new Date().getFullYear()} Nile Gazer. Crafted with passion &amp; code.
        </p>
        <div className="flex gap-4">
          {[
            { icon: GitBranch, href: "#", label: "GitHub" },
            { icon: Link2, href: "https://consoleready.blogspot.com/", label: "Blog" },
            { icon: Mail, href: "#", label: "Email" },
          ].map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
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

/* ─────────────── Scroll to Top ─────────────── */

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
          className="fixed bottom-8 right-8 p-3 rounded-full bg-[#00FF9D] text-black shadow-lg shadow-[#00FF9D]/20 hover:bg-[#00FF9D]/80 transition-colors z-50"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─────────────── Main Page ─────────────── */

export default function Home() {
  return (
    <main className="relative bg-[#0A0C10] text-white overflow-x-hidden">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <SkillsSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
      <Footer />
      <ScrollToTop />
    </main>
  );
}
