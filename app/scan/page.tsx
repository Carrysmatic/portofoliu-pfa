"use client";
import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import * as LucideIcons from "lucide-react";
import {
    Wifi, BellRing, Info, Utensils, Mountain, Map,
    ArrowLeft, CheckCircle2, Waves, BedDouble, Sparkles,
    Droplets, Coffee, MapPin, ChevronRight, Star
} from "lucide-react";

function ScanContent() {
    const searchParams = useSearchParams();
    const {
        propertyId, roomId, propertyName, roomNumber,
        wifiPassword, quickRules, locations, setInitData, fullRulesText
    } = useStore();

    // --- STATES ---
    const [isInitializing, setIsInitializing] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [screen, setScreen] = useState("HOME");

    // States specifice pentru module
    const [showWifi, setShowWifi] = useState(false);
    const [selectedService, setSelectedService] = useState<string | null>(null);
    const [serviceNote, setServiceNote] = useState("");
    const [loading, setLoading] = useState(false);
    const [showFullRules, setShowFullRules] = useState(false);
    const [recCategory, setRecCategory] = useState<string | null>(null); // Pentru a separa Restaurante de Producatori

    // --- INITIALIZARE DATE ---
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

            const { data: rulesData } = await supabase
                .from('house_rules')
                .select('*')
                .eq('property_id', roomData.property_id)
                .eq('is_quick_info', true)
                .order('order_index', { ascending: true })
                .limit(12);

            const { data: recData } = await supabase
                .from('recommendations')
                .select(`
                    id, custom_note, priority, is_sponsored,
                    master_places (name, category, maps_url, base_image)
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
                    locations: recData?.map(r => ({
                        id: r.id,
                        name: (r.master_places as any)?.name || "Locație",
                        category: (r.master_places as any)?.category || "RESTAURANT",
                        note: r.custom_note || "",
                        mapsLink: (r.master_places as any)?.maps_url || "#",
                        isSponsored: r.is_sponsored || false
                    })) || [],
                    fullRulesText: propertyData.config?.full_rules || ""
                });
            }
            setIsInitializing(false);
        };
        fetchTouristData();
    }, [searchParams, setInitData]);

    // --- ACTIUNI ---
    const handleWifiClick = () => {
        if (!showWifi) {
            setShowWifi(true);
        } else {
            navigator.clipboard.writeText(wifiPassword);
            alert("Parola a fost copiată!");
        }
    };

    const handleSendAlert = async () => {
        setLoading(true);
        // NOTĂ: Asigură-te că adaugi coloana 'notes' în tabelul 'alerts' în Supabase!
        const { error } = await supabase.from('alerts').insert({
            property_id: propertyId,
            room_id: roomId,
            category: selectedService,
            notes: serviceNote,
            status: 'pending'
        });

        if (!error) {
            setScreen("SUCCESS");
            setServiceNote("");
            setSelectedService(null);
            setTimeout(() => setScreen("HOME"), 3000);
        } else {
            alert("Eroare la trimitere.");
            console.error(error);
        }
        setLoading(false);
    };

    // --- RANDARE ---
    if (isInitializing) return <div className="fixed inset-0 flex items-center justify-center bg-white font-bold text-slate-400 uppercase tracking-widest text-xs">Se încarcă...</div>;
    if (authError) return <div className="fixed inset-0 flex items-center justify-center bg-white p-10 text-center font-bold text-red-500 uppercase text-xs">{authError}</div>;

    return (
        <div className="fixed inset-0 bg-white overflow-y-auto pb-10 font-sans text-slate-900">

            {/* SCREEN: HOME */}
            {screen === "HOME" && (
                <div className="h-full w-full flex flex-col p-5 pt-12 gap-6 animate-in fade-in duration-300">
                    <div className="flex flex-col items-center text-center gap-1 mb-2">
                        <div className="w-12 h-12 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mb-2">
                            <Wifi className="w-6 h-6" />
                        </div>
                        <h2 className="text-slate-900 text-2xl font-black leading-tight">{propertyName}</h2>
                        <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Camera {roomNumber}</p>
                    </div>

                    <div className="space-y-3">
                        <button
                            onClick={handleWifiClick}
                            className={`w-full py-4 rounded-xl font-bold flex items-center justify-center px-4 gap-3 text-sm transition-all ${showWifi ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-slate-900 text-white'}`}
                        >
                            <Wifi className={`w-5 h-5 ${showWifi ? 'text-emerald-500' : 'text-emerald-400'}`} />
                            {showWifi ? `Parola: ${wifiPassword}` : "Vezi parola WiFi"}
                        </button>

                        <MenuButton icon={<BellRing className="w-5 h-5 text-amber-500" />} label="Solicită Servicii" onClick={() => setScreen("SERVICII")} />
                        <MenuButton icon={<Info className="w-5 h-5 text-blue-500" />} label="Regulile Casei" onClick={() => { setScreen("REGULI"); setShowFullRules(false); }} />
                        <MenuButton icon={<Utensils className="w-5 h-5 text-orange-500" />} label="Gustul Local" onClick={() => { setScreen("RECOMANDARI"); setRecCategory(null); }} />
                        <MenuButton icon={<Mountain className="w-5 h-5 text-emerald-600" />} label="Trasee & Activități" onClick={() => setScreen("TRASEE_PLACEHOLDER")} />
                        <MenuButton icon={<Map className="w-5 h-5 text-purple-500" />} label="Istoric & Tradiții" onClick={() => setScreen("ISTORIC_PLACEHOLDER")} />
                    </div>
                </div>
            )}

            {/* SCREEN: SERVICII */}
            {screen === "SERVICII" && (
                <div className="flex flex-col p-5 pt-12 gap-4 animate-in slide-in-from-right-4 duration-300">
                    <HeaderWithBack title={selectedService ? "Detalii Solicitare" : "Ce aveți nevoie?"} subtitle="Room Service" onBack={() => selectedService ? setSelectedService(null) : setScreen("HOME")} />

                    {!selectedService ? (
                        <div className="space-y-3 mt-4">
                            <ServiceButton id="PROSOAPE" label="Schimb prosoape" icon={<Waves className="text-blue-500" />} onClick={setSelectedService} />
                            <ServiceButton id="ASTERNUTURI" label="Schimbare așternuturi" icon={<BedDouble className="text-emerald-500" />} onClick={setSelectedService} />
                            <ServiceButton id="CURATENIE" label="Curățenie completă" icon={<Sparkles className="text-amber-500" />} onClick={setSelectedService} />
                            <ServiceButton id="CONSUMABILE" label="Săpun / Hârtie igienică" icon={<Droplets className="text-purple-500" />} onClick={setSelectedService} />
                            <ServiceButton id="MINIBAR" label="Refill Mini-bar" icon={<Coffee className="text-orange-500" />} onClick={setSelectedService} />
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 mt-4 h-full">
                            <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 flex items-center gap-3">
                                <CheckCircle2 className="text-emerald-500 w-6 h-6" />
                                <div>
                                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest">Ați selectat</p>
                                    <p className="font-black text-sm">{selectedService.replace('_', ' ')}</p>
                                </div>
                            </div>
                            <div className="flex flex-col gap-2">
                                <label className="text-slate-900 font-bold text-sm">Adăugați o notă (opțional):</label>
                                <textarea
                                    className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all resize-none"
                                    rows={5}
                                    placeholder="Ex: Suntem plecați din cameră, puteți intra după ora 12:00."
                                    value={serviceNote}
                                    onChange={(e) => setServiceNote(e.target.value)}
                                />
                            </div>
                            <button onClick={handleSendAlert} disabled={loading} className="w-full py-4 bg-slate-900 text-white rounded-xl font-bold flex items-center justify-center gap-3 text-sm mt-8 active:scale-[0.98] transition-all disabled:opacity-50">
                                {loading ? "Se trimite..." : "Trimite Solicitarea"}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* SCREEN: REGULI */}
            {screen === "REGULI" && (
                <div className="flex flex-col p-5 pt-12 gap-4 animate-in slide-in-from-right-4 duration-300">
                    <HeaderWithBack title={showFullRules ? "Regulament Complet" : "Regulile Casei"} subtitle="Informații utile" onBack={() => showFullRules ? setShowFullRules(false) : setScreen("HOME")} />

                    {!showFullRules ? (
                        <>
                            <div className="grid grid-cols-2 gap-3 mt-4">
                                {quickRules.map((rule) => (
                                    <div key={rule.id} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex flex-col items-center text-center gap-2">
                                        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-500 shadow-sm">
                                            <DynamicIcon name={rule.iconName || 'Info'} />
                                        </div>
                                        <div>
                                            <h4 className="text-[10px] font-black uppercase tracking-tight text-slate-800 leading-tight mb-1">{rule.title}</h4>
                                            <p className="text-[9px] font-bold text-slate-400 uppercase leading-snug">{rule.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <button onClick={() => setShowFullRules(true)} className="w-full mt-4 py-4 bg-slate-100 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-3 text-sm active:scale-[0.98] transition-all">
                                Citește tot regulamentul
                            </button>
                        </>
                    ) : (
                        <div className="prose prose-slate prose-sm max-w-none bg-slate-50 p-6 rounded-2xl border border-slate-100 mt-4 leading-relaxed">
                            {fullRulesText ? (
                                <div dangerouslySetInnerHTML={{ __html: fullRulesText.replace(/\n/g, '<br/>') }} />
                            ) : (
                                "Regulamentul detaliat nu a fost adăugat încă."
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* SCREEN: RECOMANDARI (Restaurante / Producatori) */}
            {screen === "RECOMANDARI" && (
                <div className="flex flex-col p-5 pt-12 gap-4 animate-in slide-in-from-right-4 duration-300">
                    <HeaderWithBack title={recCategory ? (recCategory === 'RESTAURANT' ? 'Restaurante' : 'Producători Locali') : "Gustul Local"} subtitle="Recomandările noastre" onBack={() => recCategory ? setRecCategory(null) : setScreen("HOME")} />

                    {!recCategory ? (
                        <div className="space-y-3 mt-4">
                            <MenuButton icon={<Utensils className="w-6 h-6 text-orange-500" />} label="Unde mâncăm? (Restaurante)" onClick={() => setRecCategory('RESTAURANT')} />
                            <MenuButton icon={<MapPin className="w-6 h-6 text-emerald-600" />} label="Producători & Suveniruri" onClick={() => setRecCategory('PRODUCATOR')} />
                        </div>
                    ) : (
                        <div className="space-y-4 mt-4">
                            {locations.filter(l => l.category === recCategory).map(item => (
                                <div key={item.id} className={`p-5 rounded-2xl border ${item.isSponsored ? 'bg-orange-50 border-orange-200' : 'bg-slate-50 border-slate-100'} flex flex-col gap-3 shadow-sm`}>
                                    <div className="flex items-start justify-between gap-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <h3 className="font-black text-lg text-slate-900 leading-tight">{item.name}</h3>
                                                {item.isSponsored && <Star className="w-4 h-4 text-orange-500 fill-orange-500" />}
                                            </div>
                                            <p className="text-xs text-slate-600 leading-relaxed">{item.note}</p>
                                        </div>
                                    </div>
                                    <a href={item.mapsLink} target="_blank" className="mt-2 w-full py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold flex items-center justify-center gap-2 text-xs uppercase tracking-widest active:scale-[0.98] transition-all">
                                        <MapPin className="w-4 h-4 text-blue-500" /> Deschide în Maps
                                    </a>
                                </div>
                            ))}
                            {locations.filter(l => l.category === recCategory).length === 0 && (
                                <div className="text-center p-8 text-slate-400 font-bold text-sm">Nu există recomandări în această categorie momentan.</div>
                            )}
                        </div>
                    )}
                </div>
            )}

            {/* SCREEN: PLACEHOLDERS */}
            {screen === "TRASEE_PLACEHOLDER" && (
                <div className="flex flex-col p-5 pt-12 gap-4 animate-in slide-in-from-right-4 duration-300">
                    <HeaderWithBack title="Trasee & Activități" subtitle="Descoperă zona" onBack={() => setScreen("HOME")} />
                    <div className="space-y-3 mt-4">
                        <MenuButton icon={<Mountain className="w-5 h-5 text-emerald-500" />} label="Trasee Turistice" onClick={() => alert("Va deschide Sub-Meniu: Ușoare / Dificile")} />
                        <MenuButton icon={<Star className="w-5 h-5 text-purple-500" />} label="Activități de Agrement" onClick={() => alert("Va deschide Sub-Meniu: Relaxare / Adrenalină")} />
                    </div>
                </div>
            )}

            {screen === "ISTORIC_PLACEHOLDER" && (
                <div className="flex flex-col p-5 pt-12 gap-4 animate-in slide-in-from-right-4 duration-300">
                    <HeaderWithBack title="Istoric & Tradiții" subtitle="Povestea locului" onBack={() => setScreen("HOME")} />
                    <div className="space-y-3 mt-4">
                        <MenuButton icon={<Map className="w-5 h-5 text-amber-700" />} label="Muzee și Monumente" onClick={() => alert("Va deschide lista tip pergament")} />
                        <MenuButton icon={<Info className="w-5 h-5 text-amber-600" />} label="Legende Locale" onClick={() => alert("Va deschide lista tip pergament")} />
                    </div>
                </div>
            )}

            {/* SCREEN: SUCCESS */}
            {screen === "SUCCESS" && (
                <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center p-10 text-center animate-in zoom-in-95 duration-300">
                    <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6 shadow-inner">
                        <CheckCircle2 className="w-12 h-12" />
                    </div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter leading-none text-slate-900">Solicitare<br />Trimisă</h2>
                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-widest mt-4">Personalul a fost notificat și va interveni curând.</p>
                </div>
            )}
        </div>
    );
}

// --- COMPONENTE HELPER ---

function HeaderWithBack({ title, subtitle, onBack }: { title: string, subtitle: string, onBack: () => void }) {
    return (
        <div className="flex items-center gap-4 mb-2">
            <button onClick={onBack} className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-200 active:scale-95 transition-all shrink-0">
                <ArrowLeft className="w-5 h-5 text-slate-600" />
            </button>
            <div>
                <h2 className="text-slate-900 text-xl font-black leading-tight">{title}</h2>
                <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">{subtitle}</p>
            </div>
        </div>
    );
}

function MenuButton({ icon, label, onClick }: { icon: React.ReactNode, label: string, onClick: () => void }) {
    return (
        <button onClick={onClick} className="w-full py-4 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center justify-between px-4 text-sm active:bg-slate-100 transition-colors">
            <div className="flex items-center gap-3">
                {icon}
                <span>{label}</span>
            </div>
            <ChevronRight className="w-4 h-4 text-slate-400" />
        </button>
    );
}

function ServiceButton({ id, label, icon, onClick }: { id: string, label: string, icon: React.ReactNode, onClick: (id: string) => void }) {
    return (
        <button onClick={() => onClick(id)} className="w-full py-4 bg-slate-50 text-slate-700 rounded-xl font-bold border border-slate-200 flex items-center px-4 gap-4 text-sm active:bg-slate-100 transition-colors">
            <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center shadow-sm border border-slate-100 shrink-0">
                {icon}
            </div>
            {label}
        </button>
    );
}

function DynamicIcon({ name }: { name: string }) {
    const IconComponent = (LucideIcons as any)[name] || LucideIcons.Info;
    return <IconComponent className="w-6 h-6" />;
}

export default function TouristView() {
    return (
        <Suspense fallback={<div className="fixed inset-0 flex items-center justify-center bg-white font-bold text-slate-300">INIȚIALIZARE...</div>}>
            <ScanContent />
        </Suspense>
    );
}