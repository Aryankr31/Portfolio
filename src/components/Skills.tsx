import { useEffect, useRef } from 'react';

interface SkillCategory {
  number: string;
  title: string;
  color: 'primary' | 'secondary';
  items: string[];
}

const categories: SkillCategory[] = [
  {
  number: '01',
  title: 'AI & Automation',
  color: 'secondary',
  items: ['Custom GPTs', 'Automation Workflows', 'N8N & Make', 'Claude Connectors'],
},
{
  number: '02',
  title: 'Agentic AI',
  color: 'primary',
  items: ['LangGraph', 'LangChain', 'Model Context Protocol (MCP)', 'Tool Use & Function Calling'],
},
{
  number: '03',
  title: 'RAG & Knowledge',
  color: 'secondary',
  items: ['ChromaDB / Weaviate', 'Vector Search at Scale', 'Chunking', 'Hybrid Retrieval'],
},
{
  number: '04',
  title: 'Software Development',
  color: 'primary',
  items: [ 'Data Structures and Algorithm', 'System Design', 'API Design','Docker & Kubernetes'],
},
];

function SkillCard({ category, index }: { category: SkillCategory; index: number }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${index * 150}ms`;
          el.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [index]);

  const hoverBorder = category.color === 'secondary' ? 'hover:border-secondary/40' : 'hover:border-primary/40';
  const titleColor = category.color === 'secondary' ? 'text-secondary' : 'text-primary';

  return (
    <div
      ref={ref}
      className={`glass-panel p-6 md:p-8 rounded-xl border border-outline-variant/20 ${hoverBorder} transition-all duration-300 group opacity-0`}
      style={{ animationFillMode: 'forwards' }}
    >
      <h4 className={`font-mono text-[10px] ${titleColor} mb-4 uppercase tracking-[0.2em]`}>
        {category.number} / {category.title}
      </h4>
      <ul className="space-y-4 font-headline text-base md:text-lg font-medium text-on-surface">
        {category.items.map((item) => (
          <li key={item} className="flex items-center justify-between">
            {item}
            <span className="material-symbols-outlined text-sm opacity-20 group-hover:opacity-100 transition-opacity duration-300">
              chevron_right
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">
          {/* Left Column - Header & Status */}
          <div className="lg:col-span-1">
            <h2 className="text-3xl md:text-4xl font-headline font-bold mb-6 italic">
              Tech Stack <br />
              Metadata
            </h2>
            <p className="text-on-surface-variant mb-8 leading-relaxed">
              My toolkit is optimized for high-performance AI applications, from low-level
              CUDA kernels to high-level orchestration layers.
            </p>

            {/* Status Widget */}
            <div className="p-6 rounded-lg bg-surface-container-low border border-outline-variant/10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-2 h-2 rounded-full bg-primary" />
                <span className="font-mono text-xs uppercase tracking-widest">
                  Operational Status: Peak
                </span>
              </div>
              <div className="space-y-3">
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary rounded-full transition-all duration-1000" style={{ width: '98%' }} />
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-secondary rounded-full transition-all duration-1000" style={{ width: '92%' }} />
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div className="h-full bg-primary/40 rounded-full transition-all duration-1000" style={{ width: '85%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Skill Cards Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {categories.map((cat, i) => (
              <SkillCard key={cat.number} category={cat} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
