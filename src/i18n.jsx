import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext(null);

export const translations = {
  zh: {
    backHome: "返回主页",
    nav: {
      home: "首页",
      tech: "核心技术",
      products: "产品矩阵",
      scenarios: "应用场景",
      contact: "联系我们",
    },
    hero: {
      badge: "Safe · Cold · Portable",
      title1: "全天候",
      title2: "移动能源先锋",
      desc1: "国防级安全与极端环境下的移动能源解决方案。",
      desc2: "打破 -40°C 低温禁区，确保关键任务万无一失。",
      stats: [
        { label: "运行温域", value: "-40°C ~ +70°C", sub: "极寒/酷热" },
        { label: "安全等级", value: "350°C+", sub: "枪击/针刺不燃" },
        { label: "能量密度", value: "270Wh/kg", sub: "CTB 轻量集成" },
        { label: "波形质量", value: "纯净正弦波", sub: "医疗级输出" },
      ],
    },
    pain: {
      title: "传统能源的“致命短板”",
      points: [
        { title: "安全危机", desc: "液态电解质热失控不可控，在战区或密闭空间是巨大隐患。" },
        { title: "低温瘫痪", desc: "-20°C 时传统磷酸铁锂几乎无法放电，极寒环境导致仪表盘归零。" },
        { title: "补能瓶颈", desc: "充电时间长、能量密度低，难以满足快速部署与高机动性需求。" },
      ],
    },
    tech: {
      eyebrow: "Core Technology",
      title: "定义“全天候”移动能源",
      desc: "不仅仅是充电宝。通过固态电池（安防底线）与钠离子电池（耐寒先锋）的结合，重新定义能源安全标准。",
      cta: "查看核心技术详解",
      cardTitle: "原位固态化 + 钠电",
      cardDesc1: "自研电解质涂覆技术，消除液态溢漏与自燃风险。",
      cardDesc2: "突破 -40°C 物理瓶颈，且原材料成本降低 30% 以上。",
      tags: ["针刺不冒烟", "挤压不爆炸", "350℃热失控", "耐寒先锋"],
      multiTitle: "分离式多仓结构",
      multiDesc: "单仓受损不影响整体，支持战地热插拔与无需返厂修复。",
      lightTitle: "CTB 极致轻量化",
      lightDesc: "同等电量重量仅为竞品 60%，极大减轻单兵与设备负重。",
    },
    products: {
      title: "全场景产品矩阵",
      sub: "从单兵手持到基地中枢，全系覆盖。",
      cta: "查看全系产品详解",
      series: "SERIES 2026",
      items: [
        { cnName: "利刃系列", spec: "手持 | 六合一", desc: "类似大号充电宝的单兵全能终端。集成了探照灯、充气泵、鼓风机及破窗功能。" },
        { cnName: "游骑兵系列", spec: "双仓 | 4000W", desc: "特种作战与应急救援的轻骑兵。AC+DC 双路快充，轻松驱动电镐与破拆工具。" },
        { cnName: "神盾系列", spec: "模块化 | UPS级", desc: "像搭积木一样构建战地能源中心。两人小组徒手部署，保障指挥大屏不间断。" },
        { cnName: "极光系列", spec: "-40℃ | 高盐雾", desc: "征服两极的能源心脏。专为海拔5000米+哨所及深井煤矿定制，无惧风雪。" },
      ],
    },
    scenarios: {
      title: "实战体系应用",
      cta: "浏览详细战术场景",
      borderOps: {
        label: "Border & Ops",
        title: "边防与特种作战",
        desc: "解决高海拔哨所及极寒环境下电池失效问题。为电动破门工具、排爆机器人提供强劲纯净动力，静音隐蔽，保障战术突击成功率。",
        stat1: { label: "Silent", sub: "静音接敌" },
        stat2: { label: "High Alt", sub: "5000米+" },
      },
      publicSafety: {
        label: "Public Safety",
        title: "公共安全与应急",
        desc: "从铁骑巡逻的便携启动，到地震废墟中的生命探测供电。模块化系统可由三人小组在 5 分钟内搭建前线指挥部，实现“断网断电，指挥不断”。",
        stat1: { label: "车辆零压启动" },
        stat2: { label: "医疗级纯净电源" },
      },
    },
    footer: {
      about: "我们不只是制造电池，我们在守护安全与生命。让安全能源触达地球每一处角落。国防级安全与极端环境下的移动能源先锋。",
      productsTitle: "产品系列",
      contactTitle: "联系我们",
      productLinks: ["Blade 利刃系列", "Ranger 游骑兵系列", "Aegis 神盾系列", "Polaris 极光系列"],
      contactLinks: ["北京海淀国家网络安全产业园3号楼", "contact@everpeak-energy.com", "+86 15510007407"],
      copyright: "© 2026 EverPeak Energy Technology Co., Ltd. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    techPage: {
      title: "核心技术详解",
      sub: "CORE TECHNOLOGY & INNOVATION",
      features: [
        { title: "原位固态化技术", sub: "In-situ Solidification", desc: "采用独特灌浆工艺，从本质上剔除“易燃基因”。通过枪击测试，无烟、无火、无爆燃，热失控触发温度提升至 350℃ 以上。" },
        { title: "分离式多仓结构", sub: "Separated Chambers", desc: "借鉴军用模块化思想，物理隔离各电池组。单仓受损不影响整体供电，支持战地热插拔，无需返厂即可快速修复。" },
        { title: "钠离子极寒科技", sub: "Sodium-Ion Extreme", desc: "专为极地设计，突破锂电低温禁区。在 -40℃ 环境下仍能正常充放电，告别低温死机。" },
        { title: "极致轻量化", sub: "High Density", desc: "能量密度达 270Wh/kg。同等电量下重量仅为竞品的 60% (约 7kg/kWh)，极大减轻单兵负重。" },
        { title: "纯净正弦波", sub: "Pure Sine Wave", desc: "充放电效率 >92%，输出比市电更纯净的交流电。完美适配呼吸机、精密通讯台、排爆机器人等敏感设备。" },
      ],
    },
    productPage: {
      title: "全系产品矩阵",
      sub: "PRODUCT MATRIX & SPECIFICATIONS",
      items: [
        { cn: "利刃系列", tag: "手持/六合一", specs: ["功能: 应急搭电/充气/破窗", "核心: 应急搭电", "定位: 单兵生存工具箱"], desc: "类似大号充电宝的单兵全能终端。集成了2000流明探照灯、智能充气泵、强力鼓风机（生火/除尘）及真空压缩功能。支持12V车辆零电压启动，特警/巡逻/越野必备。" },
        { cn: "游骑兵系列", tag: "单兵/无人机", specs: ["容量: 1500Wh+ (双仓)", "功率: 4000W (峰值)", "重量: ~7kg/kWh"], desc: "特种作战与应急救援的轻骑兵。双电池仓设计，AC+DC 双路快充（1小时80%）。轻松驱动电镐、破拆工具及大功率微波电台，支持边充边用。" },
        { cn: "神盾系列", tag: "基地/指挥所", specs: ["单元: 16kWh 模块化", "扩容: max 80kWh", "切换: <20ms UPS级"], desc: "像搭积木一样构建战地能源中心。单模块<22kg，两人小组即可徒手部署。支持光伏接入构建离网微电网，保障方舱医院、指挥大屏不间断运行。" },
        { cn: "极光系列", tag: "极地/高海拔", specs: ["温域: -40℃ ~ +70℃", "防护: 高盐雾/防爆", "定制: 异形结构"], desc: "征服地球两极的能源心脏。专为海拔5000米+哨所及深井煤矿定制。特殊的灌封与温控策略，确保在风雪夜也能为红外雷达、监控设备持续供电。" },
      ],
    },
    scenarioPage: {
      title: "实战体系应用",
      sub: "MISSION SCENARIOS",
      sections: [
        {
          label: "Border & Ops",
          title: "边防与特种作战",
          items: [
            { name: "高海拔无人哨所 (Polaris)", desc: "解决 5000米+ 高海拔及 -40℃ 极寒导致普通电池失效问题。配合柔性光伏板，为红外雷达、监控补盲提供全天候供电。" },
            { name: "破门突击与排爆 (Ranger)", desc: "为电动液压破门工具提供 4000W 强劲动力。纯净正弦波交流电确保排爆机器人精准操作，静音特性保障隐蔽接敌。" },
            { name: "雪地巡逻保障 (Blade)", desc: "巡逻队标配。利用钠电低温瞬启能力激活趴窝载具，智能充气泵随时调整雪地车胎压。" },
          ],
        },
        {
          label: "Public Safety",
          title: "公共安全与应急救援",
          items: [
            { name: "铁骑巡逻与安保 (Blade/Aegis)", desc: "Blade 手持电支持事故现场强光照明与破窗救援。Aegis 为临时安检门、人脸识别闸机供电，无需布线，即摆即用。" },
            { name: "地震废墟搜救 (Ranger)", desc: "提供医疗级纯净电源，确保生命探测仪读数精准。静音运行避免噪音掩盖幸存者的微弱呼救声。" },
            { name: "前线指挥部搭建 (Aegis)", desc: "模块化系统三人小组 5分钟 内搭建完毕，保障卫星便携站与指挥大屏供电，实现“断网断电，指挥不断”。" },
          ],
        },
      ],
    },
    contactPage: {
      title: "联系我们",
      desc1: "恒耐锐能 (EverPeak) 随时准备为您提供国防级能源解决方案",
      addressTitle: "公司地址",
      address1: "北京海淀国家网络安全产业园3号楼",
      address2: "",
      emailTitle: "电子邮箱",
      email1: "contact@everpeak-energy.com",
      email2: "support@everpeak-energy.com",
      phoneTitle: "联系电话",
      phone: "+86 15510007407",
    },
  },
  en: {
    backHome: "Back to Home",
    nav: {
      home: "Home",
      tech: "Core Technology",
      products: "Products",
      scenarios: "Scenarios",
      contact: "Contact Us",
    },
    hero: {
      badge: "Safe · Cold · Portable",
      title1: "All-Weather",
      title2: "Mobile Energy Pioneer",
      desc1: "Defense-grade safety and mobile energy solutions for extreme environments.",
      desc2: "Breaking the -40°C cold barrier to keep critical missions on track.",
      stats: [
        { label: "Operating Range", value: "-40°C ~ +70°C", sub: "Extreme cold & heat" },
        { label: "Safety Rating", value: "350°C+", sub: "Bullet & nail-proof" },
        { label: "Energy Density", value: "270Wh/kg", sub: "CTB lightweight" },
        { label: "Waveform Quality", value: "Pure Sine Wave", sub: "Medical-grade" },
      ],
    },
    pain: {
      title: "The “Fatal Flaws” of Conventional Energy",
      points: [
        { title: "Safety Crisis", desc: "Uncontrollable thermal runaway of liquid electrolytes is a major hazard in combat zones or confined spaces." },
        { title: "Cold Paralysis", desc: "At -20°C, conventional LFP batteries can barely discharge, leaving systems dead in extreme cold." },
        { title: "Charging Bottleneck", desc: "Long charging times and low energy density fall short of rapid deployment and high mobility needs." },
      ],
    },
    tech: {
      eyebrow: "Core Technology",
      title: "Defining All-Weather Mobile Energy",
      desc: "More than a power bank. By combining solid-state batteries (the safety benchmark) with sodium-ion batteries (the cold-weather pioneer), we redefine energy safety standards.",
      cta: "Explore Core Technology",
      cardTitle: "In-situ Solidification + Sodium-Ion",
      cardDesc1: "Self-developed electrolyte coating eliminates leakage and self-ignition risks.",
      cardDesc2: "Breaks the -40°C physical barrier while cutting raw material costs by over 30%.",
      tags: ["Nail-proof, no smoke", "Crush-proof, no explosion", "350°C thermal runaway", "Cold-weather pioneer"],
      multiTitle: "Separated Multi-Chamber Design",
      multiDesc: "Damage to one chamber never affects the whole. Field hot-swap support with no factory repair needed.",
      lightTitle: "CTB Ultra-Lightweight",
      lightDesc: "Weighs only 60% of competitors at equal capacity, drastically reducing the burden on operators and equipment.",
    },
    products: {
      title: "All-Scenario Product Matrix",
      sub: "From individual soldier handhelds to base command hubs — full coverage.",
      cta: "View Full Product Line",
      series: "SERIES 2026",
      items: [
        { cnName: "Blade Series", spec: "Handheld | 6-in-1", desc: "A personal all-in-one terminal resembling a power bank. Integrates searchlight, air pump, blower, and window-breaker." },
        { cnName: "Ranger Series", spec: "Dual-chamber | 4000W", desc: "The light cavalry for special operations and emergency rescue. Dual AC+DC fast charging powers breakers and demolition tools with ease." },
        { cnName: "Aegis Series", spec: "Modular | UPS-grade", desc: "Build a battlefield energy hub like building blocks. Deployable by a two-person team with uninterrupted power for command displays." },
        { cnName: "Polaris Series", spec: "-40℃ | Salt-spray", desc: "The energy heart that conquers the poles. Built for 5,000m+ outposts and deep mines, unafraid of snowstorms." },
      ],
    },
    scenarios: {
      title: "Real-World Mission Applications",
      cta: "Explore Detailed Tactical Scenarios",
      borderOps: {
        label: "Border & Ops",
        title: "Border Defense & Special Operations",
        desc: "Solves battery failure at high-altitude outposts and in extreme cold. Provides powerful, pure power for breaching tools and bomb-disposal robots — quiet and concealed for mission success.",
        stat1: { label: "Silent", sub: "Quiet approach" },
        stat2: { label: "High Alt", sub: "5,000m+" },
      },
      publicSafety: {
        label: "Public Safety",
        title: "Public Safety & Emergency Response",
        desc: "From portable jump-start for mounted patrols to powering life detectors in earthquake rubble. A modular system lets a three-person team set up a forward command post in 5 minutes — command continues even when the grid fails.",
        stat1: { label: "Zero-voltage vehicle start" },
        stat2: { label: "Medical-grade pure power" },
      },
    },
    footer: {
      about: "We don't just manufacture batteries — we protect safety and lives. Bringing secure energy to every corner of the planet. A defense-grade mobile energy pioneer for extreme environments.",
      productsTitle: "Products",
      contactTitle: "Contact",
      productLinks: ["Blade Series", "Ranger Series", "Aegis Series", "Polaris Series"],
      contactLinks: ["Building 3, National Cybersecurity Industry Park, Haidian, Beijing", "contact@everpeak-energy.com", "+86 15510007407"],
      copyright: "© 2026 EverPeak Energy Technology Co., Ltd. All Rights Reserved.",
      privacy: "Privacy Policy",
      terms: "Terms of Service",
    },
    techPage: {
      title: "Core Technology Explained",
      sub: "CORE TECHNOLOGY & INNOVATION",
      features: [
        { title: "In-situ Solidification", sub: "In-situ Solidification", desc: "A unique grouting process eliminates the “flammable gene” at the source. Passed bullet tests — no smoke, no fire, no deflagration. Thermal runaway trigger temperature raised above 350°C." },
        { title: "Separated Multi-Chamber Design", sub: "Separated Chambers", desc: "Inspired by military modular design, battery packs are physically isolated. Damage to one chamber never affects overall power, with field hot-swap for rapid repair without factory return." },
        { title: "Sodium-Ion Extreme Cold Tech", sub: "Sodium-Ion Extreme", desc: "Engineered for the poles, breaking lithium's cold limit. Full charge/discharge at -40°C — no more cold shutdowns." },
        { title: "Ultra-Lightweight", sub: "High Density", desc: "270Wh/kg energy density. At equal capacity, weighs only 60% of competitors (~7kg/kWh), greatly reducing operator burden." },
        { title: "Pure Sine Wave", sub: "Pure Sine Wave", desc: ">92% charge/discharge efficiency with cleaner AC output than the grid. Perfect for ventilators, precision communication stations, and bomb-disposal robots." },
      ],
    },
    productPage: {
      title: "Full Product Matrix",
      sub: "PRODUCT MATRIX & SPECIFICATIONS",
      items: [
        { cn: "Blade Series", tag: "Handheld / 6-in-1", specs: ["Functions: Jump-start / Inflate / Breach", "Core: Emergency jump-start", "Role: Individual survival toolbox"], desc: "A personal all-in-one terminal resembling a power bank. Integrates a 2000-lumen searchlight, smart air pump, high-power blower (fire-start/dust removal), and vacuum compression. Zero-voltage 12V vehicle start — essential for SWAT, patrol, and off-road." },
        { cn: "Ranger Series", tag: "Individual / UAV", specs: ["Capacity: 1500Wh+ (dual-chamber)", "Power: 4000W (peak)", "Weight: ~7kg/kWh"], desc: "The light cavalry for special operations and emergency rescue. Dual battery chambers with AC+DC dual fast charging (80% in 1 hour). Powers electric breakers, demolition tools, and high-power radio stations, with pass-through charging." },
        { cn: "Aegis Series", tag: "Base / Command Post", specs: ["Module: 16kWh modular", "Expansion: max 80kWh", "Switchover: <20ms UPS-grade"], desc: "Build a battlefield energy hub like building blocks. Each module weighs under 22kg and can be deployed by a two-person team. Supports PV input to build off-grid microgrids, keeping field hospitals and command displays running nonstop." },
        { cn: "Polaris Series", tag: "Polar / High Altitude", specs: ["Range: -40℃ ~ +70℃", "Protection: Salt-spray / Explosion-proof", "Custom: Non-standard shapes"], desc: "The energy heart that conquers the poles. Customized for 5,000m+ outposts and deep mines. Special potting and thermal control ensure continuous power for infrared radar and surveillance through blizzard nights." },
      ],
    },
    scenarioPage: {
      title: "Real-World Mission Applications",
      sub: "MISSION SCENARIOS",
      sections: [
        {
          label: "Border & Ops",
          title: "Border Defense & Special Operations",
          items: [
            { name: "High-Altitude Unmanned Outpost (Polaris)", desc: "Solves battery failure above 5,000m and at -40°C. Paired with flexible PV panels for 24/7 power to infrared radar and surveillance blind spots." },
            { name: "Door-Breaching Assault & EOD (Ranger)", desc: "Delivers 4000W of powerful drive for hydraulic breaching tools. Pure sine wave AC ensures precise bomb-robot operation, with quiet operation for concealed engagement." },
            { name: "Snow Patrol Support (Blade)", desc: "Standard for patrol teams. Uses sodium-ion low-temperature instant-start to revive stranded vehicles; smart air pump adjusts snowmobile tire pressure on the fly." },
          ],
        },
        {
          label: "Public Safety",
          title: "Public Safety & Emergency Rescue",
          items: [
            { name: "Mounted Patrol & Security (Blade/Aegis)", desc: "Blade handhelds provide high-intensity lighting and window-breaching rescue at accident scenes. Aegis powers temporary security gates and facial-recognition turnstiles without cabling — plug and play." },
            { name: "Earthquake Rubble Search & Rescue (Ranger)", desc: "Medical-grade pure power ensures precise life-detector readings. Silent operation prevents noise from masking survivors' faint calls." },
            { name: "Forward Command Post Setup (Aegis)", desc: "A modular system assembled by a three-person team in 5 minutes, powering satellite stations and command displays — command continues even when the grid fails." },
          ],
        },
      ],
    },
    contactPage: {
      title: "Contact Us",
      desc1: "EverPeak is ready to deliver defense-grade energy solutions for you",
      addressTitle: "Address",
      address1: "Building 3, National Cybersecurity Industry Park, Haidian, Beijing",
      address2: "",
      emailTitle: "Email",
      email1: "contact@everpeak-energy.com",
      email2: "support@everpeak-energy.com",
      phoneTitle: "Phone",
      phone: "+86 15510007407",
    },
  },
};

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    try {
      return localStorage.getItem('everpeak-lang') === 'en' ? 'en' : 'zh';
    } catch {
      return 'zh';
    }
  });
  const toggleLang = () =>
    setLang((l) => {
      const next = l === 'zh' ? 'en' : 'zh';
      try {
        localStorage.setItem('everpeak-lang', next);
      } catch {}
      return next;
    });

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  return (
    <LanguageContext.Provider value={{ lang, setLang, toggleLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useLanguage must be used within a LanguageProvider');
  return ctx;
}

export function useT() {
  const { lang } = useLanguage();
  return translations[lang];
}
