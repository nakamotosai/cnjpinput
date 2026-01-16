
import React, { useEffect, useState, useRef } from 'react';
import {
  Mic, Cpu, Download, MessageSquare, Command, Keyboard,
  Zap, ChevronRight, Clock, Newspaper, Music, ExternalLink, Mail, Home, Sparkles
} from 'lucide-react';
import { CONFIG } from './content';

// ----------------------------------------------------------------------
// Tools
// ----------------------------------------------------------------------
const getIcon = (iconName: string, size = 24, className = "") => {
  switch (iconName) {
    case 'mic': return <Mic size={size} className={className} />;
    case 'message': return <MessageSquare size={size} className={className} />;
    case 'keyboard': return <Keyboard size={size} className={className} />;
    case 'cpu': return <Cpu size={size} className={className} />;
    case 'zap': return <Zap size={size} className={className} />;
    case 'clock': return <Clock size={size} className={className} />;
    case 'news': return <Newspaper size={size} className={className} />;
    case 'music': return <Music size={size} className={className} />;
    case 'wechat': return <MessageSquare size={size} className={className} />;
    case 'home': return <Home size={size} className={className} />;
    case 'mail': return <Mail size={size} className={className} />;
    default: return <Sparkles size={size} className={className} />;
  }
};

const getColorStyles = (type: string) => {
  switch (type) {
    case 'blue': return { text: 'text-blue-400', bg: 'bg-blue-500/10' };
    case 'purple': return { text: 'text-purple-400', bg: 'bg-purple-500/10' };
    case 'emerald': return { text: 'text-emerald-400', bg: 'bg-emerald-500/10' };
    default: return { text: 'text-zinc-400', bg: 'bg-white/5' };
  }
};

// ----------------------------------------------------------------------
// Interactive Glow Overlay Layer (Clipped to Text)
// ----------------------------------------------------------------------
const InteractiveText: React.FC<{
  children: React.ReactNode,
  className?: string,
  brightness?: number,
  baseColor?: string
}> = ({ children, className = "", brightness = 0.5, baseColor = "text-zinc-500" }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // 当元素进入视口或接近视口时开启渲染
        setIsVisible(entry.isIntersecting);
      },
      {
        rootMargin: "100px", // 提前 100px 预加载，防止闪烁
        threshold: 0
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={`relative inline-block ${className}`}>
      {/* Base Layer */}
      <div className={`${baseColor} transition-colors duration-300`}>
        {children}
      </div>
      {/* Glow Layer (Clipped to Text) - Muted Rainbow Colors */}
      {/* 只有在视口内时才渲染这个极其昂贵的图层 */}
      {isVisible && (
        <div
          className="absolute inset-0 pointer-events-none select-none text-transparent bg-clip-text"
          style={{
            backgroundImage: `radial-gradient(
              220px circle at var(--mouse-x) var(--mouse-y),
              rgba(255, 80, 80, ${brightness}) 0%,
              rgba(255, 200, 80, ${brightness * 0.9}) 20%,
              rgba(80, 255, 120, ${brightness * 0.8}) 40%,
              rgba(80, 160, 255, ${brightness * 0.9}) 60%,
              rgba(180, 80, 255, ${brightness}) 80%,
              rgba(255,255,255,0) 100%
            )`,
            backgroundAttachment: 'fixed',
            willChange: 'background-image' // 提示浏览器优化
          }}
        >
          {children}
        </div>
      )}
    </div>
  );
};

// ----------------------------------------------------------------------
// Light-weight Rainbow Cursor
// ----------------------------------------------------------------------
const CustomCursor: React.FC = () => {
  const [isClicking, setIsClicking] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      setIsHovering(!!target.closest('a, button, [role="button"], .glass, kbd, input'));
    };

    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);
    window.addEventListener('mouseover', handleMouseOver);
    return () => {
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, []);

  return (
    <div
      className="fixed top-0 left-0 w-2.5 h-2.5 rounded-full pointer-events-none z-[9999] rainbow-bg-flow shadow-lg transition-transform duration-75 ease-out"
      style={{
        transform: `translate3d(calc(var(--mouse-x) - 5px), calc(var(--mouse-y) - 5px), 0) scale(${isClicking ? 0.7 : (isHovering ? 1.4 : 1)})`,
        border: '1px solid rgba(255,255,255,0.2)'
      }}
    />
  );
};

