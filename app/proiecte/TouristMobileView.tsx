"use client";

import { Wifi, Sparkles, ScrollText, Utensils, Map, History } from "lucide-react";

export default function TouristMobileView() {
    return (
        <div className="flex flex-col h-full bg-white text-slate-900 font-sans">
            {/* Header - Padding de sus ajustat pentru a fi sub notch */}
            <div className="pt-12 pb-6 px-6 text-center border-b border-slate-50 bg-white">
                <div className="flex justify-center mb-3">
                    <div className="p-2.5 bg-emerald-50 rounded-full text-emerald-600">
                        <Wifi size={22} />
                    </div>
                </div>
                <h3 className="text-lg font-bold tracking-tight text-slate-800 leading-tight">Pensiunea "Liniștea"</h3>
                <p className="text-slate-400 text-[9px] mt-1 uppercase tracking-[0.2em] font-bold">Camera 204</p>
            </div>

            {/* Lista de acțiuni - FĂRĂ SCROLL (overflow-hidden) */}
            <div className="flex-1 px-5 py-5 space-y-2.5 bg-white overflow-hidden">
                <ActionButton icon={<Wifi size={16} />} label="Vezi parola WiFi" highlight />
                <ActionButton icon={<Sparkles size={16} />} label="Solicită Curățenie" />
                <ActionButton icon={<ScrollText size={16} />} label="Regulile Casei" />
                <ActionButton icon={<Utensils size={16} />} label="Restaurante în zonă" />
                <ActionButton icon={<Map size={16} />} label="Trasee & Activități" />
                <ActionButton icon={<History size={16} />} label="Istoric & Tradiții" />
            </div>

            {/* Footer alb simplu pentru a umple curbura de jos a telefonului */}
            <div className="h-8 bg-white" />
        </div>
    );
}

function ActionButton({ icon, label, highlight = false }: { icon: React.ReactNode, label: string, highlight?: boolean }) {
    return (
        <button className={`w-full flex items-center gap-3.5 px-4 py-3.5 rounded-xl border transition-all active:scale-[0.97] ${highlight
                ? "bg-slate-900 border-slate-900 text-white shadow-md shadow-slate-200"
                : "bg-white border-slate-100 text-slate-700 hover:border-slate-200 shadow-sm"
            }`}>
            <span className={highlight ? "text-emerald-400" : "text-slate-400"}>
                {icon}
            </span>
            <span className="text-[11px] font-bold uppercase tracking-wide">{label}</span>
        </button>
    );
}