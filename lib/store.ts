import { create } from 'zustand';

export interface Location {
    id: string;
    name: string;
    category: 'RESTAURANT' | 'PRODUCATOR';
    note: string;
    mapsLink: string;
}

interface AppState {
    wifiPassword: string;
    alerts: any[];
    locations: Location[]; // Lista de recomandări
    setWifiPassword: (password: string) => void;
    addAlert: (alert: any) => void;
    addLocation: (loc: Location) => void;
    deleteLocation: (id: string) => void;
    quickRules: { id: string; title: string; value: string }[];
    fullRulesText: string;
    addQuickRule: (rule: { id: string; title: string; value: string }) => void;
    deleteQuickRule: (id: string) => void;
    setFullRules: (text: string) => void;
}

export const useStore = create<AppState>((set) => ({
    quickRules: [
        { id: '1', title: 'CHECK-IN', value: 'DUPĂ ORA 14:00' },
        { id: '2', title: 'CHECK-OUT', value: 'PÂNĂ ÎN ORA 11:00' }
    ],
    fullRulesText: "",
    addQuickRule: (rule) => set((state) => ({
        quickRules: state.quickRules.length < 12 ? [...state.quickRules, rule] : state.quickRules
    })),
    deleteQuickRule: (id) => set((state) => ({
        quickRules: state.quickRules.filter(r => r.id !== id)
    })),
    setFullRules: (text) => set({ fullRulesText: text }),
    wifiPassword: "R2yuXuaskSk",
    alerts: [],
    locations: [], // Începem cu o listă goală
    setWifiPassword: (password) => set({ wifiPassword: password }),
    addAlert: (alert) => set((state) => ({ alerts: [alert, ...state.alerts] })),
    addLocation: (loc) => set((state) => ({ locations: [...state.locations, loc] })),
    deleteLocation: (id) => set((state) => ({
        locations: state.locations.filter(loc => loc.id !== id)
    })),
}));