"use client"; // Adăugăm asta pentru a permite interactivitate pe viitor (ex: meniu mobil)
import Link from "next/link";
import { Laptop, MessageSquare } from "lucide-react";

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-slate-950/50 backdrop-blur-xl">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* Logo - Duce la pagina principală (/) */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center text-slate-950 font-black shadow-[0_0_15px_rgba(16,185,129,0.4)] group-hover:scale-110 transition-transform">
                        N
                    </div>
                    <span className="text-white font-bold text-xl tracking-tight">
                        NumePrenume<span className="text-brand-primary">.pfa</span>
                    </span>
                </Link>

                {/* Meniu Principal - Link-uri către toate paginile noi */}
                <div className="hidden md:flex items-center gap-8">
                    <Link
                        href="/proiecte"
                        className="text-slate-400 hover:text-brand-primary font-medium transition-colors flex items-center gap-2"
                    >
                        <Laptop className="w-4 h-4" />
                        Soluții Live
                    </Link>
                    <Link
                        href="/solutii"
                        className="text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Cum te ajut
                    </Link>
                    <Link
                        href="/faq"
                        className="text-slate-400 hover:text-white font-medium transition-colors"
                    >
                        Întrebări & Prețuri
                    </Link>
                </div>

                {/* Buton Contact - Accentuat pentru conversie */}
                <Link
                    href="/contact"
                    className="flex items-center gap-2 px-6 py-2.5 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-brand-primary/20"
                >
                    <MessageSquare className="w-4 h-4" />
                    Contact
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;