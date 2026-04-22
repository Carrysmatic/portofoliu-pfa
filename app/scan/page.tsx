"use client";
import { useState, useEffect, Suspense } from "react"; // Adăugăm Suspense
import { useSearchParams } from "next/navigation";
import { useStore } from "@/lib/store";
import { supabase } from "@/lib/supabase";
import {
    Wifi, Sparkles, ScrollText, MapPin, Map, History,
    ArrowLeft, Send, CheckCircle2
} from "lucide-react";

// --- 1. MUTĂM TOATĂ LOGICA AICI ---
function ScanContent() {
    const searchParams = useSearchParams();
    const {
        propertyId, roomId, propertyName, roomNumber,
        wifiPassword, locations, setInitData
    } = useStore();

    const [isInitializing, setIsInitializing] = useState(true);
    const [authError, setAuthError] = useState<string | null>(null);
    const [screen, setScreen] = useState<any>("HOME");
    const [selectedType, setSelectedType] = useState("");
    const [note, setNote] = useState("");

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
                .select('id, name, wifi_password')
                .eq('id', roomData.property_id)
                .single();

            if (propertyData) {
                setInitData({
                    propertyId: propertyData.id,
                    propertyName: propertyData.name,
                    roomId: roomData.id,
                    roomNumber: roomData.room_number,
                    wifiPassword: propertyData.wifi_password || "Fără parolă",
                    fullRulesText: "",
                    quickRules: [],
                    locations: []
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

    if (isInitializing) return <div className="p-20 text-center">Se încarcă...</div>;
    if (authError) return <div className="p-20 text-center text-red-500">{authError}</div>;

    // Aici vine restul UI-ului tău (Return-ul cu HOME, SERVICII, etc.)
    if (screen === "HOME") return (
        <div className="fixed inset-0 bg-white p-6">
            <h1 className="text-xl font-black uppercase mb-4">{propertyName}</h1>
            <p className="text-xs text-slate-400 mb-6 uppercase tracking-widest">Camera {roomNumber}</p>
            <button onClick={() => setScreen("SERVICII_SELECT")} className="w-full p-6 bg-emerald-50 text-emerald-700 rounded-2xl font-bold uppercase tracking-widest border border-emerald-100">
                Servicii Cameră
            </button>
        </div>
    );

    if (screen === "SERVICII_SELECT") return (
        <div className="fixed inset-0 bg-white p-6">
            <button onClick={() => { setSelectedType("CURĂȚENIE"); sendRequest(); }} className="w-full p-6 bg-slate-900 text-white rounded-2xl font-bold uppercase mb-4">
                Solicită Curățenie
            </button>
            <button onClick={() => setScreen("HOME")} className="w-full py-4 text-slate-400 font-bold">Înapoi</button>
        </div>
    );

    if (screen === "SUCCESS") return <div className="fixed inset-0 bg-white flex items-center justify-center font-bold text-emerald-500">Solicitare Trimisă!</div>;

    return null;
}

// --- 2. EXPORTUL PRINCIPAL TREBUIE SĂ FIE AȘA ---
export default function TouristMobileView() {
    return (
        <Suspense fallback={<div className="p-20 text-center">Se încarcă modulul...</div>}>
            <ScanContent />
        </Suspense>
    );
}