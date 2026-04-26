"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
    Settings, Wifi, Info, ChevronDown, ChevronUp,
    MapPin, Trash2, Plus, Clock, CheckCircle2, AlertCircle, Save
} from "lucide-react";

export default function ManagerMobileView() {
    const {
        propertyId, // Avem nevoie de ID pt Supabase
        wifiPassword, setWifiPassword,
        alerts,
        locations, addLocation, deleteLocation,
        quickRules, addQuickRule, deleteQuickRule
    } = useStore();

    const [isWifiOpen, setIsWifiOpen] = useState(false);
    const [isLocOpen, setIsLocOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isSavingWifi, setIsSavingWifi] = useState(false);

    // Funcție pt salvare WiFi în Baza de Date
    const handleSaveWifi = async () => {
        if (!propertyId) return;
        setIsSavingWifi(true);
        await supabase.from('properties').update({ wifi_password: wifiPassword }).eq('id', propertyId);
        setIsSavingWifi(false);
        alert("Parola WiFi a fost salvată!");
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'in_progress':
                return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badgeBg: 'bg-blue-500', label: 'PRELUAT', icon: <Clock size={12} /> };
            case 'completed':
                return { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-500', badgeBg: 'bg-emerald-500', label: 'FINALIZAT', icon: <CheckCircle2 size={12} /> };
            default: // pending
                return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', badgeBg: 'bg-orange-500', label: 'CERERE NOUĂ', icon: <AlertCircle size={12} /> };
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 pt-8 overflow-hidden font-sans">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black uppercase italic text-emerald-500">Admin Mode</h3>
                <Settings size={18} className="text-slate-500" />
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 pb-20 no-scrollbar">

                {/* 1: WIFI */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsWifiOpen(!isWifiOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Wifi size={14} /> WiFi</span>
                        {isWifiOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isWifiOpen && (
                        <div className="p-4 pt-0 flex gap-2">
                            <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono text-sm outline-none focus:border-emerald-500" />
                            <button onClick={handleSaveWifi} disabled={isSavingWifi} className="bg-emerald-600 p-2 rounded-lg text-white hover:bg-emerald-500 transition-colors">
                                <Save size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* 2: RECOMANDARI (Render) */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsLocOpen(!isLocOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} /> Recomandări ({locations.length})</span>
                        {isLocOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isLocOpen && (
                        <div className="p-4 pt-0 space-y-2">
                            {locations.map(loc => (
                                <div key={loc.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">{loc.name}</p>
                                        <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{loc.category}</p>
                                    </div>
                                    {/* Pt demo folosim doar stergere locala in store ca sa nu complicam DB-ul */}
                                    <button onClick={() => deleteLocation(loc.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 3: REGULI (Render) */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsRegOpen(!isRegOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Info size={14} /> Reguli ({quickRules.length}/12)</span>
                        {isRegOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isRegOpen && (
                        <div className="p-4 pt-0 space-y-2">
                            {quickRules.map(rule => (
                                <div key={rule.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                                    <div>
                                        <p className="text-xs font-bold text-slate-200">{rule.title}</p>
                                        <p className="text-[9px] text-slate-500 line-clamp-1">{rule.value}</p>
                                    </div>
                                    <button onClick={() => deleteQuickRule(rule.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* 4: CERERI RECENTE (ALERTE) */}
                <div className="mt-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Panou Operațional
                        {alerts.filter(a => a.status === 'pending').length > 0 && (
                            <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>
                        )}
                    </h4>
                    <div className="space-y-3">
                        {alerts.length === 0 ? (
                            <p className="text-center text-slate-600 text-[10px] font-bold uppercase py-6">Nicio activitate recentă.</p>
                        ) : (
                            alerts.map((alert) => {
                                const style = getStatusStyle(alert.status);
                                return (
                                    <div key={alert.id} className={`${style.bg} border ${style.border} p-4 rounded-xl transition-colors duration-500 relative overflow-hidden`}>
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.badgeBg}`}></div>
                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <span className={`text-[11px] font-black uppercase italic ${style.text}`}>CAMERĂ {alert.room}</span>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className="text-slate-500 font-bold text-[9px]">{alert.time}</span>
                                                <div className={`${style.badgeBg} text-white flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black tracking-widest shadow-sm`}>
                                                    {style.icon} {style.label}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-[11px] font-black uppercase text-white tracking-wide">{alert.type}</p>
                                            {alert.note && <p className={`text-[10px] text-slate-400 italic mt-2 border-l-2 ${style.border} pl-2`}>"{alert.note}"</p>}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}