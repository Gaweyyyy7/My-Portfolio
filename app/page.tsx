"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useInView, AnimatePresence } from "framer-motion";
import { FaEnvelope, FaGithub, FaLinkedin, FaArrowRight } from "react-icons/fa";
import { SiFigma, SiMongodb, SiTailwindcss, SiTypescript } from "react-icons/si";
import { FaReact, FaNodeJs, FaHtml5 } from "react-icons/fa";

/* ─── Fade-up helper ───────────────────────────────────────── */
const FadeUp = ({ children, delay = 0, className = "" }: any) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

/* ─── Custom Cursor ────────────────────────────────────────── */
function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf: number;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener("mousemove", onMove);

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dotRef.current) { dotRef.current.style.left = mx + "px"; dotRef.current.style.top = my + "px"; }
      if (ringRef.current) { ringRef.current.style.left = rx + "px"; ringRef.current.style.top = ry + "px"; }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    const onEnter = () => ringRef.current && (ringRef.current.style.transform = "translate(-50%,-50%) scale(2.2)");
    const onLeave = () => ringRef.current && (ringRef.current.style.transform = "translate(-50%,-50%) scale(1)");
    document.querySelectorAll("a,button").forEach(el => { el.addEventListener("mouseenter", onEnter); el.addEventListener("mouseleave", onLeave); });

    return () => { window.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  );
}

/* ─── Scroll Progress ──────────────────────────────────────── */
function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });
  return <motion.div className="progress-bar" style={{ scaleX, width: "100%" }} />;
}

