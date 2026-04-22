import {
    QrCode,
    Kanban,
    Star,
    Contact2,
    PackageSearch,
    ArrowRight,
    ScanLine,
    Loader2,
    Lock
} from "lucide-react";
import Link from "next/link";

export default function SolutiiPage() {
    const pachete = [
        {
            id: "A+B",
            t: "Info Hub & Recepție QR",
            d: "Sistem integrat pentru pensiuni. Transformă experiența turistului oferindu-i instant acces la WiFi, regulile casei, informații turistice și un canal direct de alerte WhatsApp pentru staff.",
            icon: <QrCode className="w-8 h-8 text-brand-primary" />,
            link: "/proiecte/Infohub",
            status: "active"
        },
        {
            id: "C",
            t: "Mentenanță Active",
            d: "Sistem de ticketing Kanban pentru defecte raportate prin QR. Simplifică procesul de reparații și ține evidența intervențiilor echipei tale tehnice.",
            icon: <Kanban className="w-8 h-8 text-blue-400" />,
            status: "development"
        },
        {
            id: "D",
            t: "Terminal Feedback",
            d: "Analiză în timp real a satisfacției clienților cu grafice live. Află ce cred clienții tăi chiar înainte ca aceștia să părăsească locația.",
            icon: <Star className="w-8 h-8 text-yellow-400" />,
            status: "development"
        },
        {
            id: "E",
            t: "Digital vCard",
            d: "Generare automată de contacte direct în agenda telefonului. Fără cărți de vizită tipărite, doar o scanare rapidă pentru a salva datele firmei tale.",
            icon: <Contact2 className="w-8 h-8 text-purple-400" />,
            status: "development"
        },
        {
            id: "F",
            t: "Micro-WMS Stocuri",
            d: "Gestiune rapidă a stocurilor folosind camera telefonului ca scanner. Adaugă sau scade produse din inventar cu o simplă scanare de cod de bare.",
            icon: <PackageSearch className="w-8 h-8 text-orange-400" />,
            status: "development"
        }
    ];

    return (
        <div className="flex flex-col gap-24 py-20">
            {/* --- HEADER --- */}
            <section className="max-w-5xl mx-auto px-6 text-center w-full space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-primary/10 text-brand-primary font-bold text-sm border border-brand-primary/20 uppercase tracking-widest">
                    Arhitectură de Soluții
                </div>
                <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-[1.1]">
                    Alege unealta care îți <br className="hidden md:block" />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-400">
                        salvează timpul.
                    </span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    Un singur hub digital, zeci de soluții de automatizare. Toate aplicațiile funcționează pe bază de abonament lunar și nu necesită instalare pe telefoanele clienților.
                </p>
            </section>

            {/* --- LISTA DE PROIECTE --- */}
            <section className="max-w-6xl mx-auto px-6 w-full space-y-16">
                {pachete.map((p, index) => {
                    const isActive = p.status === "active";

                    return (
                        <div
                            key={p.id}
                            className={`flex flex-col lg:flex-row items-center gap-12 p-8 lg:p-16 rounded-[3rem] border transition-all duration-500
                            ${isActive
                                    ? "bg-slate-900/60 border-slate-700 hover:border-brand-primary/50 shadow-2xl"
                                    : "bg-slate-900/20 border-slate-800/50"}`}
                        >

                            {/* STANGA: Detalii Proiect */}
                            <div className="flex-1 space-y-6 text-center lg:text-left">
                                <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto lg:mx-0 shadow-inner
                                    ${isActive ? "bg-slate-950 shadow-brand-primary/20" : "bg-slate-900"}`}>
                                    {p.icon}
                                </div>

                                <h2 className={`text-3xl lg:text-4xl font-bold tracking-tight ${isActive ? "text-white" : "text-slate-300"}`}>
                                    {p.t}
                                </h2>

                                <p className="text-lg text-slate-400 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                                    {p.d}
                                </p>

                                <div className="pt-4">
                                    {isActive ? (
                                        <Link href={p.link!} className="inline-flex items-center gap-3 px-8 py-4 bg-brand-primary text-slate-950 font-black rounded-xl hover:scale-105 transition-all shadow-lg shadow-brand-primary/20 group">
                                            DESCHIDE DEMO LIVE <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                        </Link>
                                    ) : (
                                        <div className="inline-flex items-center gap-3 px-8 py-4 bg-slate-800 text-slate-400 font-bold rounded-xl cursor-not-allowed">
                                            <Loader2 className="w-5 h-5 animate-spin" /> ÎN DEZVOLTARE
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* DREAPTA: Zona QR Code */}
                            <div className="w-full lg:w-auto flex justify-center shrink-0">
                                <div className={`w-72 h-72 rounded-[2.5rem] p-4 relative shadow-2xl transition-all duration-500
                                    ${isActive ? "bg-slate-800 border-2 border-brand-primary/30" : "bg-slate-900 border border-slate-800"}`}>

                                    {isActive && (
                                        <>
                                            <div className="absolute -top-4 -right-4 w-20 h-20 bg-brand-primary/30 rounded-full blur-2xl pointer-events-none"></div>
                                            <div className="absolute -bottom-4 -left-4 w-20 h-20 bg-blue-500/20 rounded-full blur-2xl pointer-events-none"></div>
                                        </>
                                    )}

                                    <div className="w-full h-full bg-white rounded-2xl relative overflow-hidden flex flex-col items-center justify-center border-4 border-slate-800">

                                        {isActive ? (
                                            <>
                                                {/* AFISARE COD QR REAL */}
                                                <img
                                                    src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://portofoliu-pfa.vercel.app/scan?auth=TOKEN_SECRET_123')}`}
                                                    alt="Scan QR Demo"
                                                    className="w-full h-full object-contain p-4"
                                                />
                                                {/* Efect de scanare laser */}
                                                <div className="absolute inset-0 pointer-events-none">
                                                    <div className="w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_#10b981] animate-[scan_3s_ease-in-out_infinite]"></div>
                                                </div>
                                            </>
                                        ) : (
                                            <>
                                                <div className="absolute inset-0 backdrop-blur-md bg-white/60 z-10 flex flex-col items-center justify-center text-slate-500">
                                                    <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-2 shadow-sm border border-slate-200">
                                                        <Lock className="w-5 h-5" />
                                                    </div>
                                                    <span className="font-bold text-xs uppercase tracking-widest">Funcție Blocată</span>
                                                </div>
                                                <QrCode className="w-32 h-32 text-slate-200 opacity-50" />
                                            </>
                                        )}

                                    </div>

                                    {isActive && (
                                        <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest bg-brand-primary text-slate-950 font-black px-4 py-1.5 rounded-full shadow-lg whitespace-nowrap">
                                            Gata de scanat
                                        </div>
                                    )}
                                </div>
                            </div>

                        </div>
                    );
                })}
            </section>

            {/* --- CTA FINAL --- */}
            <section className="max-w-6xl mx-auto px-6 w-full text-center">
                <div className="bg-slate-900/40 border border-slate-800 p-12 lg:p-20 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl">
                    <div className="flex-1 space-y-4 text-center lg:text-left">
                        <h2 className="text-3xl lg:text-4xl font-bold text-white tracking-tight">Ai nevoie de ceva specific?</h2>
                        <p className="text-lg text-slate-400 max-w-xl">Dacă procesul tău nu se regăsește mai sus, îl putem construi de la zero special pentru fluxul tău de lucru.</p>
                    </div>
                    <Link href="/contact" className="px-10 py-5 bg-brand-primary text-slate-950 font-black rounded-2xl hover:scale-105 transition-all shadow-xl group whitespace-nowrap text-lg">
                        CERE O SOLUȚIE CUSTOM <ArrowRight className="w-6 h-6 inline-block group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
            </section>
        </div>
    );
}