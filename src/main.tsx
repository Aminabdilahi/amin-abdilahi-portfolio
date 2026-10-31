import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Intro } from "./components/Intro";
import { CodeRain, Typewriter } from "./components/Typewriter";
import "./styles.css";

type Project = {
  name: string;
  subtitle: string;
  description: string;
  stack: string[];
  url: string;
};

const projects: Project[] = [
  {
    name: "Nexora Tech",
    subtitle: "Restaurant Operations Platform",
    description:
      "A restaurant operations MVP with QR ordering, cashier and kitchen workflows, inventory management, staff administration, and order tracking.",
    stack: ["Python", "Flask", "SQLite", "Jinja", "Bootstrap", "Docker"],
    url: "https://github.com/Aminabdilahi/nexora-tech-mvp",
  },
  {
    name: "Somali Media Platform",
    subtitle: "Media and Research Platform",
    description:
      "A foundation for a Somali and international media and research platform with organization setup, authenticated users, role-based access, task records, audit events, and settings.",
    stack: ["TypeScript", "Next.js", "FastAPI", "PostgreSQL", "Redis"],
    url: "https://github.com/Aminabdilahi/somali-media-platform",
  },
];

const skillGroups = [
  ["Programming & Web", "Python, TypeScript, JavaScript, HTML, CSS"],
  ["Frameworks", "Flask, Next.js, FastAPI"],
  ["Databases", "SQLite, PostgreSQL, SQLAlchemy, Alembic"],
  ["Tools", "Git, GitHub, Docker, Redis"],
];

function App() {
  return (
    <>
      <Intro />
      <div className="page-rain"><CodeRain /></div>
      <div className="scanlines page-scanlines" />
      <header>
        <a className="brand" href="#top">Amin Abdilahi</a>
        <nav aria-label="Main navigation">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>
      <main id="top">
        <section className="hero">
          <CodeRain />
          <p className="eyebrow">Software Engineering Graduate</p>
          <p className="terminal-line">amin@portfolio:~$ <Typewriter text="whoami" /></p>
          <h1 className="glow">Building useful software for real people.</h1>
          <p className="intro">I am Amin Abdilahi, a software engineering graduate based in Jigjiga, Ethiopia. I enjoy building clear, reliable web applications that solve practical problems.</p>
          <div className="actions">
            <a className="button primary" href="#projects">View projects</a>
            <a className="button" href="https://github.com/Aminabdilahi" target="_blank" rel="noreferrer">GitHub profile</a>
          </div>
        </section>

        <section id="about">
          <p className="eyebrow">About</p>
          <p className="terminal-line">amin@portfolio:~$ <Typewriter text="cat about.txt" /></p>
          <h2>Practical, maintainable software.</h2>
          <p>My project experience includes web-based business systems and media platforms. I care about straightforward interfaces, secure application foundations, and software that is easy to maintain.</p>
        </section>

        <section id="projects">
          <p className="eyebrow">Selected work</p>
          <p className="terminal-line">amin@portfolio:~$ <Typewriter text="ls projects/" /></p>
          <h2>Projects</h2>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project" key={project.name}>
                <p className="project-type">{project.subtitle}</p>
                <h3>{project.name}</h3>
                <p>{project.description}</p>
                <ul>{project.stack.map((item) => <li key={item}>{item}</li>)}</ul>
                <a href={project.url} target="_blank" rel="noreferrer">View source on GitHub →</a>
              </article>
            ))}
          </div>
        </section>

        <section id="skills">
          <p className="eyebrow">Skills</p>
          <p className="terminal-line">amin@portfolio:~$ <Typewriter text="cat skills.json" /></p>
          <h2>Tools I work with</h2>
          <div className="skills">
            {skillGroups.map(([title, items]) => <div key={title}><h3>{title}</h3><p>{items}</p></div>)}
          </div>
        </section>

        <section id="experience">
          <p className="eyebrow">Experience & education</p>
          <h2>Background</h2>
          <div className="details">
            <div><h3>Data Collector</h3><p>Ethiopian Statistics Service · 2024–2025</p><p>Collected and recorded data while following required procedures and data-quality standards.</p></div>
            <div><h3>Bachelor's Degree, Software Engineering</h3><p>Jigjiga University · Graduated March 2026</p></div>
          </div>
        </section>

        <section id="contact" className="contact">
          <p className="eyebrow">Contact</p>
          <h2>Let’s work together.</h2>
          <p>For project or employment opportunities, get in touch by email.</p>
          <a className="button primary" href="mailto:ameinabdilahi98@gmail.com">Email Amin</a>
        </section>
      </main>
      <footer>© {new Date().getFullYear()} Amin Abdilahi</footer>
    </>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);