function usePerformanceLogger() {
  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const checkPerf = () => {
      const now = performance.now();
      frameCount++;

      if (now - lastTime >= 5000) {
        const fps = Math.round((frameCount * 1000) / (now - lastTime));
        const memory = (performance as any).memory;

        console.log(`[Perf] FPS: ${fps}`);
        if (memory) {
          console.log(`[Perf] Heap: ${Math.round(memory.usedJSHeapSize / 1024 / 1024)}MB / ${Math.round(memory.jsHeapSizeLimit / 1024 / 1024)}MB`);
        }

        frameCount = 0;
        lastTime = now;
      }

      requestAnimationFrame(checkPerf);
    };

    const rAF = requestAnimationFrame(checkPerf);
    return () => cancelAnimationFrame(rAF);
  }, []);
}

// ----------------------------------------------------------------------
// Mouse Glow Effect Component
// ----------------------------------------------------------------------
const MouseGlow: React.FC = () => {
  useEffect(() => {
    const rAFRef = { current: 0 };
    const pos = { x: -1000, y: -1000 };
    const lastPos = { x: -1000, y: -1000 };

    const update = () => {
      // Optimization: Only update DOM if position definitely changed
      // This prevents global style recalculations when mouse is stationary
      if (Math.abs(pos.x - lastPos.x) > 0.1 || Math.abs(pos.y - lastPos.y) > 0.1) {
        document.documentElement.style.setProperty('--mouse-x', `${pos.x}px`);
        document.documentElement.style.setProperty('--mouse-y', `${pos.y}px`);
        lastPos.x = pos.x;
        lastPos.y = pos.y;
      }
      rAFRef.current = requestAnimationFrame(update);
    };

    const handleMouseMove = (e: MouseEvent) => {
      pos.x = e.clientX;
      pos.y = e.clientY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    rAFRef.current = requestAnimationFrame(update);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(rAFRef.current);
    };
  }, []);

  return (
    <>
      <CustomCursor />
    </>
  );
};

// ----------------------------------------------------------------------
// Slot Machine Text Effect
// ----------------------------------------------------------------------
const SlotText: React.FC<{ targetText: string }> = ({ targetText }) => {
  const [displayText, setDisplayText] = useState<string[]>(targetText.split(""));
  const [lockedIndices, setLockedIndices] = useState<Set<number>>(new Set());
  const randomChars = "语速意见识别中日跨沟越语言人工智能翻译极速天地雷动语音交流识别灵感核心";

  useEffect(() => {
    const rAFRef = { current: 0 };
    let startTime = Date.now();
    const cycleDuration = 8000;

    const update = () => {
      const now = Date.now();
      const elapsed = (now - startTime) % cycleDuration;

      const newLocked = new Set<number>();
      if (elapsed < 4000) {
        for (let i = 0; i < targetText.length; i++) {
          if (elapsed >= (i + 1) * 500) {
            newLocked.add(i);
          }
        }
      } else {
        for (let i = 0; i < targetText.length; i++) newLocked.add(i);
      }

      // Check if locked indices have changed to avoid unnecessary re-renders
      setLockedIndices(prev => {
        if (prev.size === newLocked.size && [...prev].every(val => newLocked.has(val))) {
          return prev;
        }
        return newLocked;
      });

      // Conditional Update for Display Text
      setDisplayText(prev => {
        // Only update if not fully locked (performance optimization)
        if (newLocked.size === targetText.length) {
          // Ensure final state is correct, then stop updating
          const isRefCorrect = prev.join('') === targetText;
          return isRefCorrect ? prev : targetText.split("");
        }

        return targetText.split("").map((char, i) => {
          if (newLocked.has(i)) return char;
          return randomChars[Math.floor(Math.random() * randomChars.length)];
        });
      });

      if (elapsed >= 4000) {
        const timeToNextCycle = cycleDuration - elapsed;
        setTimeout(() => {
          rAFRef.current = requestAnimationFrame(update);
        }, timeToNextCycle);
      } else {
        rAFRef.current = requestAnimationFrame(update);
      }
    };

    rAFRef.current = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rAFRef.current);
  }, [targetText]);

  return (
    <>
      {targetText.split("").map((_, i) => (
        <span
          key={i}
          className={`inline-block w-[1em] text-center transition-colors duration-100 ${lockedIndices.has(i) ? 'text-white' : 'text-zinc-700'}`}
        >
          {displayText[i]}
        </span>
      ))}
    </>
  );
};

