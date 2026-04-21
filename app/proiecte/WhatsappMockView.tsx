"use client";
import { useStore } from "@/lib/store";
import { MessageCircle, Send } from "lucide-react";

export default function WhatsAppMockup() {
    const lastAlert = useStore((state) => state.alerts[0]);

    return (
        <div className="bg-[#0b141a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 h-[600px] flex flex-col font-sans">
            <div className="bg-[#202c33] p-4 pt-10 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                    <MessageCircle size={20} fill="currentColor" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-200">Staff Pensiune</h4>
                    <span className="text-[9px] text-emerald-500 font-bold">online</span>
                </div>
            </div>

            <div className="flex-1 p-4 bg-[#0b141a] space-y-4 overflow-y-auto">
                {!lastAlert ? (
                    <div className="text-center text-slate-600 text-[10px] mt-20 uppercase font-bold tracking-widest">
                        Așteptare alerte...
                    </div>
                ) : (
                    <div className="bg-[#202c33] self-start p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[90%] shadow-md border-l-4 border-emerald-500 animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">🛎️ NOTIFICARE NOUĂ</span>
                        </div>
                        <div className="text-[11px] text-slate-200 space-y-1">
                            <p><span className="text-slate-500 font-medium">CAMERĂ:</span> <span className="font-bold text-white uppercase">204</span></p>
                            <p><span className="text-slate-500 font-medium">SERVICIU:</span> <span className="font-bold text-white uppercase">{lastAlert.type}</span></p>
                            {lastAlert.note && (
                                <div className="mt-2 pt-2 border-t border-slate-700">
                                    <p className="italic text-slate-400 font-medium leading-relaxed">"{lastAlert.note}"</p>
                                </div>
                            )}
                        </div>
                        <div className="text-[8px] text-slate-500 text-right mt-2 font-bold">{lastAlert.time}</div>
                    </div>
                )}
            </div>

            <div className="p-3 bg-[#202c33] flex items-center gap-2">
                <div className="flex-1 bg-[#2a3942] h-10 rounded-full px-4 flex items-center"><span className="text-slate-500 text-[11px]">Răspunde...</span></div>
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Send size={18} /></div>
            </div>
        </div>
    );
}