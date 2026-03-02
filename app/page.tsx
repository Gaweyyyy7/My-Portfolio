"use client";

import { FaEnvelope, FaDownload, FaGithub, FaLinkedin, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaDatabase } from "react-icons/fa";
import { SiFigma, SiMongodb, SiPhp, SiPython, SiCplusplus, SiDotnet, SiAngular } from "react-icons/si";

export default function Home() {
  return (
    <main className="bg-gradient-to-br from-[#1a0a0f] via-[#1a0a1f] to-[#0f0a1a] text-white min-h-screen">

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 backdrop-blur-md bg-black/50 border-b border-orange-600 px-6 py-4 flex justify-between items-center z-50">
        <h2 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">MG</h2>
        <div className="flex gap-8 text-base font-medium">
          <a href="#home" className="hover:text-orange-500 transition">Home</a>
          <a href="#summary" className="hover:text-orange-500 transition">About</a>
          <a href="#skills" className="hover:text-orange-500 transition">Skills</a>
          <a href="#projects" className="hover:text-orange-500 transition">Work</a>
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="min-h-screen flex flex-col lg:flex-row items-center justify-between px-8 md:px-20 pt-24">

        <div className="max-w-full lg:max-w-2xl space-y-6 lg:mr-12">
          <div className="mb-6">
            <span className="inline-block bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-semibold">
              ✨ Available for opportunities
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6"> {/* heading color remains gradient */}
            <span className="bg-gradient-to-r from-orange-500 via-yellow-400 to-white bg-clip-text text-transparent">
              UI/UX, Frontend & Fullstack Developer
            </span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-700 mb-4">
            Mahima Gavesh
          </p>

          <p className="text-lg text-gray-300 mb-8 max-w-xl leading-relaxed">
            UI/UX designer and full-stack developer crafting beautiful, intuitive digital experiences.
          </p>

          <div className="flex flex-wrap gap-4 mt-6">
            <a
              href="/resume.pdf"
              className="bg-orange-500 hover:bg-orange-600 px-6 py-3 rounded-full flex items-center gap-3 text-black text-base font-medium whitespace-nowrap transition transform hover:scale-105"
            >
              <FaDownload /> Download CV
            </a>

            <a
              href="mailto:mahimagavesh2002@gmail.com"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-6 py-3 rounded-full flex items-center gap-3 text-base font-medium whitespace-nowrap transition"
            >
              <FaEnvelope /> Contact
            </a>
          </div>
        </div>

        {/* Floating Photo */}
        <div className="hidden lg:block relative w-80 h-80">
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500 to-yellow-400 rounded-full blur-2xl opacity-20"></div>
          <div className="relative rounded-full border-4 border-orange-500 overflow-hidden w-80 h-80 shadow-2xl">
            <img
              src="/mahima-photo.jpg"
              alt="Mahima"
              width={320}
              height={320}
              className="object-cover"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).src = "https://via.placeholder.com/320";
              }}
            />
          </div>
        </div>

      </section>

      {/* SUMMARY */}
      <section id="summary" className="py-40 px-8 md:px-20 bg-black">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
            About Me
          </h2>

          <p className="text-xl text-gray-300 leading-relaxed mb-12">
            I'm an Information Technology undergraduate specializing in Interactive Media. With a passion for user-centered design and modern development, I create digital experiences that are both beautiful and functional. My expertise spans UI/UX design, frontend development, and full-stack applications using React, Node.js, and MongoDB.
          </p>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="py-48 px-8 md:px-20 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
            Skills & Tools
          </h2>

          <div className="grid md:grid-cols-5 grid-cols-2 gap-12">
            <Skill icon={<SiFigma />} name="Figma" />
            <Skill icon={<FaReact />} name="React" />
            <Skill icon={<SiAngular />} name="Angular" />
            <Skill icon={<FaNodeJs />} name="Node.js" />
            <Skill icon={<SiMongodb />} name="MongoDB" />
            <Skill icon={<FaHtml5 />} name="HTML5" />
            <Skill icon={<FaCss3Alt />} name="CSS3" />
            <Skill icon={<FaJs />} name="JavaScript" />
            <Skill icon={<SiPhp />} name="PHP" />
            <Skill icon={<SiPython />} name="Python" />
            <Skill icon={<SiCplusplus />} name="C++" />
            <Skill icon={<SiDotnet />} name=".NET" />
            <Skill icon={<FaDatabase />} name="SQL" />
            <Skill icon={<FaGithub />} name="GitHub" />
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="py-40 px-8 md:px-20 bg-black">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-5xl font-bold mb-16 bg-gradient-to-r from-orange-500 to-white bg-clip-text text-transparent">
            Featured Work
          </h2>

          <div className="grid md:grid-cols-2 gap-10">
            <ProjectCard
              title="Game Tracking App"
              desc="UI/UX design project with interactive dashboards and gaming analytics layouts built in Figma."
              figma="https://www.figma.com/proto/VzqTvzw7dou7yNQscSliQR"
              linkedin="https://www.linkedin.com/"
            />

            <ProjectCard
              title="PETVERSE Platform"
              desc="Full-stack MERN application featuring appointment booking, community posts, and role-based access control."
              github="https://github.com/Gaweyyyy7"
              linkedin="https://www.linkedin.com/"
            />
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="text-center py-16 text-gray-400 border-t border-orange-600">
        <p>© 2026 Mahima Gavesh — Designed & Built with React & Next.js</p>
      </footer>

    </main>
  );
}

/* Skill Card */
function Skill({ icon, name }: any) {
  return (
    <div className="bg-white border border-slate-200 rounded-xl p-8 text-center hover:shadow-lg hover:border-orange-500 transition group">
      <div className="text-4xl text-orange-500 mb-3 group-hover:scale-110 transition">{icon}</div>
      <p className="font-semibold text-slate-900">{name}</p>
    </div>
  );
}

/* Project Card */
function ProjectCard({ title, desc, figma, github, linkedin }: any) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-2xl p-8 hover:shadow-xl hover:border-orange-500 transition">

      <h3 className="text-2xl font-bold mb-3 text-slate-900">{title}</h3>

      <p className="text-slate-600 mb-6 leading-relaxed">
        {desc}
      </p>

      <div className="flex gap-3 flex-wrap">

        {figma && (
          <a href={figma} target="_blank" rel="noopener noreferrer" className="bg-gradient-to-r from-orange-500 to-white text-white px-5 py-2 rounded-full text-sm font-medium hover:shadow-md transition">
            View Figma
          </a>
        )}

        {github && (
          <a href={github} target="_blank" rel="noopener noreferrer" className="border-2 border-orange-500 text-orange-500 hover:bg-orange-50 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
            <FaGithub /> GitHub
          </a>
        )}

        {linkedin && (
          <a href={linkedin} target="_blank" rel="noopener noreferrer" className="border-2 border-slate-300 text-slate-700 hover:bg-slate-100 px-5 py-2 rounded-full text-sm font-medium flex items-center gap-2 transition">
            <FaLinkedin /> LinkedIn
          </a>
        )}

      </div>

    </div>
  );
}