/* ─── Marquee Strip ────────────────────────────────────────── */
/* ─── SECTION DIVIDER ───────────────────────────────────────── */
/* ─── NAV ──────────────────────────────────────────────────── */
const navLinks = [
  { label: "Intro", href: "#intro" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Work", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-10 py-5 flex items-center justify-between transition-all duration-500 ${
        scrolled ? "bg-black/85 backdrop-blur-lg border-b border-white/[0.08]" : ""
      }`}
    >
      {/* Logo */}
      <a href="#home" className="font-display text-xl tracking-wide text-white">
        MG.
      </a>

      {/* Center: availability pill */}
      <a href="mailto:mahimagavesh2002@gmail.com" className="theme-pill hidden md:inline-flex">
        <span className="w-1.5 h-1.5 rounded-full bg-[#c0161b] animate-pulse" />
        Available for work
      </a>

      {/* Right: hamburger (always visible) + desktop links */}
      <div className="flex items-center gap-6">
        <div className="hidden md:flex items-center gap-7">
          {navLinks.map(({ label, href }) => (
            <a key={label} href={href}
              className="text-[10px] font-semibold uppercase tracking-widest text-white/50 hover:text-white transition duration-300 relative group">
              {label}
              <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
        </div>

        {/* Hamburger */}
        <button className="flex flex-col gap-[5px] p-1" onClick={() => setOpen(!open)}>
          <span className={`block h-px bg-white transition-all duration-300 ${
            open ? "w-5 rotate-45 translate-y-[7px]" : "w-5"
          }`} />
          <span className={`block h-px bg-white transition-all duration-300 ${
            open ? "opacity-0 w-5" : "w-3.5"
          }`} />
          <span className={`block h-px bg-white transition-all duration-300 ${
            open ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"
          }`} />
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            className="absolute top-full left-0 right-0 bg-black/95 backdrop-blur-lg border-b border-white/10 px-6 py-6 flex flex-col gap-5 md:hidden"
          >
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setOpen(false)}
                className="text-sm font-semibold uppercase tracking-widest text-white/60 hover:text-white transition">
                {label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}

/* ─── HERO ─────────────────────────────────────────────────── */
function Hero() {
  const { scrollY } = useScroll();
  const photoY = useTransform(scrollY, [0, 600], [0, 40]);

  const orbitTags = [
    { label: "React", angle: 340, radius: 52 },
    { label: "Figma", angle: 50, radius: 53 },
    { label: "Node.js", angle: 130, radius: 52 },
    { label: "MongoDB", angle: 210, radius: 53 },
    { label: "UI/UX", angle: 275, radius: 52 },
  ];

  return (
    <section id="home" className="relative min-h-screen bg-[#080808] overflow-hidden flex flex-col justify-center">

      {/* Background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.025)_1px,transparent_1px)] bg-[size:60px_60px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto w-full px-6 md:px-14 grid md:grid-cols-2 gap-12 items-center pt-24 pb-16">

        {/* ── LEFT: Name + Role + Bio ── */}
        <div className="flex flex-col gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <span className="text-white/60 text-lg md:text-xl font-light tracking-wide">Hello, I&apos;m</span>
            <div className="h-px w-16 bg-white/30" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-[13vw] md:text-[7.5vw] text-white leading-[0.9] tracking-tight"
          >
            Mahima<br />Gavesh
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.55 }}
            className="flex items-center gap-1"
          >
            <span className="text-white text-lg md:text-xl font-medium tracking-wide">
              UI/UX Frontend &amp; Full Stack Developer
            </span>
            <span className="inline-block w-0.5 h-5 bg-[#c0161b] animate-pulse ml-1" />
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.7 }}
            className="text-white/50 text-base leading-relaxed max-w-[52ch]"
          >
            IT undergraduate at SLIIT specialising in Interactive Media. I design intuitive user experiences and build full-stack products — from wireframe to deployed application — with a focus on clean UI and smooth interactions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.85 }}
            className="flex flex-wrap gap-3 pt-2"
          >
            <a href="#work" className="btn-red">View Projects</a>
            <a href="#contact" className="pill-btn">Let&apos;s Chat</a>
          </motion.div>
        </div>

        {/* ── RIGHT: Circular photo + orbiting tags ── */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="flex justify-center items-center"
        >
          <motion.div style={{ y: photoY, width: "clamp(260px, 36vw, 460px)", aspectRatio: "1" }} className="relative">
            {/* Outer ring */}
            <div className="absolute inset-0 rounded-full border border-white/10 ring-spin" />

            {/* Photo circle */}
            <div className="absolute inset-[6%] rounded-full overflow-hidden border-2 border-white/20 bg-white/5">
              <img
                src="/mahima-photo.jpeg"
                alt="Mahima Gavesh"
                className="w-full h-full object-cover object-top grayscale hover:grayscale-0 transition-all duration-700"
                onError={(e) => { (e.currentTarget as HTMLImageElement).style.display = "none"; }}
              />
            </div>

            {/* Orbiting tech tags */}
            {orbitTags.map(({ label, angle }) => {
              const rad = (angle * Math.PI) / 180;
              const x = 50 + 50 * Math.cos(rad);
              const y = 50 + 50 * Math.sin(rad);
              return (
                <motion.div
                  key={label}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 1 + angle / 800 }}
                  className="absolute"
                  style={{ left: `${x}%`, top: `${y}%`, transform: "translate(-50%, -50%)" }}
                >
                  <span className="bg-[#111] border border-white/20 text-white/80 text-[11px] font-medium px-3 py-1.5 rounded-full whitespace-nowrap shadow-lg hover:border-[#c0161b]/60 hover:text-white transition-all">
                    {label}
                  </span>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="relative z-10 flex justify-center pb-8"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">Scroll to explore</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent" />
        </div>
      </motion.div>

      {/* Red bottom bar */}
      <div className="h-2 bg-[#c0161b] w-full relative z-10" />
    </section>
  );
}

/* ─── TABLE OF CONTENTS ────────────────────────────────────── */
const tocItems = [
  { label: "Introduction", href: "#intro" },
  { label: "About Me", href: "#about" },
  { label: "Education", href: "#education" },
  { label: "Expertise & Tools", href: "#skills" },
  { label: "Project Portfolio", href: "#work" },
  { label: "Contact", href: "#contact" },
];

function TableOfContents() {
  return (
    <section className="bg-[#0a0a0a] py-32 px-6 md:px-14 border-y-2 border-white/20">
      <FadeUp>
        <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">navigate</p>
        <h2 className="font-display text-5xl md:text-7xl text-white mb-14">TABLE OF<br />CONTENTS</h2>
      </FadeUp>

      <FadeUp delay={0.2}>
        <div className="flex flex-wrap gap-3">
          {tocItems.map((item, i) => (
            <motion.a
              key={i}
              href={item.href}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.96 }}
              className="pill-btn"
            >
              {item.label}
            </motion.a>
          ))}
        </div>
      </FadeUp>
    </section>
  );
}

/* ─── INTRODUCTION ──────────────────────────────────────────── */
function Introduction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="intro" ref={ref} className="relative bg-black pt-40 pb-4 px-6 md:px-14 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:80px_80px]" />

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* Photo + text two-column */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-20 items-end mb-24">

          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="md:w-[38%] shrink-0 p-3"
          >
            <div className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl">
              {/* Thin border frame */}
              <div className="absolute inset-0 border border-white/15 z-10 pointer-events-none rounded-2xl" />
              <img
                src="/mahima-photo.jpeg"
                alt="Mahima Gavesh"
                className="w-full h-full object-cover object-top"
                onError={(e) => {
                  const el = e.currentTarget as HTMLImageElement;
                  el.style.display = "none";
                  const parent = el.parentElement;
                  if (parent) {
                    parent.innerHTML = `<div class="w-full h-full bg-white/5 flex items-end justify-center pb-8"><span class="font-display text-white/20 text-2xl tracking-widest">MG</span></div>`;
                  }
                }}
              />
              {/* Name label on photo */}
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent px-5 py-6 z-20">
                <p className="font-name text-2xl text-white">Mahima Gavesh</p>
                <p className="text-[10px] uppercase tracking-[0.3em] text-white/50 mt-1">UI/UX · Frontend · Full Stack</p>
              </div>
            </div>
          </motion.div>

          {/* Text columns */}
          <div className="flex flex-col gap-8 md:w-[62%]">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
            >
              <h3 className="font-display text-6xl md:text-7xl text-white leading-none tracking-wide mb-2">Mahima<br />Gavesh</h3>
              <p className="text-sm uppercase tracking-[0.25em] text-[#c0161b] mt-3">UI/UX Designer &nbsp;|&nbsp; Frontend Developer &nbsp;|&nbsp; Full Stack Developer</p>
            </motion.div>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="text-lg text-white/70 leading-relaxed"
            >
              A creative designer and developer who blends aesthetics with functionality. I specialise in crafting intuitive user experiences, building responsive frontend interfaces, and developing scalable full-stack systems that perform seamlessly behind the scenes.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.58 }}
              className="text-lg text-white/50 leading-relaxed"
            >
              With hands-on experience in modern web technologies and real-world projects, I transform ideas into visually engaging, user-centred digital products — from concept and wireframe to fully functional deployment.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="text-lg text-white/40 leading-relaxed"
            >
              I design with purpose, develop with precision, and build with scalability in mind.
            </motion.p>
          </div>
        </div>

        {/* Big INTRODUCTION text */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{ y: "110%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1.1, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.2 }}
            className="font-display text-[12vw] md:text-[10vw] text-white leading-none text-stroke opacity-20 select-none"
          >
            INTRODUCTION
          </motion.h2>
        </div>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────── */
function About() {
  const stats = [
    { num: "15+", label: "Projects Built" },
    { num: "20+", label: "Technologies" },
  ];

  return (
    <section id="about" className="bg-[#0d0d0d] py-40 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-24">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">02 — About Me</p>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
            WHO<br /><span className="text-stroke">I AM</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-20 mb-32">
          <FadeUp delay={0.1}>
            <p className="text-white/70 text-lg leading-relaxed mb-6">
              I'm Mahima Gavesh, a BSc (Hons) IT undergraduate at SLIIT specialising in Interactive Media. With 15+ projects spanning UI/UX design and full-stack development, I build intuitive digital experiences — from high-fidelity Figma prototypes to fully deployed MERN applications.
            </p>
            <p className="text-white/50 text-lg leading-relaxed mb-6">
              My stack includes React, Next.js, Node.js, MongoDB, Firebase, Python, Java, and Figma. I enjoy turning complex requirements into clean, well-designed systems with real-time features, role-based access, and smooth interactions.
            </p>
            <p className="text-white/40 text-lg leading-relaxed">
              My goal is to grow as a UI/UX engineer and full-stack developer crafting products that are equally beautiful and functional. Outside tech, I represent SLIIT in Cricket, Throwball, and Basketball.
            </p>
          </FadeUp>

          <FadeUp delay={0.2}>
            <div className="flex flex-col gap-8">
              <div className="grid grid-cols-2 gap-6">
                {stats.map(({ num, label }, i) => (
                  <div key={i} className="border border-white/10 p-8 hover:border-[#c0161b]/50 transition group">
                    <p className="font-display text-5xl text-[#c0161b] mb-3 group-hover:text-[#c0161b]/80 transition">{num}</p>
                    <p className="text-xs uppercase tracking-widest text-white/40 leading-relaxed">{label}</p>
                  </div>
                ))}
              </div>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

/* ─── EDUCATION ─────────────────────────────────────────────── */
function Education() {
  const educationItems = [
    {
      year: "2023 — 2027",
      degree: "BSc (Hons) Information Technology",
      specialisation: "Specialisation: Interactive Media",
      institution: "SLIIT — Sri Lanka Institute of Information Technology",
      detail: "Malabe, Sri Lanka · Currently in Year 3",
    },
    {
      year: "2022",
      degree: "GCE Advanced Level",
      specialisation: "Technology Stream",
      institution: "Kegalu Maha Vidyalaya",
      detail: "Kegalle, Sri Lanka",
    },
  ];

  return (
    <section id="education" className="bg-[#0a0a0a] py-40 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-0">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">03 — Education</p>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
            ACADEMIC<br /><span className="text-stroke">JOURNEY</span>
          </h2>
        </FadeUp>

        <div className="h-8 bg-[#0a0a0a]" />
        <div className="grid md:grid-cols-2 gap-8 mb-28">
          {educationItems.map((item, i) => (
            <FadeUp key={i} delay={i * 0.15}>
              <div className="p-8">
                <p className="text-xs font-mono text-[#c0161b] mb-4 tracking-widest">{item.year}</p>
                <h3 className="font-display text-2xl text-white mb-1">{item.degree}</h3>
                <p className="text-white/50 text-sm mb-3">{item.specialisation}</p>
                <p className="text-white/70 text-sm font-medium mb-1">{item.institution}</p>
                <p className="text-white/30 text-xs tracking-wide">{item.detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>

      </div>
    </section>
  );
}

/* ─── SPORTS ────────────────────────────────────────────────── */
function Sports() {
  const achievements = [
    {
      sport: "Cricket",
      org: "SLIIT",
      badge: "University Colors",
      detail: "Earned SLIIT university cricket colors in 1st year — representing the university in inter-university competitions.",
    },
    {
      sport: "Throwball",
      org: "Kegalu Maha Vidyalaya",
      badge: "School Colors",
      detail: "Awarded school colors for throwball — recognised for dedication and performance representing the school team.",
    },
    {
      sport: "Basketball",
      org: "Kegalu Maha Vidyalaya",
      badge: "School Colors",
      detail: "Awarded school colors for basketball — recognised for outstanding contribution to the school team.",
    },
    {
      sport: "Interhouse Sports Meet",
      org: "Kegalu Maha Vidyalaya",
      badge: "Vice Captain",
      detail: "Served as Vice Captain at the 2021 Interhouse Sports Meet — led team strategy and athlete coordination.",
    },
  ];

  return (
    <section className="bg-black py-40 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-28">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">Extracurricular Activities</p>
          <h2 className="font-display text-4xl md:text-6xl text-white leading-none">
            SPORTS &amp;<br /><span className="text-stroke">ACHIEVEMENTS</span>
          </h2>
        </FadeUp>
        <div className="h-8 bg-black" />
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {achievements.map(({ sport, org, badge, detail }, i) => (
            <FadeUp key={sport} delay={i * 0.1}>
              <div className="border border-transparent p-6 h-full flex flex-col gap-4">
                <div className="flex items-start justify-between">
                  <span className="text-[10px] uppercase tracking-widest border border-[#c0161b]/50 text-[#c0161b] px-2 py-1">{badge}</span>
                </div>
                <div>
                  <p className="font-display text-xl text-white tracking-wide">{sport}</p>
                  <p className="text-xs uppercase tracking-widest text-white/30 mt-1">{org}</p>
                </div>
                <p className="text-sm text-white/50 leading-relaxed mt-auto">{detail}</p>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ────────────────────────────────────────────────── */
const skills = [
  { name: "UI/UX Design (Figma)", pct: 93, icon: <SiFigma /> },
  { name: "HTML / CSS / JavaScript", pct: 95, icon: <FaHtml5 /> },
  { name: "React / Next.js", pct: 88, icon: <FaReact /> },
  { name: "Node.js / Express.js", pct: 80, icon: <FaNodeJs /> },
  { name: "MongoDB / Firebase", pct: 78, icon: <SiMongodb /> },
  { name: "Tailwind CSS", pct: 90, icon: <SiTailwindcss /> },
  { name: "TypeScript", pct: 75, icon: <SiTypescript /> },
  { name: "Python / Java / Kotlin", pct: 72, icon: <FaHtml5 /> },
];

function SkillBar({ name, pct, icon, delay }: any) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay }}
      className="group"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-3 text-white/70">
          <span className="text-sm">{icon}</span>
          <span className="text-sm font-medium">{name}</span>
        </div>
        <span className="text-xs text-white/30 font-mono">{pct}%</span>
      </div>
      <div className="h-px bg-white/10 overflow-hidden rounded-full">
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.2, delay: delay + 0.2, ease: [0.25, 0.46, 0.45, 0.94] }}
          className="h-full bg-[#c0161b] rounded-full"
        />
      </div>
    </motion.div>
  );
}

function Skills() {
  return (
    <section id="skills" className="bg-black py-40 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-24">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">04 — Personal Skill</p>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
            EXPERTISE<br /><span className="text-stroke">& TOOLS</span>
          </h2>
        </FadeUp>

        <div className="grid md:grid-cols-2 gap-x-24 gap-y-10">
          {skills.map(({ name, pct, icon }, i) => (
            <SkillBar key={name} name={name} pct={pct} icon={icon} delay={i * 0.07} />
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────── */
const projects = [
  {
    num: "01",
    title: "Game Tracking App",
    desc: "Designed to help users organise, track and manage gaming activity. Complete user flows, wireframes and high-fidelity UI. Focused on intuitive dashboards and clear information hierarchy.",
    tags: ["Figma", "UI/UX", "Prototyping"],
    figma: "https://www.figma.com/proto/VzqTvzw7dou7yNQscSliQR/Untitled?node-id=39-67",
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: null,
  },
  {
    num: "02",
    title: "F1 Concept App",
    desc: "Concept mobile app for F1 news, race updates, driver standings and schedules. Modern sport-focused visual style with smooth navigation and bold typography.",
    tags: ["Figma", "UI/UX", "Mobile"],
    figma: "https://lnkd.in/gjqPutQJ",
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: null,
  },
  {
    num: "03",
    title: "SunCrush Website Concept",
    desc: "Modern website for SunCrush, a Sri Lankan fizzy drink brand. Micro-interactions, smooth animations, bold visuals and clear product presentation throughout.",
    tags: ["Figma", "UI/UX", "Animation"],
    figma: "https://www.figma.com/proto/ZuiMt076ycRhzTai8eFZeT",
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: null,
  },
  {
    num: "04",
    title: "Panda Adoption Platform",
    desc: "Website platform promoting panda adoption awareness. Emotionally engaging, user-centred interface encouraging public involvement and donations with accessible UX.",
    tags: ["Figma", "UI/UX", "Web"],
    figma: "https://www.figma.com/proto/gux282qfx9Q3B37vkACNRo",
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: null,
  },
  {
    num: "05",
    title: "Evenzo – Ticket Booking Platform",
    desc: "Online ticket booking and event management platform for Sri Lanka. Calendar-based booking, trending movies, sports events, and concerts — all in one seamless flow.",
    tags: ["Figma", "UI/UX", "Product Design"],
    figma: "https://lnkd.in/gGtCG7Si",
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: null,
  },
  {
    num: "06",
    title: "PETVERSE Platform",
    desc: "Smart MERN-stack pet management platform. Role-based access, appointment booking, health records, community posts, real-time scheduling. My contributions: Home Page, Point System, Appointment System, Animations & Games.",
    tags: ["React", "Node.js", "MongoDB", "MERN"],
    figma: null,
    linkedin: "https://www.linkedin.com/in/mahima-gavesh-751764191",
    live: null,
    github: "https://lnkd.in/guB3ThHS",
  },
];

function ProjectCard2({ project, index }: { project: typeof projects[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.9, delay: index * 0.15, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group border-2 border-white/30 rounded-3xl hover:border-white/70 hover:bg-white/[0.03] transition-all duration-500 flex flex-col h-full"
      style={{ padding: "3.5rem 4rem" }}
    >
      <div className="flex items-start justify-between mb-6">
        <span className="font-display text-6xl text-white/10 leading-none group-hover:text-white/20 transition duration-500">{project.num}</span>
      </div>
      <div className="flex gap-2 flex-wrap mb-10">
        {project.tags.map(t => (
          <span key={t} className="text-[10px] uppercase tracking-widest px-3 py-1 text-white/40">{t}</span>
        ))}
      </div>

      <h3 className="font-display text-3xl md:text-4xl text-white mb-6">{project.title}</h3>

      <p className="text-white/50 leading-relaxed text-sm max-w-lg">{project.desc}</p>

      <div className="flex-1" />

      <div className="flex gap-4 flex-wrap pt-10">
        {project.figma && (
          <a href={project.figma} target="_blank" rel="noopener noreferrer" className="pill-btn gap-2 text-xs group/btn">
            View Figma <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        )}
        {project.github && (
          <a href={project.github} target="_blank" rel="noopener noreferrer" className="pill-btn gap-2 text-xs group/btn">
            <FaGithub /> GitHub <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        )}
        {(project as any).linkedin && (
          <a href={(project as any).linkedin} target="_blank" rel="noopener noreferrer" className="pill-btn gap-2 text-xs group/btn">
            <FaLinkedin /> LinkedIn <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
          </a>
        )}
      </div>
    </motion.div>
  );
}

function Work() {
  return (
    <section id="work" className="bg-[#0d0d0d] py-40 px-6 md:px-14">
      <div className="max-w-6xl mx-auto">
        <FadeUp className="mb-16">
          <p className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4">05 — Project Portfolio</p>
          <h2 className="font-display text-5xl md:text-7xl text-white leading-none">
            MY<br /><span className="text-stroke">PROJECTS</span>
          </h2>
        </FadeUp>

        <div className="h-8 bg-[#0d0d0d]" />

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {projects.map((p, i) => <ProjectCard2 key={p.num} project={p} index={i} />)}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────── */
function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" ref={ref} className="bg-black py-40 px-6 md:px-14 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs uppercase tracking-[0.4em] text-white/30 mb-4"
        >06 — Contact</motion.p>

        <div className="overflow-hidden mb-24">
          <motion.h2
            initial={{ y: "100%" }}
            animate={inView ? { y: 0 } : {}}
            transition={{ duration: 1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display text-6xl md:text-[9vw] text-white leading-none"
          >
            LET&apos;S<br /><span className="text-stroke">WORK</span><br />TOGETHER
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between border-t border-white/10 pt-10"
        >
          <p className="text-white/50 max-w-sm text-sm leading-relaxed">
              Open to freelance projects, full-time roles, and collaboration. Based in Kegalle, Sri Lanka — available remote globally. I respond quickly and love interesting challenges.
            </p>

          <div className="flex flex-col gap-3">
            <a href="mailto:mahimagavesh2002@gmail.com" className="group flex items-center gap-3 text-white hover:text-white/60 transition text-sm font-medium">
              <FaEnvelope className="text-white/40" /> mahimagavesh2002@gmail.com
              <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="tel:+94723489031" className="group flex items-center gap-3 text-white hover:text-white/60 transition text-sm font-medium">
              <span className="text-white/40 text-xs">TEL</span> +94 72 348 9031
              <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="https://github.com/Gaweyyyy7" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-white/60 transition text-sm font-medium">
              <FaGithub className="text-white/40" /> Github / Gaweyyyy7
              <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
            <a href="https://www.linkedin.com/in/mahima-gavesh-751764191" target="_blank" rel="noopener noreferrer" className="group flex items-center gap-3 text-white hover:text-white/60 transition text-sm font-medium">
              <FaLinkedin className="text-white/40" /> LinkedIn / mahima-gavesh
              <FaArrowRight className="opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ─── FOOTER ────────────────────────────────────────────────── */

/* ══════════════════════════════════════════════════════════════
   MAIN PAGE
══════════════════════════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="noise">
      <CustomCursor />
      <ScrollProgress />
      <Nav />
      <Hero />
      <TableOfContents />
      <div className="h-12 bg-black" />
      <Introduction />
      <div className="h-4 bg-black" />
      <About />
      <div className="h-12 bg-black" />
      <Education />
      <div className="h-12 bg-black" />
      <Skills />
      <div className="h-12 bg-black" />
      <Work />
      <div className="h-24 bg-black" />
      <Sports />
      <div className="h-24 bg-black" />
      <Contact />
    </div>
  );
}
