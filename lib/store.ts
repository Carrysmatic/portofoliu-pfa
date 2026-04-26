import { create } from 'zustand';

export interface Location {
    id: string;
    name: string;
    category: 'RESTAURANT' | 'PRODUCATOR';
    note: string;
    mapsLink: string;
    isSponsored?: boolean; // <-- NOU: Adăugat pentru a rezolva eroarea Vercel
}

export interface QuickRule {
    id: string;
    title: string;
    value: string;
    iconName?: string;
}

// --- NOU: Definim exact ce conține o Alertă ---
export interface Alert {
    id: string;
    room: string;
    type: string;
    note: string;
    time: string;
    status: 'pending' | 'in_progress' | 'completed'; // Adăugăm statusul!
}

interface AppState {
    propertyId: string | null;
    propertyName: string;
    roomNumber: string | null;
    roomId: string | null;

    wifiPassword: string;
    fullRulesText: string;
    quickRules: QuickRule[];
    locations: Location[];
    alerts: Alert[]; // Folosim noua interfață

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

    // --- ALERTE ---
    addAlert: (alert: Alert) => void;
    updateAlertStatus: (id: string, status: 'pending' | 'in_progress' | 'completed') => void; // NOU: Funcția de actualizare

    setWifiPassword: (password: string) => void;
    addLocation: (loc: Location) => void;
    deleteLocation: (id: string) => void;
    addQuickRule: (rule: QuickRule) => void;
    deleteQuickRule: (id: string) => void;
    setFullRules: (text: string) => void;
}

export const useStore = create<AppState>((set) => ({
    propertyId: null,
    propertyName: "Se încarcă...",
    roomNumber: null,
    roomId: null,
    wifiPassword: "...",
    fullRulesText: "",
    quickRules: [],
    locations: [],
    alerts: [],

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

    // --- LOGICA PENTRU ALERTE ---
    addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),

    // NOU: Caută alerta după ID și îi schimbă doar statusul
    updateAlertStatus: (id, status) => set((state) => ({
        alerts: state.alerts.map(alert =>
            alert.id === id ? { ...alert, status } : alert
        )
    })),

    // --- RESTUL FUNCȚIILOR ---
    setWifiPassword: (password) => set({ wifiPassword: password }),
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