import React, { useState, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage, useT } from './i18n.jsx';
import { 
  Shield, 
  Thermometer, 
  Zap, 
  Cpu, 
  Battery, 
  Wind, 
  Activity, 
  ChevronRight, 
  Menu, 
  X,
  Crosshair,
  Anchor,
  Globe,
  ArrowRight,
  ArrowLeft,
  MapPin,
  Mail,
  Phone,
  Hammer,
  Layers,
  Snowflake
} from 'lucide-react';

// --- 动画组件 ---
const Reveal = ({ children, className = "", delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out transform ${
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-12"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

// --- 详情页组件 ---

const TechPage = ({ onBack }) => {
  const t = useT();
  const featureIcons = [
    <Shield className="text-orange-500 w-10 h-10"/>,
    <Layers className="text-blue-500 w-10 h-10"/>,
    <Snowflake className="text-slate-200 w-10 h-10"/>,
    <Wind className="text-orange-500 w-10 h-10"/>,
    <Zap className="text-yellow-500 w-10 h-10"/>,
  ];
  const features = t.techPage.features;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.backHome}
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.techPage.title}</h1>
           <p className="text-slate-400">{t.techPage.sub}</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           {features.map((f, i) => (
             <div key={i} className="bg-slate-900 border border-white/10 p-8 hover:border-orange-500/50 transition-all group">
               <div className="flex justify-between items-start mb-6">
                 {featureIcons[i]}
                 <span className="text-xs font-mono text-slate-600">0{i+1}</span>
               </div>
               <h3 className="text-2xl font-bold text-white mb-2">{f.title}</h3>
               <div className="text-xs text-orange-500 font-bold uppercase tracking-widest mb-4">{f.sub}</div>
               <p className="text-slate-400 leading-relaxed">{f.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </div>
  );
};

const ProductPage = ({ onBack }) => {
  const t = useT();
  const productNames = ["Blade", "Ranger", "Aegis", "Polaris"];
  const productImgs = ["/blade.jpg", "/ranger.jpg", "/aegis.jpg", "/polaris.jpg"];
  const products = t.productPage.items.map((p, i) => ({
    ...p,
    name: productNames[i],
    img: productImgs[i],
  }));

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.backHome}
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.productPage.title}</h1>
           <p className="text-slate-400">{t.productPage.sub}</p>
        </div>

        <div className="space-y-12">
          {products.map((p, i) => (
            <div key={i} className="bg-slate-900 border border-white/10 grid md:grid-cols-2 overflow-hidden hover:border-orange-500/30 transition-all">
              <div className="h-64 md:h-auto relative">
                <img 
                  src={p.img} 
                  alt={p.name} 
                  className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
                  onError={(e) => { e.target.style.display='none'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-transparent to-transparent md:bg-gradient-to-t"></div>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold text-white">{p.name}</h2>
                  <span className="text-xl text-slate-500">{p.cn}</span>
                </div>
                <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6">{p.tag}</div>
                <ul className="grid grid-cols-2 gap-4 mb-6">
                  {p.specs.map((s, idx) => (
                    <li key={idx} className="bg-slate-950 px-3 py-2 text-xs text-slate-300 border border-white/5 flex items-center">
                      <div className="w-1 h-1 bg-orange-500 rounded-full mr-2"></div>{s}
                    </li>
                  ))}
                </ul>
                <p className="text-slate-400 leading-relaxed text-sm">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ScenarioPage = ({ onBack }) => {
  const t = useT();
  const sectionMeta = [
    {
      border: "border-orange-500",
      icon: <Crosshair className="text-orange-500"/>,
      img: "https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=military%20border%20patrol%20in%20mountainous%20area%20with%20advanced%20equipment%2C%20high%20altitude%2C%20extreme%20environment%2C%20professional%20soldiers%2C%20tactical%20gear%2C%20dramatic%20lighting%2C%20cinematic%20shot&image_size=landscape_16_9",
      alt: "Border Patrol",
    },
    {
      border: "border-blue-500",
      icon: <Anchor className="text-blue-500"/>,
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop",
      alt: "Rescue",
    },
  ];

  return (
    <div className="min-h-screen bg-black pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.backHome}
        </button>
        <div className="mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t.scenarioPage.title}</h1>
           <p className="text-slate-400">{t.scenarioPage.sub}</p>
        </div>

        <div className="grid gap-16">
          {t.scenarioPage.sections.map((sec, i) => (
            <div key={i} className={`relative border-l-2 ${sectionMeta[i].border} pl-8 py-4`}>
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                {sectionMeta[i].icon} {sec.title}
              </h2>
              <div className="grid md:grid-cols-2 gap-12">
                <div className="text-slate-400 leading-relaxed space-y-6 text-sm md:text-base">
                  {sec.items.map((item, j) => (
                    <div key={j}>
                      <strong className="text-white block mb-2">{item.name}</strong>
                      <p>{item.desc}</p>
                    </div>
                  ))}
                </div>
                <div className="h-64 md:h-auto bg-slate-900 rounded-sm overflow-hidden border border-white/10">
                   <img src={sectionMeta[i].img} className="w-full h-full object-cover opacity-60" alt={sectionMeta[i].alt}/>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ onBack }) => {
  const t = useT();
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="max-w-4xl w-full relative z-10">
        <button onClick={onBack} className="absolute -top-16 left-0 flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> {t.backHome}
        </button>

        <div className="flex justify-center mb-8">
          <div className="inline-block p-4 bg-orange-500/10 rounded-full">
             <Globe className="w-12 h-12 text-orange-500" />
          </div>
        </div>

        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-8 md:p-12 text-center relative overflow-hidden group hover:border-orange-500/30 transition-all">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">{t.contactPage.title}</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-10 text-lg">
            {t.contactPage.desc1}
          </p>

          <div className="grid gap-6 text-left max-w-3xl mx-auto">
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <MapPin className="text-orange-500 w-5 h-5 shrink-0"/>
                <h3 className="text-white font-bold">{t.contactPage.addressTitle}</h3>
              </div>
              <p className="text-slate-400 text-sm whitespace-nowrap">{t.contactPage.address1}{t.contactPage.address2 && <> / {t.contactPage.address2}</>}</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Mail className="text-orange-500 w-5 h-5 shrink-0"/>
                <h3 className="text-white font-bold">{t.contactPage.emailTitle}</h3>
              </div>
              <p className="text-slate-400 text-sm whitespace-nowrap">{t.contactPage.email1} / {t.contactPage.email2}</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors text-center">
              <div className="flex items-center justify-center gap-3 mb-2">
                <Phone className="text-orange-500 w-5 h-5 shrink-0"/>
                <h3 className="text-white font-bold">{t.contactPage.phoneTitle}</h3>
              </div>
              <p className="text-slate-400 text-sm whitespace-nowrap">{t.contactPage.phone}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Navbar (全局导航) ---
const Navbar = ({ onNavigate }) => {
  const t = useT();
  const { lang, toggleLang } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page) => {
    onNavigate(page);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-slate-950/90 backdrop-blur-md py-4 border-b border-white/10' : 'bg-transparent py-6'}`}>
      <div className="max-w-screen-2xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2 group cursor-pointer select-none" onClick={() => handleNavClick('home')}>
          <div className="w-8 h-8 bg-orange-600 flex items-center justify-center transform group-hover:skew-x-12 transition-transform duration-300">
            <Zap className="text-white w-5 h-5" />
          </div>
          <span className="text-2xl font-bold text-white tracking-tighter font-mono">
            EVERPEAK<span className="text-orange-500">.</span>
          </span>
        </div>

        <div className="hidden md:flex gap-10 text-sm font-medium tracking-widest uppercase text-slate-300">
          <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors relative group py-2">{t.nav.home}</button>
          <button onClick={() => handleNavClick('tech')} className="hover:text-white transition-colors relative group py-2">{t.nav.tech}</button>
          <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors relative group py-2">{t.nav.products}</button>
          <button onClick={() => handleNavClick('scenarios')} className="hover:text-white transition-colors relative group py-2">{t.nav.scenarios}</button>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <button onClick={toggleLang} className="flex items-center gap-2 px-3 py-2 border border-white/20 text-white text-xs font-bold tracking-widest hover:border-orange-500 hover:text-orange-500 transition-all uppercase group">
            <Globe className="w-4 h-4" /> {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <button onClick={() => handleNavClick('contact')} className="flex items-center gap-2 px-5 py-2 border border-white/20 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all uppercase group">
            {t.nav.contact} <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/>
          </button>
        </div>

        <div className="md:hidden flex items-center gap-3 text-white">
          <button onClick={toggleLang} className="flex items-center gap-1 text-xs font-bold tracking-widest border border-white/20 px-2 py-1 hover:text-orange-500 transition-colors">
            <Globe className="w-4 h-4" /> {lang === 'zh' ? 'EN' : '中文'}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      <div className={`absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
         <div className="flex flex-col p-6 gap-6">
            <button onClick={() => handleNavClick('home')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">{t.nav.home}</button>
            <button onClick={() => handleNavClick('tech')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">{t.nav.tech}</button>
            <button onClick={() => handleNavClick('products')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">{t.nav.products}</button>
            <button onClick={() => handleNavClick('scenarios')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">{t.nav.scenarios}</button>
            <button onClick={() => handleNavClick('contact')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">{t.nav.contact}</button>
         </div>
      </div>
    </nav>
  );
};

// --- 主页板块 ---

const Hero = ({ }) => {
  const t = useT();
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      {/* ⚠️ 核心修改：使用内联样式直接加载 public 文件夹的图片 */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-40 grayscale mix-blend-luminosity transform hover:scale-105 transition-transform duration-[20s]"
        style={{ backgroundImage: "url('/hero-bg.jpg')" }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="relative z-10 max-w-screen-2xl mx-auto px-6 text-center pt-20">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">{t.hero.badge}</span>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-none">
            {t.hero.title1}<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">{t.hero.title2}</span>
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            {t.hero.desc1}
            <br className="hidden md:block"/>
            {t.hero.desc2}
          </p>
        </Reveal>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-md hidden lg:block">
        <div className="max-w-screen-2xl mx-auto px-6 py-8 flex justify-between divide-x divide-white/10">
           {t.hero.stats.map((stat, i) => (
             <div key={i} className="flex-1 text-center group cursor-default">
               <div className="text-3xl font-bold text-white mb-1 group-hover:text-orange-500 transition-colors font-mono">{stat.value}</div>
               <div className="text-xs text-slate-500 uppercase tracking-widest font-bold">{stat.label}</div>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
};

const PainPoints = () => {
  const t = useT();
  const pointIcons = [
    { icon: <Activity className="w-8 h-8 text-red-500" />, borderColor: "group-hover:border-red-500/50" },
    { icon: <Thermometer className="w-8 h-8 text-blue-500" />, borderColor: "group-hover:border-blue-500/50" },
    { icon: <Battery className="w-8 h-8 text-yellow-500" />, borderColor: "group-hover:border-yellow-500/50" }
  ];
  const points = t.pain.points;
  return (
    <section className="py-24 bg-slate-900 border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <div><h2 className="text-3xl font-bold text-white flex items-center gap-4"><span className="w-2 h-8 bg-orange-600"></span> {t.pain.title}</h2></div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className={`bg-slate-800/50 p-8 h-full relative group border border-white/5 ${pointIcons[idx].borderColor} transition-all duration-500 hover:bg-slate-800`}>
                <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{pointIcons[idx].icon}</div>
                <div className="mt-12">
                  <h3 className="text-xl font-bold text-white mb-4">{p.title}</h3>
                  <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">{p.desc}</p>
                </div>
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-white/30 to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-700"></div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Technology = ({ onNavigate }) => {
  const t = useT();
  return (
    <section id="核心技术" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-full bg-slate-900/50 -skew-x-12 transform translate-x-1/3 pointer-events-none"></div>
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase block mb-4">{t.tech.eyebrow}</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">{t.tech.title}</h2>
            <p className="text-slate-400 mb-8">
              {t.tech.desc}
            </p>
            <button onClick={() => onNavigate('tech')} className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 hover:bg-white/10 hover:border-orange-500 transition-all group">
              {t.tech.cta} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
            </button>
          </Reveal>
        </div>
        <div className="grid md:grid-cols-12 gap-6 h-auto md:h-[500px]">
          <div className="md:col-span-7 h-full">
            <Reveal className="h-full">
              <div className="bg-gradient-to-br from-slate-900 to-slate-950 border border-white/10 p-10 h-full flex flex-col justify-between group hover:border-orange-500/30 transition-all duration-500 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-10 opacity-5 group-hover:opacity-10 transition-opacity"><Shield className="w-48 h-48" /></div>
                <div>
                  <Shield className="w-12 h-12 text-orange-500 mb-8" />
                  <h3 className="text-3xl font-bold text-white mb-4">{t.tech.cardTitle}</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                    {t.tech.cardDesc1}
                    <br/>
                    {t.tech.cardDesc2}
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">{t.tech.tags.map((tag, i) => (<div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium"><div className="w-1.5 h-1.5 bg-orange-500"></div>{tag}</div>))}</div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 h-full">
            <Reveal delay={200} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Layers className="w-8 h-8 text-blue-500" /><span className="text-blue-500/20 text-4xl font-mono font-bold">01</span></div>
                <h3 className="text-xl font-bold text-white mb-2">{t.tech.multiTitle}</h3>
                <p className="text-sm text-slate-400">{t.tech.multiDesc}</p>
              </div>
            </Reveal>
            <Reveal delay={300} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Wind className="w-8 h-8 text-yellow-500" /><span className="text-yellow-500/20 text-4xl font-mono font-bold">02</span></div>
                <h3 className="text-xl font-bold text-white mb-2">{t.tech.lightTitle}</h3>
                <p className="text-sm text-slate-400">{t.tech.lightDesc}</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = ({ onNavigate }) => {
  const t = useT();
  // ⚠️ 注意：这里也使用了硬编码的 public 路径，请确保文件名一致
  const productIcons = [
    <Hammer className="w-5 h-5" />,
    <Crosshair className="w-5 h-5" />,
    <Shield className="w-5 h-5" />,
    <Snowflake className="w-5 h-5" />,
  ];
  const productNames = ["Blade", "Ranger", "Aegis", "Polaris"];
  const productImgs = ["/blade.jpg", "/ranger.jpg", "/aegis.jpg", "/polaris.jpg"];
  const products = t.products.items.map((p, i) => ({
    ...p,
    name: productNames[i],
    img: productImgs[i],
    icon: productIcons[i],
  }));
  return (
    <section id="产品矩阵" className="py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <Reveal>
          <div className="flex justify-between items-end mb-16">
            <div><h2 className="text-4xl font-bold text-white mb-2">{t.products.title}</h2><p className="text-slate-400">{t.products.sub}</p></div>
            <button onClick={() => onNavigate('products')} className="hidden md:flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase hover:text-white transition-colors">
              {t.products.cta} <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((item, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className="group relative h-[500px] overflow-hidden bg-slate-950 border border-slate-800 hover:border-orange-500/50 transition-all duration-500 flex flex-col">
                <div className="relative h-3/5 overflow-hidden">
                   <div className="absolute inset-0 bg-slate-900 z-0"></div>
                   <img 
                     src={item.img} 
                     alt={item.name} 
                     className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0"
                     onError={(e) => {e.target.style.display='none'; console.log('图片加载失败:', item.img)}} 
                   />
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                   <div className="absolute top-4 left-4 flex gap-2"><div className="px-3 py-1 bg-black/60 backdrop-blur border border-white/10 text-xs text-white uppercase tracking-wider font-bold flex items-center gap-2">{item.icon} {item.name}</div></div>
                </div>
                <div className="relative h-2/5 p-6 flex flex-col justify-between bg-slate-950 z-10">
                  <div>
                    <div className="flex flex-col gap-1 mb-3">
                      <h3 className="text-2xl font-bold text-white font-mono">{item.name}</h3>
                      <span className="text-slate-500 font-medium text-sm">{item.cnName}</span>
                    </div>
                    <div className="inline-block mb-3 text-orange-500 text-[10px] font-bold uppercase tracking-widest">{item.spec}</div>
                    <p className="text-slate-400 text-xs leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center"><span className="text-[10px] text-slate-600 font-mono">{t.products.series}</span><button className="text-white hover:text-orange-500 transition-colors"><ChevronRight className="w-5 h-5" /></button></div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
};

const Scenarios = ({ onNavigate }) => {
  const t = useT();
  return (
    <section id="应用场景" className="py-24 bg-black text-white relative">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">{t.scenarios.title}</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent mx-auto"></div>
            <button onClick={() => onNavigate('scenarios')} className="mt-8 text-slate-400 hover:text-white underline underline-offset-8 flex items-center justify-center gap-2 mx-auto">
              {t.scenarios.cta} <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
        <div className="space-y-32">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6 text-orange-500"><Crosshair className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">{t.scenarios.borderOps.label}</span></div>
                <h3 className="text-4xl font-bold mb-6">{t.scenarios.borderOps.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  {t.scenarios.borderOps.desc}
                </p>
                <div className="flex gap-6"><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">{t.scenarios.borderOps.stat1.label}</div><div className="text-sm text-slate-500 mt-1">{t.scenarios.borderOps.stat1.sub}</div></div><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">{t.scenarios.borderOps.stat2.label}</div><div className="text-sm text-slate-500 mt-1">{t.scenarios.borderOps.stat2.sub}</div></div></div>
              </div>
              <div className="order-1 md:order-2 h-[400px] bg-slate-900 relative rounded-sm overflow-hidden border border-white/10 group">
                 <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=military%20border%20patrol%20in%20mountainous%20area%20with%20advanced%20equipment%2C%20high%20altitude%2C%20extreme%20environment%2C%20professional%20soldiers%2C%20tactical%20gear%2C%20dramatic%20lighting%2C%20cinematic%20shot&image_size=landscape_16_9" alt="Border Patrol" className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"/>
                 <div className="absolute inset-4 border border-white/20 border-dashed rounded-sm pointer-events-none"></div>
                 <div className="absolute top-8 right-8 text-xs font-mono text-orange-500">TARGET: OUTPOST</div>
              </div>
            </div>
          </Reveal>
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="h-[400px] bg-slate-900 relative rounded-sm overflow-hidden border border-white/10 group">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" alt="Arctic Rescue" className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"/>
                 <div className="absolute inset-4 border border-white/20 rounded-sm pointer-events-none"></div>
                 <div className="absolute bottom-8 left-8 text-xs font-mono text-blue-500">TEMP: -40°C</div>
              </div>
              <div>
                <div className="flex items-center gap-3 mb-6 text-blue-500"><Anchor className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">{t.scenarios.publicSafety.label}</span></div>
                <h3 className="text-4xl font-bold mb-6">{t.scenarios.publicSafety.title}</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  {t.scenarios.publicSafety.desc}
                </p>
                <ul className="space-y-4 text-slate-300"><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {t.scenarios.publicSafety.stat1.label}</li><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> {t.scenarios.publicSafety.stat2.label}</li></ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }) => {
  const t = useT();
  const { lang, toggleLang } = useLanguage();
  return (
    <footer id="关于我们" className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-600 flex items-center justify-center"><Zap className="text-white w-4 h-4" /></div>
              <span className="text-xl font-bold text-white tracking-tighter">EVERPEAK<span className="text-orange-500">.</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">{t.footer.about}</p>
            <div className="flex gap-4">
              <button onClick={toggleLang} className="w-auto h-10 px-3 rounded-sm bg-slate-900 border border-slate-800 flex items-center gap-2 text-slate-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all text-xs font-bold tracking-widest uppercase">
                <Globe className="w-4 h-4" /> {lang === 'zh' ? 'EN' : '中文'}
              </button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.footer.productsTitle}</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              {t.footer.productLinks.map((link, i) => (
                <li key={i}><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">{link}</button></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">{t.footer.contactTitle}</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              {t.footer.contactLinks.map((link, i) => (
                <li key={i}><button onClick={() => onNavigate('contact')} className="hover:text-orange-500 transition-colors text-left">{link}</button></li>
              ))}
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>{t.footer.copyright}</p>
          <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-wider font-bold">
            <a href="#" className="hover:text-slate-400">{t.footer.privacy}</a>
            <a href="#" className="hover:text-slate-400">{t.footer.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Home Container ---
const Home = ({ onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero />
      <PainPoints />
      <Technology onNavigate={onNavigate} />
      <Products onNavigate={onNavigate} />
      <Scenarios onNavigate={onNavigate} />
      <Footer onNavigate={onNavigate} />
    </div>
  );
};

// --- Main App Component ---
export default function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <LanguageProvider>
      <div className="font-sans antialiased bg-slate-950 text-slate-200 selection:bg-orange-500/30">
        <Navbar onNavigate={setCurrentPage} />
        
        {/* Page Routing */}
        {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
        {currentPage === 'tech' && <TechPage onBack={() => setCurrentPage('home')} />}
        {currentPage === 'products' && <ProductPage onBack={() => setCurrentPage('home')} />}
        {currentPage === 'scenarios' && <ScenarioPage onBack={() => setCurrentPage('home')} />}
        {currentPage === 'contact' && <ContactPage onBack={() => setCurrentPage('home')} />}
      </div>
    </LanguageProvider>
  );
}