// ----------------------------------------------------------------------
// Typewriter Sequential Flow
// ----------------------------------------------------------------------
const SequentialFlow: React.FC<{ paragraphs: string[] }> = ({ paragraphs }) => {
  const [visibleChars, setVisibleChars] = useState<number[]>(paragraphs.map(() => 0));
  const [currentParaIdx, setCurrentParaIdx] = useState(0);

  useEffect(() => {
    let isCancelled = false;

    const runSequence = async () => {
      while (!isCancelled) {
        // Reset state for new cycle
        setVisibleChars(paragraphs.map(() => 0));
        setCurrentParaIdx(0);
        await new Promise(r => setTimeout(r, 600));

        for (let i = 0; i < paragraphs.length; i++) {
          if (isCancelled) return;
          setCurrentParaIdx(i);
          const text = paragraphs[i];
          const duration = 2000; // Force ~2 seconds per paragraph/line block
          const charInterval = duration / text.length;

          for (let j = 0; j <= text.length; j++) {
            if (isCancelled) return;
            setVisibleChars(prev => {
              const next = [...prev];
              next[i] = j;
              return next;
            });
            await new Promise(r => setTimeout(r, charInterval));
          }
          if (i < paragraphs.length - 1) {
            await new Promise(r => setTimeout(r, 500)); // Small pause between paragraphs
          }
        }
        await new Promise(r => setTimeout(r, 4500)); // Pause at end to let user read
      }
    };

    runSequence();
    return () => { isCancelled = true; };
  }, [paragraphs]);

  return (
    <div className="space-y-6">
      {paragraphs.map((p, i) => (
        <p
          key={i}
          className={`text-sm leading-relaxed transition-opacity duration-500 ${i <= currentParaIdx ? 'text-white font-medium opacity-100' : 'text-zinc-800 opacity-20'
            }`}
        >
          {p.slice(0, visibleChars[i])}
          {i === currentParaIdx && visibleChars[i] < p.length && (
            <span className="inline-block w-[2px] h-[1em] bg-blue-500 ml-0.5 animate-pulse align-middle"></span>
          )}
        </p>
      ))}
    </div>
  );
};

// ----------------------------------------------------------------------
// Main Application
// ----------------------------------------------------------------------

