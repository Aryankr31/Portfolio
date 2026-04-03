import { useState, useEffect, useRef, useCallback } from 'react';
import { Link } from 'react-router-dom';

/* ─────────────── DATA ─────────────── */
const TRAITS = [
  { id: 1, front: '⚡ Fast Learner', back: 'Went from zero to LLM in 6 months. Docs are my cardio.' },
  { id: 2, front: '🧠 Systems Thinker', back: 'I see every bug as a symptom of a broken mental model.' },
  { id: 3, front: '🎯 Precision Builder', back: 'I write code that future-me would actually thank present-me for.' },
  { id: 4, front: '🚀 Scope Creeper', back: 'Jk. Mostly. Features ship when they are right, not just built.' },
  { id: 5, front: '📚 Research Nerd', back: '4 CVPR/NeurIPS papers and still counting. Coffee fuels citations.' },
  { id: 6, front: '🌀 Flow State Adept', back: 'Best code gets written at 2 AM with lo-fi beats. Non-negotiable.' },
];

const STATS = [
  { value: 3, suffix: '+', label: 'Years Coding' },
  { value: 60, suffix: '%', label: 'Latency Cut' },
  { value: 2, suffix: '', label: 'Papers Published' },
  { value: 15, suffix: '+', label: 'API and MCP Integrated' },
];

const PHILOSOPHY = [
  {
    icon: 'architecture',
    title: 'Design Before You Build',
    body: 'Every code I write starts on paper - or at least a excalidraw. The code is just the last 20%.',
  },
  {
    icon: 'biotech',
    title: 'Curiosity as a Superpower',
    body: 'The best AI engineers are relentlessly curious. I read papers the way others read news. Obsessively.',
  },
  {
    icon: 'diversity_3',
    title: 'Ship, Learn, Iterate',
    body: 'Perfect is the enemy of shipped. Measure everything. Let data overrule intuition.',
  },
];

const THOUGHTS = [
  '> researching: speculative decoding patterns ...',
  '> listening: Aphex Twin — Selected Ambient Works',
  '> reading: "The Bitter Lesson" by Rich Sutton',
  '> building: multi-agent memory system v3',
  '> wondering: can models truly be curious?',
  '> drinking: 3rd espresso of the day ☕',
  '> debugging: why is this loss not converging??',
  '> exploring: latent diffusion for structured data',
];

/* ─────────────── SUBCOMPONENTS ─────────────── */

/** Animated counter that counts up when it enters the viewport */
function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started) setStarted(true);
    }, { threshold: 0.5 });
    observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const step = Math.ceil(value / 40);
      const interval = setInterval(() => {
        setCurrent(c => {
          if (c + step >= value) { clearInterval(interval); return value; }
          return c + step;
        });
      }, 30);
      return () => clearInterval(interval);
    }, delay);
    return () => clearTimeout(timer);
  }, [started, value, delay]);

  return (
    <div ref={ref} className="text-center group">
      <div className="text-4xl md:text-5xl font-headline font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-primary to-secondary mb-1">
        {current}{suffix}
      </div>
      <div className="text-[11px] font-mono uppercase tracking-widest text-on-surface-variant/60">{label}</div>
    </div>
  );
}

/** Flip card – front shows trait label, back shows the witty description */
function TraitChip({ trait }: { trait: typeof TRAITS[0] }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <div
      className="relative cursor-pointer select-none"
      style={{ perspective: '600px', height: '80px' }}
      onClick={() => setFlipped(f => !f)}
      title="Click to flip"
    >
      <div
        className="absolute inset-0 transition-transform duration-500 ease-in-out"
        style={{
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        {/* FRONT */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-surface-container-high border border-outline-variant/20 hover:border-primary/40 transition-colors px-4 text-sm font-headline font-semibold text-on-surface"
          style={{ backfaceVisibility: 'hidden' }}
        >
          {trait.front}
        </div>
        {/* BACK */}
        <div
          className="absolute inset-0 flex items-center justify-center rounded-xl bg-primary/10 border border-primary/30 px-4 text-xs font-body text-on-surface/80 text-center leading-snug"
          style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
        >
          {trait.back}
        </div>
      </div>
    </div>
  );
}

/** The orbiting avatar — static profile photo */
function AvatarOrb() {
  // 👇 Point this to your image. Put the file in /public and reference it as '/your-photo.jpg'
  // Or import it at the top: import myPhoto from './assets/aryan.jpg'
  const PHOTO_SRC = '/aryan.jpg';

  return (
    <div className="relative flex items-center justify-center" style={{ width: 260, height: 260 }}>

      {/* Outer orbit ring */}
      <div className="absolute inset-0 rounded-full border border-primary/10 animate-spin-slow" />

      {/* Orbiting dot 1 */}
      <div className="absolute" style={{ width: '100%', height: '100%', animation: 'orbit 8s linear infinite' }}>
        <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_12px_rgba(208,188,255,0.8)]" />
      </div>

      {/* Orbiting dot 2 */}
      <div className="absolute" style={{ width: '100%', height: '100%', animation: 'orbit-reverse 12s linear infinite' }}>
        <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_rgba(76,215,246,0.8)]" />
      </div>

      {/* Ripple rings */}
      <div className="absolute w-36 h-36 rounded-full border border-primary/20 animate-ripple" />
      <div className="absolute w-36 h-36 rounded-full border border-secondary/15 animate-ripple" style={{ animationDelay: '0.7s' }} />

      {/* Avatar circle — static, no upload */}
      <div className="relative w-36 h-36 rounded-full overflow-hidden border-2 border-outline-variant/30 bg-surface-container-high z-10">
        <img src={PHOTO_SRC} alt="Aryan" className="w-full h-full object-cover" />
      </div>

      {/* Label below orb */}
      <div className="absolute -bottom-8 font-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest whitespace-nowrap">
        Hi There!
      </div>
    </div>
  );
}

