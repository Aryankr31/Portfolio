export default function Footer() {
  return (
    <footer className="bg-background w-full py-10 md:py-12 border-t border-outline-variant/10">
      <div className="flex flex-col md:flex-row justify-between items-center px-6 md:px-12 max-w-7xl mx-auto gap-6 md:gap-8">
        <div className="font-mono text-[10px] uppercase text-outline-variant tracking-widest text-center md:text-left">
          © 2026 ARYAN KUMAR. EXECUTED WITH PRECISION.
        </div>

        <div className="flex items-center gap-8 font-mono text-[10px] uppercase">
          <a
            href="https://github.com/Aryankr31"
            target="_blank"
            rel="noopener noreferrer"
            className="text-outline-variant hover:text-secondary transition-colors"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/aryan-kumar-194947268/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-outline-variant hover:text-secondary transition-colors"
          >
            LinkedIn
          </a>
        </div>

        <div className="text-outline-variant text-[10px] font-mono flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
          ALL SYSTEMS OPERATIONAL
        </div>
      </div>
    </footer>
  );
}
