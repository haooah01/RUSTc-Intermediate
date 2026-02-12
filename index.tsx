import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  Cell, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, Legend
} from 'recharts';

// --- Types & Data ---
type Language = 'vi' | 'en' | 'de';

const CONTENT = {
  vi: {
    title: "Phân Tích Tác Động Kinh Tế & Công Nghiệp",
    macroTitle: "Yếu tố Vĩ mô (Vietnam)",
    macroDesc: "Chính sách Chuyển đổi số quốc gia tạo điều kiện cho việc ứng dụng công nghệ hiệu năng cao.",
    microTitle: "Yếu tố Vi mô",
    microDesc: "Tối ưu hóa chi phí vận hành và tăng năng suất lập trình viên tại từng doanh nghiệp.",
    itImpact: "Ngành IT: Rút ngắn chu kỳ CI/CD, giảm lỗi bộ nhớ nhờ Rust.",
    nonItImpact: "Ngoài IT: Tư duy tối ưu hóa hệ thống áp dụng cho Logistic và Sản xuất.",
    valueProp: "Giá trị: Tiết kiệm 40% chi phí hạ tầng cloud thông qua hiệu suất biên dịch."
  },
  en: {
    title: "Economic & Industrial Impact Analysis",
    macroTitle: "Macro Factors (Vietnam)",
    macroDesc: "National Digital Transformation policy fosters high-performance tech adoption.",
    microTitle: "Micro Factors",
    microDesc: "Optimizing operational costs and increasing developer productivity at firm level.",
    itImpact: "IT Industry: Shortening CI/CD cycles, reducing memory bugs via Rust.",
    nonItImpact: "Beyond IT: System optimization logic applied to Logistics and Manufacturing.",
    valueProp: "Value: 40% cloud infrastructure cost savings through compilation efficiency."
  },
  de: {
    title: "Wirtschafts- & Industrieauswirkungsanalyse",
    macroTitle: "Makrofaktoren (Vietnam)",
    macroDesc: "Die nationale digitale Transformationspolitik fördert die Einführung von Hochleistungstechnologien.",
    microTitle: "Mikrofaktoren",
    microDesc: "Optimierung der Betriebskosten und Steigerung der Entwicklerproduktivität auf Unternehmensebene.",
    itImpact: "IT-Branche: Verkürzung der CI/CD-Zyklen, Reduzierung von Speicherfehlern durch Rust.",
    nonItImpact: "Außerhalb der IT: Systemoptimierungslogik für Logistik und Fertigung.",
    valueProp: "Wert: 40% Einsparung bei Cloud-Infrastrukturkosten durch Kompilierungseffizienz."
  }
};

const RADAR_DATA = [
  { subject: 'Cost Efficiency', A: 120, B: 110, fullMark: 150 },
  { subject: 'Scalability', A: 98, B: 130, fullMark: 150 },
  { subject: 'Reliability', A: 86, B: 130, fullMark: 150 },
  { subject: 'Talent Growth', A: 99, B: 100, fullMark: 150 },
  { subject: 'Market Speed', A: 85, B: 90, fullMark: 150 },
];

const PERFORMANCE_DATA = [
  { name: 'Real Time', value: 21, color: '#38bdf8' },
  { name: 'User Time', value: 84, color: '#f97316' },
  { name: 'Sys Time', value: 5, color: '#94a3b8' },
];

const CORE_USAGE = [
  { core: 'Core 1', usage: 95 }, { core: 'Core 2', usage: 88 },
  { core: 'Core 3', usage: 92 }, { core: 'Core 4', usage: 85 },
  { core: 'Core 5', usage: 78 }, { core: 'Core 6', usage: 91 },
  { core: 'Core 7', usage: 89 }, { core: 'Core 8', usage: 94 },
];

