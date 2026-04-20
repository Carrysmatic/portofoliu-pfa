"use client";
import React, { useState, useEffect } from 'react';
import { Monitor, Smartphone, Wifi, Bell, Check, Trash2 } from 'lucide-react';

const SolutionsLab = () => {
  const [activeDemo, setActiveDemo] = useState(1);
  const [notifications, setNotifications] = useState<{ id: number, type: string, time: string }[]>([]);
  const [isSending, setIsSending] = useState(false);

  // Funcție care simulează primirea unei cereri de la client
  const sendRequest = (type: string) => {
    setIsSending(true);

    // Simulăm latența rețelei (0.8 secunde)
    setTimeout(() => {
      const newNotif = {
        id: Date.now(),
        type: type,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setNotifications(prev => [newNotif, ...prev]);
      setIsSending(false);
    }, 800);
  };

  const clearNotif = (id: number) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  return (
    <section id="solutii" className="py-24 bg-slate-900/30 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-6">

        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Laboratorul de <span className="text-brand-primary">Soluții Live</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Interacționează cu telefonul din dreapta și urmărește cum „laptopul” managerului primește datele instantaneu.
          </p>
        </div>

        {/* Switcher Demo */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button onClick={() => { setActiveDemo(1); setNotifications([]); }} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeDemo === 1 ? 'bg-brand-primary text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
            1. Smart Guestbook (HoReCa)
          </button>
          <button onClick={() => { setActiveDemo(2); setNotifications([]); }} className={`px-6 py-2 rounded-full text-sm font-bold transition-all ${activeDemo === 2 ? 'bg-brand-primary text-slate-950' : 'bg-slate-800 text-slate-400'}`}>
            2. Mentenanță Utilaje (B2B)
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* DASHBOARD (Laptop) */}
          <div className="lg:col-span-7 bg-slate-950 rounded-2xl border border-slate-800 overflow-hidden shadow-2xl flex flex-col h-[550px]">
            <div className="bg-slate-900 p-3 border-b border-slate-800 flex items-center justify-between">
              <div className="flex gap-1.5"><div className="w-2 h-2 rounded-full bg-red-500/50"></div><div className="w-2 h-2 rounded-full bg-yellow-500/50"></div><div className="w-2 h-2 rounded-full bg-green-500/50"></div></div>
              <div className="text-[10px] font-mono text-slate-500">ADMIN DASHBOARD v4.0</div>
            </div>

            <div className="p-6 overflow-y-auto">
              <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                <Bell size={18} className="text-brand-primary" />
                Activitate în Timp Real
              </h4>

              {notifications.length === 0 ? (
                <div className="h-64 border-2 border-dashed border-slate-800 rounded-xl flex flex-col items-center justify-center text-slate-600">
                  <p>Așteptare cereri noi...</p>
                  <p className="text-xs">Apasă pe butoanele telefonului din dreapta</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {notifications.map(n => (
                    <div key={n.id} className="bg-slate-900 border border-slate-800 p-4 rounded-lg flex justify-between items-center animate-in fade-in slide-in-from-left-4">
                      <div>
                        <div className="text-brand-primary text-[10px] font-bold uppercase mb-1">Cameră 204</div>
                        <div className="text-white text-sm font-medium">{n.type}</div>
                        <div className="text-slate-500 text-[10px]">{n.time}</div>
                      </div>
                      <button onClick={() => clearNotif(n.id)} className="text-slate-600 hover:text-green-500 transition-colors">
                        <Check size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* TELEFON (Simulator) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="w-[280px] h-[550px] bg-black rounded-[3rem] border-[8px] border-slate-800 relative shadow-2xl ring-1 ring-slate-700">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
              <div className="w-full h-full bg-slate-50 relative pt-14 p-6 overflow-hidden">
                <div className="text-center">
                  <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary mx-auto mb-4">
                    {activeDemo === 1 ? <Wifi size={24} /> : <Trash2 size={24} />}
                  </div>
                  <h5 className="text-slate-900 font-bold text-lg">
                    {activeDemo === 1 ? 'Pensiunea "Liniștea"' : 'Sistem Mentenanță'}
                  </h5>
                  <p className="text-slate-500 text-[11px] mb-8">Scanat cu succes - Cameră 204</p>

                  <div className="space-y-3">
                    {activeDemo === 1 ? (
                      <>
                        <button
                          disabled={isSending}
                          onClick={() => sendRequest("Solicitare Parolă WiFi")}
                          className="w-full py-3 bg-slate-900 text-white rounded-xl text-xs font-bold hover:bg-brand-primary hover:text-slate-950 transition-all active:scale-95 disabled:opacity-50"
                        >
                          {isSending ? 'Se trimite...' : 'Cere parolă WiFi'}
                        </button>
                        <button
                          disabled={isSending}
                          onClick={() => sendRequest("Solicitare Curățenie")}
                          className="w-full py-3 border-2 border-slate-200 text-slate-800 rounded-xl text-xs font-bold hover:bg-slate-100 transition-all active:scale-95"
                        >
                          Solicită Curățenie
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          disabled={isSending}
                          onClick={() => sendRequest("Alertă: Defecțiune Motor")}
                          className="w-full py-3 bg-red-600 text-white rounded-xl text-xs font-bold hover:bg-red-700 transition-all active:scale-95 shadow-lg shadow-red-900/20"
                        >
                          Raportează Defecțiune
                        </button>
                      </>
                    )}
                  </div>
                </div>

                {/* Overlay de succes pe telefon */}
                {isSending && (
                  <div className="absolute inset-0 bg-white/80 backdrop-blur-sm flex items-center justify-center z-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-primary"></div>
                  </div>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default SolutionsLab;