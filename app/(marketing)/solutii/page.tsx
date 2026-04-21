import {
    QrCode,
    BellRing,
    Kanban,
    Star,
    Contact2,
    PackageSearch,
    CheckCircle2,
    ArrowRight,
    Wifi,
    Smartphone,
    Server
} from "lucide-react";
import Link from "next/link";

export default function SolutiiPage() {
    const pachete = [
        { id: "A", t: "Digital Guestbook", d: "Pentru Airbnb/Hoteluri. Parola WiFi, reguli și Check-out instant.", icon: <QrCode className="w-5 h-5 text-brand-primary" /> },
        { id: "B", t: "Alerter Curățenie", d: "Notificări instantanee pe telefon pentru lipsă consumabile sau murdărie.", icon: <BellRing className="w-5 h-5 text-emerald-400" /> },
        { id: "C", t: "Mentenanță Active", d: "QR pe echipamente. Raportare defect cu poză și dashboard Kanban.", icon: <Kanban className="w-5 h-5 text-blue-400" /> },
        { id: "D", t: "Feedback Privat", d: "Interceptează clienții nemulțumiți înainte să lase recenzii rele pe Google.", icon: <Star className="w-5 h-5 text-yellow-400" /> },
        { id: "E", t: "Digital vCard", d: "Carte de vizită digitală. Salvează contactul direct în agendă.", icon: <Contact2 className="w-5 h-5 text-purple-400" /> },
        { id: "F", t: "Gestiune la Raft", d: "Scanner simulat pe telefon. Scazi/adaugi stocuri scanând raftul.", icon: <PackageSearch className="w-5 h-5 text-orange-400" /> }
    ];

    return (
        <div className="flex flex-col gap-24 py-20">
            {/* --- HEADER: Textul principal pe tot rândul --- */}
            <section className="max-w-7xl mx-auto px-6 text-center w-full space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-semibold text-xs border border-brand-primary/20 uppercase tracking-wider">
                    Arhitectură de Soluții
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Alege unealta care îți <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400">
                        salvează timpul.
                    </span>
                </h1>
                <p className="text-lg lg:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Un singur hub digital, zeci de soluții de automatizare. Toate aplicațiile de mai jos funcționează pe bază de abonament lunar.
                </p>
            </section>

            {/* --- CORE: Telefonul Centralizat cu Săgeți --- */}
            <section className="relative w-full max-w-[1400px] mx-auto px-6">

                {/* Glow effect general în spatele structurii */}
                <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-96 bg-brand-primary/10 blur-[150px] opacity-60"></div>

                {/* Layout Grid: Telefon Central, 3 proiecte stânga, 3 proiecte dreapta */}
                <div className="grid lg:grid-cols-11 gap-10 items-center relative z-10">

                    {/* Partea Stângă (col-span-4): Primele 3 proiecte */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col items-end">
                        {pachete.slice(0, 3).map((p) => (
                            <SolutionCard key={p.id} p={p} alignment="right" />
                        ))}
                    </div>

                    {/* Centru (col-span-3): Telefonul Simulator */}
                    <div className="lg:col-span-3 flex justify-center relative">
                        <div className="relative w-[280px] h-[580px] border-[10px] border-slate-900 bg-slate-950 rounded-[3rem] shadow-2xl ring-1 ring-white/10 overflow-hidden">
                            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-6 bg-slate-900 rounded-b-2xl z-20"></div>
                            <div className="h-full w-full bg-white flex flex-col p-5 pt-10 gap-2 overflow-y-auto">
                                {/* Interfața Clientului - Guestbook Demo */}
                                <div className="flex flex-col items-center text-center gap-1 mb-2">
                                    <div className="w-10 h-10 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary">
                                        <Wifi className="w-5 h-5" />
                                    </div>
                                    <h2 className="text-slate-900 text-sm font-black leading-tight">Pensiunea "Liniștea"</h2>
                                    <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">Camera 204</p>
                                </div>
                                {/* Butoanele Meniului de Client */}
                                <div className="space-y-1.5 flex-1">
                                    {pachete.map(p => (
                                        <button key={p.id} className="w-full py-2 bg-slate-50 text-slate-700 rounded-lg font-semibold border border-slate-200 flex items-center px-3 gap-2 text-xs">
                                            {p.icon} Vezi {p.t}
                                        </button>
                                    ))}
                                </div>
                                <p className="text-[9px] text-slate-400 text-center font-medium">Hub Activ 24/7 de NumePrenume.pfa</p>
                            </div>
                        </div>

                        {/* Vizualizare Săgeți / Linii de legătură (Emerald) */}
                        <ArrowConnections pachete={pachete} />
                    </div>

                    {/* Partea Dreaptă (col-span-4): Ultimele 3 proiecte */}
                    <div className="lg:col-span-4 space-y-8 flex flex-col items-start">
                        {pachete.slice(3).map((p) => (
                            <SolutionCard key={p.id} p={p} alignment="left" />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CTA FINAL: कस्टम Soluție --- */}
            <section className="max-w-4xl mx-auto px-6 w-full text-center">
                <div className="bg-slate-900/40 border border-slate-800 p-10 lg:p-16 rounded-[3rem] flex flex-col lg:flex-row items-center gap-10 shadow-xl">
                    <div className="flex-1 space-y-4 text-left">
                        <h2 className="text-3xl font-bold text-white">Ai nevoie de ceva specific?</h2>
                        <p className="text-slate-400">Dacă procesul tău nu se regăsește mai sus, îl putem construi de la zero special pentru afacerea ta.</p>
                    </div>
                    <Link href="/contact" className="px-10 py-5 bg-brand-primary text-slate-950 font-black rounded-xl hover:scale-105 transition-all shadow-xl group">
                        CERE O SOLUȚIE CUSTOM <ArrowRight className="w-5 h-5 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}

// Sub-componentă pentru cardurile de soluții
interface SolutionCardProps {
    p: { t: string; d: string; icon: React.ReactNode };
    alignment: "left" | "right";
}

const SolutionCard = ({ p, alignment }: SolutionCardProps) => (
    <div className={`p-6 rounded-[2rem] bg-slate-900/40 border border-slate-800 hover:border-brand-primary/30 transition-all flex flex-col gap-4 group w-full max-w-sm relative ${alignment === "right" ? "items-end text-right" : "items-start text-left"}`}>
        <div className={`w-12 h-12 bg-slate-950 rounded-xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform ${alignment === "right" ? "ml-auto" : ""}`}>
            {p.icon}
        </div>
        <h3 className="text-lg font-bold text-white">{p.t}</h3>
        <p className="text-xs text-slate-500 leading-relaxed max-w-[300px]">{p.d}</p>
        <Link href="/proiecte" className={`flex items-center gap-2 text-[10px] font-bold text-brand-primary uppercase tracking-widest group-hover:gap-3 transition-all ${alignment === "right" ? "ml-auto" : ""}`}>
            Testează Demo <ArrowRight className="w-4 h-4" />
        </Link>
    </div>
);

// Sub-componentă pentru conexiunile vizuale (Săgeți/Linii)
const ArrowConnections = ({ pachete }: { pachete: { id: string }[] }) => (
    <div className="absolute inset-0 z-0 pointer-events-none hidden lg:block">
        {/* Adăugăm linii subțiri, neon emerald, care pornesc de la telefon către centrul fiecărui card lateral */}
        {/* Asta necesită calcul de poziționare CSS sau SVG. Pentru simplitate, folosim linii de test visual */}
        <div className="absolute top-1/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
        <div className="absolute top-1/2 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>
        <div className="absolute top-3/4 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-brand-primary/20 to-transparent"></div>

        {/* SVG Arrow paths ar fi ideale aici */}
        <svg width="100%" height="100%" viewBox="0 0 400 600" fill="none" className="opacity-40">
            {/* Săgeți vizuale de test visual */}
            {/* Linii spre stânga visual */}
            <path d="M140 180 H-100" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M140 300 H-100" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M140 420 H-100" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            {/* Linii spre dreapta visual */}
            <path d="M260 180 H500" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M260 300 H500" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
            <path d="M260 420 H500" stroke="#10b981" strokeWidth="1" strokeDasharray="4 4" />
        </svg>
    </div>
);