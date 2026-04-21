import { create } from 'zustand';

export interface Location {
    id: string;
    name: string;
    category: 'RESTAURANT' | 'PRODUCATOR';
    note: string;
    mapsLink: string;
}

export interface QuickRule {
    id: string;
    title: string;
    value: string; // Aici vom pune 'short_desc' din Supabase
    iconName?: string;
}

interface AppState {
    // --- CONTEXT SESIUNE (NOU) ---
    propertyId: string | null;
    propertyName: string;
    roomNumber: string | null;
    roomId: string | null;

    // --- DATE PENTRU INTERFAȚĂ ---
    wifiPassword: string;
    fullRulesText: string;
    quickRules: QuickRule[];
    locations: Location[];
    alerts: any[];

    // --- ACȚIUNEA PRINCIPALĂ DE INIȚIALIZARE (NOU) ---
    // Asta va fi apelată imediat ce descifrăm "Cheia Invizibilă" din URL
    setInitData: (data: {
        propertyId: string;
        propertyName: string;
        roomNumber: string;
        roomId: string;
        wifiPassword: string;
        fullRulesText: string;
        quickRules: QuickRule[];
        locations: Location[];
    }) => void;

    // --- ACȚIUNI EXISTENTE (Pentru funcționarea interfeței) ---
    addAlert: (alert: any) => void;
    // ... păstrăm restul acțiunilor de care ai nevoie în aplicație
    setWifiPassword: (password: string) => void;
    addLocation: (loc: Location) => void;
    deleteLocation: (id: string) => void;
    addQuickRule: (rule: QuickRule) => void;
    deleteQuickRule: (id: string) => void;
    setFullRules: (text: string) => void;
}

export const useStore = create<AppState>((set) => ({
    // 1. PORNIM CU STAREA GOALĂ (Așteptăm datele reale)
    propertyId: null,
    propertyName: "Se încarcă...", // Un text provizoriu bun pentru Header
    roomNumber: null,
    roomId: null,
    wifiPassword: "...",
    fullRulesText: "",
    quickRules: [],
    locations: [],
    alerts: [],

    // 2. INJECTĂM TOATE DATELE DEODATĂ
    setInitData: (data) => set({
        propertyId: data.propertyId,
        propertyName: data.propertyName,
        roomNumber: data.roomNumber,
        roomId: data.roomId,
        wifiPassword: data.wifiPassword,
        fullRulesText: data.fullRulesText || "",
        quickRules: data.quickRules,
        locations: data.locations
    }),

    // 3. LOGICA EXISTENTĂ
    setWifiPassword: (password) => set({ wifiPassword: password }),
    addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
    addLocation: (loc) => set((state) => ({ locations: [...state.locations, loc] })),
    deleteLocation: (id) => set((state) => ({
        locations: state.locations.filter(loc => loc.id !== id)
    })),
    addQuickRule: (rule) => set((state) => ({
        quickRules: state.quickRules.length < 12 ? [...state.quickRules, rule] : state.quickRules
    })),
    deleteQuickRule: (id) => set((state) => ({
        quickRules: state.quickRules.filter(r => r.id !== id)
    })),
    setFullRules: (text) => set({ fullRulesText: text }),
}));