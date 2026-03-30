import { useEffect, useState } from 'react';

const bioText =
  'AI Engineer experienced in developing LLM systems, evaluation frameworks, and scalable ML applications. Currently focused on LLM orchestration, multi-agent architectures, and efficient RAG pipelines. I bridge the gap between cutting-edge AI research and production-grade systems.';

const skills = ['RAG Architecture', 'LLM Orchestration', 'Virtualization', 'Agile Development'];

export default function Terminal() {
  const [visibleChars, setVisibleChars] = useState(0);
  const [showSkills, setShowSkills] = useState(false);
  const [showCursor, setShowCursor] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) {
          setStarted(true);
        }
      },
      { threshold: 0.3 }
    );
    const el = document.getElementById('terminal');
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    if (visibleChars < bioText.length) {
      const timer = setTimeout(() => setVisibleChars((c) => c + 1), 8);
      return () => clearTimeout(timer);
    } else {
      setTimeout(() => setShowSkills(true), 300);
      setTimeout(() => setShowCursor(true), 800);
    }
  }, [visibleChars, started]);

  return (
    <section id="terminal" className="py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-24 bg-surface-container-low/30">
      <div className="max-w-4xl mx-auto">
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-headline font-bold tracking-tight mb-4 italic">
            The Control Plane
          </h2>
          <p className="text-on-surface-variant font-mono text-sm">
            Interactive shell for system interrogation.
          </p>
        </div>

        <div className="glass-panel border border-outline-variant/30 rounded-xl overflow-hidden shadow-2xl">
          {/* Terminal Title Bar */}
          <div className="bg-surface-container-highest/80 px-4 py-3 flex items-center justify-between border-b border-outline-variant/20">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-error/40" />
              <div className="w-3 h-3 rounded-full bg-secondary-container/40" />
              <div className="w-3 h-3 rounded-full bg-secondary/40" />
            </div>
            <div className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">
              git bash
            </div>
            <div className="w-10" />
          </div>

          {/* Terminal Body */}
          <div className="p-6 md:p-8 font-mono text-sm min-h-[350px] md:min-h-[400px]">
            {/* Command 1: cat bio.txt */}
            <div className="mb-4">
              <span className="text-primary">Aryan@AI</span>
              <span className="text-on-surface-variant">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface-variant">$</span>
              <span className="text-on-surface ml-2">cat bio.txt</span>
            </div>

            <div className="text-on-surface-variant mb-6 leading-relaxed break-words">
              {bioText.slice(0, visibleChars)}
              {visibleChars < bioText.length && (
                <span className="inline-block w-2 h-4 bg-primary animate-blink ml-0.5 align-text-bottom" />
              )}
            </div>

            {/* Command 2: ls core_skills/ */}
            {showSkills && (
              <>
                <div className="mb-4 animate-fade-in-up">
                  <span className="text-primary">Aryan@AI</span>
                  <span className="text-on-surface-variant">:</span>
                  <span className="text-secondary">~</span>
                  <span className="text-on-surface-variant">$</span>
                  <span className="text-on-surface ml-2">ls core_skills/</span>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-6 animate-fade-in-up delay-200">
                  {skills.map((skill) => (
                    <div key={skill} className="text-secondary flex items-center gap-2">
                      <span className="material-symbols-outlined text-xs">folder_open</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Blinking Cursor */}
            {showCursor && (
              <div className="flex items-center gap-2 animate-fade-in-up">
                <span className="text-primary">Aryan@AI</span>
                <span className="text-on-surface-variant">:</span>
                <span className="text-secondary">~</span>
                <span className="text-on-surface-variant">$</span>
                <span className="w-2 h-5 bg-primary animate-blink ml-1" />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
