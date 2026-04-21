"use client";
import { MessageCircle, Send } from "lucide-react";

export default function WhatsAppMockup() {
    return (
        <div className="bg-[#0b141a] rounded-[2rem] overflow-hidden shadow-2xl border border-slate-800 h-[600px] flex flex-col">
            {/* WhatsApp Header */}
            <div className="bg-[#202c33] p-4 pt-10 flex items-center gap-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white shrink-0">
                    <MessageCircle size={18} fill="currentColor" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-200 leading-none">Smart Concierge Bot</h4>
                    <span className="text-[9px] text-emerald-500 font-medium">online</span>
                </div>
            </div>

            {/* Chat Area - Wallpaper specific WhatsApp */}
            <div className="flex-1 p-4 bg-[#0b141a] bg-opacity-95 relative overflow-y-auto space-y-4">
                {/* Mesaj Tip WhatsApp */}
                <div className="bg-[#202c33] self-start p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl max-w-[90%] shadow-md border-l-4 border-emerald-500">
                    <div className="flex items-center gap-2 mb-1.5">
                        <span className="text-[9px] font-black text-emerald-500 uppercase tracking-wider">🛎️ ALERTĂ NOUĂ</span>
                    </div>
                    <div className="text-[11px] text-slate-200 space-y-1">
                        <p><span className="text-slate-500">Cameră:</span> <span className="font-bold text-white">204</span></p>
                        <p><span className="text-slate-500">Solicită:</span> <span className="font-bold text-white">Schimb Prosoape</span></p>
                        <div className="mt-2 pt-2 border-t border-slate-700">
                            <p className="italic text-slate-400 font-medium">"Vă rugăm la ora 10:00."</p>
                        </div>
                    </div>
                    <div className="text-[8px] text-slate-500 text-right mt-1 font-bold">14:19</div>
                </div>
            </div>

            {/* Input Area (Visual Only) */}
            <div className="p-3 bg-[#202c33] flex items-center gap-2">
                <div className="flex-1 bg-[#2a3942] h-9 rounded-full px-4 flex items-center">
                    <span className="text-slate-500 text-[10px]">Mesaj...</span>
                </div>
                <div className="w-9 h-9 bg-emerald-500 rounded-full flex items-center justify-center text-white">
                    <Send size={16} />
                </div>
            </div>
        </div>
    );
}