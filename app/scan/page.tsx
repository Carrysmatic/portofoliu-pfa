"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
    Wifi, Sparkles, ScrollText, MapPin, Map, History,
    ArrowLeft, Send, CheckCircle2, ExternalLink
} from "lucide-react";

function ScanContent() {
    const searchParams = useSearchParams();
    const {
        propertyId, roomId, propertyName, roomNumber,
        wifiPassword, locations, quickRules, fullRulesText, setInitData
    } = useStore();

    const [isInitializing, setIsInitializing] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [screen, setScreen] = useState("HOME");
    const [selectedType, setSelectedType] = useState("");
    const [note, setNote] = useState("");
    const [recCategory, setRecCategory] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');

    // Filtrare recomandări
    const filteredLocations = locations.filter(l => l.category === recCategory);

    useEffect(() => {
        const fetchTouristData = async () => {
            const token = searchParams.get("auth");
            if (!token) {
                setAuthError("Scanează codul QR din cameră.");
                setIsInitializing(false);
                return;
            }

            // 1. Fetch Room & Property
            const { data: roomData, error: roomError } = await supabase
                .from('rooms')
                .select('id, property_id, room_number')
                .eq('auth_token', token)
                .single();

            if (roomError || !roomData) {
                setAuthError("Cod QR invalid.");
                setIsInitializing(false);
                return;
            }

            const { data: propertyData } = await supabase
                .from('properties')
                .select('*')
                .eq('id', roomData.property_id)
                .single();

            // 2. Fetch Rules & Recommendations
            const { data: rulesData } = await supabase
                .from('house_rules')
                .select('*')
                .eq('property_id', roomData.property_id)
                .order('order_index', { ascending: true });

            const { data: recData } = await supabase
                .from('recommendations')
                .select('*')
                .eq('property_id', roomData.property_id);

            if (propertyData) {
                setInitData({
                    propertyId: propertyData.id,
                    propertyName: propertyData.name,
                    roomId: roomData.id,
                    roomNumber: roomData.room_number,
                    wifiPassword: propertyData.wifi_password || "Nespecificat",
                    fullRulesText: propertyData.config?.full_rules || "",
                    quickRules: rulesData?.map(r => ({
                        id: r.id,
                        title: r.title,
                        value: r.short_desc || '',
                        iconName: r.icon_name
                    })) || [],
                    locations: recData?.map(r => ({
                        id: r.id,
                        name: r.name,
                        category: r.category,
                        note: r.description || "",
                        mapsLink: r.map_url || ""
                    })) || []
                });
            }
            setIsInitializing(false);
        };
        fetchTouristData();
    }, [searchParams, setInitData]);

    const sendRequest = async () => {
        if (!propertyId || !roomId) return;
        const { error } = await supabase
            .from('alerts')
            .insert({
                property_id: propertyId,
                room_id: roomId,
                category: selectedType,
                status: 'pending'
            });

        if (!error) {
            setScreen("SUCCESS");
            setTimeout(() => { setScreen("HOME"); setNote(""); }, 3000);
        }
    };

    if (isInitializing) return <div className="fixed inset-0 flex items-center justify-center bg-white font-bold uppercase tracking-widest text-slate-400">Încărcare...</div>;
    if (authError) return <div className="fixed inset-0 flex items-center justify-center bg-white p-10 text-center font-bold text-red-500 uppercase">{authError}</div>;

    // --- RENDER ECRANE ---
    if (screen === "HOME") return (
        <div className="fixed inset-0 bg-white overflow-y-auto pb-10">
            <Header title={propertyName} subtitle={`Camera ${roomNumber}`} />
            <div className="px-6 py-6 space-y-3">
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-3 mb-4">
                    <Wifi size={16} className="text-emerald-400" />
                    <span className="text-[10px] font-black tracking-widest uppercase">WIFI: {wifiPassword}</span>
                </div>
                <MenuBtn label="SERVICII CAMERĂ" icon={<Sparkles size={16} />} onClick={() => setScreen("SERVICII_SELECT")} highlight />
                <MenuBtn label="RECOMANDĂRI LOCALE" icon={<MapPin size={16} />} onClick={() => setScreen("RECOMANDARI_SELECT")} />
                <MenuBtn label="REGULILE CASEI" icon={<ScrollText size={16} />} onClick={() => setScreen("REGULI")} />
                <MenuBtn label="ISTORIC & TRADIȚII" icon={<History size={16} />} onClick={() => setScreen("ISTORIC")} />
            </div>
        </div>
    );

    if (screen === "SERVICII_SELECT") return (
        <div className="fixed inset-0 bg-white p-6 overflow-y-auto">
            <Header title="SERVICII" subtitle="Alege solicitarea" />
            <div className="space-y-2 mt-4">
                {["CURĂȚENIE", "SCHIMB PROSOAPE", "REUMPLERE MINI-BAR", "DEFECȚIUNE"].map(t => (
                    <MenuBtn key={t} label={t} onClick={() => { setSelectedType(t); sendRequest(); }} />
                ))}
                <button onClick={() => setScreen("HOME")} className="w-full py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Înapoi</button>
            </div>
        </div>
    );

    if (screen === "REGULI") return (
        <div className="fixed inset-0 bg-white p-6 overflow-y-auto pb-20">
            <Header title="REGULILE CASEI" subtitle="Informații importante" />
            <div className="mt-6 space-y-4">
                {quickRules.map(r => (
                    <div key={r.id} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <h4 className="text-[10px] font-black text-slate-800 uppercase mb-1">{r.title}</h4>
                        <p className="text-xs text-slate-500 font-bold uppercase">{r.value}</p>
                    </div>
                ))}
            </div>
            <button onClick={() => setScreen("HOME")} className="w-full py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest mt-4">Înapoi la meniu</button>
        </div>
    );

    if (screen === "SUCCESS") return (
        <div className="fixed inset-0 bg-white flex flex-col items-center justify-center p-10 text-center">
            <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 size={48} />
            </div>
            <h2 className="text-xl font-black uppercase tracking-tighter">Cerere Trimisă!</h2>
            <p className="text-slate-400 text-[10px] mt-2 font-bold uppercase tracking-widest">Revenim în meniu...</p>
        </div>
    );

    return <div className="p-10 text-center uppercase font-bold text-slate-300">Ecran în lucru... <button onClick={() => setScreen("HOME")} className="block mx-auto mt-4 text-emerald-500">Înapoi</button></div>;
}

export default function TouristPage() {
    return (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-white font-bold uppercase text-slate-300">Inițializare...</div>}>
            <ScanContent />
        </Suspense>
    );
}

// Sub-componente UI
function Header({ title, subtitle }: any) {
    return (
        <div className="pt-10 pb-6 px-6 text-center border-b border-slate-50">
            <h3 className="text-lg font-black text-slate-800 uppercase italic leading-none tracking-tighter">{title}</h3>
            <p className="text-slate-400 text-[9px] mt-2 font-bold tracking-[0.2em] uppercase">{subtitle}</p>
        </div>
    );
}

function MenuBtn({ label, icon, onClick, highlight }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-5 rounded-2xl border transition-all active:scale-[0.97] shadow-sm ${highlight ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-700'}`}>
            {icon && <span className="opacity-40">{icon}</span>}
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}