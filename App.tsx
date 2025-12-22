
import React, { useEffect, useState } from 'react';
import { 
  Mic, Cpu, Download, MessageSquare, Command, Keyboard, 
  Zap, ChevronRight, Clock, Newspaper, Music, ExternalLink, Mail 
} from 'lucide-react';
import { CONFIG } from './content';

const AppLogo: React.FC<{ size?: string }> = ({ size = "w-10 h-10" }) => (
  <div className={`${size} relative rounded-xl overflow-hidden shadow-md border border-black/5 shrink-0`}>
    <div className="absolute top-0 w-full h-[49%] bg-[#fcfcfc] flex items-center justify-end pr-1 text-black font-serif text-[10px] leading-none select-none">
       &lt;日
    </div>
    <div className="absolute top-[49%] w-full h-[2px] bg-gradient-to-r from-purple-600 via-red-500 via-yellow-400 via-green-500 to-blue-600 z-10"></div>
    <div className="absolute bottom-0 w-full h-[49%] bg-[#1c1c1c] flex items-center justify-start pl-1 text-white font-serif text-[10px] leading-none select-none">
       中&gt;
    </div>
  </div>
);

const AuthorAvatar: React.FC<{ size?: string, className?: string }> = ({ size = "w-16 h-16", className = "" }) => (
  <div className={`${size} ${className} rounded-2xl border border-zinc-200 overflow-hidden bg-zinc-50 shadow-sm transition-transform hover:scale-105 duration-300 relative group`}>
    <div className="absolute inset-0 border-[0.5px] border-black/5 rounded-2xl z-10 pointer-events-none"></div>
    <img src={CONFIG.intro.author.avatarUrl} alt={CONFIG.intro.author.name} className="w-full h-full object-cover" />
  </div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-4 glass shadow-sm' : 'py-8'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-3 group cursor-pointer">
          <AppLogo />
          <div className="flex flex-col leading-tight">
            <span className="text-xl font-bold tracking-tight text-zinc-900">{CONFIG.site.name}</span>
            <span className="text-zinc-500 font-medium text-[10px] tracking-[0.2em] uppercase">{CONFIG.site.enName}</span>
          </div>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
          {CONFIG.nav.map(item => (
            <a key={item.href} href={item.href} className="hover:text-zinc-900 transition-colors">{item.label}</a>
          ))}
        </div>
        <button className="px-6 py-2.5 bg-zinc-900 text-white rounded-full text-sm font-semibold hover:bg-zinc-800 transition-all active:scale-95 shadow-lg shadow-zinc-200">
          立即下载
        </button>
      </div>
    </nav>
  );
};

const Hero: React.FC = () => (
  <section className="relative pt-48 pb-24 px-6 min-h-[75vh] flex flex-col items-center justify-center">
    <div className="hero-glow"></div>
    <div className="max-w-5xl mx-auto text-center">
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-medium mb-8 animate-fade-in">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
        </span>
        {CONFIG.hero.badge}
      </div>
      <h1 className="text-6xl md:text-8xl font-extrabold tracking-tighter mb-8 text-zinc-900">
        {CONFIG.hero.titleLine1}<br />
        <span className="text-gradient">{CONFIG.hero.titleLine2}</span>
      </h1>
      <p className="text-lg md:text-xl text-zinc-600 max-w-2xl mx-auto mb-12 leading-relaxed font-medium">
        {CONFIG.hero.description}
      </p>
      <button className="w-full sm:w-auto px-12 py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-bold flex items-center justify-center gap-3 transition-all transform hover:-translate-y-1 shadow-2xl shadow-blue-200">
        <Download size={22} />
        {CONFIG.hero.downloadBtn}
      </button>
    </div>
  </section>
);