const AppLogo: React.FC<{ size?: string, fontSize?: string }> = ({ size = "w-8 h-8", fontSize = "text-[8px]" }) => (
  <div className={`${size} relative rounded-xl overflow-hidden border border-white/10 shrink-0 transition-transform group-hover:scale-105`}>
    <div className={`absolute top-0 w-full h-[49%] bg-[#fcfcfc] flex items-center justify-end pr-1.5 text-black font-serif ${fontSize} leading-none select-none`}>
      &lt;日
    </div>
    <div className="absolute top-[49%] w-full h-[1.5px] bg-gradient-to-r from-purple-600 via-red-500 via-yellow-400 via-green-500 to-blue-600 z-10"></div>
    <div className={`absolute bottom-0 w-full h-[49%] bg-[#1c1c1c] flex items-center justify-start pl-1.5 text-white font-serif ${fontSize} leading-none select-none`}>
      中&gt;
    </div>
  </div>
);

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'py-3 bg-black/40 backdrop-blur-xl border-b border-white/5' : 'py-6'}`}>
      <div className="max-w-6xl mx-auto px-6 flex justify-between items-center relative min-h-[56px]">
        {/* Logo - Left aligned */}
        <div className="flex items-center gap-4 group cursor-pointer relative z-10" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="shadow-[0_0_15px_rgba(255,255,255,0.5)] rounded-xl">
            <AppLogo size="w-14 h-14" fontSize="text-[12px]" />
          </div>
          <div className="flex flex-col leading-tight">
            <InteractiveText className="text-2xl font-black tracking-tight" brightness={0.6}>{CONFIG.site.name}</InteractiveText>
            <span className="text-zinc-500 font-bold text-[10px] tracking-[0.2em] uppercase">{CONFIG.site.enName}</span>
          </div>
        </div>

        {/* Nav Links - Absolutely centered in the container */}
        <div className="hidden md:flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 items-center gap-10 text-sm font-bold text-zinc-500 uppercase tracking-[0.15em] whitespace-nowrap">
          {CONFIG.nav.map(item => (
            <a
              key={item.href}
              href={item.href}
              onClick={(e) => handleNavClick(e, item.href)}
              className="hover:text-white transition-colors relative py-2"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* Download Button - Right aligned */}
        <a
          href={CONFIG.download.url}
          target="_blank"
          rel="noopener noreferrer"
          className="w-14 h-14 glass flex flex-col items-center justify-center text-white rounded-2xl text-[11px] font-black leading-tight hover:bg-white/10 transition-all active:scale-95 border border-white/10 relative z-10 shadow-[0_0_20px_rgba(255,255,255,0.3)]"
        >
          <div className="text-white flex flex-col items-center">
            <span className="block">立即</span>
            <span className="block">下载</span>
          </div>
        </a>
      </div>
    </nav>
  );
};

const TypingDemo: React.FC = () => {
  const [inputText, setInputText] = useState("");
  const [outputText, setOutputText] = useState("");
  const inputFull = CONFIG.intro.demo.input;
  const outputFull = CONFIG.intro.demo.output;

  useEffect(() => {
    let isCancelled = false;
    const runAnimation = async () => {
      while (!isCancelled) {
        setInputText("");
        setOutputText("");
        await new Promise(r => setTimeout(r, 800));
        for (let i = 0; i <= inputFull.length; i++) {
          if (isCancelled) return;
          setInputText(inputFull.slice(0, i));
          await new Promise(r => setTimeout(r, 120 + Math.random() * 50));
        }
        await new Promise(r => setTimeout(r, 1000));
        for (let i = 0; i <= outputFull.length; i++) {
          if (isCancelled) return;
          setOutputText(outputFull.slice(0, i));
          await new Promise(r => setTimeout(r, 80 + Math.random() * 30));
        }
        await new Promise(r => setTimeout(r, 4000));
      }
    };
    runAnimation();
    return () => { isCancelled = true; };
  }, [inputFull, outputFull]);

  return (
    <div className="relative z-10 space-y-8 h-full flex flex-col justify-between">
      <div>
        <div className="inline-block px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[9px] font-bold text-zinc-400 mb-6 uppercase tracking-widest">
          {CONFIG.intro.demo.label}
        </div>
        <p className="text-zinc-600 text-[10px] font-bold mb-3 uppercase tracking-wider h-4">
          {inputText ? CONFIG.intro.demo.hint : ""}
        </p>
        <InteractiveText className="text-2xl font-light italic leading-snug min-h-[1.5em] block" brightness={0.6}>
          {inputText ? `"${inputText}"` : ""}
          <span className="inline-block w-[2px] h-[1em] bg-blue-500 ml-1 animate-pulse align-middle"></span>
        </InteractiveText>
      </div>
      <div className="flex items-center gap-4 pt-8 border-t border-white/5">
        <div className="p-3 bg-white/5 rounded-2xl border border-white/10 text-white shadow-inner">
          <ChevronRight size={24} strokeWidth={3} className={outputText ? "text-blue-400" : "text-zinc-600"} />
        </div>
        <InteractiveText className="text-2xl font-black min-h-[1.2em]" brightness={0.7}>
          {outputText}
        </InteractiveText>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  usePerformanceLogger();
  return (
    <div className="min-h-screen selection:bg-white/20 text-zinc-400 pb-12 bg-[#0a0a0a] relative overflow-x-hidden">
      <MouseGlow />
      <Navbar />

      <main className="pt-24 px-6 max-w-6xl mx-auto space-y-4 relative z-10">
        {/* Row 1: Hero & Intro */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
          {/* Hero Card */}
          <div className="lg:col-span-8 glass p-8 md:p-12 rounded-[32px] flex flex-col justify-center items-center relative overflow-hidden group min-h-[440px]">
            <div className="space-y-6 relative z-10 w-full flex flex-col items-center">
              <div className="inline-flex flex-col items-center gap-1 px-5 py-3 rounded-2xl bg-white/5 border border-white/10 mb-4 transition-all">
                <InteractiveText className="text-[11px] font-black tracking-[0.15em]" brightness={0.6} baseColor="text-white/70">
                  {CONFIG.hero.badgeLine1}
                </InteractiveText>
                <InteractiveText className="text-sm font-bold tracking-[0.2em]" brightness={0.6} baseColor="text-white">
                  {CONFIG.hero.badge}
                </InteractiveText>
              </div>

              <div className="grid grid-cols-[repeat(6,1em)] text-5xl md:text-7xl font-black leading-[1.05] tracking-normal justify-center">
                <SlotText targetText={CONFIG.hero.titleLine1} />
                <div className="mt-2 col-span-6 tracking-normal">
                  <span className="text-rainbow block w-full text-center">
                    {CONFIG.hero.titleLine2}
                  </span>
                </div>
              </div>

              <p className="text-zinc-400 text-base md:text-lg max-w-lg font-medium leading-relaxed text-center">
                {CONFIG.hero.description}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6 w-full">
                <a href={CONFIG.download.url} className="w-full sm:w-auto px-8 py-4 bg-white/90 rounded-2xl transition-all hover:bg-white active:scale-95 shadow-lg shadow-white/5 overflow-hidden flex items-center justify-center gap-2">
                  <Download size={20} strokeWidth={3} className="text-black" />
                  <InteractiveText brightness={0.6} baseColor="text-black" className="font-black">
                    {CONFIG.hero.downloadBtnMirror}
                  </InteractiveText>
                </a>
                <a href={CONFIG.download.urlInternational} className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/10 rounded-2xl transition-all hover:bg-white/10 active:scale-95 flex items-center justify-center gap-2">
                  <Download size={18} className="text-white" />
                  <InteractiveText brightness={0.6} baseColor="text-white" className="font-bold">
                    {CONFIG.hero.downloadBtnGlobal}
                  </InteractiveText>
                </a>
              </div>
            </div>
          </div>

          {/* Intro Card */}
          <div id="intro" className="lg:col-span-4 glass p-8 rounded-[32px] flex flex-col justify-between border-white/5 scroll-mt-24 content-visibility-auto min-h-[540px]">
            <div className="space-y-6">
              <InteractiveText className="text-xl font-bold" brightness={0.6}>{CONFIG.intro.title}</InteractiveText>
              <SequentialFlow paragraphs={CONFIG.intro.paragraphs} />
            </div>
            <div className="pt-6 border-t border-white/5 flex items-center gap-3 mt-8">
              <div className="w-10 h-10 rounded-xl overflow-hidden bg-zinc-800 border border-white/10 shrink-0">
                <img src={CONFIG.intro.author.avatarUrl} className="w-full h-full object-cover opacity-80" />
              </div>
              <div>
                <span className="font-bold text-sm block text-zinc-200">{CONFIG.intro.author.name}</span>
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{CONFIG.intro.author.role}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Row 2: Features */}
        <div id="features" className="grid grid-cols-1 md:grid-cols-2 gap-4 scroll-mt-24 content-visibility-auto">
          {CONFIG.features.items.map((m, i) => {
            const colors = getColorStyles(m.colorType);
            return (
              <div key={i} className="glass p-8 rounded-[32px] transition-all group border-white/5">
                <div className={`w-12 h-12 rounded-2xl ${colors.bg} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-105 transition-transform`}>
                  {getIcon(m.icon, 24, colors.text)}
                </div>
                <div className="space-y-3">
                  <span className="text-[9px] font-black uppercase tracking-[0.2em] text-zinc-500">{m.highlight}</span>
                  <span className="text-lg font-bold block text-zinc-200 group-hover:text-white transition-colors">{m.title}</span>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">{m.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Row 3: Tech & Demo */}
        <div id="tech" className="grid grid-cols-1 lg:grid-cols-12 gap-4 scroll-mt-24 content-visibility-auto">
          <div className="lg:col-span-12 xl:col-span-6 glass p-8 rounded-[32px] relative overflow-hidden group">
            <TypingDemo />
          </div>

          <div className="lg:col-span-12 xl:col-span-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2 glass p-8 rounded-[32px] flex items-center gap-6 border-white/5">
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center shrink-0 border border-white/10">
                <Cpu className="text-white/80" size={28} />
              </div>
              <div>
                <span className="font-bold text-lg block text-zinc-200">{CONFIG.tech.specs[0].title}</span>
                <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">{CONFIG.tech.specs[0].desc}</p>
              </div>
            </div>
            {CONFIG.tech.specs.slice(1).map((spec, i) => {
              const colors = getColorStyles(spec.colorType);
              return (
                <div key={i} className="md:col-span-2 glass p-8 rounded-[32px] flex items-center gap-6 border-white/5">
                  <div className={`w-14 h-14 ${colors.bg} rounded-2xl flex items-center justify-center shrink-0 border border-white/5`}>
                    {getIcon(spec.icon, 28, colors.text)}
                  </div>
                  <div>
                    <span className="font-bold block text-zinc-200">{spec.title}</span>
                    <p className="text-xs text-zinc-500 font-medium mt-1 leading-relaxed">{spec.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Row 4: Shortcuts */}
        <div className="glass p-10 rounded-[32px] overflow-hidden relative border-white/5 content-visibility-auto">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
            <div className="space-y-5 text-center md:text-left max-w-lg">
              <h3 className="text-xl font-bold text-white/90 flex items-center justify-center md:justify-start gap-3">
                <div className="p-2.5 bg-white/5 rounded-xl border border-white/10 shadow-lg"><Command size={22} className="text-white" strokeWidth={2.5} /></div>
                <span>{CONFIG.tech.shortcuts.title}</span>
              </h3>
              <p className="text-sm text-zinc-500 font-medium border-l-0 md:border-l-2 border-white/5 pl-0 md:pl-5 py-1.5 leading-relaxed">
                "{CONFIG.tech.shortcuts.tip}"
              </p>
            </div>
            <div className="flex flex-row gap-5 justify-center flex-wrap md:flex-nowrap">
              {CONFIG.tech.shortcuts.keys.map((s, i) => (
                <div key={i} className="flex flex-col items-center glass p-8 rounded-[32px] min-w-[180px] transition-transform hover:scale-105 border-white/5 shadow-xl">
                  <div className="flex gap-2 mb-4">
                    {s.keys.map((k, j) => (
                      <React.Fragment key={j}>
                        <kbd className="px-4 py-2 rainbow-bg-flow rounded-xl text-sm font-mono font-black text-white shadow-[0_5px_15px_rgba(0,0,0,0.3)] [text-shadow:0_1px_2px_rgba(0,0,0,0.8)] border-white/20">
                          {k}
                        </kbd>
                        {j < s.keys.length - 1 && <span className="text-zinc-600 self-center text-base font-bold">+</span>}
                      </React.Fragment>
                    ))}
                  </div>
                  <span className="text-[10px] font-black text-zinc-400 uppercase tracking-[0.25em]">{s.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer id="footer" className="glass rounded-[40px] p-8 md:p-12 relative overflow-hidden scroll-mt-24 content-visibility-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-b border-white/5 pb-12 items-center relative z-10">
            <div className="lg:col-span-4 flex flex-col items-center text-center space-y-8">
              <div className="space-y-6">
                <div className="flex flex-col items-center gap-3">
                  <AppLogo size="w-12 h-12" />
                  <div className="flex flex-col leading-tight">
                    <span className="text-2xl font-black tracking-tight block text-zinc-200">{CONFIG.site.name}</span>
                    <span className="text-zinc-600 font-bold text-[10px] tracking-[0.4em] uppercase">{CONFIG.site.enName}</span>
                  </div>
                </div>
                <p className="text-sm text-zinc-500 leading-relaxed font-medium max-w-[260px]">
                  {CONFIG.footer.desc}
                </p>
              </div>

              <div className="pt-2">
                <a href={CONFIG.download.url} target="_blank" rel="noopener noreferrer" className="group relative inline-flex items-center justify-center px-10 py-4 rounded-2xl overflow-hidden shadow-2xl transition-all hover:scale-105 active:scale-95 bg-white">
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-emerald-400 opacity-0 group-hover:opacity-20 transition-opacity animate-rainbow-flow blur-xl"></div>
                  <div className="absolute -inset-[2px] bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500 rounded-2xl opacity-0 group-hover:opacity-40 blur-md transition-opacity animate-pulse"></div>
                  <span className="relative flex items-center gap-2">
                    <Download size={18} strokeWidth={3} className="text-black" />
                    <span className="font-black text-black">立即下载</span>
                  </span>
                </a>
              </div>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 md:grid-cols-2 gap-6 lg:pl-12 border-t lg:border-t-0 lg:border-l border-white/5 pt-12 lg:pt-0">
              {/* Combined Links Grid */}
              {[
                { label: CONFIG.footer.contact.wechatLabel, val: CONFIG.footer.contact.wechat, icon: 'wechat', img: CONFIG.intro.author.avatarUrl, url: "#" },
                { label: CONFIG.footer.works[0].title, val: CONFIG.footer.works[0].desc, icon: CONFIG.footer.works[0].icon, url: CONFIG.footer.works[0].url },
                { label: CONFIG.footer.contact.homepageLabel, val: CONFIG.footer.contact.homepage, icon: 'home', img: CONFIG.footer.contact.homepageLogo, url: CONFIG.footer.contact.homepage },
                { label: CONFIG.footer.works[1].title, val: CONFIG.footer.works[1].desc, icon: CONFIG.footer.works[1].icon, url: CONFIG.footer.works[1].url },
                { label: CONFIG.footer.contact.wechatOALabel, val: CONFIG.footer.contact.wechatOA, icon: 'wechat', img: CONFIG.footer.contact.wechatOALogo, url: CONFIG.footer.contact.wechatOAUrl },
                { label: CONFIG.footer.works[2].title, val: CONFIG.footer.works[2].desc, icon: CONFIG.footer.works[2].icon, url: CONFIG.footer.works[2].url }
              ].map((item, i) => (
                <a
                  key={i}
                  href={item.url}
                  target={item.url.startsWith('http') ? "_blank" : undefined}
                  rel={item.url.startsWith('http') ? "noopener noreferrer" : undefined}
                  className="flex items-center gap-4 p-4 rounded-3xl border border-transparent hover:bg-white/5 transition-all group cursor-pointer"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center shrink-0 border border-white/5 group-hover:bg-white/10 overflow-hidden transition-all">
                    {item.img ? (
                      <img src={item.img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                    ) : (
                      getIcon(item.icon, 24, "text-zinc-500 group-hover:text-white transition-colors")
                    )}
                  </div>
                  <div className="overflow-hidden text-left">
                    <span className="block text-[10px] text-zinc-600 font-black uppercase tracking-[0.2em] mb-1">{item.label}</span>
                    <span className="text-sm font-black truncate block text-zinc-400 group-hover:text-white transition-colors">
                      {item.val.replace('https://', '').split('/')[0]}
                    </span>
                  </div>
                </a>
              ))}
            </div>
          </div>
          <div className="mt-12 flex flex-col md:flex-row justify-between items-center text-[10px] text-zinc-500 font-bold uppercase tracking-[0.25em] gap-6 relative z-10">
            <p>{CONFIG.footer.copyright}</p>
            <div className="flex gap-8">
              {CONFIG.footer.legal.map(l => (
                <a key={l.label} href={l.href} className="hover:text-white transition-colors border-b border-transparent hover:border-white/20 pb-0.5">
                  {l.label}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
};

export default App;
