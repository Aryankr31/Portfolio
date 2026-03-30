import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

/* ════════════════════════════════════════════════════════════════════
 *  HOW TO ADD MORE RESEARCH PAPERS
 * ════════════════════════════════════════════════════════════════════
 *
 *  1.  Add an entry to the `RESEARCH_PAPERS` array below.
 *      Each entry has the following shape:
 *
 *      {
 *        id: number,                      // Unique numeric ID (increment from the last one)
 *        title: string,                   // Full title of the paper
 *        authors: string,                 // Comma-separated author list
 *        venue: string,                   // Conference / journal (e.g. "NeurIPS 2025")
 *        year: number,                    // Publication year
 *        abstract: string,               // Short abstract / summary (2-3 sentences)
 *        tags: string[],                  // Topic tags (e.g. ["LLM", "Agents"])
 *        paperUrl: string,               // Link to the paper PDF or arXiv page
 *        certificateUrl?: string,         // (optional) Link to the certificate image/PDF
 *                                         //   – Place certificate files in /public/certificates/
 *                                         //   – e.g. '/certificates/paper-3-cert.pdf'
 *        status: 'published' | 'preprint' | 'under-review',
 *      }
 *
 *  2.  For certificate files:
 *      • Place them inside  public/certificates/
 *      • Reference them as  '/certificates/<filename>'
 *      • Supported formats: PDF, PNG, JPG
 *
 *  3.  Save the file, and the new paper will automatically appear on the page.
 *
 * ════════════════════════════════════════════════════════════════════ */

interface ResearchPaper {
  id: number;
  title: string;
  authors: string;
  venue: string;
  year: number;
  abstract: string;
  tags: string[];
  paperUrl: string;
  certificateUrl?: string;
  status: 'published' | 'preprint' | 'under-review';
}

const RESEARCH_PAPERS: ResearchPaper[] = [
  /* ──────────── Paper 1 ──────────── */
  {
    id: 1,
    title: 'Scalable Multi-Agent Architectures for Production LLM Systems',
    authors: 'Aryan Kumar, et al.',
    venue: 'CVPR 2025',
    year: 2025,
    abstract:
      'This paper proposes a novel framework for orchestrating multiple LLM-based agents in production environments, achieving 60% latency reduction while maintaining output quality across diverse enterprise workloads.',
    tags: ['Multi-Agent', 'LLM', 'Production Systems', 'Scalability'],
    paperUrl: '#', // Replace with actual URL, e.g. 'https://arxiv.org/abs/xxxx.xxxxx'
    certificateUrl: '/certificates/paper-1-cert.pdf', // Place your certificate in /public/certificates/
    status: 'published',
  },
  /* ──────────── Paper 2 ──────────── */
  {
    id: 2,
    title: 'Adaptive Memory Consolidation in Autonomous AI Agents',
    authors: 'Aryan Kumar, et al.',
    venue: 'NeurIPS 2025',
    year: 2025,
    abstract:
      'We introduce a biologically-inspired memory consolidation mechanism for autonomous agents that dynamically compresses and retrieves contextual information, enabling long-horizon task completion with bounded memory usage.',
    tags: ['Memory Systems', 'Autonomous Agents', 'Context Management'],
    paperUrl: '#', // Replace with actual URL
    certificateUrl: '/certificates/paper-2-cert.pdf', // Place your certificate in /public/certificates/
    status: 'published',
  },

  /* ──────────── ADD MORE PAPERS BELOW ──────────── */
  // {
  //   id: 3,
  //   title: 'Your New Paper Title',
  //   authors: 'Author 1, Author 2',
  //   venue: 'Conference / Journal Name',
  //   year: 2026,
  //   abstract: 'Brief description of the paper...',
  //   tags: ['Tag1', 'Tag2'],
  //   paperUrl: 'https://arxiv.org/abs/xxxx.xxxxx',
  //   certificateUrl: '/certificates/paper-3-cert.pdf',
  //   status: 'published',
  // },
];

/* ─────────────── SUBCOMPONENTS ─────────────── */

