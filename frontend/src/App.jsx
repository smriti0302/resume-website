import React, { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Activity,
  BookOpen,
  BriefcaseBusiness,
  Code2,
  Footprints,
  Github,
  IceCreamBowl,
  Linkedin,
  Mail,
  MapPin,
  Menu,
  Sparkles,
  X
} from "lucide-react";
import HeroScene from "./HeroScene";
import { fallbackProfile } from "./data/fallbackProfile";

const apiBaseUrl = import.meta.env.VITE_API_URL || "http://localhost:5000";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Running", href: "#running" },
  { label: "Contact", href: "#contact" }
];

function App() {
  const [profile, setProfile] = useState(fallbackProfile);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  useEffect(() => {
    fetch(`${apiBaseUrl}/api/profile`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Unable to load profile");
        }
        return response.json();
      })
      .then(setProfile)
      .catch(() => setProfile(fallbackProfile));
  }, []);

  useEffect(() => {
    const handlePointerMove = (event) => {
      setCursor({ x: event.clientX, y: event.clientY });
    };

    window.addEventListener("pointermove", handlePointerMove);
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, []);

  const { person, stats, about, projects, blogs, music, running, contact } = profile;

  return (
    <div className="site-shell">
      <div
        className="cursor-orbit"
        style={{ transform: `translate3d(${cursor.x}px, ${cursor.y}px, 0)` }}
        aria-hidden="true"
      />
      <header className="site-header">
        <a className="brand" href="#home" aria-label="Smriti home">
          <span>SR</span>
          <strong>{person.name}</strong>
        </a>

        <nav className={menuOpen ? "nav nav-open" : "nav"} aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setMenuOpen(false)}>
              {item.label}
            </a>
          ))}
        </nav>

        <button
          className="icon-button menu-button"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          onClick={() => setMenuOpen((current) => !current)}
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      <main>
        <section id="home" className="hero section">
          <div className="hero-content">
            <p className="eyebrow">
              <Sparkles size={16} />
              {person.availability}
            </p>
            <h1>{person.name}</h1>
            <h2>{person.role}</h2>
            <p className="hero-summary">{person.summary}</p>
            <div className="hero-actions">
              <a className="primary-action" href="#projects">
                View Projects <ArrowUpRight size={18} />
              </a>
              <a className="secondary-action" href={`mailto:${person.email}`}>
                <Mail size={18} /> Contact Me
              </a>
            </div>
            <aside className="profile-panel" aria-label="Profile summary">
              <div className="avatar" aria-hidden="true">
                {person.name.slice(0, 1)}
              </div>
              <div>
                <p className="panel-label">Based in</p>
                <p className="panel-value">
                  <MapPin size={16} />
                  {person.location}
                </p>
              </div>
              <div className="skill-cloud">
                {person.highlights.map((skill) => (
                  <span key={skill}>{skill}</span>
                ))}
              </div>
            </aside>
          </div>

          <div className="hero-visual" aria-label="Animated technology profile graphic">
            <HeroScene />
          </div>
        </section>

        <section className="stats-band" aria-label="Quick profile statistics">
          {stats.map((stat) => (
            <div key={stat.label}>
              <strong>{stat.value}</strong>
              <span>{stat.label}</span>
            </div>
          ))}
        </section>

        <section id="about" className="section split-section">
          <div>
            <p className="section-kicker">About Me</p>
            <h2>Thoughtful code, practical products, steady growth.</h2>
          </div>
          <div className="section-copy">
            <p>{about.intro}</p>
            <ul className="check-list">
              {about.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </section>

        <section className="section experience-grid" aria-label="Experience focus areas">
          {about.experience.map((item) => (
            <article className="info-card" key={item.title}>
              <Code2 size={22} />
              <h3>{item.title}</h3>
              <p>{item.body}</p>
            </article>
          ))}
        </section>

        <section id="projects" className="section">
          <div className="section-heading">
            <p className="section-kicker">Projects</p>
            <h2>Selected work</h2>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="card-topline">
                  <span>{project.type}</span>
                  <BriefcaseBusiness size={18} />
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="tag-row">
                  {project.stack.map((tool) => (
                    <span key={tool}>{tool}</span>
                  ))}
                </div>
                <a href={project.link}>
                  Explore <ArrowUpRight size={16} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section id="experience" className="section split-section">
          <div>
            <p className="section-kicker">Experience</p>
            <h2>Engineering roles and internships.</h2>
          </div>
          <div className="timeline-list">
            {blogs.map((post) => (
              <article className="timeline-item" key={post.title}>
                <BookOpen size={18} />
                <div>
                  <span>{post.date}</span>
                  <h3>{post.title}</h3>
                  <p>{post.excerpt}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="skills" className="section music-section">
          <div>
            <p className="section-kicker">Skills</p>
            <h2>Tools I use to build.</h2>
            <p>{music.note}</p>
          </div>
          <div className="playlist-grid">
            {music.playlists.map((playlist) => (
              <article className="playlist-card" key={playlist.name}>
                <Code2 size={20} />
                <h3>{playlist.name}</h3>
                <p>{playlist.mood}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="running" className="section running-section">
          <div>
            <p className="section-kicker">Runner Mode</p>
            <h2>{running.headline}</h2>
            <p>{running.body}</p>
            <a className="strava-link" href={running.strava}>
              <Activity size={18} /> Strava Profile <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="running-grid">
            {running.highlights.map((item, index) => (
              <article className="running-card" key={item}>
                {index % 3 === 0 && <Footprints size={22} />}
                {index % 3 === 1 && <Activity size={22} />}
                {index % 3 === 2 && <IceCreamBowl size={22} />}
                <h3>{item}</h3>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section contact-section">
          <div>
            <p className="section-kicker">Contact</p>
            <h2>{contact.headline}</h2>
            <p>{contact.body}</p>
          </div>
          <div className="contact-links">
            {contact.links.map((link) => (
              <a key={link.label} href={link.href}>
                {link.label === "GitHub" && <Github size={18} />}
                {link.label === "LinkedIn" && <Linkedin size={18} />}
                {link.label === "Strava" && <Activity size={18} />}
                {link.label === "Email" && <Mail size={18} />}
                {link.label}
              </a>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
