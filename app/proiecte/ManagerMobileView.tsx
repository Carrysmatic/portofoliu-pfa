"use client";
import { Settings, Wifi, Utensils, Info, BellRing } from "lucide-react";

export default function ManagerMobileView() {
    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 font-sans p-6 pt-12">
            <div className="flex items-center justify-between mb-8">
                <h3 className="text-lg font-bold">Admin Panel</h3>
                <Settings size={18} className="text-slate-500" />
            </div>

            <div className="space-y-4">
                <div className="p-4 bg-slate-900 rounded-2xl border border-slate-800">
                    <div className="flex items-center gap-3 mb-3">
                        <Wifi size={16} className="text-blue-400" />
                        <span className="text-xs font-bold uppercase tracking-wider">Configurație WiFi</span>
                    </div>
                    <input
                        type="text"
                        placeholder="Parola noua..."
                        className="w-full bg-slate-950 border border-slate-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                    />
                </div>

                <div className="grid grid-cols-1 gap-2">
                    <button className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                        <Utensils size={16} />
                        <span className="text-xs font-medium">Editează Restaurante</span>
                    </button>
                    <button className="flex items-center gap-3 p-4 bg-slate-900 rounded-xl border border-slate-800 text-left hover:bg-slate-800 transition-colors">
                        <Info size={16} />
                        <span className="text-xs font-medium">Regulile Casei</span>
                    </button>
                </div>

                <div className="mt-8">
                    <h4 className="text-[10px] font-bold text-slate-500 uppercase mb-3">Cereri în așteptare</h4>
                    <div className="bg-orange-500/10 border border-orange-500/20 p-3 rounded-xl">
                        <div className="flex justify-between items-start mb-1">
                            <span className="text-[10px] font-bold text-orange-500">CAMERA 204</span>
                            <span className="text-[8px] text-slate-500 text-orange-400">ACUM</span>
                        </div>
                        <p className="text-[11px] font-bold">Solicitare: Prosoape</p>
                        <p className="text-[10px] text-slate-400 italic mt-1 font-medium">"Vă rugăm la ora 10:00."</p>
                    </div>
                </div>
            </div>
        </div>
    );
}