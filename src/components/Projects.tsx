import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

interface ProjectCardProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

function AnimatedCard({ children, className = '', delay = 0 }: ProjectCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.animationDelay = `${delay}ms`;
          el.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={ref} className={`opacity-0 ${className}`} style={{ animationFillMode: 'forwards' }}>
      {children}
    </div>
  );
}

function PromptStudioCard() {
  const barData = [40, 30, 45, 25, 35, 40, 20, 30, 37, 27];

  return (
    <AnimatedCard 
      delay={400} 
      className="md:col-span-8 flex flex-col md:flex-row gap-0 md:gap-6 p-1 rounded-xl bg-surface-container-low border border-outline-variant/10 overflow-hidden"
    >
      <div className="md:w-1/2 overflow-hidden bg-gradient-to-br from-secondary/15 via-surface-container to-primary/10 min-h-[200px] flex items-center justify-center">
        {/* Animated Bar Chart using CSS Animations instead of Framer Motion */}
        <svg viewBox="0 0 300 200" className="w-3/4 opacity-80">
          <rect x="20" y="30" width="120" height="60" rx="4" fill="#201f20" stroke="#494454" strokeWidth="0.5" />
          <rect x="160" y="30" width="120" height="60" rx="4" fill="#201f20" stroke="#494454" strokeWidth="0.5" />
          <rect x="20" y="110" width="260" height="70" rx="4" fill="#201f20" stroke="#494454" strokeWidth="0.5" />
          
          {barData.map((height, i) => {
            const xPos = 35 + i * 25;
            const yStart = 180 - height;
            const color = i % 2 === 0 ? '#4cd7f6' : '#a078ff';
            
            return (
              <rect
                key={i}
                x={xPos}
                y={yStart}
                width="15"
                height={height}
                rx="2"
                fill={color}
                opacity="0.5"
                className="animate-pulse"
                style={{ animationDelay: `${i * 150}ms`, animationDuration: '3s' }}
              />
            );
          })}
          
          <rect x="25" y="40" width="40" height="4" rx="2" fill="#4cd7f6" opacity="0.6" />
          <rect x="25" y="50" width="80" height="4" rx="2" fill="#d0bcff" opacity="0.4" />
          <rect x="25" y="60" width="60" height="4" rx="2" fill="#4cd7f6" opacity="0.3" />
          <rect x="25" y="70" width="100" height="4" rx="2" fill="#d0bcff" opacity="0.25" />
          
          <polyline
            points="170,80 190,60 210,70 230,45 250,55 270,40"
            fill="none"
            stroke="#4cd7f6"
            strokeWidth="1.5"
            opacity="0.7"
            strokeDasharray="80"
            className="animate-dash"
            style={{ strokeDashoffset: '0' }}
          />
        </svg>
      </div>

      <div className="md:w-1/2 p-6 md:p-8 flex flex-col justify-center">
        <div className="text-[10px] font-mono text-secondary mb-2 uppercase tracking-widest">
          Visualization Tool
        </div>
        <h3 className="text-xl md:text-2xl font-headline font-bold mb-4 leading-tight">
          Dhruvayu
        </h3>
        <p className="text-on-surface-variant text-sm mb-6">
           A comprehensive visualization tool that analyzes climate change data to identify trends, patterns, and impacts on a global scale.
        </p>
        
        <Link to="https://github.com/Aryankr31/Dhruvayu">
          <button className="px-5 py-2 rounded border border-secondary/40 text-secondary text-xs font-mono hover:bg-secondary/10 transition-colors">
            VIEW REPOSITORY
          </button>
        </Link>
      </div>
    </AnimatedCard>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <h2 className="text-4xl md:text-5xl font-headline font-bold tracking-tighter mb-4">
              Featured Projects
            </h2>
            <p className="text-on-surface-variant max-w-md">
              A selection of recent deployments in the generative and predictive landscape.
            </p>
          </div>
          <div className="flex gap-4">
            <span className="text-on-surface-variant font-mono text-[10px] uppercase border border-outline-variant/30 px-3 py-1 rounded">
              Filtered: ALL
            </span>
            <span className="text-on-surface-variant font-mono text-[10px] uppercase border border-outline-variant/30 px-3 py-1 rounded">
              Sort: PRIORITY
            </span>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* Featured Project - DevOracle */}
          <AnimatedCard className="md:col-span-8 group relative rounded-xl overflow-hidden bg-surface-container-low border border-outline-variant/10 hover:border-secondary/30 transition-all duration-500">
            <div className="aspect-video w-full overflow-hidden bg-gradient-to-br from-primary/20 via-surface-container to-secondary/10">
              <div className="w-full h-full flex items-center justify-center relative">
                {/* Abstract Neural Network Visualization */}
                <svg viewBox="0 0 400 225" className="w-full h-full opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700">
                  <defs>
                    <radialGradient id="glow1" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#a078ff" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#a078ff" stopOpacity="0" />
                    </radialGradient>
                    <radialGradient id="glow2" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#4cd7f6" stopOpacity="0.6" />
                      <stop offset="100%" stopColor="#4cd7f6" stopOpacity="0" />
                    </radialGradient>
                  </defs>
                  {/* Connection lines */}
                  <line x1="80" y1="60" x2="200" y2="112" stroke="#d0bcff" strokeWidth="0.5" opacity="0.3" />
                  <line x1="80" y1="165" x2="200" y2="112" stroke="#4cd7f6" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="112" x2="320" y2="60" stroke="#d0bcff" strokeWidth="0.5" opacity="0.3" />
                  <line x1="200" y1="112" x2="320" y2="165" stroke="#4cd7f6" strokeWidth="0.5" opacity="0.3" />
                  <line x1="80" y1="60" x2="320" y2="165" stroke="#fbabff" strokeWidth="0.3" opacity="0.15" />
                  <line x1="80" y1="165" x2="320" y2="60" stroke="#fbabff" strokeWidth="0.3" opacity="0.15" />
                  {/* Nodes */}
                  <circle cx="80" cy="60" r="20" fill="url(#glow1)" />
                  <circle cx="80" cy="60" r="4" fill="#d0bcff" />
                  <circle cx="80" cy="165" r="15" fill="url(#glow2)" />
                  <circle cx="80" cy="165" r="3" fill="#4cd7f6" />
                  <circle cx="200" cy="112" r="25" fill="url(#glow1)" />
                  <circle cx="200" cy="112" r="6" fill="#a078ff" />
                  <circle cx="320" cy="60" r="18" fill="url(#glow2)" />
                  <circle cx="320" cy="60" r="3.5" fill="#4cd7f6" />
                  <circle cx="320" cy="165" r="22" fill="url(#glow1)" />
                  <circle cx="320" cy="165" r="5" fill="#d0bcff" />
                </svg>
              </div>
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent p-6 sm:p-10 flex flex-col justify-end">
              <div className="flex gap-2 mb-4">
                <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-[10px] font-mono border border-primary/30">
                  LLM AGENT
                </span>
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-mono border border-secondary/30">
                  RAG
                </span>
                <span className="bg-secondary/20 text-secondary px-3 py-1 rounded-full text-[10px] font-mono border border-secondary/30">
                  Vector-DB
                </span>
              </div>
              <h3 className="text-2xl md:text-3xl font-headline font-bold mb-2">DevOracle</h3>
              <p className="text-on-surface-variant max-w-xl mb-6 text-sm md:text-base">
                AI second brain for engineering teams - turns codebase + incidents into actionable intelligence.
              </p>
              <div className="flex items-center gap-x-20">
                <a
                  href="https://huggingface.co/spaces/AryanK31/devoracle"
                  className="inline-flex items-center gap-2 text-secondary font-mono text-sm hover:underline"
                >
                  [TRY_NOW]{' '}
                  <span className="material-symbols-outlined text-sm">rocket_launch</span>
                </a>
                <a
                  href="https://github.com/Aryankr31/Project_Devoracle"
                  className="inline-flex items-center gap-2 text-secondary font-mono text-sm hover:underline"
                >
                  [VIEW_REPOSITORY]{' '}
                  <span className="material-symbols-outlined text-sm">open_in_new</span>
                </a>
              </div>
            </div>
          </AnimatedCard>

          {/* Small Project - UrbanEye */}
          <AnimatedCard delay={200} className="md:col-span-4 group p-6 md:p-8 rounded-xl bg-surface-container-high border border-outline-variant/10 hover:border-primary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-6 text-primary">
              <span className="material-symbols-outlined text-3xl">psychology</span>
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">UrbanEye</h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              Turns any CCTV into smart surveillance - real-time AI for traffic, safety, and city insights.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
                Computer Vision
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
                YOLO
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
                Pytorch
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
                DeepSort & Bytetrack
              </span>
            </div>
            <div className="pt-6 border-t border-outline-variant/10 flex items-center gap-x-15">
              <a
                href="https://github.com/Aryankr31/Project_Devoracle"
                className="inline-flex items-center gap-2 text-secondary font-mono text-sm hover:underline"
              >
                [VIEW_REPOSITORY]{' '}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </AnimatedCard>

          {/* Small Project - VRescue */}
          <AnimatedCard delay={300} className="md:col-span-4 group p-6 md:p-8 rounded-xl bg-surface-container-high border border-outline-variant/10 hover:border-secondary/30 transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-surface-container-highest flex items-center justify-center mb-6 text-secondary">
              <span className="material-symbols-outlined text-3xl">health_and_safety</span>
            </div>
            <h3 className="text-xl font-headline font-bold mb-3">VRescue</h3>
            <p className="text-sm text-on-surface-variant mb-6 leading-relaxed">
              An advanced XR (Extended Reality) training system to revolutionize disaster response training.
            </p>
            <div className="flex flex-wrap gap-2 mb-8">
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
              Virtual Reality Environments
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
              Unity Development
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
              XR Training
              </span>
              <span className="text-[10px] font-mono text-on-surface/40 px-2 py-0.5 border border-outline-variant/20 rounded">
              Web Dashboard & Mobile Application
              </span>
            </div>
            <div className="pt-6 border-t border-outline-variant/10 flex items-center gap-x-15">
              <a
                href="https://github.com/VRescue"
                className="inline-flex items-center gap-2 text-secondary font-mono text-sm hover:underline"
              >
              [VIEW_REPOSITORY]{''}
                <span className="material-symbols-outlined text-sm">open_in_new</span>
              </a>
            </div>
          </AnimatedCard>

          {/* PromptStudioCard integration */}
          <PromptStudioCard />
          
        </div>
      </div>
    </section>
  );
}
