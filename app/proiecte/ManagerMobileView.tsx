"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import {
    Settings, Wifi, Info, ChevronDown, ChevronUp,
    MapPin, Trash2, Plus
} from "lucide-react";

export default function ManagerMobileView() {
    // --- 1. EXTRACT DATE DIN STORE ---
    // Aici aducem toate datele și funcțiile globale
    const {
        wifiPassword, setWifiPassword,
        alerts,
        locations, addLocation, deleteLocation,
        quickRules, addQuickRule, deleteQuickRule,
        fullRulesText, setFullRules
    } = useStore();

    // --- 2. STATE LOCAL PENTRU UI ---
    // Controlează ce tab-uri sunt deschise/închise
    const [isWifiOpen, setIsWifiOpen] = useState(false);
    const [isLocOpen, setIsLocOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);

    // --- 3. STATE PENTRU FORMULARE ---
    // Datele temporare introduse în input-uri înainte de salvare

    // Form Recomandări
    const [newName, setNewName] = useState("");
    const [newCat, setNewCat] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');
    const [newNote, setNewNote] = useState("");
    const [newLink, setNewLink] = useState("");

    // Form Reguli
    const [regTitle, setRegTitle] = useState("");
    const [regVal, setRegVal] = useState("");

    // --- 4. HANDLERS (LOGICA DE SALVARE) ---

    const handleAddLocation = () => {
        if (!newName || !newLink) return;
        addLocation({
            id: Math.random().toString(),
            name: newName,
            category: newCat,
            note: newNote,
            mapsLink: newLink
        });
        setNewName(""); setNewNote(""); setNewLink("");
    };

    const handleAddReg = () => {
        if (!regTitle || !regVal) return;
        addQuickRule({
            id: Math.random().toString(),
            title: regTitle,
            value: regVal
        });
        setRegTitle(""); setRegVal("");
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 pt-12 overflow-hidden font-sans">

            {/* HEADER ADMIN */}
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black uppercase italic text-emerald-500">Admin Mode</h3>
                <Settings size={18} className="text-slate-500" />
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 pb-20">

                {/* ==========================================
                    SECȚIUNEA 1: WIFI
                   ========================================== */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <button onClick={() => setIsWifiOpen(!isWifiOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Wifi size={14} /> WiFi</span>
                        {isWifiOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isWifiOpen && (
                        <div className="p-4 pt-0">
                            <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono text-sm" />
                        </div>
                    )}
                </div>


                {/* ==========================================
                    SECȚIUNEA 2: RECOMANDĂRI (LOCAȚII)
                   ========================================== */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <button onClick={() => setIsLocOpen(!isLocOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} /> Administrează Recomandări</span>
                        {isLocOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {isLocOpen && (
                        <div className="p-4 pt-0 space-y-4 animate-in fade-in duration-300">
                            <div className="h-[1px] bg-slate-800 my-2" />
                            <div className="space-y-2">
                                <div className="flex gap-2">
                                    <button onClick={() => setNewCat('RESTAURANT')} className={`flex-1 py-2 text-[8px] font-black rounded-lg border ${newCat === 'RESTAURANT' ? 'bg-blue-500 border-blue-400 text-white' : 'border-slate-700 text-slate-500'}`}>RESTAURANTE</button>
                                    <button onClick={() => setNewCat('PRODUCATOR')} className={`flex-1 py-2 text-[8px] font-black rounded-lg border ${newCat === 'PRODUCATOR' ? 'bg-emerald-500 border-emerald-400 text-white' : 'border-slate-700 text-slate-500'}`}>PRODUCĂTORI</button>
                                </div>
                                <input value={newName} onChange={(e) => setNewName(e.target.value)} placeholder="Nume locație..." className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs" />
                                <input value={newNote} onChange={(e) => setNewNote(e.target.value)} placeholder="Nota gazdei..." className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs" />
                                <input value={newLink} onChange={(e) => setNewLink(e.target.value)} placeholder="Link Google Maps..." className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs" />
                                <button onClick={handleAddLocation} className="w-full bg-white text-black py-2 rounded-lg font-black text-[10px] flex items-center justify-center gap-2"><Plus size={14} /> ADĂUGAȚI ÎN LISTĂ</button>
                            </div>
                            <div className="pt-2 space-y-2">
                                {locations.map(loc => (
                                    <div key={loc.id} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase">{loc.name}</p>
                                            <p className="text-[8px] text-slate-500 uppercase font-black">{loc.category}</p>
                                        </div>
                                        <button onClick={() => deleteLocation(loc.id)} className="text-red-900 hover:text-red-500"><Trash2 size={16} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>


                {/* ==========================================
                    SECȚIUNEA 3: REGULILE CASEI
                   ========================================== */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <button onClick={() => setIsRegOpen(!isRegOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Info size={14} /> Regulile Casei ({quickRules.length}/12)</span>
                        {isRegOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>

                    {isRegOpen && (
                        <div className="p-4 pt-0 space-y-4 animate-in fade-in">
                            <div className="h-[1px] bg-slate-800 my-2" />
                            {quickRules.length < 12 ? (
                                <div className="space-y-2 bg-slate-950 p-3 rounded-xl border border-emerald-500/20">
                                    <input value={regTitle} onChange={(e) => setRegTitle(e.target.value)} placeholder="Titlu (ex: FUMAT)..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs uppercase" />
                                    <input value={regVal} onChange={(e) => setRegVal(e.target.value)} placeholder="Regulă (ex: PE TERASĂ)..." className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs uppercase" />
                                    <button onClick={handleAddReg} className="w-full bg-emerald-500 text-white py-2 rounded-lg font-black text-[10px] flex items-center justify-center gap-2"><Plus size={14} /> ADĂUGĂ REGULĂ RAPIDĂ</button>
                                </div>
                            ) : (
                                <p className="text-[8px] text-orange-500 font-bold text-center uppercase italic">Limita de 12 reguli a fost atinsă</p>
                            )}
                            <div className="space-y-2">
                                {quickRules.map(r => (
                                    <div key={r.id} className="flex items-center justify-between bg-slate-950 p-3 rounded-xl border border-slate-800">
                                        <div>
                                            <p className="text-[10px] font-black uppercase text-slate-300">{r.title}</p>
                                            <p className="text-[9px] font-bold text-emerald-500">{r.value}</p>
                                        </div>
                                        <button onClick={() => deleteQuickRule(r.id)} className="text-red-500/50 hover:text-red-500 p-1"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                            <div className="pt-2">
                                <label className="text-[9px] font-black text-slate-500 uppercase block mb-2 tracking-widest">Regulile complete</label>
                                <textarea value={fullRulesText} onChange={(e) => setFullRules(e.target.value)} className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-2 text-[10px] text-slate-400" placeholder="Introdu aici regulamentul detaliat..." />
                            </div>
                        </div>
                    )}
                </div>


                {/* ==========================================
                    SECȚIUNEA 4: CERERI RECENTE (ALERTE)
                   ========================================== */}
                <div className="mt-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Cereri Recente</h4>
                    <div className="space-y-3">
                        {alerts.map((alert) => (
                            <div key={alert.id} className="bg-orange-500/5 border border-orange-500/20 p-4 rounded-xl">
                                <div className="flex justify-between items-start mb-1 text-[10px] font-black uppercase italic text-orange-500">
                                    <span>CAMERĂ {alert.room}</span>
                                    <span className="text-slate-600 font-bold">{alert.time}</span>
                                </div>
                                <p className="text-[11px] font-black uppercase text-white tracking-wide">{alert.type}</p>
                                {alert.note && <p className="text-[10px] text-slate-400 italic mt-2 border-l-2 border-orange-500/30 pl-2">"{alert.note}"</p>}
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}