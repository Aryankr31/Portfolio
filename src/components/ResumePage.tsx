import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

/*
 * ============================================================
 * 📄 HOW TO ADD YOUR RESUME PDF:
 * ============================================================
 * 1. Place your resume PDF file in the /public folder:
 *      public/resume.pdf
 *
 * 2. That's it! The page will automatically detect and display
 *    your PDF with the glassmorphism "hire me" overlay.
 *
 * 3. The PDF will be visible from the top, and the bottom ~58%
 *    will be covered by the frosted glass effect with the
 *    humorous "Hire me to unlock my full potential" quote.
 *
 * 4. Until you add your PDF, a styled placeholder is shown.
 * ============================================================
 */

const RESUME_PDF_PATH = '/resume.pdf';
const RESUME_PLACEHOLDER_PATH = '/resume-placeholder.html';

export default function ResumePage() {
  const [resumeSrc, setResumeSrc] = useState(RESUME_PLACEHOLDER_PATH);

  useEffect(() => {
    // Check if real resume.pdf exists
    fetch(RESUME_PDF_PATH, { method: 'HEAD' })
      .then((res) => {
        if (res.ok && res.headers.get('content-type')?.includes('pdf')) {
          setResumeSrc(RESUME_PDF_PATH);
        }
      })
      .catch(() => {
        // Keep placeholder
      });
  }, []);
  return (
    <div className="min-h-screen bg-background text-on-surface relative overflow-hidden">
      {/* Noise overlay */}
      <div className="noise-overlay" />

      {/* Ambient Glows */}
      <div className="absolute top-20 -right-32 w-[500px] h-[500px] bg-primary/10 blur-[160px] rounded-full animate-float" />
      <div className="absolute bottom-20 -left-32 w-[400px] h-[400px] bg-secondary/10 blur-[120px] rounded-full animate-float delay-300" />

      {/* Top Bar */}
      <header className="fixed top-0 w-full z-50 bg-[#131314]/60 backdrop-blur-xl border-b border-outline-variant/20">
        <nav className="flex justify-between items-center px-6 md:px-8 py-4 max-w-7xl mx-auto">
          <Link
            to="/"
            className="text-xl font-bold tracking-tighter text-on-surface font-headline hover:text-primary transition-colors"
          >
            Aryan.AI
          </Link>
          <Link
            to="/"
            className="flex items-center gap-2 text-on-surface/60 hover:text-secondary transition-colors font-mono text-sm"
          >
            <span className="material-symbols-outlined text-lg">arrow_back</span>
            BACK_TO_SYSTEM
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="relative pt-28 pb-20 px-4 sm:px-6 md:px-16 max-w-5xl mx-auto">
        {/* Page Header */}
        <div className="text-center mb-10 md:mb-12">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-outline-variant/20 bg-surface-container-low mb-6">
            <span className="w-2 h-2 rounded-full bg-tertiary animate-pulse" />
            <span className="font-mono text-[10px] uppercase tracking-widest text-tertiary">
              CLASSIFIED_DOCUMENT // LEVEL 5 CLEARANCE
            </span>
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-4">
            𝚁̶𝙴̶𝚂̶𝚄̶𝙼̶𝙴̶{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
            THE RESUME
            </span>
          </h1>
          <p className="text-on-surface-variant font-mono text-sm max-w-lg mx-auto">
            WARNING: Full contents redacted. Access requires employment authorization.
          </p>
        </div>

        {/* ============================================ */}
        {/* Resume PDF Container with Glass Overlay      */}
        {/* ============================================ */}
        <div className="relative max-w-3xl mx-auto">
          {/* The Resume Document Frame */}
          <div className="bg-[#1a1a1b] rounded-2xl border border-outline-variant/15 overflow-hidden shadow-2xl">
            {/* Document Title Bar */}
            <div className="bg-surface-container-highest/80 px-5 py-3 flex items-center justify-between border-b border-outline-variant/20">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-error/40" />
                <div className="w-3 h-3 rounded-full bg-secondary-container/40" />
                <div className="w-3 h-3 rounded-full bg-secondary/40" />
              </div>
              <div className="text-[10px] font-mono text-on-surface-variant/60 uppercase tracking-widest">
                resume_v4.2.pdf — DOWNLOAD
              </div>
              <div className="w-10" />
            </div>

            {/* PDF Embed Area — Your resume.pdf renders here */}
            <div className="relative w-full" style={{ height: '85vh', minHeight: '600px', overflow: 'hidden'  }}>
              <iframe
                src={resumeSrc}
                title="Resume PDF"
                className="w-full h-full border-0"
                scrolling="no"
                style={{ background: '#fff' , overflow: 'hidden', pointerEvents: 'none', userSelect: 'none' }}
              />

              {/* Fallback if PDF isn't loaded yet */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <noscript>
                  <p className="text-on-surface-variant font-mono text-sm">
                    PDF requires JavaScript to display.
                  </p>
                </noscript>
              </div>
            </div>
          </div>

          {/* ============================================ */}
          {/* GLASSMORPHISM OVERLAY (covers bottom ~55%)   */}
          {/* ============================================ */}
          <div className="absolute bottom-0 left-0 right-0 h-[58%] z-10 rounded-b-2xl overflow-hidden">
            {/* Gradient fade from transparent → solid */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#131314] via-[#131314]/90 to-transparent" />

            {/* Frosted glass layer */}
            <div
              className="absolute inset-0 backdrop-blur-lg"
              style={{
                background:
                  'linear-gradient(to top, rgba(19,19,20,0.98) 0%, rgba(19,19,20,0.85) 40%, rgba(19,19,20,0.5) 70%, transparent 100%)',
              }}
            />

            {/* Content on top of glass */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center px-6 sm:px-8 text-center pt-16">
              {/* Lock Icon */}
              <div className="w-20 h-20 rounded-full bg-surface-container-high/80 border border-outline-variant/30 flex items-center justify-center mb-6 glow-shadow animate-float">
                <span className="material-symbols-outlined text-4xl text-primary">lock</span>
              </div>

              {/* The Humorous Quote */}
              <blockquote className="mb-8 max-w-md">
                <p className="text-2xl sm:text-3xl md:text-4xl font-headline font-bold tracking-tight text-on-surface mb-3 leading-snug">
                  "Hire me to unlock my{' '}
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-tertiary to-secondary">
                    full potential
                  </span>
                  "
                </p>
                <footer className="text-on-surface-variant/60 font-mono text-[10px] uppercase tracking-widest">
                  — JUST KIDDING - Click on that download button ASAP
                </footer>
              </blockquote>

              {/* Fake Loading Bar */}
              <div className="w-56 sm:w-64 mb-8">
                <div className="flex justify-between text-[10px] font-mono text-on-surface-variant/40 mb-2">
                  <span>DECRYPTING...</span>
                  <span>47% COMPLETE</span>
                </div>
                <div className="h-1.5 w-full bg-surface-container-highest rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-primary to-secondary rounded-full animate-pulse"
                    style={{ width: '47%' }}
                  />
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="https://drive.google.com/file/d/1jFooU4-B6o93TiJ811Xua5j8xKVQh2GO/view?usp=sharing"
                  className="px-6 sm:px-8 py-4 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center gap-3 group"
                >
                  <span className="material-symbols-outlined">download</span>
                  DOWNLOAD HERE
                </a>
                <Link
                  to="/"
                  className="px-6 sm:px-8 py-4 bg-surface-container-high border border-outline-variant/20 text-on-surface font-bold rounded-lg hover:bg-surface-container-highest transition-all flex items-center gap-3"
                >
                  <span className="material-symbols-outlined">home</span>
                  Return Home
                </Link>
              </div>

              {/* Easter Egg */}
              <p className="mt-6 text-[10px] font-mono text-on-surface-variant/20 max-w-sm leading-relaxed">
                // The resume is/was available to download, this was just to make you smirk.
                <br />
                // Just send a carrier pigeon or, you know, an email.
              </p>
            </div>
          </div>
        </div>

        {/* Terminal Easter Egg */}
        <div className="mt-14 max-w-md mx-auto glass-panel rounded-xl border border-outline-variant/20 p-6">
          <div className="font-mono text-xs space-y-2">
            <div>
              <span className="text-primary">Aryan@AI</span>
              <span className="text-on-surface-variant">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface-variant">$ </span>
              <span className="text-on-surface">sudo unlock resume.pdf</span>
            </div>
            <div className="text-error/60">
              [ERROR] Permission denied. Employment contract required.
            </div>
            <div>
              <span className="text-primary">Aryan@AI</span>
              <span className="text-on-surface-variant">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface-variant">$ </span>
              <span className="text-on-surface">please?</span>
            </div>
            <div className="text-secondary/60">
              [SYS] That&apos;s not a valid command, but I appreciate the politeness.
            </div>
            <div className="flex items-center">
              <span className="text-primary">Aryan@AI</span>
              <span className="text-on-surface-variant">:</span>
              <span className="text-secondary">~</span>
              <span className="text-on-surface-variant">$ </span>
              <span className="w-2 h-4 bg-primary animate-blink" />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