/** Animated counter */
function StatCounter({ value, suffix, label, delay }: { value: number; suffix: string; label: string; delay: number }) {
  const [current, setCurrent] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true); }, { threshold: 0.5 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    const timer = setTimeout(() => {
      const step = Math.ceil(value / 40);
      const interval = setInterval(() => {
        setCurrent(c => { if (c + step >= value) { clearInterval(interval); return value; } return c + step; });
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

/** Status badge chip */
function StatusBadge({ status }: { status: ResearchPaper['status'] }) {
  const config = {
    published: { label: 'Published', color: 'bg-secondary/15 text-secondary border-secondary/30' },
    preprint: { label: 'Preprint', color: 'bg-primary/15 text-primary border-primary/30' },
    'under-review': { label: 'Under Review', color: 'bg-tertiary/15 text-tertiary border-tertiary/30' },
  };
  const { label, color } = config[status];
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-widest ${color}`}>
      <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
      {label}
    </span>
  );
}

/** Individual paper card */
function PaperCard({ paper, index }: { paper: ResearchPaper; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true); }, { threshold: 0.15 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`group relative p-6 md:p-8 rounded-2xl bg-surface-container border border-outline-variant/10 hover:border-primary/30 transition-all duration-500 hover:-translate-y-1 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      style={{ transitionDelay: `${index * 120}ms` }}
    >
      {/* Paper number watermark */}
      <div className="absolute top-4 right-6 font-headline text-6xl font-black text-on-surface/[0.03] select-none pointer-events-none">
        {String(paper.id).padStart(2, '0')}
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
        <StatusBadge status={paper.status} />
        <span className="font-mono text-[10px] text-on-surface-variant/40 uppercase tracking-widest">
          {paper.venue} • {paper.year}
        </span>
      </div>

      {/* Title */}
      <h3 className="text-xl md:text-2xl font-headline font-bold tracking-tight mb-3 group-hover:text-primary transition-colors leading-tight">
        {paper.title}
      </h3>

      {/* Authors */}
      <p className="text-sm text-on-surface-variant/60 font-mono mb-4">
        {paper.authors}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-2 mb-5">
        {paper.tags.map(tag => (
          <span
            key={tag}
            className="text-[11px] font-mono text-on-surface/50 px-2.5 py-1 bg-surface-container-highest rounded-md border border-outline-variant/10 group-hover:border-outline-variant/25 transition-colors"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Abstract — collapsible */}
      <div className="mb-6">
        <button
          onClick={() => setExpanded(e => !e)}
          className="flex items-center gap-2 text-xs font-mono text-primary/70 hover:text-primary transition-colors uppercase tracking-widest mb-2"
        >
          <span className="material-symbols-outlined text-sm" style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}>
            expand_more
          </span>
          {expanded ? 'Hide Abstract' : 'Show Abstract'}
        </button>
        <div
          className="overflow-hidden transition-all duration-500"
          style={{ maxHeight: expanded ? '200px' : '0px', opacity: expanded ? 1 : 0 }}
        >
          <p className="text-sm text-on-surface-variant leading-relaxed pl-6 border-l-2 border-primary/20">
            {paper.abstract}
          </p>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex flex-wrap gap-3">
        <a
          href={paper.paperUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold text-xs uppercase tracking-widest rounded-lg hover:brightness-110 active:scale-[0.98] transition-all group/btn"
        >
          <span className="material-symbols-outlined text-sm group-hover/btn:translate-x-0.5 transition-transform">article</span>
          Read Paper
        </a>
        {paper.certificateUrl && (
          <a
            href={paper.certificateUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 glass-panel border border-outline-variant/30 hover:border-secondary/50 text-on-surface font-mono text-xs uppercase tracking-widest rounded-lg transition-all hover:bg-surface-container-highest group/btn"
          >
            <span className="material-symbols-outlined text-sm text-secondary group-hover/btn:scale-110 transition-transform">workspace_premium</span>
            Certificate
          </a>
        )}
      </div>

      {/* Bottom decorative line */}
      <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
    </div>
  );
}

/** Live scrolling research status ticker */
function ResearchTicker() {
  const lines = [
    '> reviewing: attention mechanism optimizations ...',
    '> status: 2 papers published, 0 under review',
    '> next: speculative decoding benchmarks',
    '> reading: latest arXiv preprints on agents',
    '> focus: multi-agent orchestration patterns',
    '> citations: tracking impact metrics',
  ];
  const [idx, setIdx] = useState(0);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const id = setInterval(() => {
      setVisible(false);
      setTimeout(() => {
        setIdx(i => (i + 1) % lines.length);
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
        {lines[idx]}
      </span>
    </div>
  );
}

/* ─────────────── MAIN PAGE ─────────────── */
export default function ResearchPage() {
  const stats = [
    { value: 2, suffix: '', label: 'Papers Published' },
    { value: 2, suffix: '', label: 'Certificates' },
    { value: 5, suffix: '+', label: 'Research Areas' },
    { value: 10, suffix: '', label: 'Peer Reviewed' },
  ];

  const [filter, setFilter] = useState<string>('all');
  const allTags = ['all', ...Array.from(new Set(RESEARCH_PAPERS.flatMap(p => p.tags)))];

  const filteredPapers =
    filter === 'all'
      ? RESEARCH_PAPERS
      : RESEARCH_PAPERS.filter(p => p.tags.includes(filter));

  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-x-hidden">
      <div className="noise-overlay" />

      {/* Ambient Glows */}
      <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-primary/8 blur-[200px] rounded-full pointer-events-none" />
      <div className="absolute bottom-40 -left-40 w-[500px] h-[500px] bg-secondary/8 blur-[160px] rounded-full pointer-events-none" />
      <div className="absolute top-1/2 left-1/3 w-[400px] h-[400px] bg-tertiary/5 blur-[120px] rounded-full pointer-events-none" />

      {/* ── Top Bar ── */}
      <header className="fixed top-0 w-full z-50 bg-[#131314]/50 backdrop-blur-xl border-b border-outline-variant/20">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <Link to="/" className="text-xl font-bold tracking-tighter text-on-surface font-headline hover:text-primary transition-colors">
            Aryan.ai
          </Link>
          <div className="flex items-center gap-6">
            <div className="hidden sm:block">
              <ResearchTicker />
            </div>
            <Link to="/" className="flex items-center gap-2 text-on-surface/60 hover:text-secondary transition-colors font-mono text-xs uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">arrow_back</span>
              Home
            </Link>
          </div>
        </nav>
      </header>

      <main className="relative pt-28 pb-24 px-6 sm:px-10 md:px-16 lg:px-24 max-w-7xl mx-auto">

        {/* ── HOME SECTION ── */}
        <div className="mb-20">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-outline-variant/20 bg-surface-container-low mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
              module: research_papers — activein t
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-headline font-bold tracking-tighter leading-[0.92] mb-6">
            Research &<br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
              Publications.
            </span>
          </h1>

          <p className="text-on-surface-variant text-lg leading-relaxed mb-8 max-w-2xl font-body">
            A collection of my peer-reviewed research papers and corresponding certificates.
            Focused on advancing AI systems, agent architectures, and scalable machine learning.
          </p>
        </div>

        {/* ── STATS BAR ── */}
        <div className="relative mb-20">
          <div className="absolute inset-0 bg-surface-container-low/40 rounded-3xl backdrop-blur-sm" />
          <div className="relative grid grid-cols-2 md:grid-cols-4 gap-8 p-8 md:p-12">
            {stats.map(({ value, suffix, label }, i) => (
              <StatCounter key={label} value={value} suffix={suffix} label={label} delay={i * 150} />
            ))}
          </div>
          <div className="absolute top-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
          <div className="absolute bottom-0 left-12 right-12 h-px bg-gradient-to-r from-transparent via-secondary/20 to-transparent" />
        </div>

        {/* ── TAG FILTER ── */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-3">
            Published Work
          </h2>
          <p className="text-on-surface-variant font-mono text-sm mb-6">
            Filter by research area.{' '}
            <span className="text-primary/50">// click tags to filter</span>
          </p>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => setFilter(tag)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono uppercase tracking-widest transition-all border ${filter === tag
                    ? 'bg-primary/15 border-primary/40 text-primary'
                    : 'bg-surface-container-high border-outline-variant/15 text-on-surface/50 hover:border-primary/30 hover:text-on-surface/80'
                  }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── PAPER CARDS ── */}
        <div className="grid grid-cols-1 gap-6 mb-28">
          {filteredPapers.map((paper, i) => (
            <PaperCard key={paper.id} paper={paper} index={i} />
          ))}
          {filteredPapers.length === 0 && (
            <div className="text-center py-16 text-on-surface-variant/40 font-mono text-sm">
              No papers match the selected filter.
            </div>
          )}
        </div>

        {/* ── HOW TO ADD MORE — visible note for devs ── */}
        {/* Uncomment below to show the instruction box */}

        {/* 
<div className="mb-28 p-6 md:p-8 rounded-2xl bg-surface-container-low border border-dashed border-outline-variant/20">
  <div className="flex items-start gap-4">
    <span className="material-symbols-outlined text-2xl text-primary/60 mt-0.5">info</span>
    <div>
      <h3 className="font-headline font-bold text-lg mb-2 text-on-surface/80">Adding New Research Papers</h3>
      <div className="text-sm text-on-surface-variant/60 font-mono space-y-1">
        <p>1. Open <code className="text-primary/70">src/components/ResearchPage.tsx</code></p>
        <p>2. Add a new object to the <code className="text-primary/70">RESEARCH_PAPERS</code> array</p>
        <p>3. Place certificate files in <code className="text-primary/70">public/certificates/</code></p>
        <p>4. Save — the page auto-updates via HMR</p>
      </div>
    </div>
  </div>
</div>
*/}

        {/* ── BOTTOM CTA ── */}
        <div className="relative text-center py-16 px-6 rounded-3xl overflow-hidden">
          <div className="absolute inset-0 bg-surface-container-low/50 rounded-3xl" />
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 rounded-3xl" />
          <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />

          <div className="relative z-10">
            <div className="w-1 h-1 rounded-full bg-secondary mx-auto mb-6 animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4">
              Interested in{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                collaboration?
              </span>
            </h2>
            <p className="text-on-surface-variant mb-10 max-w-md mx-auto font-body leading-relaxed">
              I'm always open to research collaborations, paper reviews, and discussions on cutting-edge AI systems.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/#contact"
                className="px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">alternate_email</span>
                Get in Touch
              </Link>
              <Link
                to="/about"
                className="px-8 py-4 glass-panel border border-outline-variant/30 hover:border-primary/40 text-on-surface font-bold rounded-lg transition-all flex items-center gap-3"
              >
                <span className="material-symbols-outlined">person</span>
                About Me
              </Link>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}
