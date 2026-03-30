import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const navLinks = [
  { label: 'Home', href: '#home', icon: 'rocket_launch' },
  { label: 'Terminal', href: '#terminal', icon: 'terminal' },
  { label: 'Projects', href: '#projects', icon: 'account_tree' },
  { label: 'Skills', href: '#skills', icon: 'psychology' },
  { label: 'Contact', href: '#contact', icon: 'alternate_email' },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState('home');
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.3 }
    );

    navLinks.forEach(({ href }) => {
      const el = document.querySelector(href);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Top Navigation Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#131314]/40 backdrop-blur-xl border-b border-outline-variant/20 glow-shadow">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <div className="text-xl font-bold tracking-tighter text-on-surface font-headline">
            Aryan.AI
          </div>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-8 font-label tracking-tighter text-sm font-medium">
            {navLinks.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                className={`transition-colors duration-300 pb-1 ${activeSection === href.slice(1)
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-on-surface/60 hover:text-secondary'
                  }`}
              >
                {label}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <Link
              to="/about"
              className="hidden md:flex items-center gap-2 text-on-surface/60 hover:text-primary transition-colors font-mono text-xs uppercase tracking-widest border border-outline-variant/20 hover:border-primary/40 px-4 py-2 rounded-lg"
            >
              <span className="material-symbols-outlined text-sm">person</span>
              About
            </Link>
            <Link to="/resume" className="bg-primary-container text-on-primary-container px-5 py-2 rounded-lg font-label font-bold text-xs uppercase tracking-widest hover:brightness-110 active:scale-95 transition-all duration-200">
              Get Resume
            </Link>

            {/* Mobile Hamburger */}
            <button
              className="md:hidden text-on-surface"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-2xl">
                {mobileOpen ? 'close' : 'menu'}
              </span>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden bg-surface-container/95 backdrop-blur-xl border-t border-outline-variant/20 animate-fade-in-up">
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map(({ label, href, icon }) => (
                <a
                  key={label}
                  href={href}
                  onClick={() => setMobileOpen(false)}
                  className={`flex items-center gap-3 py-3 px-4 rounded-lg transition-all ${activeSection === href.slice(1)
                      ? 'bg-primary/10 text-primary'
                      : 'text-on-surface/60 hover:bg-surface-container-high'
                    }`}
                >
                  <span className="material-symbols-outlined text-lg">{icon}</span>
                  {label}
                </a>
              ))}
              <Link
                to="/about"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-on-surface/60 hover:bg-surface-container-high transition-all"
              >
                <span className="material-symbols-outlined text-lg">person</span>
                About
              </Link>
              <Link
                to="/resume"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3 py-3 px-4 rounded-lg text-primary hover:bg-primary/10 transition-all"
              >
                <span className="material-symbols-outlined text-lg">description</span>
                Resume
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Side Navigation (Desktop) */}
      <aside className="fixed left-6 top-1/2 -translate-y-1/2 rounded-full py-6 bg-surface-container-low/60 backdrop-blur-lg flex-col items-center gap-8 px-3 z-40 hidden lg:flex">
        <div className="flex flex-col items-center gap-1 mb-2">
          <span className="text-primary font-black text-xs font-mono">SYS</span>
          <div className="w-1 h-1 rounded-full bg-secondary" />
        </div>

        {navLinks.map(({ href, icon }) => (
          <a
            key={href}
            href={href}
            title={href.slice(1)}
            className={`transition-all duration-300 ${activeSection === href.slice(1)
                ? 'text-secondary scale-125'
                : 'text-outline-variant hover:text-primary hover:translate-x-1'
              }`}
          >
            <span className="material-symbols-outlined">{icon}</span>
          </a>
        ))}

        <div className="mt-2 text-outline-variant font-mono text-[8px] rotate-90 whitespace-nowrap">
          Aryan
        </div>
      </aside>
    </>
  );
}
