import Link from "next/link";
import { ArrowRight, Wifi, BellRing, LogOut, Info, Map, Utensils, Mountain, MousePointerClick } from "lucide-react";

export default function MarketingPage() {
  return (
    <div className="flex flex-col gap-20 pb-20">
      <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden pt-10">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10 w-full">

          {/* Left: Text Container (Balanced) */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs w-fit mx-auto lg:mx-0 border border-brand-primary/20 shadow-sm uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse"></span>
              Abonament digital pentru afaceri locale
            </div>

            {/* Titlu principal */}
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
              Elimină întrebările repetitive <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400">
                de la clienții tăi.
              </span>
            </h1>

            <p className="text-lg lg:text-xl text-slate-400 max-w-xl mx-auto lg:mx-0 leading-relaxed">
              Turiștii scanează codul QR din cameră și au totul pe telefon: de la parola WiFi la trasee montane și restaurante locale.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 mt-6 justify-center lg:justify-start">
              <Link
                href="/projects"
                className="group w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-emerald-400 text-slate-950 font-bold rounded-xl transition-all transform hover:scale-105 shadow-[0_10px_20px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2"
              >
                TESTEAZĂ DEMO-UL LIVE
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/solutions"
                className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 hover:bg-slate-800 text-white font-semibold rounded-xl transition-all border border-slate-800 text-center"
              >
                Vezi mai multe soluții
              </Link>
            </div>
          </div>

          {/* Right: Phone Simulator (col-span-5) */}
          <div className="lg:col-span-5 flex justify-center relative">
            <div className="absolute -inset-20 bg-brand-primary/20 blur-[120px] rounded-full opacity-40"></div>

            <div className="relative w-[320px] h-[660px] border-[12px] border-slate-900 bg-slate-950 rounded-[3rem] shadow-2xl overflow-hidden ring-1 ring-white/10">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-7 bg-slate-900 rounded-b-2xl z-20"></div>

              <div className="h-full w-full bg-white flex flex-col p-5 pt-12 gap-4 overflow-y-auto">
                <div className="flex flex-col items-center text-center gap-1 mb-2">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                    <Wifi className="w-6 h-6" />
                  </div>
                  <h2 className="text-slate-900 text-lg font-black leading-tight">Pensiunea "Liniștea"</h2>
                  <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Camera 204</p>
                </div>

                <div className="space-y-2.5">
                  <button className="w-full py-3 bg-slate-900 text-white rounded-xl font-bold flex items-center px-4 gap-3 text-sm">
                    <Wifi className="w-4 h-4 text-brand-primary" /> Vezi parola WiFi
                  </button>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center px-4 gap-3 text-sm">
                    <BellRing className="w-4 h-4 text-emerald-500" /> Solicită Curățenie
                  </button>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center px-4 gap-3 text-sm">
                    <Info className="w-4 h-4 text-blue-500" /> Regulile Casei
                  </button>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center px-4 gap-3 text-sm">
                    <Utensils className="w-4 h-4 text-orange-500" /> Restaurante în zonă
                  </button>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center px-4 gap-3 text-sm">
                    <Mountain className="w-4 h-4 text-emerald-600" /> Trasee & Activități
                  </button>
                  <button className="w-full py-3 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-800/10 flex items-center px-4 gap-3 text-sm">
                    <Map className="w-4 h-4 text-purple-500" /> Istoric & Tradiții
                  </button>
                </div>

                <div className="mt-auto pt-4">
                  <button className="w-full py-4 bg-emerald-500 text-white rounded-xl font-black shadow-lg shadow-emerald-200 flex items-center justify-center gap-3 text-sm">
                    <LogOut className="w-5 h-5" /> CHECK-OUT
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}



