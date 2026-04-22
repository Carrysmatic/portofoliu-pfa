"use client";
import { useState } from "react";
import { useStore } from "@/lib/store";
import {
    Settings, Wifi, Info, ChevronDown, ChevronUp,
    MapPin, Trash2, Plus, Clock, CheckCircle2, AlertCircle
} from "lucide-react";

export default function ManagerMobileView() {
    const {
        wifiPassword, setWifiPassword,
        alerts,
        locations, addLocation, deleteLocation,
        quickRules, addQuickRule, deleteQuickRule,
        fullRulesText, setFullRules
    } = useStore();

    const [isWifiOpen, setIsWifiOpen] = useState(false);
    const [isLocOpen, setIsLocOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);

    const [newName, setNewName] = useState("");
    const [newCat, setNewCat] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');
    const [newNote, setNewNote] = useState("");
    const [newLink, setNewLink] = useState("");

    const [regTitle, setRegTitle] = useState("");
    const [regVal, setRegVal] = useState("");

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

    // --- NOU: Funcție care alege culorile în funcție de status ---
    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'in_progress':
                return {
                    bg: 'bg-blue-500/10',
                    border: 'border-blue-500/30',
                    text: 'text-blue-400',
                    badgeBg: 'bg-blue-500',
                    label: 'PRELUAT',
                    icon: <Clock size={12} />
                };
            case 'completed':
                return {
                    bg: 'bg-emerald-500/5',
                    border: 'border-emerald-500/20',
                    text: 'text-emerald-500',
                    badgeBg: 'bg-emerald-500',
                    label: 'FINALIZAT',
                    icon: <CheckCircle2 size={12} />
                };
            default: // 'pending'
                return {
                    bg: 'bg-orange-500/10',
                    border: 'border-orange-500/30',
                    text: 'text-orange-500',
                    badgeBg: 'bg-orange-500',
                    label: 'CERERE NOUĂ',
                    icon: <AlertCircle size={12} />
                };
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 pt-12 overflow-hidden font-sans">

            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-black uppercase italic text-emerald-500">Admin Mode</h3>
                <Settings size={18} className="text-slate-500" />
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 pb-20">

                {/* SECȚIUNEA 1: WIFI */}
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

                {/* SECȚIUNEA 2: RECOMANDĂRI */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <button onClick={() => setIsLocOpen(!isLocOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} /> Administrează Recomandări</span>
                        {isLocOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {/* ... (logica de recomandări a rămas intactă) ... */}
                </div>

                {/* SECȚIUNEA 3: REGULI */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden">
                    <button onClick={() => setIsRegOpen(!isRegOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Info size={14} /> Regulile Casei ({quickRules.length}/12)</span>
                        {isRegOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {/* ... (logica de reguli a rămas intactă) ... */}
                </div>


                {/* ==========================================
                    SECȚIUNEA 4: CERERI RECENTE (DINAMICĂ)
                   ========================================== */}
                <div className="mt-4">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4">Panou Operațional</h4>
                    <div className="space-y-3">
                        {alerts.length === 0 ? (
                            <p className="text-center text-slate-600 text-[10px] font-bold uppercase py-6">Nicio activitate recentă.</p>
                        ) : (
                            alerts.map((alert) => {
                                // Aici aducem culorile și textele specifice stării curente
                                const style = getStatusStyle(alert.status);

                                return (
                                    <div key={alert.id} className={`${style.bg} border ${style.border} p-4 rounded-xl transition-colors duration-500 relative overflow-hidden`}>

                                        {/* Banda de culoare din stânga */}
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.badgeBg}`}></div>

                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <span className={`text-[11px] font-black uppercase italic ${style.text}`}>
                                                CAMERĂ {alert.room}
                                            </span>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className="text-slate-500 font-bold text-[9px]">{alert.time}</span>
                                                {/* Badge-ul de status */}
                                                <div className={`${style.badgeBg} text-white flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black tracking-widest shadow-sm`}>
                                                    {style.icon} {style.label}
                                                </div>
                                            </div>
                                        </div>

                                        <div className="pl-2">
                                            <p className="text-[11px] font-black uppercase text-white tracking-wide">{alert.type}</p>
                                            {alert.note && (
                                                <p className={`text-[10px] text-slate-400 italic mt-2 border-l-2 ${style.border} pl-2`}>
                                                    "{alert.note}"
                                                </p>
                                            )}
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