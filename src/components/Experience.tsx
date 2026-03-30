import { useEffect, useRef } from 'react';

interface TimelineEntry {
  title: string;
  period: string;
  company: string;
  type?: string;
  description: string;
  dotColor: string;
  periodColor: string;
}

const experiences: TimelineEntry[] = [
  {
    title: 'Business Analyst',
    period: ' March 2026 — PRESENT',
    company: 'SINCH INDIA',
    description:
      'Working on CPaaS and engagement products by creating BRDs/PRDs, analyzing APIs and workflows, and aligning product, engineering, and operations for data-driven feature delivery.',
    dotColor: 'bg-primary',
    periodColor: 'text-primary/60',
  },
  {
    title: 'LLM Engineer',
    period: 'Nov 2025 — Feb 2026',
    company: 'Outlier AI',
    description:
      'Designed a multi-library reasoning evaluation framework for LLMs to test dependency-based, multi-hop reasoning instead of isolated retrieval.',
    dotColor: 'bg-secondary',
    periodColor: 'text-secondary/60',
  },
  {
    title: 'Data Analyst Intern',
    period: 'Jun 2024 — Aug 2024',
    company: 'IBM',
    description:
      'Developed a client-facing Analyzer using Plotly Express, handling 3,000 concurrent users and visualizing 10K+ global data points.',
    dotColor: 'bg-outline',
    periodColor: 'text-secondary/90',
  },
];

function TimelineItem({ entry, index }: { entry: TimelineEntry; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.style.animationDelay = `${index * 200}ms`;
          el.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.2 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  return (
    <div ref={ref} className="relative opacity-0" style={{ animationFillMode: 'forwards' }}>
      {/* Timeline Dot */}
      <div
        className={`absolute -left-[54px] top-0 w-3 h-3 rounded-full ${entry.dotColor} border-4 border-background outline outline-1 outline-${entry.dotColor.replace('bg-', '')}/20`}
      />
      <div className="mb-2 flex flex-col md:flex-row md:items-baseline justify-between gap-2">
        <h3 className="text-xl md:text-2xl font-headline font-bold text-on-surface">
          {entry.title}
        </h3>
        <span className={`text-sm font-mono ${entry.periodColor}`}>
          {entry.period} // {entry.company}{entry.type && ` // ${entry.type}`}
        </span>
      </div>
      <p className="text-on-surface-variant leading-relaxed max-w-2xl">{entry.description}</p>
    </div>
  );
}

export default function Experience() {
  return (
    <section id="experience" className="py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-24 bg-surface-container-lowest">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16 md:mb-20">
          <h2 className="text-3xl md:text-4xl font-headline font-bold mb-4">Work History</h2>
          <p className="text-on-surface-variant font-mono text-sm">
            Professional runtime execution history.
          </p>
        </div>

        <div className="relative pl-12 border-l border-outline-variant/20 space-y-16 md:space-y-20">
          {experiences.map((entry, i) => (
            <TimelineItem key={entry.title} entry={entry} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
