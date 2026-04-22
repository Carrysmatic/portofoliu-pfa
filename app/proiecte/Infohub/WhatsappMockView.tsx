"use client";
import { useStore } from "@/lib/store";
import { MessageCircle, Send, CheckCircle } from "lucide-react";
import { supabase } from "@/lib/supabase"; // NOU: Importăm Supabase

export default function WhatsAppMockup() {
    const lastAlert = useStore((state) => state.alerts[0]);

    // --- NOU: Funcția care face UPDATE în baza de date ---
    const handleStatusUpdate = async (newStatus: 'in_progress' | 'completed') => {
        if (!lastAlert) return;

        const { error } = await supabase
            .from('alerts')
            .update({ status: newStatus })
            .eq('id', lastAlert.id);

        if (error) {
            console.error("Eroare la update Supabase:", error);
        }
    };

    return (
        <div className="bg-[#0b141a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-slate-800 h-[600px] flex flex-col font-sans">

            {/* HEADER */}
            <div className="bg-[#202c33] p-4 pt-10 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-600 rounded-full flex items-center justify-center text-white">
                    <MessageCircle size={20} fill="currentColor" />
                </div>
                <div>
                    <h4 className="text-xs font-bold text-slate-200">Staff Pensiune</h4>
                    <span className="text-[9px] text-emerald-500 font-bold">online</span>
                </div>
            </div>

            {/* ZONA DE CHAT */}
            <div className="flex-1 p-4 bg-[#0b141a] space-y-4 overflow-y-auto">
                {!lastAlert ? (
                    <div className="text-center text-slate-600 text-[10px] mt-20 uppercase font-bold tracking-widest">
                        Așteptare alerte...
                    </div>
                ) : (
                    <div className="bg-[#202c33] self-start p-3 rounded-tr-xl rounded-br-xl rounded-bl-xl w-[95%] shadow-md border-l-4 border-emerald-500 animate-in slide-in-from-bottom-2">
                        <div className="flex items-center gap-2 mb-2">
                            <span className="text-[9px] font-black text-emerald-500 uppercase tracking-widest">🛎️ NOTIFICARE NOUĂ</span>
                        </div>
                        <div className="text-[11px] text-slate-200 space-y-1">
                            <p><span className="text-slate-500 font-medium">CAMERĂ:</span> <span className="font-bold text-white uppercase">{lastAlert.room}</span></p>
                            <p><span className="text-slate-500 font-medium">SERVICIU:</span> <span className="font-bold text-white uppercase">{lastAlert.type}</span></p>
                            {lastAlert.note && (
                                <div className="mt-2 pt-2 border-t border-slate-700">
                                    <p className="italic text-slate-400 font-medium leading-relaxed">"{lastAlert.note}"</p>
                                </div>
                            )}
                        </div>

                        {/* --- NOU: BUTOANE INTERACTIVE DE STAFF --- */}
                        <div className="mt-4 pt-3 border-t border-slate-700/50">

                            {/* CAZUL 1: Cererea abia a fost trimisă */}
                            {lastAlert.status === 'pending' && (
                                <button
                                    onClick={() => handleStatusUpdate('in_progress')}
                                    className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] py-2.5 rounded-lg transition-all active:scale-95"
                                >
                                    🧹 PREIA SARCINA
                                </button>
                            )}

                            {/* CAZUL 2: Cineva se ocupă de ea */}
                            {lastAlert.status === 'in_progress' && (
                                <div className="space-y-2 animate-in fade-in">
                                    <p className="text-[9px] text-emerald-400 text-center font-bold animate-pulse">
                                        Personalul este pe drum...
                                    </p>
                                    <button
                                        onClick={() => handleStatusUpdate('completed')}
                                        className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold text-[10px] py-2.5 rounded-lg transition-all active:scale-95 flex items-center justify-center gap-2"
                                    >
                                        <CheckCircle size={14} /> FINALIZEAZĂ
                                    </button>
                                </div>
                            )}

                            {/* CAZUL 3: Terminată */}
                            {lastAlert.status === 'completed' && (
                                <div className="w-full bg-white/5 text-slate-400 font-bold text-[10px] py-2.5 rounded-lg text-center flex items-center justify-center gap-2 border border-white/5 animate-in zoom-in">
                                    <CheckCircle size={14} /> SARCINĂ REZOLVATĂ
                                </div>
                            )}
                        </div>

                        <div className="text-[8px] text-slate-500 text-right mt-2 font-bold">{lastAlert.time}</div>
                    </div>
                )}
            </div>

            {/* FOOTER */}
            <div className="p-3 bg-[#202c33] flex items-center gap-2">
                <div className="flex-1 bg-[#2a3942] h-10 rounded-full px-4 flex items-center"><span className="text-slate-500 text-[11px]">Răspunde...</span></div>
                <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center text-white"><Send size={18} /></div>
            </div>
        </div>
    );
}