/** Live scrolling "what I'm currently thinking" ticker */
function ThoughtFeed() {
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % THOUGHTS.length);
        setVisible(true);
      }, 400);
    }, 3200);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="flex items-center gap-3 h-7 overflow-hidden">
      <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse shrink-0" />
      <span
        className="font-mono text-xs text-secondary/70 transition-all duration-400"
        style={{ opacity: visible ? 1 : 0, transform: visible ? 'translateY(0)' : 'translateY(-8px)' }}
      >
        {THOUGHTS[idx]}
      </span>
    </div>
  );
}

/** Ping button — sends a ripple burst on click */
function PingButton() {
  const [pings, setPings] = useState<number[]>([]);
  const fire = useCallback(() => {
    const id = Date.now();
    setPings(p => [...p, id]);
    setTimeout(() => setPings(p => p.filter(x => x !== id)), 1500);
    
    // Send email
    window.location.href = 'mailto:work.aryan31@gmail?subject=Portfolio Ping&body=Hey, I visited your portfolio!';
  }, []);

  return (
    <div className="relative inline-flex">
      {pings.map(id => (
        <span
          key={id}
          className="absolute inset-0 rounded-lg border-2 border-secondary animate-ripple pointer-events-none"
        />
      ))}
      <button
        onClick={fire}
        className="relative px-6 py-3 bg-surface-container-high border border-outline-variant/30 hover:border-secondary/50 text-on-surface font-mono text-xs uppercase tracking-widest rounded-lg transition-all hover:bg-surface-container-highest flex items-center gap-2 group"
      >
        <span className="material-symbols-outlined text-secondary text-base group-hover:scale-110 transition-transform">
          cell_tower
        </span>
        Ping Me
      </button>
    </div>
  );
}


