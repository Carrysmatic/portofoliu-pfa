"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import {
    Wifi, Sparkles, ScrollText, Utensils, Map, History,
    ArrowLeft, Send, CheckCircle2, MapPin, ExternalLink
} from "lucide-react";

// --- 1. DEFINIRE ECRANE ---
// Am adăugat "REGULI" și "REGULI_FULL" în lista de ecrane permise
type Screen = "HOME" | "SERVICII_SELECT" | "SERVICII_NOTE" | "RECOMANDARI_SELECT" | "RECOMANDARI_LIST" | "REGULI" | "REGULI_FULL" | "TRASEE_SELECT" | "TRASEE_LIST" | "ISTORIC" | "SUCCESS";

export default function TouristMobileView() {
    // --- 2. EXTRACT DATE DIN STORE ---
    const {
        wifiPassword,
        addAlert,
        locations,
        quickRules,      // Extras pentru cardurile de reguli
        fullRulesText    // Extras pentru regulamentul complet
    } = useStore();

    // --- 3. STATE LOCAL ---
    const [screen, setScreen] = useState<Screen>("HOME");
    const [selectedType, setSelectedType] = useState("");
    const [note, setNote] = useState("");
    const [recCategory, setRecCategory] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');

    const filteredLocations = locations.filter(l => l.category === recCategory);

    // --- 4. LOGICĂ TRIMITE SOLICITARE ---
    const sendRequest = () => {
        addAlert({
            id: Math.random().toString(),
            room: "204",
            type: selectedType,
            note: note,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setScreen("SUCCESS");
        setTimeout(() => {
            setScreen("HOME");
            setNote("");
            setSelectedType("");
        }, 3000);
    };

    // ==========================================
    // ECRAN: HOME (MENIU PRINCIPAL)
    // ==========================================
    if (screen === "HOME") return (
        <div className="flex flex-col h-full bg-white animate-in fade-in">
            <Header title="PENSIUNEA LINIȘTEA" subtitle="CAMERA 204" />
            <div className="px-6 py-6 space-y-3">
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-3 mb-4">
                    <Wifi size={16} className="text-emerald-400" />
                    {/* Doar eticheta e uppercase, parola rămâne normală */}
                    <span className="text-[10px] font-black tracking-widest">
                        <span className="uppercase opacity-50 mr-1">WIFI:</span> {wifiPassword}
                    </span>
                </div>

                {/* 1. Servicii - Legat corect */}
                <MenuBtn label="SERVICII CAMERĂ" icon={<Sparkles size={16} />} onClick={() => setScreen("SERVICII_SELECT")} highlight />

                {/* 2. Recomandări - Legat corect */}
                <MenuBtn label="RECOMANDĂRI LOCALE" icon={<MapPin size={16} />} onClick={() => setScreen("RECOMANDARI_SELECT")} />

                {/* 3. Reguli - Legat corect */}
                <MenuBtn label="REGULILE CASEI" icon={<ScrollText size={16} />} onClick={() => setScreen("REGULI")} />

                {/* 4. Trasee - AM ADĂUGAT onClick AICI */}
                <MenuBtn label="TRASEE & ACTIVITĂȚI" icon={<Map size={16} />} onClick={() => setScreen("TRASEE_SELECT")} />

                {/* 5. Istoric - AM ADĂUGAT BUTONUL COMPLET AICI */}
                <MenuBtn label="ISTORIC & TRADIȚII" icon={<History size={16} />} onClick={() => setScreen("ISTORIC")} />
            </div>
        </div>
    );
    // ==========================================
    // ECRAN: TRASEE & ACTIVITĂȚI (Placeholder)
    // ==========================================
    if (screen === "TRASEE_SELECT") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="TRASEE & ACTIVITĂȚI" subtitle="DESCOPERĂ NATURA" />
            <div className="px-6 py-4 space-y-3">
                <MenuBtn label="TRASEE DE DRUMEȚIE" onClick={() => setScreen("TRASEE_LIST")} />
                <MenuBtn label="OBIECTIVE TURISTICE" onClick={() => { }} />
                <MenuBtn label="EXPERIENȚE LOCALE" onClick={() => { }} />
                <button onClick={() => setScreen("HOME")} className="w-full py-6 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> ÎNAPOI</button>
            </div>
        </div>
    );

    if (screen === "TRASEE_LIST") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="DRUMEȚII" subtitle="TRASEE RECOMANDATE" />
            <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto">
                {/* Exemplu de traseu placeholder */}
                <div className="border-2 border-slate-50 rounded-2xl p-4 space-y-3">
                    <h4 className="text-[11px] font-black uppercase text-slate-800">Traseul spre Cascada Moara Dracului</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed font-medium">Un traseu de dificultate medie, aproximativ 2 ore. Recomandăm încălțăminte adecvată.</p>
                    <button className="w-full py-3 bg-emerald-500 text-white rounded-xl text-[9px] font-black uppercase">Vezi Hartă Traseu</button>
                </div>
                <button onClick={() => setScreen("TRASEE_SELECT")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> ÎNAPOI</button>
            </div>
        </div>
    );
    // ==========================================
    // ECRAN: ISTORIC & TRADIȚII (Placeholder)
    // ==========================================
    if (screen === "ISTORIC") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="ISTORIC & TRADIȚII" subtitle="POVESTEA LOCULUI" />
            <div className="flex-1 px-8 py-6 overflow-y-auto">
                <div className="w-full h-40 bg-slate-100 rounded-2xl mb-6 flex items-center justify-center text-slate-300 text-[10px] font-black uppercase">Imagine Arhivă</div>
                <h4 className="text-[14px] font-black uppercase text-slate-800 mb-4 tracking-tighter">Pensiunea Liniștea: O moștenire vie</h4>
                <p className="text-[13px] leading-relaxed text-slate-600 font-medium italic">
                    "Construită pe temeliile unei vechi mori de apă, pensiunea noastră păstrează spiritul ospitalității de altădată..."
                </p>
                <p className="text-[13px] leading-relaxed text-slate-600 font-medium mt-4">
                    Aici poți introduce textul pregătit pentru proiectul european, subliniind valorile culturale și conservarea patrimoniului local.
                </p>
            </div>
            <div className="p-6 border-t border-slate-50">
                <button onClick={() => setScreen("HOME")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> ÎNAPOI LA MENIU</button>
            </div>
        </div>
    );
    // ==========================================
    // ECRANE: RECOMANDĂRI (RESTAURANTE / PRODUCĂTORI)
    // ==========================================
    if (screen === "RECOMANDARI_SELECT") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="RECOMANDĂRI LOCALE" subtitle="EXPLOREAZĂ ZONA" />
            <div className="px-6 py-4 space-y-3">
                <MenuBtn label="RESTAURANTE & CAFENELE" onClick={() => { setRecCategory('RESTAURANT'); setScreen("RECOMANDARI_LIST"); }} />
                <MenuBtn label="PRODUCĂTORI LOCALI" onClick={() => { setRecCategory('PRODUCATOR'); setScreen("RECOMANDARI_LIST"); }} />
                <button onClick={() => setScreen("HOME")} className="w-full py-6 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> ÎNAPOI</button>
            </div>
        </div>
    );

    if (screen === "RECOMANDARI_LIST") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title={recCategory === 'RESTAURANT' ? "RESTAURANTE" : "PRODUCĂTORI LOCALI"} subtitle="ALEGEREA GAZDEI" />
            <div className="flex-1 px-6 py-4 space-y-4 overflow-y-auto pb-10">
                {filteredLocations.length === 0 ? (
                    <p className="text-center text-slate-300 text-[10px] font-black uppercase mt-10 tracking-widest">Nicio recomandare momentan</p>
                ) : (
                    filteredLocations.map(loc => (
                        <div key={loc.id} className="border-2 border-slate-50 rounded-2xl p-4 space-y-3">
                            <div>
                                <h4 className="text-[11px] font-black uppercase tracking-tight text-slate-800">{loc.name}</h4>
                                <p className="text-[10px] text-emerald-600 font-bold italic mt-1 leading-tight">"{loc.note}"</p>
                            </div>
                            <a href={loc.mapsLink} target="_blank" className="flex items-center justify-center gap-2 w-full py-3 bg-slate-900 text-white rounded-xl text-[9px] font-black tracking-[0.1em] uppercase">
                                <ExternalLink size={12} /> Deschide în Maps
                            </a>
                        </div>
                    ))
                )}
                <button onClick={() => setScreen("RECOMANDARI_SELECT")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest"><ArrowLeft size={14} /> ÎNAPOI</button>
            </div>
        </div>
    );

    // ==========================================
    // ECRANE: SERVICII CAMERĂ (WIZARD)
    // ==========================================
    if (screen === "SERVICII_SELECT") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="SERVICII CAMERĂ" subtitle="ALEGE TIPUL DE SOLICITARE" />
            <div className="px-6 py-4 space-y-2">
                {["SCHIMB PROSOAPE", "SCHIMB AȘTERNUTURI", "CURĂȚENIE GENERALĂ", "REUMPLERE CONSUMABILE", "RAPORTEAZĂ DEFECȚIUNE", "ALTELE"].map(t => (
                    <MenuBtn key={t} label={t} onClick={() => { setSelectedType(t); setScreen("SERVICII_NOTE"); }} />
                ))}
                <button onClick={() => setScreen("HOME")} className="w-full py-6 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest">
                    <ArrowLeft size={14} /> ÎNAPOI LA MENIU
                </button>
            </div>
        </div>
    );

    if (screen === "SERVICII_NOTE") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title={`SERVICII: ${selectedType}`} subtitle="DOREȘTI SĂ ADAUGI O NOTĂ?" />
            <div className="px-6 py-6">
                <textarea
                    className="w-full h-40 p-4 bg-emerald-50/30 border-2 border-emerald-100 rounded-2xl text-sm focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-bold text-emerald-900 placeholder:text-emerald-200 placeholder:italic caret-emerald-500"
                    placeholder="Ex: După ora 10:00..."
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                />
                <button onClick={sendRequest} className="w-full bg-emerald-500 text-white py-5 rounded-xl mt-6 font-black text-[11px] tracking-[0.2em] shadow-xl shadow-emerald-100 flex items-center justify-center gap-3 active:scale-95 transition-all">
                    <Send size={16} /> TRIMITE SOLICITAREA
                </button>
                <button onClick={() => setScreen("SERVICII_SELECT")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest mt-2">
                    <ArrowLeft size={14} /> ÎNAPOI
                </button>
            </div>
        </div>
    );

    // ==========================================
    // ECRANE: REGULILE CASEI
    // ==========================================
    if (screen === "REGULI") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="REGULILE CASEI" subtitle="PENTRU CONFORTUL TĂU" />
            <div className="flex-1 px-6 py-4 overflow-hidden flex flex-col">
                <div className="flex-1 overflow-y-auto pr-1 space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                        {quickRules.map(r => (
                            <div key={r.id} className="p-4 bg-slate-50 border border-slate-100 rounded-2xl pointer-events-none">
                                <p className="text-[9px] font-black text-slate-400 uppercase tracking-tighter mb-1">{r.title}</p>
                                <p className="text-[11px] font-black text-slate-800 uppercase leading-tight">{r.value}</p>
                            </div>
                        ))}
                    </div>
                </div>
                {fullRulesText && (
                    <button onClick={() => setScreen("REGULI_FULL")} className="w-full mt-4 bg-slate-900 text-white py-4 rounded-xl font-black text-[10px] tracking-widest uppercase">
                        Vezi toate regulile
                    </button>
                )}
                <button onClick={() => setScreen("HOME")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-widest mt-2">
                    <ArrowLeft size={14} /> ÎNAPOI
                </button>
            </div>
        </div>
    );

    if (screen === "REGULI_FULL") return (
        <div className="flex flex-col h-full bg-white animate-in slide-in-from-right-5">
            <Header title="REGULAMENT COMPLET" subtitle="DETALII ADMINISTRATIVE" />
            <div className="flex-1 px-8 py-6 overflow-y-auto">
                <p className="text-[13px] leading-relaxed text-slate-600 whitespace-pre-wrap font-medium">
                    {fullRulesText || "Nu există detalii suplimentare momentan."}
                </p>
            </div>
            <div className="p-6 border-t border-slate-50">
                <button onClick={() => setScreen("REGULI")} className="w-full py-4 text-[10px] font-black text-slate-400 flex items-center justify-center gap-2 uppercase tracking-[0.2em]">
                    <ArrowLeft size={14} /> Înapoi la info rapid
                </button>
            </div>
        </div>
    );

    // ==========================================
    // ECRAN: SUCCESS
    // ==========================================
    if (screen === "SUCCESS") return (
        <div className="flex flex-col h-full bg-white items-center justify-center p-10 text-center animate-in zoom-in-95">
            <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-500 mb-6">
                <CheckCircle2 size={48} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">SOLICITARE TRIMISĂ!</h2>
            <p className="text-slate-400 text-xs mt-2 leading-relaxed font-medium uppercase tracking-tight">Personalul nostru a fost notificat. Revenim la meniul principal...</p>
        </div>
    );

}

// --- SUB-COMPONENTE ---

function Header({ title, subtitle }: any) {
    return (
        <div className="pt-14 pb-6 px-6 text-center border-b border-slate-50">
            <h3 className="text-lg font-black text-slate-800 italic uppercase leading-none tracking-tighter">{title}</h3>
            <p className="text-slate-400 text-[9px] mt-2 font-bold tracking-[0.2em] uppercase">{subtitle}</p>
        </div>
    );
}

function MenuBtn({ label, icon, onClick, highlight }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all active:scale-[0.97] shadow-sm ${highlight ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-700'}`}>
            {icon && <span className="opacity-40">{icon}</span>}
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}