"use client";
import Link from "next/link";
import { Laptop, MessageSquare } from "lucide-react";
import { usePathname } from "next/navigation"; // 1. Importăm hook-ul

const Navbar = () => {
    const pathname = usePathname(); // 2. Citim ruta curentă

    // 3. Condiția magică: Dacă turistul e pe /scan, ascundem meniul complet
    if (pathname === '/scan') {
        return null;
    }

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo - Duce la pagina principală (/) */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                        PS
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        PlopianuStefanPFA<span className="text-brand-primary">.ro</span>
                    </span>
                </Link>

                {/* Meniu Principal - Link-uri către toate paginile noi */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/solutii" className="text-slate-400 hover:text-brand-primary font-medium transition-colors">
                        Cum te ajut
                    </Link>
                    {/* Link-ul către /proiecte a fost eliminat de aici */}
                    <Link href="/faq" className="text-slate-400 hover:text-white font-medium transition-colors">
                        Întrebări & Prețuri
                    </Link>
                </div>

                {/* Buton Contact - Accentuat pentru conversie */}
                <Link href="/contact" className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20">
                    <MessageSquare className="w-4 h-4" />
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;