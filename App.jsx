import React, { useState, useEffect, useRef } from 'react';
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
  const features = [
    { 
      title: "原位固态化技术", 
      sub: "In-situ Solidification", 
      desc: "采用独特灌浆工艺，从本质上剔除'易燃基因'。通过枪击测试，无烟、无火、无爆燃，热失控触发温度提升至 350℃ 以上。", 
      icon: <Shield className="text-orange-500 w-10 h-10"/> 
    },
    { 
      title: "分离式多仓结构", 
      sub: "Separated Chambers", 
      desc: "借鉴军用模块化思想，物理隔离各电池组。单仓受损不影响整体供电，支持战地热插拔，无需返厂即可快速修复。", 
      icon: <Layers className="text-blue-500 w-10 h-10"/> 
    },
    { 
      title: "钠离子极寒科技", 
      sub: "Sodium-Ion Extreme", 
      desc: "专为极地设计，突破锂电低温禁区。在 -40℃ 环境下仍能正常充放电，告别低温死机。", 
      icon: <Snowflake className="text-slate-200 w-10 h-10"/> 
    },
    { 
      title: "极致轻量化", 
      sub: "High Density", 
      desc: "能量密度达 270Wh/kg。同等电量下重量仅为竞品的 60% (约 7kg/kWh)，极大减轻单兵负重。", 
      icon: <Wind className="text-orange-500 w-10 h-10"/> 
    },
    { 
      title: "纯净正弦波", 
      sub: "Pure Sine Wave", 
      desc: "充放电效率 >92%，输出比市电更纯净的交流电。完美适配呼吸机、精密通讯台、排爆机器人等敏感设备。", 
      icon: <Zap className="text-yellow-500 w-10 h-10"/> 
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">核心技术详解</h1>
           <p className="text-slate-400">CORE TECHNOLOGY & INNOVATION</p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8">
           {features.map((f, i) => (
             <div key={i} className="bg-slate-900 border border-white/10 p-8 hover:border-orange-500/50 transition-all group">
               <div className="flex justify-between items-start mb-6">
                 {f.icon}
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
  const products = [
    {
      name: "Blade", cn: "利刃系列", tag: "手持/六合一",
      specs: ["功能: 应急搭电/充气/破窗", "核心: 钠电 -40℃ 瞬启", "定位: 单兵生存工具箱"],
      desc: "类似大号充电宝的单兵全能终端。集成了2000流明探照灯、智能充气泵、强力鼓风机（生火/除尘）及真空压缩功能。支持12V车辆零电压启动，特警/巡逻/越野必备。",
      img: "/blade.jpg" 
    },
    {
      name: "Ranger", cn: "游骑兵系列", tag: "单兵/无人机",
      specs: ["容量: 1500Wh+ (双仓)", "功率: 3600W (峰值)", "重量: ~7kg/kWh"],
      desc: "特种作战与应急救援的轻骑兵。双电池仓设计，AC+DC 双路快充（1小时80%）。轻松驱动电镐、破拆工具及大功率微波电台，支持边充边用。",
      img: "/ranger.jpg"
    },
    {
      name: "Aegis", cn: "神盾系列", tag: "基地/指挥所",
      specs: ["单元: 16kWh 模块化", "扩容: max 80kWh", "切换: <20ms UPS级"],
      desc: "像搭积木一样构建战地能源中心。单模块<22kg，两人小组即可徒手部署。支持光伏接入构建离网微电网，保障方舱医院、指挥大屏不间断运行。",
      img: "/aegis.jpg"
    },
    {
      name: "Polaris", cn: "极光系列", tag: "极地/高海拔",
      specs: ["温域: -40℃ ~ +70℃", "防护: 高盐雾/防爆", "定制: 异形结构"],
      desc: "征服地球两极的能源心脏。专为海拔5000米+哨所及深井煤矿定制。特殊的灌封与温控策略，确保在风雪夜也能为红外雷达、监控设备持续供电。",
      img: "/polaris.jpg"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">全系产品矩阵</h1>
           <p className="text-slate-400">PRODUCT MATRIX & SPECIFICATIONS</p>
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
  return (
    <div className="min-h-screen bg-black pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-screen-xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">实战体系应用</h1>
           <p className="text-slate-400">MISSION SCENARIOS</p>
        </div>

        <div className="grid gap-16">
          <div className="relative border-l-2 border-orange-500 pl-8 py-4">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Crosshair className="text-orange-500"/> 边防与特种作战
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-slate-400 leading-relaxed space-y-6 text-sm md:text-base">
                <div>
                  <strong className="text-white block mb-2">高海拔无人哨所 (Polaris)</strong>
                  <p>解决 5000米+ 高海拔及 -40℃ 极寒导致普通电池失效问题。配合柔性光伏板，为红外雷达、监控补盲提供全天候供电。</p>
                </div>
                <div>
                  <strong className="text-white block mb-2">破门突击与排爆 (Ranger)</strong>
                  <p>为电动液压破门工具提供 3600W 强劲动力。纯净正弦波交流电确保排爆机器人精准操作，静音特性保障隐蔽接敌。</p>
                </div>
                <div>
                  <strong className="text-white block mb-2">雪地巡逻保障 (Blade)</strong>
                  <p>巡逻队标配。利用钠电低温瞬启能力激活趴窝载具，智能充气泵随时调整雪地车胎压。</p>
                </div>
              </div>
              <div className="h-64 md:h-auto bg-slate-900 rounded-sm overflow-hidden border border-white/10">
                 <img src="https://trae-api-cn.mchost.guru/api/ide/v1/text_to_image?prompt=military%20border%20patrol%20in%20mountainous%20area%20with%20advanced%20equipment%2C%20high%20altitude%2C%20extreme%20environment%2C%20professional%20soldiers%2C%20tactical%20gear%2C%20dramatic%20lighting%2C%20cinematic%20shot&image_size=landscape_16_9" className="w-full h-full object-cover opacity-60" alt="Border Patrol"/>
              </div>
            </div>
          </div>

          <div className="relative border-l-2 border-blue-500 pl-8 py-4">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Anchor className="text-blue-500"/> 公共安全与应急救援
            </h2>
            <div className="grid md:grid-cols-2 gap-12">
              <div className="text-slate-400 leading-relaxed space-y-6 text-sm md:text-base">
                <div>
                  <strong className="text-white block mb-2">铁骑巡逻与安保 (Blade/Aegis)</strong>
                  <p>Blade 手持电支持事故现场强光照明与破窗救援。Aegis 为临时安检门、人脸识别闸机供电，无需布线，即摆即用。</p>
                </div>
                <div>
                  <strong className="text-white block mb-2">地震废墟搜救 (Ranger)</strong>
                  <p>提供医疗级纯净电源，确保生命探测仪读数精准。静音运行避免噪音掩盖幸存者的微弱呼救声。</p>
                </div>
                <div>
                  <strong className="text-white block mb-2">前线指挥部搭建 (Aegis)</strong>
                  <p>模块化系统三人小组 5分钟 内搭建完毕，保障卫星便携站与指挥大屏供电，实现“断网断电，指挥不断”。</p>
                </div>
              </div>
              <div className="h-64 md:h-auto bg-slate-900 rounded-sm overflow-hidden border border-white/10">
                 <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="Rescue"/>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ContactPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-slate-950 to-slate-950 pointer-events-none"></div>
      <div className="max-w-4xl w-full relative z-10">
        <button onClick={onBack} className="absolute -top-16 left-0 flex items-center gap-2 text-slate-400 hover:text-orange-500 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>

        <div className="bg-slate-900/50 backdrop-blur-md border border-white/10 p-12 md:p-20 text-center relative overflow-hidden group hover:border-orange-500/30 transition-all">
          <div className="inline-block p-4 bg-orange-500/10 rounded-full mb-8">
             <Globe className="w-12 h-12 text-orange-500" />
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">联系我们</h1>
          <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
            恒耐锐能 (EverPeak) 随时准备为您提供国防级能源解决方案。<br/>
            期待与您的合作。
          </p>

          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors">
              <MapPin className="text-orange-500 mb-4 w-6 h-6"/>
              <h3 className="text-white font-bold mb-2">公司地址</h3>
              <p className="text-slate-400 text-sm">北京市海淀区<br/>高新科技园 A 座</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors">
              <Mail className="text-orange-500 mb-4 w-6 h-6"/>
              <h3 className="text-white font-bold mb-2">电子邮箱</h3>
              <p className="text-slate-400 text-sm">contact@everpeak.com<br/>support@everpeak.com</p>
            </div>
            <div className="p-6 bg-slate-950 border border-white/5 hover:border-orange-500/50 transition-colors">
              <Phone className="text-orange-500 mb-4 w-6 h-6"/>
              <h3 className="text-white font-bold mb-2">联系电话</h3>
              <p className="text-slate-400 text-sm">+86 10 8888 6666<br/>(Mon-Fri, 9am-6pm)</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// --- Navbar (全局导航) ---
const Navbar = ({ onNavigate }) => {
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
          <button onClick={() => handleNavClick('home')} className="hover:text-white transition-colors relative group py-2">首页</button>
          <button onClick={() => handleNavClick('tech')} className="hover:text-white transition-colors relative group py-2">核心技术</button>
          <button onClick={() => handleNavClick('products')} className="hover:text-white transition-colors relative group py-2">产品矩阵</button>
          <button onClick={() => handleNavClick('scenarios')} className="hover:text-white transition-colors relative group py-2">应用场景</button>
        </div>

        <button onClick={() => handleNavClick('contact')} className="hidden md:flex items-center gap-2 px-5 py-2 border border-white/20 text-white text-xs font-bold tracking-widest hover:bg-white hover:text-black transition-all uppercase group">
          联系我们 <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform"/>
        </button>

        <button className="md:hidden text-white" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X /> : <Menu />}
        </button>
      </div>

      <div className={`absolute top-full left-0 w-full bg-slate-950 border-b border-white/10 overflow-hidden transition-all duration-300 ${mobileOpen ? 'max-h-96' : 'max-h-0'}`}>
         <div className="flex flex-col p-6 gap-6">
            <button onClick={() => handleNavClick('home')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">首页</button>
            <button onClick={() => handleNavClick('tech')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">核心技术</button>
            <button onClick={() => handleNavClick('products')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">产品矩阵</button>
            <button onClick={() => handleNavClick('scenarios')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">应用场景</button>
            <button onClick={() => handleNavClick('contact')} className="text-slate-300 hover:text-orange-500 font-bold text-lg text-left">联系我们</button>
         </div>
      </div>
    </nav>
  );
};

// --- 主页板块 ---

const Hero = ({ }) => {
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
            <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Safe · Cold · Portable</span>
          </div>
        </Reveal>
        <Reveal delay={200}>
          <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight mb-8 leading-none">
            全天候<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">移动能源先锋</span>
          </h1>
        </Reveal>
        <Reveal delay={400}>
          <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 leading-relaxed font-light">
            国防级安全与极端环境下的移动能源解决方案。
            <br className="hidden md:block"/>
            打破 -40°C 低温禁区，确保关键任务万无一失。
          </p>
        </Reveal>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-md hidden lg:block">
        <div className="max-w-screen-2xl mx-auto px-6 py-8 flex justify-between divide-x divide-white/10">
           {[
             { label: "运行温域", value: "-40°C ~ +70°C", sub: "极寒/酷热" }, 
             { label: "安全等级", value: "350°C+", sub: "枪击/针刺不燃" }, 
             { label: "能量密度", value: "270Wh/kg", sub: "CTB 轻量集成" }, 
             { label: "波形质量", value: "纯净正弦波", sub: "医疗级输出" }
           ].map((stat, i) => (
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
  const points = [
    { title: "安全危机", desc: "液态电解质热失控不可控，在战区或密闭空间是巨大隐患。", icon: <Activity className="w-8 h-8 text-red-500" />, borderColor: "group-hover:border-red-500/50" },
    { title: "低温瘫痪", desc: "-20°C 时传统磷酸铁锂几乎无法放电，极寒环境导致仪表盘归零。", icon: <Thermometer className="w-8 h-8 text-blue-500" />, borderColor: "group-hover:border-blue-500/50" },
    { title: "补能瓶颈", desc: "充电时间长、能量密度低，难以满足快速部署与高机动性需求。", icon: <Battery className="w-8 h-8 text-yellow-500" />, borderColor: "group-hover:border-yellow-500/50" }
  ];
  return (
    <section className="py-24 bg-slate-900 border-b border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <Reveal>
          <div className="flex items-end justify-between mb-16">
            <div><h2 className="text-3xl font-bold text-white flex items-center gap-4"><span className="w-2 h-8 bg-orange-600"></span> 传统能源的“致命短板”</h2></div>
          </div>
        </Reveal>
        <div className="grid md:grid-cols-3 gap-6">
          {points.map((p, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className={`bg-slate-800/50 p-8 h-full relative group border border-white/5 ${p.borderColor} transition-all duration-500 hover:bg-slate-800`}>
                <div className="absolute top-6 right-6 opacity-30 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500">{p.icon}</div>
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
  return (
    <section id="核心技术" className="py-28 bg-slate-950 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[600px] h-full bg-slate-900/50 -skew-x-12 transform translate-x-1/3 pointer-events-none"></div>
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase block mb-4">Core Technology</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">定义“全天候”移动能源</h2>
            <p className="text-slate-400 mb-8">
              不仅仅是充电宝。通过固态电池（安防底线）与钠离子电池（耐寒先锋）的结合，重新定义能源安全标准。
            </p>
            <button onClick={() => onNavigate('tech')} className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 hover:bg-white/10 hover:border-orange-500 transition-all group">
              查看核心技术详解 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
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
                  <h3 className="text-3xl font-bold text-white mb-4">原位固态化 + 钠电</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed max-w-md">
                    自研电解质涂覆技术，消除液态溢漏与自燃风险。
                    <br/>
                    突破 -40°C 物理瓶颈，且原材料成本降低 30% 以上。
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-4">{['针刺不冒烟', '挤压不爆炸', '350℃热失控', '耐寒先锋'].map((tag, i) => (<div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium"><div className="w-1.5 h-1.5 bg-orange-500"></div>{tag}</div>))}</div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 h-full">
            <Reveal delay={200} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Layers className="w-8 h-8 text-blue-500" /><span className="text-blue-500/20 text-4xl font-mono font-bold">01</span></div>
                <h3 className="text-xl font-bold text-white mb-2">分离式多仓结构</h3>
                <p className="text-sm text-slate-400">单仓受损不影响整体，支持战地热插拔与无需返厂修复。</p>
              </div>
            </Reveal>
            <Reveal delay={300} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Wind className="w-8 h-8 text-yellow-500" /><span className="text-yellow-500/20 text-4xl font-mono font-bold">02</span></div>
                <h3 className="text-xl font-bold text-white mb-2">CTB 极致轻量化</h3>
                <p className="text-sm text-slate-400">同等电量重量仅为竞品 60%，极大减轻单兵与设备负重。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = ({ onNavigate }) => {
  // ⚠️ 注意：这里也使用了硬编码的 public 路径，请确保文件名一致
  const products = [
    { name: "Blade", cnName: "利刃系列", spec: "手持 | 六合一", desc: "类似大号充电宝的单兵全能终端。集成了探照灯、充气泵、鼓风机及破窗功能。", img: "/blade.jpg", icon: <Hammer className="w-5 h-5" /> },
    { name: "Ranger", cnName: "游骑兵系列", spec: "双仓 | 3600W", desc: "特种作战与应急救援的轻骑兵。AC+DC 双路快充，轻松驱动电镐与破拆工具。", img: "/ranger.jpg", icon: <Crosshair className="w-5 h-5" /> },
    { name: "Aegis", cnName: "神盾系列", spec: "模块化 | UPS级", desc: "像搭积木一样构建战地能源中心。两人小组徒手部署，保障指挥大屏不间断。", img: "/aegis.jpg", icon: <Shield className="w-5 h-5" /> },
    { name: "Polaris", cnName: "极光系列", spec: "-40℃ | 高盐雾", desc: "征服两极的能源心脏。专为海拔5000米+哨所及深井煤矿定制，无惧风雪。", img: "/polaris.jpg", icon: <Snowflake className="w-5 h-5" /> }
  ];
  return (
    <section id="产品矩阵" className="py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <Reveal>
          <div className="flex justify-between items-end mb-16">
            <div><h2 className="text-4xl font-bold text-white mb-2">全场景产品矩阵</h2><p className="text-slate-400">从单兵手持到基地中枢，全系覆盖。</p></div>
            <button onClick={() => onNavigate('products')} className="hidden md:flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase hover:text-white transition-colors">
              查看全系产品详解 <ArrowRight className="w-4 h-4"/>
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
                  <div className="pt-4 border-t border-white/5 flex justify-between items-center"><span className="text-[10px] text-slate-600 font-mono">SERIES 2026</span><button className="text-white hover:text-orange-500 transition-colors"><ChevronRight className="w-5 h-5" /></button></div>
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
  return (
    <section id="应用场景" className="py-24 bg-black text-white relative">
      <div className="max-w-screen-2xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">实战体系应用</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent mx-auto"></div>
            <button onClick={() => onNavigate('scenarios')} className="mt-8 text-slate-400 hover:text-white underline underline-offset-8 flex items-center justify-center gap-2 mx-auto">
              浏览详细战术场景 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
        <div className="space-y-32">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6 text-orange-500"><Crosshair className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">Border & Ops</span></div>
                <h3 className="text-4xl font-bold mb-6">边防与特种作战</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  解决高海拔哨所及极寒环境下电池失效问题。为电动破门工具、排爆机器人提供强劲纯净动力，静音隐蔽，保障战术突击成功率。
                </p>
                <div className="flex gap-6"><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">Silent</div><div className="text-sm text-slate-500 mt-1">静音接敌</div></div><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">High Alt</div><div className="text-sm text-slate-500 mt-1">5000米+</div></div></div>
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
                <div className="flex items-center gap-3 mb-6 text-blue-500"><Anchor className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">Public Safety</span></div>
                <h3 className="text-4xl font-bold mb-6">公共安全与应急</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">
                  从铁骑巡逻的便携启动，到地震废墟中的生命探测供电。模块化系统可由三人小组在 5 分钟内搭建前线指挥部，实现“断网断电，指挥不断”。
                </p>
                <ul className="space-y-4 text-slate-300"><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 车辆零压启动</li><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 医疗级纯净电源</li></ul>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

const Footer = ({ onNavigate }) => {
  return (
    <footer id="关于我们" className="bg-slate-950 pt-24 pb-12 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-6 h-6 bg-orange-600 flex items-center justify-center"><Zap className="text-white w-4 h-4" /></div>
              <span className="text-xl font-bold text-white tracking-tighter">EVERPEAK<span className="text-orange-500">.</span></span>
            </div>
            <p className="text-slate-500 max-w-sm mb-8 leading-relaxed">我们不只是制造电池，我们在守护安全与生命。让安全能源触达地球每一处角落。<br/>国防级安全与极端环境下的移动能源先锋。</p>
            <div className="flex gap-4">
              <button className="w-10 h-10 rounded-sm bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white hover:border-orange-500 hover:bg-orange-500 transition-all"><Globe className="w-4 h-4" /></button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">产品系列</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Blade 利刃系列</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Ranger 游骑兵系列</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Aegis 神盾系列</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Polaris 极光系列</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-8 uppercase tracking-widest text-sm">联系我们</h4>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><button onClick={() => onNavigate('contact')} className="hover:text-orange-500 transition-colors text-left">北京市海淀区高新科技园</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-orange-500 transition-colors text-left">contact@everpeak.com</button></li>
              <li><button onClick={() => onNavigate('contact')} className="hover:text-orange-500 transition-colors text-left">+86 10 8888 6666</button></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-slate-600">
          <p>© 2026 EverPeak Energy Technology Co., Ltd. All Rights Reserved.</p>
          <div className="flex gap-8 mt-4 md:mt-0 uppercase tracking-wider font-bold">
            <a href="#" className="hover:text-slate-400">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400">Terms of Service</a>
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
    <div className="font-sans antialiased bg-slate-950 text-slate-200 selection:bg-orange-500/30">
      <Navbar onNavigate={setCurrentPage} />
      
      {/* Page Routing */}
      {currentPage === 'home' && <Home onNavigate={setCurrentPage} />}
      {currentPage === 'tech' && <TechPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'products' && <ProductPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'scenarios' && <ScenarioPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'contact' && <ContactPage onBack={() => setCurrentPage('home')} />}
    </div>
  );
}