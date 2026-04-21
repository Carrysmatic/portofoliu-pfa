import TouristMobileView from "./TouristMobileView";
import ManagerMobileView from "./ManagerMobileView";
import WhatsAppMockup from "./WhatsappMockView";

export default function ProiectePage() {
    return (
        <main className="pt-20 min-h-screen bg-slate-950 text-white">
            <div className="max-w-[1600px] mx-auto px-6">
                <header className="mb-10 text-center lg:text-left">
                    <h1 className="text-3xl font-bold tracking-tight">Smart Concierge: Eco-sistemul Digital</h1>
                    <p className="text-slate-400 mt-2">Demonstrație flux: Turist → Manager → Staff (WhatsApp)</p>
                </header>

                {/* Layout pe 3 coloane */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start justify-items-center">

                    {/* COLOANA 1: TURIST */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-emerald-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-emerald-400/10 px-3 py-1 rounded-full">1. Interfață Turist</h2>
                        <div className="w-[300px] h-[600px] bg-slate-900 border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 w-full h-6 flex justify-center items-center z-20 pointer-events-none">
                                <div className="w-20 h-4 bg-slate-950 rounded-b-xl"></div>
                            </div>
                            <div className="absolute inset-0 w-full h-full bg-white overflow-hidden">
                                <TouristMobileView />
                            </div>
                        </div>
                    </div>

                    {/* COLOANA 2: MANAGER */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-blue-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-blue-400/10 px-3 py-1 rounded-full">2. Panou Manager (Mobile)</h2>
                        <div className="w-[300px] h-[600px] bg-slate-900 border-[8px] border-slate-800 rounded-[2.5rem] overflow-hidden relative shadow-2xl">
                            <div className="absolute top-0 w-full h-6 flex justify-center items-center z-20 pointer-events-none text-[8px] text-slate-700 font-bold italic">ADMIN MODE</div>
                            <div className="absolute inset-0 w-full h-full bg-slate-950 overflow-hidden">
                                <ManagerMobileView />
                            </div>
                        </div>
                    </div>

                    {/* COLOANA 3: WHATSAPP */}
                    <div className="flex flex-col items-center w-full">
                        <h2 className="text-slate-400 font-bold uppercase tracking-widest text-[10px] mb-4 bg-slate-400/10 px-3 py-1 rounded-full">
                            3. Notificare Staff (WhatsApp)
                        </h2>
                        <div className="w-full max-w-[320px]">
                            {/* ASIGURĂ-TE CĂ AICI ESTE WhatsAppMockup, NU ManagerMobileView */}
                            <WhatsAppMockup />
                        </div>
                    </div>

                </div>
            </div>
        </main>
    );
}