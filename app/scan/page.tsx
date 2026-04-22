"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import * as LucideIcons from "lucide-react";
import {
    Wifi, Sparkles, ScrollText, MapPin, History,
    ArrowLeft, CheckCircle2, Info, Utensils, ShoppingBag, ExternalLink
} from "lucide-react";

function ScanContent() {
    const searchParams = useSearchParams();
    const {
        propertyId, roomId, propertyName, roomNumber,
        wifiPassword, quickRules, locations, setInitData
    } = useStore();

    const [isInitializing, setIsInitializing] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [screen, setScreen] = useState("HOME");
    const [selectedType, setSelectedType] = useState("");

    useEffect(() => {
        const fetchTouristData = async () => {
            const token = searchParams.get("auth");
            if (!token) {
                setAuthError("Scanează codul QR din cameră.");
                setIsInitializing(false);
                return;
            }

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

            // Fetch Regulament
            const { data: rulesData } = await supabase
                .from('house_rules')
                .select('*')
                .eq('property_id', roomData.property_id)
                .eq('is_quick_info', true)
                .order('order_index', { ascending: true })
                .limit(12);

            // Fetch Recomandări cu JOIN pe master_places (Arhitectura ta B2B)
            const { data: recData } = await supabase
                .from('recommendations')
                .select(`
                    id,
                    custom_note,
                    priority,
                    master_places (
                        name,
                        category,
                        maps_url
                    )
                `)
                .eq('property_id', roomData.property_id)
                .order('priority', { ascending: true });

            if (propertyData) {
                setInitData({
                    propertyId: propertyData.id,
                    propertyName: propertyData.name,
                    roomId: roomData.id,
                    roomNumber: roomData.room_number,
                    wifiPassword: propertyData.wifi_password || "Nespecificat",
                    quickRules: rulesData?.map(r => ({
                        id: r.id,
                        title: r.title,
                        value: r.short_desc || '',
                        iconName: r.icon_name || 'Info'
                    })) || [],
                    // Mapăm datele din JOIN în structura locală
                    locations: recData?.map(r => ({
                        id: r.id,
                        name: (r.master_places as any)?.name || "Locație",
                        category: (r.master_places as any)?.category || "RESTAURANT",
                        note: r.custom_note || "",
                        mapsLink: (r.master_places as any)?.maps_url || "#"
                    })) || [],
                    fullRulesText: propertyData.config?.full_rules || ""
                });
            }
            setIsInitializing(false);
        };
        fetchTouristData();
    }, [searchParams, setInitData]);

    const sendRequest = async () => {
        if (!propertyId || !roomId) return;
        const { error } = await supabase.from('alerts').insert({
            property_id: propertyId,
            room_id: roomId,
            category: selectedType,
            status: 'pending'
        });
        if (!error) {
            setScreen("SUCCESS");
            setTimeout(() => setScreen("HOME"), 3000);
        }
    };

    if (isInitializing) return <div className="fixed inset-0 flex items-center justify-center bg-white font-bold text-slate-400 uppercase tracking-widest text-xs">Se încarcă experiența...</div>;
    if (authError) return <div className="fixed inset-0 flex items-center justify-center bg-white p-10 text-center font-bold text-red-500 uppercase text-xs">{authError}</div>;

    // Filtre pentru ecrane specifice
    const restaurants = locations.filter(l => l.category === 'RESTAURANT');
    const producers = locations.filter(l => l.category === 'PRODUCATOR');

    return (
        <div className="fixed inset-0 bg-[#F8FAFC] overflow-y-auto pb-10 font-sans text-slate-900">
            {/* HEADER */}
            <div className="sticky top-0 bg-white/80 backdrop-blur-md border-b border-slate-100 p-6 text-center z-50">
                <h3 className="text-sm font-black uppercase tracking-tighter italic">{propertyName}</h3>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">Camera {roomNumber}</p>
            </div>

            {/* SCREEN: HOME */}
            {screen === "HOME" && (
                <div className="p-6 space-y-4 animate-in fade-in duration-500">
                    <div className="bg-slate-900 text-white p-5 rounded-3xl flex items-center justify-between shadow-xl shadow-slate-200">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-slate-800 rounded-2xl flex items-center justify-center">
                                <Wifi size={20} className="text-emerald-400" />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-slate-400 uppercase">WiFi Gratuit</p>
                                <p className="text-sm font-black tracking-wide">{wifiPassword}</p>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3">
                        <MenuAction label="Solicită Servicii" icon={<Sparkles size={20} />} onClick={() => setScreen("SERVICII")} highlight />
                        <MenuAction label="Regulile Casei" icon={<ScrollText size={20} />} onClick={() => setScreen("REGULI")} />
                        <MenuAction label="Recomandări Locale" icon={<MapPin size={20} />} onClick={() => setScreen("RECOMANDARI")} />
                        <MenuAction label="Istorie & Tradiții" icon={<History size={20} />} onClick={() => setScreen("ISTORIE")} />
                    </div>
                </div>
            )}

            {/* SCREEN: REGULI */}
            {screen === "REGULI" && (
                <div className="p-6 animate-in slide-in-from-bottom-10 duration-500">
                    <HeaderWithBack title="Regulile Casei" onBack={() => setScreen("HOME")} />
                    <div className="grid grid-cols-2 gap-3">
                        {quickRules.map((rule) => (
                            <div key={rule.id} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center text-center gap-3">
                                <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                                    <DynamicIcon name={rule.iconName || 'Info'} />
                                </div>
                                <div>
                                    <h4 className="text-[10px] font-black uppercase tracking-tight text-slate-800 leading-tight mb-1">{rule.title}</h4>
                                    <p className="text-[9px] font-bold text-slate-400 uppercase leading-relaxed">{rule.value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* SCREEN: RECOMANDARI (Implementarea JOIN-ului) */}
            {screen === "RECOMANDARI" && (
                <div className="p-6 animate-in slide-in-from-bottom-10 duration-500">
                    <HeaderWithBack title="Gustul Local" onBack={() => setScreen("HOME")} />

                    <div className="space-y-8">
                        {/* Secțiunea Restaurante - Date extrase prin JOIN */}
                        {locations.filter(l => l.category === 'RESTAURANT').length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Restaurante recomandate</h4>
                                <div className="space-y-3">
                                    {locations.filter(l => l.category === 'RESTAURANT').map(r => (
                                        <RecommendationCard key={r.id} item={r} icon={<LucideIcons.Utensils size={18} />} />
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Secțiunea Producători */}
                        {locations.filter(l => l.category === 'PRODUCATOR').length > 0 && (
                            <div>
                                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 ml-2">Producători Locali</h4>
                                <div className="space-y-3">
                                    {locations.filter(l => l.category === 'PRODUCATOR').map(p => (
                                        <RecommendationCard key={p.id} item={p} icon={<LucideIcons.ShoppingBag size={18} />} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* SCREEN: SUCCESS */}
            {screen === "SUCCESS" && (
                <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-10 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 size={48} />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none">Solicitare<br />Trimisă</h2>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">Personalul nostru a fost notificat și va interveni imediat.</p>
                </div>
            )}
        </div>
    );
}

// COMPONENTE HELPER
function HeaderWithBack({ title, onBack }: any) {
    return (
        <div className="flex items-center gap-4 mb-8">
            <button onClick={onBack} className="w-10 h-10 bg-white rounded-2xl flex items-center justify-center shadow-sm border border-slate-100 active:scale-90 transition-all">
                <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-black uppercase tracking-tighter">{title}</h2>
        </div>
    );
}

function MenuAction({ label, icon, onClick, highlight }: any) {
    return (
        <button onClick={onClick} className={`flex items-center justify-between p-5 rounded-[2rem] border transition-all active:scale-[0.98] ${highlight ? 'bg-emerald-50 border-emerald-100 text-emerald-700 shadow-lg shadow-emerald-100/50' : 'bg-white border-slate-100 text-slate-700 shadow-sm'}`}>
            <div className="flex items-center gap-4">
                <span className="opacity-60">{icon}</span>
                <span className="font-black uppercase text-[11px] tracking-widest">{label}</span>
            </div>
            <ArrowLeft size={16} className="rotate-180 opacity-20" />
        </button>
    );
}

function RecommendationCard({ item, icon }: any) {
    return (
        <div className="bg-white p-5 rounded-[2.5rem] border border-slate-100 shadow-sm flex flex-col gap-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-400">
                        {icon}
                    </div>
                    <h3 className="font-black uppercase text-xs tracking-tight">{item.name}</h3>
                </div>
                <a href={item.mapsLink} target="_blank" className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center active:scale-90 transition-all">
                    <ExternalLink size={16} />
                </a>
            </div>
            <p className="text-[10px] text-slate-400 font-bold uppercase leading-relaxed px-1">
                {item.note}
            </p>
        </div>
    );
}

function DynamicIcon({ name }: { name: string }) {
    const IconComponent = (LucideIcons as any)[name] || LucideIcons.Info;
    return <IconComponent size={24} />;
}

export default function TouristView() {
    return (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-white font-bold text-slate-300">INIȚIALIZARE...</div>}>
            <ScanContent />
        </Suspense>
    );
}