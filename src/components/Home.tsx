import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const dataFeedLines = [
  '> initializing_kernel...',
  '> weight_decay: 0.001',
  '> batch_size: 512',
  '> learning_rate: 3e-4',
  '> no. of epochs: Infinite',
  '> epoch_01: completed',
  '> loss: 0.0421',
  '> optimizer: adamw',
  '> temperature: 0.7',
  '> top_p: 0.95',
];

export default function Home() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('animate-fade-in-up');
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="home"
      className="min-h-screen flex flex-col justify-center px-6 sm:px-12 md:px-20 lg:px-24 pt-20 relative overflow-hidden"
    >
      {/* Ambient Glow Orbs */}
      <div className="absolute top-1/4 -right-20 w-96 h-96 bg-primary/10 blur-[128px] rounded-full animate-float" />
      <div className="absolute bottom-1/4 -left-20 w-80 h-80 bg-secondary/10 blur-[96px] rounded-full animate-float delay-300" />

      <div className="max-w-4xl relative z-10">
        {/* Status Badge */}
        <div className="inline-flex items-center gap-3 px-3 py-1 rounded-full border border-outline-variant/20 bg-surface-container-low mb-8 opacity-0 animate-fade-in-up">
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-mono text-[10px] uppercase tracking-widest text-secondary">
            Corporate Ready: AI Engineer
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="text-5xl sm:text-6xl md:text-8xl font-headline font-bold tracking-tighter text-on-surface mb-6 leading-[0.9] opacity-0 animate-fade-in-up delay-200">
          I'm Aryan Kumar
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            AI-ML 𝚂̶𝚙̶𝚎̶𝚌̶𝚒̶𝚊̶𝚕̶𝚒̶𝚜̶𝚝̶
          </span>
          <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            Generalist
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-on-surface-variant max-w-2xl font-body leading-relaxed mb-12 opacity-0 animate-fade-in-up delay-400">
          Engineer building production-grade AI systems with LLMs and agent architectures.
          Focused on scalability, reliability, and real-world impact.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 sm:gap-6 opacity-0 animate-fade-in-up delay-600">
          <a
            href="#projects"
            className="px-6 sm:px-8 py-4 bg-primary text-on-primary font-bold rounded-lg hover:brightness-110 transition-all flex items-center gap-3 group"
          >
            Explore My Work
            <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform">
              arrow_downward
            </span>
          </a>
          <Link to="/research" className="px-6 sm:px-8 py-4 bg-surface-container-high border border-outline-variant/20 text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-3">
            Research Papers
          </Link>
        </div>
      </div>

      {/* Data Feed Sidebar Decor */}
      <div className="absolute right-12 top-1/2 -translate-y-1/2 hidden xl:block w-48 font-mono text-[10px] text-secondary/40 space-y-2 opacity-50 pointer-events-none">
        <div className="border-l border-secondary/20 pl-4">
          {dataFeedLines.map((line, i) => (
            <p key={i} className="opacity-0 animate-fade-in-up" style={{ animationDelay: `${800 + i * 150}ms`, animationFillMode: 'forwards' }}>
              {line}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}