const Intro: React.FC = () => (
  <section id="intro" className="py-24 px-6 bg-white">
    <div className="max-w-6xl mx-auto">
      <div className="flex flex-col md:flex-row gap-16 items-stretch">
        <div className="flex-1 space-y-6 flex flex-col justify-center">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-zinc-900">{CONFIG.intro.title}</h2>
          {CONFIG.intro.paragraphs.map((p, i) => (
            <p key={i} className="text-zinc-600 text-lg leading-relaxed">{p}</p>
          ))}
          <div className="pt-8 flex items-center gap-4 border-t border-zinc-100">
            <AuthorAvatar />
            <div>
              <p className="font-bold text-lg text-zinc-900">{CONFIG.intro.author.name}</p>
              <p className="text-sm text-zinc-500">{CONFIG.intro.author.role}</p>
            </div>
          </div>
        </div>
        <div className="w-full md:w-1/2 glass p-10 rounded-[40px] shadow-xl shadow-zinc-200/50 flex flex-col justify-center relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 blur-3xl -z-10 transition-all group-hover:bg-blue-200"></div>
          <div className="space-y-6">
             <div className="inline-block px-3 py-1 bg-zinc-100 rounded-lg text-xs font-mono text-zinc-500 mb-2">{CONFIG.intro.demo.label}</div>
             <p className="text-zinc-400 text-sm font-mono mb-2">{CONFIG.intro.demo.hint}</p>
             <h4 className="text-3xl font-light text-zinc-800 italic tracking-tight">"{CONFIG.intro.demo.input}"</h4>
             <div className="flex items-center gap-3 text-blue-600 pt-6 border-t border-zinc-100">
               <div className="p-2 bg-blue-50 rounded-lg"><ChevronRight size={24} /></div>
               <span className="text-2xl font-semibold">{CONFIG.intro.demo.output}</span>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

const Features: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'mic': return <Mic className="text-blue-600" size={32} />;
      case 'message': return <MessageSquare className="text-purple-600" size={32} />;
      case 'keyboard': return <Keyboard className="text-emerald-600" size={32} />;
      default: return null;
    }
  };
  const getBg = (type: string) => {
    switch(type) {
      case 'mic': return 'bg-blue-50';
      case 'message': return 'bg-purple-50';
      case 'keyboard': return 'bg-emerald-50';
      default: return 'bg-zinc-50';
    }
  };

  return (
    <section id="features" className="py-32 px-6 bg-zinc-50">
      <div className="max-w-7xl mx-auto text-center mb-20">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-zinc-900">{CONFIG.features.title}</h2>
        <p className="text-zinc-500 text-lg font-medium">{CONFIG.features.subtitle}</p>
      </div>
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {CONFIG.features.items.map((m, i) => (
          <div key={i} className="group p-10 rounded-[40px] bg-white border border-zinc-100 hover:border-zinc-200 transition-all duration-500 shadow-sm hover:shadow-xl hover:-translate-y-2">
            <div className={`w-16 h-16 rounded-2xl ${getBg(m.type)} flex items-center justify-center mb-8 group-hover:scale-110 transition-transform`}>
              {getIcon(m.type)}
            </div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400 mb-3 block">{m.highlight}</span>
            <h3 className="text-2xl font-bold mb-5 text-zinc-900">{m.title}</h3>
            <p className="text-zinc-500 leading-relaxed text-lg font-normal">{m.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

const TechSpecs: React.FC = () => {
  const getIcon = (type: string) => {
    switch(type) {
      case 'cpu': return <Cpu className="text-blue-600" />;
      case 'zap': return <Zap className="text-purple-600" />;
      case 'clock': return <Clock className="text-emerald-600" />;
      default: return null;
    }
  };
  const getBg = (type: string) => {
    switch(type) {
      case 'cpu': return 'bg-blue-50 border-blue-100';
      case 'zap': return 'bg-purple-50 border-purple-100';
      case 'clock': return 'bg-emerald-50 border-emerald-100';
      default: return 'bg-zinc-50';
    }
  };

  return (
    <section id="tech" className="py-24 px-6 bg-white">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-bold mb-10 tracking-tight text-zinc-900">{CONFIG.tech.title}</h2>
          <div className="space-y-10">
            {CONFIG.tech.specs.map((spec, i) => (
              <div key={i} className="flex gap-6">
                <div className={`flex-shrink-0 w-12 h-12 ${getBg(spec.type)} rounded-2xl flex items-center justify-center border`}>
                  {getIcon(spec.type)}
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-2 text-zinc-900">{spec.title}</h4>
                  <p className="text-zinc-500 leading-relaxed">{spec.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="glass p-12 rounded-[50px] shadow-2xl shadow-zinc-200 border border-zinc-100 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-100 blur-3xl opacity-50"></div>
          <h3 className="text-2xl font-bold mb-10 flex items-center gap-3 text-zinc-900">
            <Command size={24} className="text-blue-600" />
            {CONFIG.tech.shortcuts.title}
          </h3>
          <div className="space-y-6">
            {CONFIG.tech.shortcuts.keys.map((s, i) => (
              <div key={i} className="flex items-center justify-between p-7 bg-white rounded-3xl border border-zinc-100 hover:border-zinc-200 transition-colors shadow-sm">
                <div className="flex gap-1.5">
                  {s.keys.map((k, j) => (
                    <React.Fragment key={j}>
                      <kbd className="px-3.5 py-1.5 bg-zinc-50 rounded-lg border border-zinc-200 text-sm font-mono text-zinc-700 shadow-sm">{k}</kbd>
                      {j < s.keys.length - 1 && <span className="text-zinc-400 self-center">+</span>}
                    </React.Fragment>
                  ))}
                </div>
                <div className="text-right">
                  <p className="font-bold text-zinc-900">{s.label}</p>
                  <p className="text-xs text-zinc-500 mt-1 uppercase tracking-wider">{s.en}</p>
                </div>
              </div>
            ))}
            <div className="p-8 bg-zinc-50 rounded-3xl border border-zinc-100 mt-4 text-sm text-zinc-500 leading-relaxed italic text-center">"{CONFIG.tech.shortcuts.tip}"</div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  const getWorkIcon = (type: string) => {
    switch(type) {
      case 'news': return <Newspaper size={20} />;
      case 'music': return <Music size={20} />;
      case 'wechat': return <MessageSquare size={20} />;
      default: return null;
    }
  };

  return (
    <footer id="footer" className="py-24 px-6 border-t border-zinc-100 bg-zinc-50/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16">
        <div className="space-y-8 max-w-sm">
          <div className="flex items-center gap-3"><AppLogo /><div className="flex flex-col leading-tight"><span className="text-xl font-bold tracking-tight text-zinc-900">{CONFIG.site.name}</span><span className="text-zinc-400 font-medium text-[9px] tracking-widest uppercase">{CONFIG.site.enName}</span></div></div>
          <p className="text-zinc-500 text-lg leading-relaxed font-normal">{CONFIG.footer.desc}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 flex-1">
          <div className="space-y-6">
            <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs border-b border-zinc-200 pb-2">作者作品</h4>
            <div className="flex flex-col space-y-2">
              {CONFIG.footer.works.map((work, i) => (
                <a key={i} href={work.url} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 text-zinc-600 hover:text-blue-600 transition-all group p-3 rounded-2xl hover:bg-white hover:shadow-sm">
                  <div className="mt-1 w-10 h-10 rounded-xl bg-white flex items-center justify-center border border-zinc-200 group-hover:bg-blue-50 group-hover:border-blue-100 shadow-sm shrink-0">
                    <span className="text-zinc-400 group-hover:text-blue-500 transition-colors">{getWorkIcon(work.type)}</span>
                  </div>
                  <div>
                    <span className="block text-zinc-900 font-semibold text-sm flex items-center gap-1">{work.title} <ExternalLink size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" /></span>
                    <span className="text-xs text-zinc-400 leading-snug block">{work.desc}</span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="space-y-6">
            <h4 className="font-bold text-zinc-900 uppercase tracking-widest text-xs border-b border-zinc-200 pb-2">联系作者</h4>
            <div className="space-y-5">
              <div className="flex items-center gap-4 group p-3 -m-3 rounded-2xl bg-white border border-zinc-200/50 shadow-sm">
                <AuthorAvatar size="w-12 h-12" />
                <div><span className="block text-zinc-400 text-[10px] uppercase tracking-widest font-bold">个人微信号</span><span className="text-sm text-blue-600 font-mono font-bold tracking-tight">{CONFIG.footer.contact.wechat}</span></div>
              </div>
              <a href={`mailto:${CONFIG.footer.contact.email}`} className="flex items-center gap-4 group p-3 -m-3 rounded-2xl hover:bg-white transition-all border border-transparent hover:border-zinc-200/50">
                <div className="w-12 h-12 rounded-xl bg-zinc-100 flex items-center justify-center border border-zinc-200 shrink-0 group-hover:bg-blue-50 group-hover:border-blue-100"><Mail className="text-zinc-400 group-hover:text-blue-500" size={20} /></div>
                <div><span className="block text-zinc-400 text-[10px] uppercase tracking-widest font-bold">电子邮件</span><span className="text-sm text-zinc-900 font-mono font-bold tracking-tight group-hover:text-blue-600">{CONFIG.footer.contact.email}</span></div>
              </a>
              <div className="pt-4 mt-4 border-t border-zinc-100">
                <p className="text-zinc-400 text-[10px] uppercase tracking-widest mb-3 font-bold">软件状态</p>
                <div className="flex items-center gap-6">
                  {CONFIG.footer.status.map((s, i) => (
                    <div key={i} className={`flex items-center gap-1.5 ${!s.active ? 'opacity-50' : ''}`}>
                      <span className={`w-2 h-2 rounded-full ${s.active ? 'bg-blue-500 animate-pulse' : 'bg-zinc-300'}`}></span>
                      <span className={`text-xs ${s.active ? 'text-zinc-600 font-semibold' : 'text-zinc-400 italic font-medium'}`}>{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-24 pt-10 border-t border-zinc-200 flex flex-col md:flex-row justify-between text-zinc-400 text-[11px] uppercase tracking-widest gap-4">
        <p>{CONFIG.footer.copyright}</p>
        <div className="flex gap-8">
          {CONFIG.footer.legal.map(l => <span key={l.label} className="hover:text-zinc-900 cursor-pointer transition-colors">{l.label}</span>)}
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => (
  <main className="min-h-screen selection:bg-blue-100">
    <Navbar /><Hero /><Intro /><Features /><TechSpecs /><Footer />
  </main>
);

export default App;
