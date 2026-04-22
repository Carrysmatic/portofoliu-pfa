"use client";
import ManagerMobileView from "./ManagerMobileView";
import WhatsAppMockup from "./WhatsappMockView";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/lib/store";

export default function ProiectePage() {
    // 1. Acum extragem și funcția de update pe lângă cea de add!
    const { addAlert, updateAlertStatus } = useStore();

    useEffect(() => {
        const channel = supabase
            .channel('alerts_db_changes')
            .on(
                'postgres_changes',
                {
                    event: '*', // NOU: Ascultăm TOATE evenimentele (și INSERT, și UPDATE)
                    schema: 'public',
                    table: 'alerts',
                },
                (payload) => {
                    console.log('🔔 EVENIMENT LIVE:', payload.eventType, payload);

                    const newAlert = payload.new as any; // Datele venite de la server

                    // CAZUL 1: A apărut o cerere nouă
                    if (payload.eventType === 'INSERT') {
                        addAlert({
                            id: newAlert.id,
                            room: "204",
                            type: newAlert.category,
                            note: "",
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: newAlert.status || 'pending' // Asigurăm statusul de început
                        });
                    }

                    // CAZUL 2: S-a modificat o cerere existentă (ex: a fost preluată)
                    if (payload.eventType === 'UPDATE') {
                        updateAlertStatus(newAlert.id, newAlert.status);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [addAlert, updateAlertStatus]);

    return (
        <main className="pt-20 min-h-screen bg-slate-950 text-white">
            <div className="max-w-[1600px] mx-auto px-6">

                <header className="mb-16 text-center flex flex-col items-center">
                    <div className="max-w-3xl">
                        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-4">
                            Info Hub & <span className="text-brand-primary">Recepție QR</span>
                        </h1>
                        <div className="h-1 w-20 bg-brand-primary mx-auto mb-6 rounded-full"></div>
                        <p className="text-slate-400 text-lg md:text-xl font-medium leading-relaxed">
                            Eco-sistem Digital Integrat
                            <span className="block text-sm uppercase tracking-[0.3em] text-slate-500 mt-2 font-bold">
                                Flux Live: Turist → Manager → Staff (WhatsApp)
                            </span>
                        </p>
                    </div>
                </header>
                {/* Layout pe 3 coloane */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">

                    {/* COLOANA 1: TURIST (ACUM ESTE QR CODE) */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-emerald-400/10 px-3 py-1 rounded-full">
                            1. Joacă rolul Turistului
                        </h2>
                        <div className="w-[300px] h-[600px] bg-slate-900/40 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 relative shadow-2xl hover:border-emerald-500/30 transition-colors">

                            {/* Animație de scanare fundal */}
                            <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                                <div className="w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_#10b981] animate-[scan_3s_ease-in-out_infinite]"></div>
                            </div>

                            <div className="text-center space-y-6 z-10 w-full">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tight mb-2">Pasul 1</h3>
                                    <p className="text-sm text-slate-400 font-medium">Deschide camera telefonului tău personal și scanează codul de mai jos.</p>
                                </div>

                                {/* QR Uriaș Generat Dinamic */}
                                <div className="w-full aspect-square bg-white rounded-2xl p-4 shadow-inner border-4 border-slate-800 mx-auto relative group cursor-pointer overflow-hidden">
                                    {/* Folosim un API extern pentru a genera QR-ul pe baza link-ului tau */}
                                    <img
                                        src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://http://localhost:3000/scan?auth=TOKEN_SECRET_123')}`}
                                        alt="Scan QR Demo"
                                        className="w-full h-full object-contain transition-all group-hover:scale-105"
                                    />

                                    {/* Colțuri decorative QR (păstrate pentru estetică) */}
                                    <div className="absolute top-2 left-2 w-4 h-4 border-t-4 border-l-4 border-emerald-500 rounded-tl-lg pointer-events-none"></div>
                                    <div className="absolute top-2 right-2 w-4 h-4 border-t-4 border-r-4 border-emerald-500 rounded-tr-lg pointer-events-none"></div>
                                    <div className="absolute bottom-2 left-2 w-4 h-4 border-b-4 border-l-4 border-emerald-500 rounded-bl-lg pointer-events-none"></div>
                                    <div className="absolute bottom-2 right-2 w-4 h-4 border-b-4 border-r-4 border-emerald-500 rounded-br-lg pointer-events-none"></div>
                                </div>

                                <div className="pt-4 border-t border-slate-800">
                                    <p className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest animate-pulse">
                                        Sistemul așteaptă conexiunea...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* COLOANA 2: MANAGER */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-blue-400/10 px-3 py-1 rounded-full">2. Panou Manager (Mobile)</h2>
                        <div className="w-[300px] h-[600px] bg-slate-900 border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 w-full h-6 flex justify-center items-center z-20 pointer-events-none text-[8px] text-slate-700 font-bold italic">ADMIN MODE</div>
                            <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
                                <ManagerMobileView />
                            </div>
                        </div>
                    </div>

                    {/* COLOANA 3: WHATSAPP */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-slate-400/10 px-3 py-1 rounded-full">
                            3. Notificare Staff (WhatsApp)
                        </h2>
                        <div className="w-full max-w-[320px]">
                            <WhatsAppMockup />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}