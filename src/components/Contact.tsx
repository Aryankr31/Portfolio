import { useState, type FormEvent } from 'react';

type FormStatus = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');
    setErrorMsg('');

    const form = e.currentTarget;
    const formData = new FormData(form);
    // Append access key (Web3Forms)
    formData.append('access_key', import.meta.env.VITE_WEB3FORMS_KEY);

    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      });
      const data = await res.json();

      if (data.success) {
        setStatus('success');
        form.reset();
        setTimeout(() => setStatus('idle'), 4000);
      } else {
        setErrorMsg(data.message || 'Something went wrong.');
        setStatus('error');
      }
    } catch {
      setErrorMsg('Network error. Please try again.');
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 px-6 sm:px-12 md:px-20 lg:px-24 mb-12 md:mb-24">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 md:gap-16">
        {/* Left Column */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl md:text-6xl font-headline font-bold tracking-tighter mb-8">
            Initiate <br />
            Transmission.
          </h2>
          <p className="text-lg md:text-xl text-on-surface-variant mb-12 leading-relaxed">
            Looking for technical leadership, research collaboration, or custom neural
            architecture design? Let&apos;s connect the nodes.
          </p>

          <div className="space-y-6">
            {/* Email */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center text-secondary shrink-0">
                <span className="material-symbols-outlined">mail</span>
              </div>
              <div>
                <div className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest">
                  E-Mail Address
                </div>
                <div className="text-on-surface font-medium">work.aryan31@gmail.com</div>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center gap-6">
              <div className="w-12 h-12 rounded-full border border-outline-variant/20 flex items-center justify-center text-primary shrink-0">
                <span className="material-symbols-outlined">location_on</span>
              </div>
              <div>
                <div className="text-[10px] font-mono text-on-surface/40 uppercase tracking-widest">
                  Node Location
                </div>
                <div className="text-on-surface font-medium">
                  New Delhi, IN // 28.6139° N
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Contact Form */}
        <div className="lg:w-1/2 glass-panel p-6 md:p-10 rounded-2xl border border-outline-variant/20 glow-shadow">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Web3Forms honeypot (spam protection) */}
            <input type="checkbox" name="botcheck" className="hidden" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-on-surface/60 uppercase tracking-widest">
                  Identify_Self
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="Your Name"
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface/20"
                />
              </div>
              <div className="space-y-2">
                <label className="font-mono text-[10px] text-on-surface/60 uppercase tracking-widest">
                  Return_Address
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="email@domain.com"
                  className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface/20"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-on-surface/60 uppercase tracking-widest">
                Payload_Subject
              </label>
              <select name="subject" className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all">
                <option>Collaboration Proposal</option>
                <option>Technical Consulting</option>
                <option>Hiring Opportunity</option>
                <option>Other Inquiry</option>
              </select>
            </div>

            <div className="space-y-2">
              <label className="font-mono text-[10px] text-on-surface/60 uppercase tracking-widest">
                Transmission_Content
              </label>
              <textarea
                name="message"
                required
                placeholder="System message..."
                rows={5}
                className="w-full bg-surface-container-lowest border border-outline-variant/10 rounded-lg p-4 text-on-surface focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-on-surface/20 resize-none"
              />
            </div>

            {status === 'error' && (
              <p className="text-red-400 font-mono text-xs text-center">{errorMsg}</p>
            )}

            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full py-5 bg-gradient-to-r from-primary to-primary-container text-on-primary font-bold rounded-lg hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-3 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              <span className="material-symbols-outlined">
                {status === 'sending' ? 'hourglass_top' : status === 'success' ? 'check_circle' : 'send'}
              </span>
              {status === 'sending'
                ? 'TRANSMITTING...'
                : status === 'success'
                  ? 'TRANSMISSION_SENT ✓'
                  : 'EXECUTE_TRANSMISSION'}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
