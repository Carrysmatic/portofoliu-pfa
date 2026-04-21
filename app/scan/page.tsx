"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
    Wifi, Sparkles, ScrollText, MapPin, Map, History,
    ArrowLeft, Send, CheckCircle2, ExternalLink
} from "lucide-react";

// --- 1. DEFINIRE ECRANE ---
type Screen = "HOME" | "SERVICII_SELECT" | "SERVICII_NOTE" | "RECOMANDARI_SELECT" | "RECOMANDARI_LIST" | "REGULI" | "REGULI_FULL" | "TRASEE_SELECT" | "TRASEE_LIST" | "ISTORIC" | "SUCCESS";

export default function TouristMobileView() {
    const searchParams = useSearchParams();

    // --- 2. EXTRACT DATE DIN STORE ---
    const {
        propertyName,    // NOU: Numele pensiunii (din DB)
        roomNumber,      // NOU: Numărul camerei (din DB)
        wifiPassword,
        addAlert,
        locations,
        quickRules,
        fullRulesText,
        setInitData      // NOU: Funcția care încarcă datele
    } = useStore();

    // --- 3. STATE LOCAL PENTRU ÎNCĂRCARE ȘI EROARE ---
    const [isInitializing, setIsInitializing] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);

    const [screen, setScreen] = useState<Screen>("HOME");
    const [selectedType, setSelectedType] = useState("");
    const [note, setNote] = useState("");
    const [recCategory, setRecCategory] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');

    const filteredLocations = locations.filter(l => l.category === recCategory);

    // --- 4. MAGIA: FETCH DATE DIN SUPABASE BAZAT PE URL ---
    useEffect(() => {
        const fetchTouristData = async () => {
            // 1. Citim token-ul din URL (ex: ?auth=TOKEN_SECRET_123)
            const token = searchParams.get("auth");

            if (!token) {
                setAuthError("Scanează codul QR din cameră pentru a accesa serviciile.");
                setIsInitializing(false);
                return;
            }

            // 2. Căutăm camera în Supabase
            const { data: roomData, error: roomError } = await supabase
                .from('rooms')
                .select('id, property_id, room_number')
                .eq('auth_token', token)
                .single();

            if (roomError || !roomData) {
                setAuthError("Cod QR invalid sau expirat.");
                setIsInitializing(false);
                return;
            }

            // 3. Aducem detaliile Pensiunii
            const { data: propertyData, error: propError } = await supabase
                .from('properties')
                .select('id, name, wifi_password, config')
                .eq('id', roomData.property_id)
                .single();

            if (propError || !propertyData) {
                setAuthError("Eroare la încărcarea datelor pensiunii.");
                setIsInitializing(false);
                return;
            }

            // 4. Aducem Regulile Casei 
            const { data: rulesData } = await supabase
                .from('house_rules')
                .select('*')
                .eq('property_id', propertyData.id)
                .order('order_index', { ascending: true });

            // 5. Salvăm totul în Zustand Store
            setInitData({
                propertyId: propertyData.id,
                propertyName: propertyData.name, // Ex: "Pensiunea Demo"
                roomId: roomData.id,
                roomNumber: roomData.room_number, // Ex: "Camera 101"
                wifiPassword: propertyData.wifi_password || "Fără parolă",
                fullRulesText: propertyData.config?.full_rules || "",
                quickRules: rulesData ? rulesData.map(r => ({
                    id: r.id,
                    title: r.title,
                    value: r.short_desc || '',
                    iconName: r.icon_name
                })) : [],
                locations: [] // Recomandările le putem adăuga mai târziu
            });

            setIsInitializing(false); // Oprim loading-ul!
        };

        fetchTouristData();
    }, [searchParams, setInitData]);

    // --- 5. LOGICĂ TRIMITE SOLICITARE ---
    const sendRequest = () => {
        // Aici pe viitor vom trimite datele reale în tabelul 'alerts' din Supabase!
        addAlert({
            id: Math.random().toString(),
            room: roomNumber, // Folosim numărul real al camerei!
            type: selectedType,
            note: note,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
        setScreen("SUCCESS");
        setTimeout(() => {
            setScreen("HOME");
            setNote("");
            setSelectedType("");
        }, 3000);
    };

    // ==========================================
    // ECRANE DE ÎNCĂRCARE / EROARE
    // ==========================================
    if (isInitializing) {
        return (
            <div className="flex flex-col h-full bg-white items-center justify-center p-6">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500 mb-4"></div>
                <p className="text-sm text-slate-500 font-bold uppercase tracking-widest">Pregătim experiența...</p>
            </div>
        );
    }

    if (authError) {
        return (
            <div className="flex flex-col h-full bg-white items-center justify-center p-10 text-center">
                <div className="w-16 h-16 bg-red-50 rounded-full flex items-center justify-center text-red-500 mb-4">
                    <span className="font-black text-2xl">!</span>
                </div>
                <h2 className="text-lg font-black uppercase tracking-tight text-slate-800">Acces Respins</h2>
                <p className="text-slate-500 text-xs mt-2 font-medium uppercase tracking-tight">{authError}</p>
            </div>
        );
    }

    // ==========================================
    // ECRAN: HOME (MENIU PRINCIPAL)
    // ==========================================
    if (screen === "HOME") return (
        <div className="flex flex-col h-full bg-white animate-in fade-in">
            {/* AICI ESTE SCHIMBAREA MAJORA: Folosim variabile dinamice */}
            <Header title={propertyName} subtitle={roomNumber} />

            <div className="px-6 py-6 space-y-3">
                <div className="bg-slate-900 text-white p-4 rounded-xl flex items-center gap-3 mb-4">
                    <Wifi size={16} className="text-emerald-400" />
                    <span className="text-[10px] font-black tracking-widest">
                        <span className="uppercase opacity-50 mr-1">WIFI:</span> {wifiPassword}
                    </span>
                </div>

                <MenuBtn label="SERVICII CAMERĂ" icon={<Sparkles size={16} />} onClick={() => setScreen("SERVICII_SELECT")} highlight />
                <MenuBtn label="RECOMANDĂRI LOCALE" icon={<MapPin size={16} />} onClick={() => setScreen("RECOMANDARI_SELECT")} />
                <MenuBtn label="REGULILE CASEI" icon={<ScrollText size={16} />} onClick={() => setScreen("REGULI")} />
                <MenuBtn label="TRASEE & ACTIVITĂȚI" icon={<Map size={16} />} onClick={() => setScreen("TRASEE_SELECT")} />
                <MenuBtn label="ISTORIC & TRADIȚII" icon={<History size={16} />} onClick={() => setScreen("ISTORIC")} />
            </div>
        </div>
    );

    // ... RESTUL ECRANELOR RĂMÂN IDENTICE CU CE AVEAI ÎNAINTE PÂNĂ JOS ...
    // Le poți lăsa exact cum erau în codul tău original de la linia cu "TRASEE_SELECT".

    // De dragul conciziei am lăsat doar HOME vizibil aici, tu vei păstra toate "if (screen === ...)" pe care le aveai!
    return null; // Fallback
}

// --- SUB-COMPONENTE ---
function Header({ title, subtitle }: any) {
    return (
        <div className="pt-14 pb-6 px-6 text-center border-b border-slate-50">
            <h3 className="text-lg font-black text-slate-800 italic uppercase leading-none tracking-tighter">{title}</h3>
            <p className="text-slate-400 text-[9px] mt-2 font-bold tracking-[0.2em] uppercase">{subtitle}</p>
        </div>
    );
}

function MenuBtn({ label, icon, onClick, highlight }: any) {
    return (
        <button onClick={onClick} className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl border transition-all active:scale-[0.97] shadow-sm ${highlight ? 'bg-emerald-50 border-emerald-100 text-emerald-700' : 'bg-white border-slate-100 text-slate-700'}`}>
            {icon && <span className="opacity-40">{icon}</span>}
            <span className="text-[10px] font-black uppercase tracking-widest">{label}</span>
        </button>
    );
}