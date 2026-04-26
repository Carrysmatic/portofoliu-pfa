"use client";
import ManagerMobileView from "./ManagerMobileView";
import WhatsAppMockup from "./WhatsappMockView";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { useStore } from "@/lib/store";

export default function ProiectePage() {
    const { setInitData, addAlert, updateAlertStatus } = useStore();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // --- 1. ÎNCĂRCĂM DATELE INIȚIALE DIN SUPABASE PENTRU DEMO ---
        const fetchInitialData = async () => {
            // Folosim token-ul de demo pe care l-ai pus în QR code
            const demoToken = 'TOKEN_SECRET_123';

            const { data: roomData } = await supabase.from('rooms').select('id, property_id, room_number').eq('auth_token', demoToken).single();
            if (!roomData) return;

            const { data: propertyData } = await supabase.from('properties').select('*').eq('id', roomData.property_id).single();
            const { data: rulesData } = await supabase.from('house_rules').select('*').eq('property_id', roomData.property_id).eq('is_quick_info', true);
            const { data: recData } = await supabase.from('recommendations').select('id, custom_note, is_sponsored, master_places(name, category, maps_url)').eq('property_id', roomData.property_id);

            // Tragem și ultimele 10 alerte existente
            const { data: alertsData } = await supabase.from('alerts').select('*').eq('property_id', roomData.property_id).order('created_at', { ascending: false }).limit(10);

            if (propertyData) {
                setInitData({
                    propertyId: propertyData.id,
                    propertyName: propertyData.name,
                    roomId: roomData.id,
                    roomNumber: roomData.room_number,
                    wifiPassword: propertyData.wifi_password || "",
                    quickRules: rulesData?.map(r => ({ id: r.id, title: r.title, value: r.short_desc || '', iconName: r.icon_name || 'Info' })) || [],
                    locations: recData?.map(r => ({
                        id: r.id,
                        name: (r.master_places as any)?.name || "",
                        category: (r.master_places as any)?.category || "RESTAURANT",
                        note: r.custom_note || "",
                        mapsLink: (r.master_places as any)?.maps_url || "#",
                        isSponsored: r.is_sponsored || false
                    })) || [],
                    fullRulesText: propertyData.config?.full_rules || ""
                });

                // Populăm store-ul cu alertele inițiale
                if (alertsData) {
                    alertsData.reverse().forEach(a => { // Reverse ca să intre în ordinea corectă în state
                        addAlert({
                            id: a.id,
                            room: roomData.room_number,
                            type: a.category,
                            note: a.notes || "",
                            time: new Date(a.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: a.status
                        });
                    });
                }
            }
            setIsLoading(false);
        };

        fetchInitialData();

        // --- 2. ASCULTĂM SCHIMBĂRILE LIVE PE ALERTE ---
        const channel = supabase
            .channel('alerts_db_changes')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'alerts' },
                (payload) => {
                    console.log('🔔 EVENIMENT LIVE:', payload.eventType, payload);
                    const newAlert = payload.new as any;

                    if (payload.eventType === 'INSERT') {
                        addAlert({
                            id: newAlert.id,
                            room: "204", // Ideal ar fi să preiei din db după room_id, dar pt demo e ok
                            type: newAlert.category,
                            note: newAlert.notes || "",
                            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                            status: newAlert.status || 'pending'
                        });
                    }

                    if (payload.eventType === 'UPDATE') {
                        updateAlertStatus(newAlert.id, newAlert.status);
                    }
                }
            )
            .subscribe();

        return () => {
            supabase.removeChannel(channel);
        };
    }, [setInitData, addAlert, updateAlertStatus]);

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

                {isLoading ? (
                    <div className="text-center text-emerald-500 font-bold uppercase tracking-widest animate-pulse">Se sincronizează baza de date...</div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">
                        {/* COLOANA 1: TURIST */}
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-emerald-400/10 px-3 py-1 rounded-full">
                                1. Joacă rolul Turistului
                            </h2>
                            <div className="w-[300px] h-[600px] bg-slate-900/40 border border-slate-800 rounded-[2.5rem] flex flex-col items-center justify-center p-8 relative shadow-2xl hover:border-emerald-500/30 transition-colors">
                                {/* Animație laser */}
                                <div className="absolute inset-0 rounded-[2.5rem] overflow-hidden pointer-events-none">
                                    <div className="w-full h-1 bg-emerald-500/50 shadow-[0_0_15px_#10b981] animate-[scan_3s_ease-in-out_infinite]"></div>
                                </div>
                                <div className="text-center space-y-6 z-10 w-full">
                                    <div>
                                        <h3 className="text-2xl font-black text-white tracking-tight mb-2">Pasul 1</h3>
                                        <p className="text-sm text-slate-400 font-medium">Scanează codul cu telefonul pentru a deschide aplicația.</p>
                                    </div>
                                    <div className="w-full aspect-square bg-white rounded-2xl p-4 shadow-inner border-4 border-slate-800 mx-auto relative group overflow-hidden">
                                        <img src={`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent('https://portofoliu-pfa.vercel.app/scan?auth=TOKEN_SECRET_123')}`} alt="Scan QR" className="w-full h-full object-contain" />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* COLOANA 2: MANAGER */}
                        <div className="flex flex-col items-center w-full">
                            <h2 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-blue-400/10 px-3 py-1 rounded-full">2. Panou Manager (Mobile)</h2>
                            <div className="w-[300px] h-[600px] bg-slate-900 border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
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
                )}
            </div>
        </main>
    );
}