const App = () => {
  const [lang, setLang] = useState<Language>('vi');
  const [activeStage, setActiveStage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setActiveStage(prev => (prev + 1) % 5), 3000);
    return () => clearInterval(timer);
  }, []);

  const t = CONTENT[lang];

  return (
    <div className="min-h-screen p-4 md:p-8 max-w-7xl mx-auto">
      {/* Language Switcher */}
      <div className="flex justify-end gap-2 mb-8">
        {(['vi', 'en', 'de'] as Language[]).map(l => (
          <button 
            key={l}
            onClick={() => setLang(l)}
            className={`px-4 py-1 rounded-full text-xs font-bold transition-all ${lang === l ? 'rust-gradient text-white shadow-lg' : 'bg-slate-800 text-slate-400 hover:bg-slate-700'}`}
          >
            {l.toUpperCase()}
          </button>
        ))}
      </div>

      <header className="mb-12 text-center">
        <div className="inline-block px-4 py-1 mb-4 text-xs font-bold tracking-widest uppercase rounded-full rust-gradient text-white">
          {lang === 'vi' ? 'Hệ thống biên dịch & Tối ưu hiệu năng' : lang === 'en' ? 'Compilation System & Performance' : 'Kompilierungssystem & Leistung'}
        </div>
        <h1 className="text-4xl md:text-5xl font-extrabold mb-4 text-white">
          Rustc Multi-core Build Visualizer
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-lg">
          {lang === 'vi' ? 'Khám phá kiến trúc và tác động kinh tế của Rust trong kỷ nguyên đa nhân.' : 
           lang === 'en' ? 'Explore the architecture and economic impact of Rust in the multi-core era.' : 
           'Erkunden Sie die Architektur und die wirtschaftlichen Auswirkungen von Rust im Multi-Core-Zeitalter.'}
        </p>
      </header>

      {/* Economic & Industrial Impact Section */}
      <section className="mb-16">
        <div className="glass-panel p-8 rounded-3xl border-l-4 border-l-blue-500">
          <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
            <i className="fas fa-globe-asia text-blue-400"></i>
            {t.title}
          </h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
                  <h4 className="text-blue-400 font-bold text-sm mb-2">{t.macroTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.macroDesc}</p>
                </div>
                <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-700">
                  <h4 className="text-orange-400 font-bold text-sm mb-2">{t.microTitle}</h4>
                  <p className="text-xs text-slate-400 leading-relaxed">{t.microDesc}</p>
                </div>
              </div>
              
              <div className="p-5 rounded-xl bg-green-500/10 border border-green-500/30">
                <h4 className="text-green-400 font-bold text-sm mb-3">Industry Integration</h4>
                <ul className="space-y-3">
                  <li className="text-xs text-slate-300 flex items-start gap-2">
                    <i className="fas fa-microchip mt-1 text-green-500"></i>
                    <span>{t.itImpact}</span>
                  </li>
                  <li className="text-xs text-slate-300 flex items-start gap-2">
                    <i className="fas fa-truck-fast mt-1 text-green-500"></i>
                    <span>{t.nonItImpact}</span>
                  </li>
                </ul>
              </div>

              <div className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30 text-center">
                <span className="text-orange-400 font-bold text-sm">{t.valueProp}</span>
              </div>
            </div>

            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={RADAR_DATA}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 150]} tick={false} axisLine={false} />
                  <Radar name="Impact Index" dataKey="B" stroke="#f97316" fill="#f97316" fillOpacity={0.6} />
                  <Tooltip contentStyle={{ backgroundColor: '#0f172a', border: 'none', borderRadius: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
              <p className="text-center text-[10px] text-slate-500 uppercase mt-2 font-bold tracking-widest">Market Impact Radar</p>
            </div>
          </div>
        </div>
      </section>

      {/* Performance Section */}
      <section className="grid md:grid-cols-3 gap-8 mb-16">
        <div className="md:col-span-2 glass-panel p-8 rounded-2xl">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold flex items-center gap-2">
              <i className="fas fa-chart-bar text-orange-500"></i>
              Performance Metrics
            </h3>
            <div className="text-xs text-slate-400 mono">User Time > Real Time</div>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={PERFORMANCE_DATA} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" stroke="#94a3b8" width={100} fontSize={12} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                <Bar dataKey="value" radius={[0, 4, 4, 0]} barSize={40}>
                  {PERFORMANCE_DATA.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="glass-panel p-8 rounded-2xl">
          <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
            <i className="fas fa-tachometer-alt text-orange-500"></i>
            CPU Load (8 Core)
          </h3>
          <div className="space-y-4">
            {CORE_USAGE.map((core) => (
              <div key={core.core}>
                <div className="flex justify-between text-[10px] mb-1 uppercase text-slate-500 mono">
                  <span>{core.core}</span>
                  <span>{core.usage}%</span>
                </div>
                <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full rust-gradient transition-all duration-1000" style={{ width: `${core.usage}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-slate-800 text-center text-slate-500 text-sm">
        <div className="mb-4">
          <i className="fab fa-rust text-2xl mr-4 opacity-50"></i>
          <i className="fas fa-microchip text-2xl opacity-50"></i>
        </div>
        <p>© 2024 Rust Architecture Visualizer • Global Economic Insights</p>
      </footer>
    </div>
  );
};

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<App />);
