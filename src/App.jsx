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
  Bot,
  Terminal,
  Loader2,
  ArrowLeft,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

// --- API 配置 ---
// 注意：部署时如果您有 API Key，请填入下面的引号中，或者配置环境变量
const apiKey = ""; 

// --- 动画组件: 滚动渐入效果 ---
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

// --- AI 战术规划终端组件 ---
const MissionPlanner = ({ isOpen, onClose }) => {
  const [step, setStep] = useState('input'); // input, loading, result
  const [formData, setFormData] = useState({
    temp: -20,
    duration: 24,
    equipment: '',
    missionType: '侦察'
  });
  const [analysis, setAnalysis] = useState('');

  const handleGenerate = async () => {
    if (!formData.equipment) return;
    
    setStep('loading');
    
    const prompt = `
      你是一个EverPeak (恒耐锐能) 的战术能源官。请根据以下用户输入的任务参数生成一份战术能源配置简报。
      
      【任务参数】
      - 任务类型: ${formData.missionType}
      - 环境温度: ${formData.temp}°C
      - 任务时长: ${formData.duration}小时
      - 携带设备: ${formData.equipment}

      【已知产品库】
      1. Ranger (游骑兵): 2kWh, 便携, 单兵/无人机用.
      2. Aegis (神盾): 10kWh, 固态防爆, 指挥所/医疗用.
      3. Polaris (极光): 5kWh, 钠电, 极寒专用 (-40°C稳定运行).

      【要求】
      1. 风格：军事简报风格，硬核、简洁、专业。
      2. 逻辑：
         - 如果温度低于 -20°C，强制推荐 Polaris 系列。
         - 根据设备耗电量估算推荐 Ranger 或 Aegis 的数量。
      3. 输出格式：
         - 🟢 [能源评估]: (简短分析)
         - 🛡️ [推荐配置]: (具体产品型号及数量)
         - ⚠️ [战术建议]: (针对环境和任务的建议)
      
      请直接输出内容，不要寒暄。
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text || "通讯受阻，无法连接战术主机。";
      setAnalysis(text);
      setStep('result');
    } catch (error) {
      console.error("API Error", error);
      setAnalysis("系统错误：连接超时。请检查网络或重试。");
      setStep('result');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      {/* 背景遮罩 */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* 终端窗口 */}
      <div className="relative w-full max-w-2xl bg-slate-900 border border-orange-500/30 rounded-sm shadow-2xl shadow-orange-900/20 overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* 顶部栏 */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950 border-b border-orange-500/30">
          <div className="flex items-center gap-2 text-orange-500">
            <Terminal className="w-4 h-4" />
            <span className="font-mono text-sm font-bold tracking-widest uppercase">Tactical Energy Planner v2.0 ✨</span>
          </div>
          <button onClick={onClose} className="text-slate-500 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 内容区 */}
        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
          
          {step === 'input' && (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="grid md:grid-cols-2 gap-6">
                 <div className="space-y-2">
                   <label className="text-xs text-orange-500/80 font-bold uppercase tracking-wider">任务类型 / Mission Type</label>
                   <select 
                     className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 text-sm focus:border-orange-500 outline-none transition-colors"
                     value={formData.missionType}
                     onChange={(e) => setFormData({...formData, missionType: e.target.value})}
                   >
                     <option>前线侦察 (Recon)</option>
                     <option>基地防卫 (Defense)</option>
                     <option>极地科考 (Arctic)</option>
                     <option>紧急救援 (Rescue)</option>
                   </select>
                 </div>
                 
                 <div className="space-y-2">
                   <label className="text-xs text-orange-500/80 font-bold uppercase tracking-wider">环境温度 / Temp ({formData.temp}°C)</label>
                   <input 
                     type="range" 
                     min="-50" 
                     max="50" 
                     value={formData.temp}
                     onChange={(e) => setFormData({...formData, temp: e.target.value})}
                     className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                   />
                   <div className="flex justify-between text-xs text-slate-500 font-mono">
                     <span>-50°C</span>
                     <span>0°C</span>
                     <span>+50°C</span>
                   </div>
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-xs text-orange-500/80 font-bold uppercase tracking-wider">任务时长 / Duration ({formData.duration} Hours)</label>
                 <input 
                   type="range" 
                   min="1" 
                   max="72" 
                   value={formData.duration}
                   onChange={(e) => setFormData({...formData, duration: e.target.value})}
                   className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-orange-500"
                 />
              </div>

              <div className="space-y-2">
                <label className="text-xs text-orange-500/80 font-bold uppercase tracking-wider">携带设备清单 / Equipment Loadout</label>
                <textarea 
                  className="w-full bg-slate-950 border border-slate-700 text-slate-200 p-3 text-sm focus:border-orange-500 outline-none transition-colors h-24 resize-none"
                  placeholder="例如：2架M300无人机，1台军用笔记本，3套单兵电台，加热帐篷..."
                  value={formData.equipment}
                  onChange={(e) => setFormData({...formData, equipment: e.target.value})}
                ></textarea>
              </div>

              <button 
                onClick={handleGenerate}
                disabled={!formData.equipment}
                className="w-full py-4 bg-orange-600 hover:bg-orange-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group"
              >
                <Bot className="w-5 h-5" /> 生成战术方案 (Generate) ✨
              </button>
            </div>
          )}

          {step === 'loading' && (
            <div className="flex flex-col items-center justify-center py-12 space-y-4">
              <Loader2 className="w-12 h-12 text-orange-500 animate-spin" />
              <div className="text-orange-500 font-mono text-sm animate-pulse">ANALYZING MISSION DATA...</div>
              <div className="w-64 h-1 bg-slate-800 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 animate-progress"></div>
              </div>
            </div>
          )}

          {step === 'result' && (
            <div className="animate-in fade-in zoom-in-95 duration-500">
              <div className="mb-6 border-l-2 border-orange-500 pl-4">
                <h3 className="text-white font-bold text-lg mb-1">战术能源简报</h3>
                <p className="text-slate-500 text-xs font-mono">MISSION ID: {Math.floor(Math.random() * 999999)}</p>
              </div>
              
              <div className="bg-slate-950/50 p-6 border border-white/5 rounded-sm font-mono text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {analysis}
              </div>

              <div className="mt-8 flex gap-4">
                <button 
                  onClick={() => setStep('input')}
                  className="flex-1 py-3 border border-slate-600 text-slate-300 hover:border-white hover:text-white transition-all uppercase text-xs font-bold tracking-wider"
                >
                  重新规划
                </button>
                <button 
                  onClick={onClose}
                  className="flex-1 py-3 bg-white text-black hover:bg-slate-200 transition-all uppercase text-xs font-bold tracking-wider"
                >
                  确认方案
                </button>
              </div>
            </div>
          )}

        </div>
        
        {/* 底部装饰 */}
        <div className="h-1 bg-gradient-to-r from-orange-600/50 via-orange-500 to-orange-600/50"></div>
      </div>
    </div>
  );
};

// --- NEW PAGE COMPONENTS ---

// 1. Tech Page (Feature Summary)
const TechPage = ({ onBack }) => {
  const features = [
    { title: "绝对安全", sub: "Absolute Safety", desc: "针刺不冒烟，挤压不爆炸。采用先进固态/半固态工艺，彻底消除液态电解质热失控风险。", icon: <Shield className="text-orange-500 w-10 h-10"/> },
    { title: "极限耐寒", sub: "Extreme Cold", desc: "突破 -40°C 放电瓶颈。钠离子化学体系结合自研电解质，在极地环境中依然稳定供电。", icon: <Thermometer className="text-blue-500 w-10 h-10"/> },
    { title: "轻量集成", sub: "Lightweight", desc: "CTB (Cell to Body) 技术使同体积能量密度提升 25%，轻便易携带，专为单兵设计。", icon: <Wind className="text-slate-400 w-10 h-10"/> },
    { title: "智能寿命", sub: "AI-BMS", desc: "基于大数据模型的 AI-BMS，精准预测电芯状态，将循环寿命延长 40% 以上。", icon: <Cpu className="text-orange-500 w-10 h-10"/> },
    { title: "高效转化", sub: "GaN Inverter", desc: "GaN 氮化镓逆变技术，功率密度提升 3 倍，体积缩小 25%，散热效率更佳。", icon: <Zap className="text-yellow-500 w-10 h-10"/> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-5xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">产品核心特点总结</h1>
           <p className="text-slate-400">CORE PRODUCT FEATURES SUMMARY</p>
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

// 2. Product Page (Product Matrix Detail)
const ProductPage = ({ onBack }) => {
  const products = [
    {
      name: "Ranger", cn: "游骑兵", tag: "单兵/无人机",
      specs: ["容量: 0.5-2kWh", "重量: <5kg", "防护: IP67"],
      desc: "轻量化设计，快速回血，专为特种单兵与侦察设备打造。支持背包携带，模块化接口适配多种军用设备。",
      img: "https://images.unsplash.com/photo-1595159676778-9ee2f37c768f?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Aegis", cn: "神盾", tag: "指挥所/医疗",
      specs: ["容量: 4-12kWh", "特性: 固态防爆", "输出: 3000W"],
      desc: "极致安全，固态电芯确保在密闭空间内零风险运行。为前线指挥所、野战医院提供不间断的电力保障。",
      img: "https://images.unsplash.com/photo-1623126909289-980b6a22b7a4?q=80&w=2070&auto=format&fit=crop"
    },
    {
      name: "Polaris", cn: "极光", tag: "极地/高海拔",
      specs: ["温域: -40°C ~ 60°C", "化学: 钠离子", "循环: 5000+"],
      desc: "无惧极寒，在冰原与高海拔哨所提供稳定的生命保障能源。特殊的保温结构与自加热算法，确保严寒下瞬间启动。",
      img: "https://images.unsplash.com/photo-1457365050282-c53d772ef8b2?q=80&w=2070&auto=format&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-950 pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-12">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">全系产品种类介绍</h1>
           <p className="text-slate-400">PRODUCT MATRIX & SPECIFICATIONS</p>
        </div>

        <div className="space-y-12">
          {products.map((p, i) => (
            <div key={i} className="bg-slate-900 border border-white/10 grid md:grid-cols-2 overflow-hidden hover:border-orange-500/30 transition-all">
              <div className="h-64 md:h-auto relative">
                <img src={p.img} alt={p.name} className="absolute inset-0 w-full h-full object-cover grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-700"/>
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="flex items-center gap-4 mb-2">
                  <h2 className="text-3xl font-bold text-white">{p.name}</h2>
                  <span className="text-xl text-slate-500">{p.cn}</span>
                </div>
                <div className="text-orange-500 font-bold text-xs uppercase tracking-widest mb-6">{p.tag}</div>
                <ul className="flex flex-wrap gap-4 mb-6">
                  {p.specs.map((s, idx) => (
                    <li key={idx} className="bg-slate-950 px-3 py-1 text-xs text-slate-300 border border-white/5">{s}</li>
                  ))}
                </ul>
                <p className="text-slate-400 leading-relaxed">{p.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// 3. Scenario Page (Use Cases Detail)
const ScenarioPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-black pt-24 px-6 animate-in fade-in slide-in-from-right-8 duration-500">
      <div className="max-w-6xl mx-auto">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-8 transition-colors group">
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" /> 返回主页
        </button>
        <div className="mb-16">
           <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">应用场景详情</h1>
           <p className="text-slate-400">MISSION SCENARIOS</p>
        </div>

        <div className="grid gap-12">
          {/* Military */}
          <div className="relative border-l-2 border-orange-500 pl-8 py-4">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Crosshair className="text-orange-500"/> 国防与特种领域
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-slate-400 leading-relaxed space-y-4">
                <p><strong className="text-white">军事隐蔽：</strong> 无噪音、零红外特征运行，替代燃油发电机，降低被敌方侦测的风险。</p>
                <p><strong className="text-white">无人系统：</strong> 为长航时侦察无人机、地面巡逻机器人提供高能量密度动力源。</p>
                <p><strong className="text-white">边防前哨：</strong> 解决高海拔哨所燃料运输困难问题，提供全天候生活与通信电力保障。</p>
              </div>
              <img src="https://images.unsplash.com/photo-1542256851-9678818cc3f4?q=80&w=2070&auto=format&fit=crop" className="rounded-sm opacity-60 border border-white/10" alt="Military"/>
            </div>
          </div>

          {/* Rescue */}
          <div className="relative border-l-2 border-blue-500 pl-8 py-4">
            <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
              <Anchor className="text-blue-500"/> 应急救援与科考
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="text-slate-400 leading-relaxed space-y-4">
                <p><strong className="text-white">应急医疗：</strong> 确保呼吸机、精密除颤仪在断电时刻实现 UPS 级 0ms 衔接，守护生命线。</p>
                <p><strong className="text-white">灾害现场：</strong> 配合柔性太阳能板，在地震废墟中快速建立能源中心，支持救援设备运行。</p>
                <p><strong className="text-white">极地科考：</strong> 支撑寒区测量仪器的全季节作业，无惧极夜与风雪。</p>
              </div>
              <img src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=2070&auto=format&fit=crop" className="rounded-sm opacity-60 border border-white/10" alt="Rescue"/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// 4. Contact Page
const ContactPage = ({ onBack }) => {
  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-6 animate-in fade-in slide-in-from-bottom-8 duration-500 relative overflow-hidden">
      {/* Background Decor */}
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

// --- Navbar (Updated with Navigation Props) ---
const Navbar = ({ onOpenPlanner, onNavigate }) => {
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
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
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
          <button onClick={onOpenPlanner} className="hover:text-white transition-colors flex items-center gap-1 text-orange-400 group">
             <Bot className="w-4 h-4 group-hover:rotate-12 transition-transform"/> AI 规划
          </button>
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
            <button onClick={() => { setMobileOpen(false); onOpenPlanner(); }} className="text-orange-500 font-bold text-lg flex items-center gap-2 text-left">
              <Bot className="w-5 h-5"/> AI 战术规划
            </button>
         </div>
      </div>
    </nav>
  );
};

// --- Home Components (Updated with onNavigate) ---

const Hero = ({ onOpenPlanner }) => {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden bg-slate-950">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519574164893-a9ae34b3e346?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-40 grayscale mix-blend-luminosity transform hover:scale-105 transition-transform duration-[20s]"></div>
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"></div>
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)', backgroundSize: '50px 50px' }}></div>
      <div className="relative z-10 max-w-7xl mx-auto px-6 text-center pt-20">
        <Reveal>
          <div className="inline-flex items-center gap-3 px-4 py-1.5 border border-orange-500/30 bg-orange-500/10 backdrop-blur-sm mb-8">
            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse shadow-[0_0_10px_rgba(249,115,22,0.8)]"></span>
            <span className="text-orange-400 text-xs font-bold tracking-[0.2em] uppercase">Defense Grade Power</span>
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
            打破锂电极限。在 <span className="text-white font-semibold">-40°C</span> 极寒与战区环境下，为关键任务提供永不枯竭的动力保障。
          </p>
        </Reveal>
        <Reveal delay={600}>
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
            <button onClick={onOpenPlanner} className="w-full md:w-auto px-10 py-4 bg-orange-600 hover:bg-orange-700 text-white font-bold tracking-widest uppercase transition-all flex items-center justify-center gap-2 group shadow-lg shadow-orange-900/20">
              <Bot className="w-5 h-5" /> 启动 AI 战术规划 ✨
            </button>
            <button className="w-full md:w-auto px-10 py-4 border border-white/20 hover:bg-white/5 text-white font-bold tracking-widest uppercase transition-all backdrop-blur-sm">
              技术白皮书
            </button>
          </div>
        </Reveal>
      </div>
      <div className="absolute bottom-0 left-0 w-full border-t border-white/10 bg-slate-900/80 backdrop-blur-md hidden lg:block">
        <div className="max-w-7xl mx-auto px-6 py-8 flex justify-between divide-x divide-white/10">
           {[{ label: "运行温域", value: "-40°C ~ 60°C", sub: "全天候适应" }, { label: "安全等级", value: "MIL-STD", sub: "0 热失控" }, { label: "能量密度", value: "+25%", sub: "CTB 集成技术" }, { label: "循环寿命", value: "4000+", sub: "AI-BMS 优化" }].map((stat, i) => (
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
    { title: "安全危机", desc: "传统液态电解质热失控不可控，在战区或密闭空间是巨大隐患。", icon: <Activity className="w-8 h-8 text-red-500" />, borderColor: "group-hover:border-red-500/50" },
    { title: "低温瘫痪", desc: "-20°C 时传统磷酸铁锂几乎无法放电，导致设备在极寒环境瞬间失效。", icon: <Thermometer className="w-8 h-8 text-blue-500" />, borderColor: "group-hover:border-blue-500/50" },
    { title: "补能瓶颈", desc: "充电时间长、能量密度低，难以满足快速部署与高机动性需求。", icon: <Battery className="w-8 h-8 text-yellow-500" />, borderColor: "group-hover:border-yellow-500/50" }
  ];
  return (
    <section className="py-24 bg-slate-900 border-b border-white/5">
      <div className="max-w-7xl mx-auto px-6">
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-20 max-w-2xl">
          <Reveal>
            <span className="text-orange-500 font-bold tracking-[0.2em] text-sm uppercase block mb-4">Core Technology</span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">定义“全天候”移动能源</h2>
            <p className="text-slate-400 mb-8">通过固态电池与钠离子电池的混合架构，结合军工级 AI-BMS，重新定义能源的安全与耐用边界。</p>
            {/* Added Button */}
            <button onClick={() => onNavigate('tech')} className="flex items-center gap-2 text-white border border-white/20 px-6 py-3 hover:bg-white/10 hover:border-orange-500 transition-all group">
              查看技术特点总结 <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform"/>
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
                  <h3 className="text-3xl font-bold text-white mb-4">固态 + 钠电混合体系</h3>
                  <p className="text-slate-400 mb-8 leading-relaxed max-w-md">自研电解质涂覆技术，消除液态溢漏与自燃风险。<br/>突破 -40°C 物理瓶颈，原材料成本降低 30% 以上。</p>
                </div>
                <div className="grid grid-cols-2 gap-4">{['针刺不冒烟', '挤压不爆炸', 'CTB 集成', '耐寒先锋'].map((tag, i) => (<div key={i} className="flex items-center gap-3 text-slate-300 text-sm font-medium"><div className="w-1.5 h-1.5 bg-orange-500"></div>{tag}</div>))}</div>
              </div>
            </Reveal>
          </div>
          <div className="md:col-span-5 flex flex-col gap-6 h-full">
            <Reveal delay={200} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Cpu className="w-8 h-8 text-blue-500" /><span className="text-blue-500/20 text-4xl font-mono font-bold">01</span></div>
                <h3 className="text-xl font-bold text-white mb-2">AI-BMS 智能中枢</h3>
                <p className="text-sm text-slate-400">基于大数据模型，精准预测电芯状态，将循环寿命延长 40% 以上。</p>
              </div>
            </Reveal>
            <Reveal delay={300} className="flex-1">
              <div className="bg-slate-900 border border-white/10 p-8 h-full group hover:bg-slate-800 transition-all flex flex-col justify-center">
                <div className="flex justify-between items-start mb-4"><Zap className="w-8 h-8 text-yellow-500" /><span className="text-yellow-500/20 text-4xl font-mono font-bold">02</span></div>
                <h3 className="text-xl font-bold text-white mb-2">GaN 氮化镓逆变</h3>
                <p className="text-sm text-slate-400">功率密度提升 3 倍，体积缩小 25%。模块化设计支持战场快速更换。</p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

const Products = ({ onNavigate }) => {
  const products = [
    { name: "Ranger", cnName: "游骑兵", spec: "0.5-2kWh | 便携式", desc: "专为特种单兵与侦察设备打造。轻量化设计，支持背包携带，快速战场回血。", img: "https://images.unsplash.com/photo-1595159676778-9ee2f37c768f?q=80&w=2070&auto=format&fit=crop", icon: <Crosshair className="w-5 h-5" /> },
    { name: "Aegis", cnName: "神盾", spec: "4-12kWh | 固态防爆", desc: "医疗方舱与前线指挥所专用。极致安全，固态电芯确保在密闭空间内零风险运行。", img: "https://images.unsplash.com/photo-1623126909289-980b6a22b7a4?q=80&w=2070&auto=format&fit=crop", icon: <Shield className="w-5 h-5" /> },
    { name: "Polaris", cnName: "极光", spec: "钠电特种款 | -40°C", desc: "极地科考与高海拔哨所专用。无惧极寒，在冰原环境中提供稳定的生命保障能源。", img: "https://images.unsplash.com/photo-1457365050282-c53d772ef8b2?q=80&w=2070&auto=format&fit=crop", icon: <Wind className="w-5 h-5" /> }
  ];
  return (
    <section id="产品矩阵" className="py-24 bg-slate-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <Reveal>
          <div className="flex justify-between items-end mb-16">
            <div><h2 className="text-4xl font-bold text-white mb-2">全场景产品矩阵</h2><p className="text-slate-400">从单兵作战到前线方舱，覆盖所有能源需求。</p></div>
            {/* Updated Link to Button */}
            <button onClick={() => onNavigate('products')} className="hidden md:flex items-center gap-2 text-orange-500 font-bold text-sm tracking-widest uppercase hover:text-white transition-colors">
              查看全系产品详解 <ArrowRight className="w-4 h-4"/>
            </button>
          </div>
        </Reveal>
        <div className="grid lg:grid-cols-3 gap-8">
          {products.map((item, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div className="group relative h-[550px] overflow-hidden bg-slate-950 border border-slate-800 hover:border-orange-500/50 transition-all duration-500 flex flex-col">
                <div className="relative h-3/5 overflow-hidden">
                   <div className="absolute inset-0 bg-slate-900 z-0"></div>
                   <img src={item.img} alt={item.name} className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-80 transition-all duration-700 grayscale group-hover:grayscale-0"/>
                   <div className="absolute inset-0 bg-gradient-to-t from-slate-950 to-transparent"></div>
                   <div className="absolute top-4 left-4 flex gap-2"><div className="px-3 py-1 bg-black/60 backdrop-blur border border-white/10 text-xs text-white uppercase tracking-wider font-bold flex items-center gap-2">{item.icon} {item.name}</div></div>
                </div>
                <div className="relative h-2/5 p-8 flex flex-col justify-between bg-slate-950 z-10">
                  <div>
                    <div className="flex items-baseline gap-3 mb-2"><h3 className="text-3xl font-bold text-white font-mono">{item.name}</h3><span className="text-slate-500 font-medium text-sm">{item.cnName}</span></div>
                    <div className="inline-block mb-4 text-orange-500 text-xs font-bold uppercase tracking-widest">{item.spec}</div>
                    <p className="text-slate-400 text-sm leading-relaxed line-clamp-3">{item.desc}</p>
                  </div>
                  <div className="pt-6 border-t border-white/5 flex justify-between items-center"><span className="text-xs text-slate-600 font-mono">SERIES 2024</span><button className="text-white hover:text-orange-500 transition-colors"><ChevronRight className="w-6 h-6" /></button></div>
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
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <Reveal>
          <div className="text-center mb-20">
            <h2 className="text-3xl font-bold mb-4">关键时刻的隐形保障</h2>
            <div className="w-24 h-1 bg-gradient-to-r from-orange-600 to-transparent mx-auto"></div>
            {/* Added Button */}
            <button onClick={() => onNavigate('scenarios')} className="mt-8 text-slate-400 hover:text-white underline underline-offset-8 flex items-center justify-center gap-2 mx-auto">
              浏览应用场景库 <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </Reveal>
        <div className="space-y-32">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="order-2 md:order-1">
                <div className="flex items-center gap-3 mb-6 text-orange-500"><Crosshair className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">Defense Application</span></div>
                <h3 className="text-4xl font-bold mb-6">国防与特种领域</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">无噪音、零红外特征运行，完美替代传统燃油发电机。为侦察无人机、地面巡逻机器人提供长效动力，保障高海拔哨所全天候通信。</p>
                <div className="flex gap-6"><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">Silent</div><div className="text-sm text-slate-500 mt-1">极致静音</div></div><div className="pl-4 border-l-2 border-orange-500"><div className="font-bold text-xl text-white">No Heat</div><div className="text-sm text-slate-500 mt-1">零红外特征</div></div></div>
              </div>
              <div className="order-1 md:order-2 h-[400px] bg-slate-900 relative rounded-sm overflow-hidden border border-white/10 group">
                 <img src="https://images.unsplash.com/photo-1542256851-9678818cc3f4?q=80&w=2070&auto=format&fit=crop" alt="Military Drone" className="w-full h-full object-cover opacity-50 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700"/>
                 <div className="absolute inset-4 border border-white/20 border-dashed rounded-sm pointer-events-none"></div>
                 <div className="absolute top-8 right-8 text-xs font-mono text-orange-500">TARGET: ACQUIRED</div>
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
                <div className="flex items-center gap-3 mb-6 text-blue-500"><Anchor className="w-6 h-6" /><span className="font-bold uppercase tracking-[0.2em] text-sm">Rescue & Science</span></div>
                <h3 className="text-4xl font-bold mb-6">应急救援与科考</h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-lg">生命通道的能量基石。确保呼吸机、精密除颤仪在断电时刻 UPS 级衔接。配合柔性太阳能板，在废墟中建立能源中心。</p>
                <ul className="space-y-4 text-slate-300"><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> UPS 级 0ms 切换</li><li className="flex items-center gap-3"><div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div> 极地科考全季节作业</li></ul>
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
      <div className="max-w-7xl mx-auto px-6">
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
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Ranger 游骑兵 (单兵)</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Aegis 神盾 (指挥所)</button></li>
              <li><button onClick={() => onNavigate('products')} className="hover:text-orange-500 transition-colors">Polaris 极光 (极地)</button></li>
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
          <p>© 2024 EverPeak Energy Technology Co., Ltd. All Rights Reserved.</p>
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
const Home = ({ onOpenPlanner, onNavigate }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <Hero onOpenPlanner={onOpenPlanner} />
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
  const [plannerOpen, setPlannerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="font-sans antialiased bg-slate-950 text-slate-200 selection:bg-orange-500/30">
      <Navbar onOpenPlanner={() => setPlannerOpen(true)} onNavigate={setCurrentPage} />
      
      {/* Page Routing */}
      {currentPage === 'home' && <Home onOpenPlanner={() => setPlannerOpen(true)} onNavigate={setCurrentPage} />}
      {currentPage === 'tech' && <TechPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'products' && <ProductPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'scenarios' && <ScenarioPage onBack={() => setCurrentPage('home')} />}
      {currentPage === 'contact' && <ContactPage onBack={() => setCurrentPage('home')} />}
      
      {/* Modal - Always available */}
      <MissionPlanner isOpen={plannerOpen} onClose={() => setPlannerOpen(false)} />
    </div>
  );
}