/* ─────────────── MAIN PAGE ─────────────── */
export default function AboutPage() {
  const [bioText] = useState(
    "I'm an AI engineer working on LLM systems, agent architectures, and production-grade ML pipelines. Over the past couple of years, I've focused on building and evaluating systems that move beyond prototypes into reliable, real-world deployments. Outside the terminal, I'm often reading research or experimenting with new approaches to push intelligent systems further."
  );

  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      <div className="noise-overlay" />

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/8 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Top Bar ── */}
      <header className="fixed top-0 w-full z-50 bg-[#131314]/50 backdrop-blur-xl border-b border-outline-variant/20">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tighter text-on-surface font-headline hover:text-primary transition-colors">
            Aryan.ai
          </Link>
          <div className="flex items-center gap-6">
            <ThoughtFeed />
            <Link to="/" className="hidden sm:flex items-center gap-2 text-on-surface/60 hover:text-secondary transition-colors font-mono text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative pt-28 pb-24 px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto">

        {/* ── SECTION 1 — HOME IDENTITY ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-28">

          {/* Left — Text */}
          <div className="order-2 lg:order-1">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/20 bg-surface-container-low mb-8">
              <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
              <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
                process: human.tsx — running
              </span>
            </div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter leading-[0.92] mb-6">
              Behind the<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
                Algorithm.
              </span>
            </h1>

            <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-xl font-body">
              {bioText}
            </p>

            {/* Live thought feed — inline */}
            <div className="mb-10 p-4 rounded-xl bg-surface-container-low border border-outline-variant/10 w-fit">
              <span className="font-mono text-[9px] text-on-surface-variant/30 uppercase tracking-widest block mb-2">
                // live_thought_stream
              </span>
              <ThoughtFeed />
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/"
                className="px-7 py-3.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-2 group"
              >
                See My Work
                <span className="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </Link>
              <PingButton />
            </div>
          </div>

          {/* Right — Avatar Orb */}
          <div className="order-1 lg:order-2 flex flex-col items-center gap-12">
            <AvatarOrb />

            {/* Quick identity cards */}
            <div className="grid grid-cols-2 gap-3 w-full max-w-xs mt-6">
              {[
                { icon: 'location_on', label: 'Based in', value: 'New Delhi, IN' },
                { icon: 'work', label: 'Status', value: 'Open to Roles' },
                { icon: 'school', label: 'Degree', value: 'Bachelor of Technology' },
                { icon: 'favorite', label: 'Passion', value: 'Artificial Intelligence & Machine Learning' },
              ].map(({ icon, label, value }) => (
                <div
                  key={label}
                  className="glass-panel p-3 rounded-xl border border-outline-variant/15 hover:border-primary/30 transition-colors group"
                >
                  <span className="material-symbols-outlined text-lg text-primary/70 group-hover:text-primary transition-colors">{icon}</span>
                  <div className="font-mono text-[9px] text-on-surface-variant/40 uppercase tracking-widest mt-1">{label}</div>
                  <div className="font-headline text-sm font-semibold text-on-surface">{value}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── SECTION 2 — ANIMATED STATS ── */}
        <div className="relative mb-28">
          <div className="absolute inset-0 bg-surface-container-low/40 rounded-3xl backdrop-blur-sm" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12">
            {STATS.map(({ value, suffix, label }, i) => (
              <StatCounter key={label} value={value} suffix={suffix} label={label} delay={i * 150} />
            ))}
          </div>
          {/* Decorative top-line */}
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </div>

        {/* ── SECTION 3 — INTERACTIVE TRAIT CHIPS ── */}
        <div className="mb-28">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-3">
              The Human Kernel
            </h2>
            <p className="text-on-surface-variant font-mono text-sm">
              Click any chip to read the real story.{' '}
              <span className="text-primary/50">// flip to inspect</span>
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {TRAITS.map(trait => (
              <TraitChip key={trait.id} trait={trait} />
            ))}
          </div>
        </div>

        {/* ── SECTION 4 — PHILOSOPHY CARDS ── */}
        <div className="mb-28">
          <div className="mb-10">
            <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-3 italic">
              Engineering Philosophy
            </h2>
            <p className="text-on-surface-variant font-mono text-sm">
              The principles that guide every line written and every model trained.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PHILOSOPHY.map(({ icon, title, body }, i) => (
              <div
                key={title}
                className="group p-7 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-all duration-300 hover:-translate-y-1"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="w-12 h-12 rounded-xl bg-surface-container-high flex items-center justify-center mb-6 text-primary group-hover:bg-primary/15 transition-colors">
                  <span className="material-symbols-outlined text-2xl">{icon}</span>
                </div>
                <h3 className="font-headline font-bold text-xl mb-3">{title}</h3>
                <p className="text-on-surface-variant text-sm leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 5 — STACK I LIVE IN ── */}
        <div className="mb-28">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-10">
            Tools I Live In
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              {
                category: 'Daily Drivers',
                color: 'text-primary',
                border: 'hover:border-primary/40',
                items: ['Claude', 'NotebookLM', 'Python 3.11', 'Wisprflow', 'Docker'],
              },
              {
                category: 'Thinking Tools',
                color: 'text-secondary',
                border: 'hover:border-secondary/40',
                items: ['NotebookLM', 'Excalidraw', 'Notion', 'X', 'Blog Content'],
              },
              {
                category: 'Product & Analytics',
                color: 'text-tertiary',
                border: 'hover:border-tertiary/40',
                items: ['PRD/BRD Writing', 'API Design', 'A/B Testing', 'User-Research', 'Prototyping'],
              },
              {
                category: 'Currently Learning',
                color: 'text-primary',
                border: 'hover:border-primary/40',
                items: ['Mamba SSMs', 'Apache Airflow', 'System Design', 'API Security', 'Everything happening around AI'],
              },
            ].map(({ category, color, border, items }) => (
              <div key={category} className={`glass-panel p-6 rounded-2xl border border-outline-variant/15 ${border} transition-all group`}>
                <h4 className={`font-mono text-[10px] uppercase tracking-[0.2em] ${color} mb-4`}>{category}</h4>
                <div className="flex flex-wrap gap-2">
                  {items.map(item => (
                    <span
                      key={item}
                      className="text-xs font-mono text-on-surface/60 px-3 py-1 bg-surface-container-highest rounded border border-outline-variant/10 group-hover:border-outline-variant/25 transition-colors"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── SECTION 6 — CONNECT FOOTER ── */}
        <div className="relative text-center py-16 px-6 rounded-3xl overflow-hidden">
          {/* Glowing background */}
          <div className="absolute inset-0 bg-surface-container-low/50 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10">
            <div className="w-1 h-1 rounded-full bg-secondary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4">
              Let's build something{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                remarkable.
              </span>
            </h2>
            <p className="text-on-surface-variant mb-10 max-w-md mx-auto font-body leading-relaxed">
              Whether it's a complex AI system, a research collaboration, or just a good engineering conversation - I'm always listening.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="mailto:work.aryan31@gmail.com"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">alternate_email</span>
                Get in Touch
              </Link>
              <Link
                to="/resume"
                className="px-8 py-4 glass-panel border border-outline-variant/30 hover:border-primary/40 text-on-surface font-bold rounded-lg transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">description</span>
                View Resume
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}