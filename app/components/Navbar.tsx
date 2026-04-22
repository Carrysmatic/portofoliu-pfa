"use client";
import { useState } from "react";
import Link from "next/link";
import { Menu, X, MessageSquare } from "lucide-react"; // Importăm iconițele necesare

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <nav className="fixed top-0 inset-x-0 z-[100] bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                {/* LOGO - Rămâne mereu vizibil în stânga */}
                <Link href="/" className="flex items-center gap-2 group">
                    <div className="w-10 h-10 bg-brand-primary rounded-xl flex items-center justify-center font-black text-slate-950 group-hover:scale-110 transition-transform">
                        PS
                    </div>
                    <span className="font-bold text-white tracking-tight hidden sm:block">
                        PlopianuStefanPFA<span className="text-brand-primary">.ro</span>
                    </span>
                    {/* Varianta scurtă pentru ecrane ultra-mici */}
                    <span className="font-bold text-white tracking-tight sm:hidden">
                        PlopianuStefanPFA<span className="text-brand-primary">.ro</span>
                    </span>
                </Link>

                {/* DESKTOP LINKS - Ascunse pe mobil (md:flex) */}
                <div className="hidden md:flex items-center gap-8">
                    <Link href="/solutii" className="text-slate-400 hover:text-white font-medium transition-colors">
                        Cum te ajut
                    </Link>
                    <Link href="/faq" className="text-slate-400 hover:text-white font-medium transition-colors">
                        Întrebări & Prețuri
                    </Link>
                    <Link href="/contact" className="px-5 py-2.5 bg-brand-primary text-slate-950 font-bold rounded-xl hover:scale-105 transition-all">
                        Contact
                    </Link>
                </div>

                {/* MOBILE BUTTONS - Vizibile doar pe ecrane mici */}
                <div className="flex md:hidden items-center gap-4">
                    {/* Buton rapid de Contact (opțional, dacă vrei să rămână vizibil) */}
                    <Link href="/contact" className="p-2.5 bg-brand-primary text-slate-950 rounded-lg">
                        <MessageSquare size={20} />
                    </Link>

                    {/* Buton Hamburger */}
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="text-white p-1"
                    >
                        {isOpen ? <X size={28} /> : <Menu size={28} />}
                    </button>
                </div>
            </div>

            {/* MOBILE MENU DROPDOWN - Apare doar când isOpen este true */}
            {isOpen && (
                <div className="md:hidden bg-slate-950 border-b border-slate-900 animate-in slide-in-from-top-5 duration-300">
                    <div className="flex flex-col p-6 gap-6">
                        <Link
                            href="/solutii"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold text-slate-300 hover:text-brand-primary"
                        >
                            Cum te ajut
                        </Link>
                        <Link
                            href="/faq"
                            onClick={() => setIsOpen(false)}
                            className="text-lg font-bold text-slate-300 hover:text-brand-primary"
                        >
                            Întrebări & Prețuri
                        </Link>
                        <hr className="border-slate-900" />
                        <Link
                            href="/contact"
                            onClick={() => setIsOpen(false)}
                            className="w-full py-4 bg-slate-900 text-white text-center font-bold rounded-2xl border border-slate-800"
                        >
                            Contactează-mă
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}