"use client";
import { useState, useEffect } from "react";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
    Settings, Wifi, Info, ChevronDown, ChevronUp,
    MapPin, Trash2, Plus, Clock, CheckCircle2, AlertCircle, Save, Star, X, HelpCircle, FileText, Share2, Copy
} from "lucide-react";

export default function ManagerMobileView() {
    const {
        propertyId,
        wifiPassword, setWifiPassword,
        alerts,
        locations, addLocation, deleteLocation,
        quickRules, addQuickRule, deleteQuickRule,
        fullRulesText, setFullRules
    } = useStore();

    const [isWifiOpen, setIsWifiOpen] = useState(false);
    const [isLocOpen, setIsLocOpen] = useState(false);
    const [isRegOpen, setIsRegOpen] = useState(false);
    const [isSavingWifi, setIsSavingWifi] = useState(false);

    const [newName, setNewName] = useState("");
    const [newCat, setNewCat] = useState<'RESTAURANT' | 'PRODUCATOR'>('RESTAURANT');
    const [newNote, setNewNote] = useState("");
    const [newLink, setNewLink] = useState("");
    const [newIsSponsored, setNewIsSponsored] = useState(false);
    const [isSavingLoc, setIsSavingLoc] = useState(false);
    const [showMapsTutorial, setShowMapsTutorial] = useState(false);

    const [newRuleTitle, setNewRuleTitle] = useState("");
    const [newRuleValue, setNewRuleValue] = useState("");
    const [isSavingRule, setIsSavingRule] = useState(false);

    const [showFullRulesModal, setShowFullRulesModal] = useState(false);
    const [localFullRules, setLocalFullRules] = useState("");
    const [isSavingFullRules, setIsSavingFullRules] = useState(false);

    useEffect(() => {
        setLocalFullRules(fullRulesText);
    }, [fullRulesText]);


    const handleSaveWifi = async () => {
        if (!propertyId) return;
        setIsSavingWifi(true);
        await supabase.from('properties').update({ wifi_password: wifiPassword }).eq('id', propertyId);
        setIsSavingWifi(false);
        alert("Parola WiFi a fost salvată!");
    };

    const handleSaveLocation = async () => {
        if (!propertyId || !newName) return alert("Numele este obligatoriu!");
        setIsSavingLoc(true);

        try {
            const { data: placeData, error: placeError } = await supabase
                .from('master_places')
                .insert([{ name: newName, category: newCat, maps_url: newLink }])
                .select()
                .single();

            if (placeError) throw placeError;

            if (placeData) {
                const { data: recData, error: recError } = await supabase
                    .from('recommendations')
                    .insert([{
                        property_id: propertyId, place_id: placeData.id,
                        custom_note: newNote, is_sponsored: newIsSponsored, priority: 10
                    }])
                    .select()
                    .single();

                if (recError) throw recError;

                addLocation({
                    id: recData.id, name: newName, category: newCat,
                    note: newNote, mapsLink: newLink, isSponsored: newIsSponsored
                });

                setNewName(""); setNewCat("RESTAURANT"); setNewNote(""); setNewLink(""); setNewIsSponsored(false);
            }
        } catch (error) {
            console.error("Eroare detaliată Supabase:", error);
            alert("Eroare la salvare. Verificați consola (F12) pentru detalii.");
        }
        setIsSavingLoc(false);
    };

    const handleDeleteLocation = async (recId: string) => {
        await supabase.from('recommendations').delete().eq('id', recId);
        deleteLocation(recId);
    };

    const handleSaveQuickRule = async () => {
        if (!propertyId || !newRuleTitle || !newRuleValue) return alert("Completați ambele câmpuri!");
        setIsSavingRule(true);

        try {
            const { data, error } = await supabase
                .from('house_rules')
                .insert([{
                    property_id: propertyId, title: newRuleTitle, short_desc: newRuleValue,
                    icon_name: 'Info', is_quick_info: true, order_index: quickRules.length + 1
                }])
                .select()
                .single();

            if (error) throw error;

            addQuickRule({ id: data.id, title: data.title, value: data.short_desc, iconName: data.icon_name });
            setNewRuleTitle(""); setNewRuleValue("");
        } catch (error) {
            console.error("Eroare detaliată Supabase:", error); alert("Eroare la salvarea regulii.");
        }
        setIsSavingRule(false);
    };

    const handleDeleteQuickRule = async (ruleId: string) => {
        await supabase.from('house_rules').delete().eq('id', ruleId);
        deleteQuickRule(ruleId);
    };

    const handleSaveFullRules = async () => {
        if (!propertyId) return;
        setIsSavingFullRules(true);

        try {
            const { data: propData } = await supabase.from('properties').select('config').eq('id', propertyId).single();
            const currentConfig = propData?.config || {};
            const newConfig = { ...currentConfig, full_rules: localFullRules };

            await supabase.from('properties').update({ config: newConfig }).eq('id', propertyId);
            setFullRules(localFullRules);
            setShowFullRulesModal(false);
        } catch (error) {
            console.error(error); alert("Eroare la salvarea regulamentului.");
        }
        setIsSavingFullRules(false);
    };

    const getStatusStyle = (status: string) => {
        switch (status) {
            case 'in_progress': return { bg: 'bg-blue-500/10', border: 'border-blue-500/30', text: 'text-blue-400', badgeBg: 'bg-blue-500', label: 'PRELUAT', icon: <Clock size={12} /> };
            case 'completed': return { bg: 'bg-emerald-500/5', border: 'border-emerald-500/20', text: 'text-emerald-500', badgeBg: 'bg-emerald-500', label: 'FINALIZAT', icon: <CheckCircle2 size={12} /> };
            default: return { bg: 'bg-orange-500/10', border: 'border-orange-500/30', text: 'text-orange-500', badgeBg: 'bg-orange-500', label: 'CERERE NOUĂ', icon: <AlertCircle size={12} /> };
        }
    };

    return (
        <div className="flex flex-col h-full bg-slate-950 text-slate-200 p-6 pt-8 overflow-hidden font-sans relative">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-black uppercase italic text-emerald-500">Admin Mode</h3>
                <Settings size={18} className="text-slate-500" />
            </div>

            <div className="space-y-4 overflow-y-auto pr-1 pb-20 no-scrollbar">

                {/* --- 1: WIFI --- */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsWifiOpen(!isWifiOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Wifi size={14} /> Setări WiFi</span>
                        {isWifiOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isWifiOpen && (
                        <div className="p-4 pt-0 flex gap-2">
                            <input type="text" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-emerald-400 font-mono text-sm outline-none focus:border-emerald-500" />
                            <button onClick={handleSaveWifi} disabled={isSavingWifi} className="bg-emerald-600 p-2 rounded-lg text-white hover:bg-emerald-500 transition-colors">
                                <Save size={18} />
                            </button>
                        </div>
                    )}
                </div>

                {/* --- 2: RECOMANDĂRI --- */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsLocOpen(!isLocOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><MapPin size={14} /> Recomandări ({locations.length})</span>
                        {isLocOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isLocOpen && (
                        <div className="p-4 pt-0 space-y-4">
                            <div className="bg-slate-950 p-4 rounded-xl border border-emerald-500/20 space-y-3">
                                <h4 className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest mb-2">Adaugă Locație Nouă</h4>
                                <input type="text" placeholder="Nume locație (ex: La Ceaun)" value={newName} onChange={e => setNewName(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-emerald-500" />
                                <div className="flex bg-slate-900 rounded-lg p-1 border border-slate-800">
                                    <button onClick={() => setNewCat('RESTAURANT')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${newCat === 'RESTAURANT' ? 'bg-orange-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Restaurant</button>
                                    <button onClick={() => setNewCat('PRODUCATOR')} className={`flex-1 py-2 text-xs font-bold rounded-md transition-all ${newCat === 'PRODUCATOR' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>Producător</button>
                                </div>
                                <textarea placeholder="De ce recomanzi acest loc?" value={newNote} onChange={e => setNewNote(e.target.value)} rows={2} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-emerald-500 resize-none" />
                                <div className="space-y-1">
                                    <input type="text" placeholder="Link Google Maps" value={newLink} onChange={e => setNewLink(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-slate-400 outline-none focus:border-emerald-500" />
                                    <div className="flex justify-end">
                                        <button onClick={() => setShowMapsTutorial(true)} className="text-[10px] text-blue-400 hover:text-blue-300 underline flex items-center gap-1 transition-colors"><HelpCircle size={10} /> Cum obțin link-ul?</button>
                                    </div>
                                </div>
                                <div className="flex flex-col gap-3 pt-2">
                                    <label className="flex items-center gap-2 text-xs text-slate-400 cursor-pointer">
                                        <input type="checkbox" checked={newIsSponsored} onChange={e => setNewIsSponsored(e.target.checked)} className="accent-orange-500 w-4 h-4" />
                                        <Star size={14} className={newIsSponsored ? "text-orange-500 fill-orange-500" : ""} /> Promovat
                                    </label>
                                    <button onClick={handleSaveLocation} disabled={isSavingLoc} className="w-full bg-emerald-600 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-emerald-500 active:scale-95 transition-all">
                                        {isSavingLoc ? "Se salvează..." : <><Plus size={14} /> Adaugă Locația</>}
                                    </button>
                                </div>
                            </div>
                            <div className="space-y-2 pt-2 border-t border-slate-800">
                                {locations.map(loc => (
                                    <div key={loc.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center group">
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <p className="text-xs font-bold text-slate-200">{loc.name}</p>
                                                {loc.isSponsored && <Star size={10} className="text-orange-500 fill-orange-500" />}
                                            </div>
                                            <p className="text-[9px] font-bold text-slate-500 uppercase tracking-widest">{loc.category}</p>
                                        </div>
                                        <button onClick={() => handleDeleteLocation(loc.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- 3: REGULI --- */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden shrink-0">
                    <button onClick={() => setIsRegOpen(!isRegOpen)} className="w-full p-4 flex items-center justify-between uppercase text-[10px] font-black tracking-widest">
                        <span className="flex items-center gap-2"><Info size={14} /> Reguli ({quickRules.length}/12)</span>
                        {isRegOpen ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                    </button>
                    {isRegOpen && (
                        <div className="p-4 pt-0 space-y-4">
                            <button onClick={() => setShowFullRulesModal(true)} className="w-full bg-blue-600/20 border border-blue-500/50 text-blue-400 font-bold text-xs py-3 rounded-xl flex items-center justify-center gap-2 hover:bg-blue-600/30 transition-colors">
                                <FileText size={14} /> Editează Regulament Complet
                            </button>
                            {quickRules.length < 12 && (
                                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-3">
                                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">Adaugă Regulă Rapidă</h4>
                                    <input type="text" placeholder="Titlu (ex: Fără petreceri)" value={newRuleTitle} onChange={e => setNewRuleTitle(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-emerald-500" />
                                    <input type="text" placeholder="Descriere (ex: După ora 22:00)" value={newRuleValue} onChange={e => setNewRuleValue(e.target.value)} className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white outline-none focus:border-emerald-500" />
                                    <button onClick={handleSaveQuickRule} disabled={isSavingRule} className="w-full bg-slate-800 text-white text-xs font-bold py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-slate-700 active:scale-95 transition-all">
                                        {isSavingRule ? "Se salvează..." : <><Plus size={14} /> Adaugă Regulă</>}
                                    </button>
                                </div>
                            )}
                            <div className="space-y-2 pt-2 border-t border-slate-800">
                                {quickRules.map(rule => (
                                    <div key={rule.id} className="bg-slate-950 border border-slate-800 p-3 rounded-xl flex justify-between items-center">
                                        <div>
                                            <p className="text-xs font-bold text-slate-200">{rule.title}</p>
                                            <p className="text-[9px] text-slate-500 line-clamp-1">{rule.value}</p>
                                        </div>
                                        <button onClick={() => handleDeleteQuickRule(rule.id)} className="p-2 text-slate-600 hover:text-red-500 transition-colors"><Trash2 size={14} /></button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* --- 4: CERERI RECENTE (ALERTE) --- */}
                <div className="mt-6">
                    <h4 className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                        Panou Operațional
                        {alerts.filter(a => a.status === 'pending').length > 0 && <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse"></span>}
                    </h4>
                    <div className="space-y-3">
                        {alerts.length === 0 ? (
                            <p className="text-center text-slate-600 text-[10px] font-bold uppercase py-6">Nicio activitate recentă.</p>
                        ) : (
                            alerts.map((alert) => {
                                const style = getStatusStyle(alert.status);
                                return (
                                    <div key={alert.id} className={`${style.bg} border ${style.border} p-4 rounded-xl transition-colors duration-500 relative overflow-hidden`}>
                                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.badgeBg}`}></div>
                                        <div className="flex justify-between items-start mb-2 pl-2">
                                            <span className={`text-[11px] font-black uppercase italic ${style.text}`}>CAMERĂ {alert.room}</span>
                                            <div className="flex flex-col items-end gap-1.5">
                                                <span className="text-slate-500 font-bold text-[9px]">{alert.time}</span>
                                                <div className={`${style.badgeBg} text-white flex items-center gap-1 px-2 py-0.5 rounded text-[8px] font-black tracking-widest shadow-sm`}>{style.icon} {style.label}</div>
                                            </div>
                                        </div>
                                        <div className="pl-2">
                                            <p className="text-[11px] font-black uppercase text-white tracking-wide">{alert.type}</p>
                                            {alert.note && <p className={`text-[10px] text-slate-400 italic mt-2 border-l-2 ${style.border} pl-2`}>"{alert.note}"</p>}
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                </div>
            </div>

            {/* --- MODAL: REGULAMENT COMPLET --- */}
            {showFullRulesModal && (
                <div className="absolute inset-0 bg-slate-950 z-50 p-6 flex flex-col animate-in slide-in-from-bottom-8 duration-300">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-sm font-black text-blue-400 uppercase tracking-widest">Regulament Complet</h3>
                        <button onClick={() => setShowFullRulesModal(false)} className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
                    </div>
                    <div className="flex-1 flex flex-col min-h-0 pb-4">
                        <p className="text-xs text-slate-400 mb-4 shrink-0">Acesta este textul lung pe care turiștii îl vor citi când apasă "Citește tot regulamentul". Poți folosi Enter pentru paragrafe noi.</p>
                        <textarea value={localFullRules} onChange={e => setLocalFullRules(e.target.value)} className="flex-1 w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-sm text-slate-300 outline-none focus:border-blue-500 resize-none no-scrollbar" placeholder="Introduceți politicile..." />
                    </div>
                    <div className="pt-4 mt-auto shrink-0 border-t border-slate-800">
                        <button onClick={handleSaveFullRules} disabled={isSavingFullRules} className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-colors active:scale-95 flex items-center justify-center gap-2">
                            {isSavingFullRules ? "Se salvează..." : <><Save size={16} /> Salvează</>}
                        </button>
                    </div>
                </div>
            )}

            {/* --- MODAL: TUTORIAL GOOGLE MAPS FĂRĂ IMAGINI --- */}
            {showMapsTutorial && (
                <div className="absolute inset-0 bg-slate-950 z-50 p-6 flex flex-col animate-in slide-in-from-bottom-8 duration-300">
                    <div className="flex items-center justify-between mb-6 shrink-0">
                        <h3 className="text-sm font-black text-emerald-500 uppercase tracking-widest">Ghid Google Maps</h3>
                        <button onClick={() => setShowMapsTutorial(false)} className="p-2 bg-slate-900 rounded-full text-slate-400 hover:text-white transition-colors"><X size={18} /></button>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-4 pr-1 no-scrollbar pb-10">
                        <p className="text-xs text-slate-400 mb-4 leading-relaxed">Pentru a direcționa turiștii corect, ai nevoie de link-ul oficial al locației.</p>

                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-start gap-3">
                            <div className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">1</div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase mb-1">Caută locația</h4>
                                <p className="text-xs text-slate-400 leading-relaxed">Deschide aplicația Google Maps pe telefonul tău și caută restaurantul sau producătorul dorit.</p>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-start gap-3">
                            <div className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">2</div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase mb-1">Apasă Distribuie</h4>
                                <p className="text-xs text-slate-400 leading-relaxed mb-2">În pagina locației, apasă pe butonul <strong className="text-white">„Distribuie” (Share)</strong>.</p>
                                <div className="bg-slate-800/50 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs text-slate-300">
                                    <Share2 size={14} className="text-blue-400" /> Distribuie
                                </div>
                            </div>
                        </div>

                        <div className="bg-slate-900 p-5 rounded-xl border border-slate-800 flex items-start gap-3">
                            <div className="bg-slate-800 w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white shrink-0 mt-0.5">3</div>
                            <div>
                                <h4 className="text-xs font-bold text-white uppercase mb-1">Copiază Linkul</h4>
                                <p className="text-xs text-slate-400 leading-relaxed mb-2">Din lista de opțiuni, alege <strong className="text-white">„Copiază linkul”</strong>, apoi întoarce-te aici și lipește-l în formular.</p>
                                <div className="bg-slate-800/50 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-slate-700/50 text-xs text-slate-300">
                                    <Copy size={14} className="text-emerald-400" /> Copiază linkul
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 mt-auto shrink-0 border-t border-slate-800">
                        <button onClick={() => setShowMapsTutorial(false)} className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold py-4 rounded-xl text-xs uppercase tracking-widest transition-colors active:scale-95">
                            Am înțeles, revin la formular
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}