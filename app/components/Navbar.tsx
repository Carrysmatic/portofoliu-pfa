"use client";
import Link from 'next/link';

const Navbar = () => {
    return (
        <nav className="fixed top-0 w-full z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-900">
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* LOGO */}
                <Link href="/" className="text-xl font-bold tracking-tighter flex items-center gap-2">
                    <div className="w-8 h-8 bg-brand-primary rounded-lg flex items-center justify-center text-white">
                        <span className="text-sm">N</span>
                    </div>
                    <span className="hidden sm:block">NumePrenume<span className="text-brand-primary text-sm">.pfa</span></span>
                </Link>

                {/* Meniu Desktop */}
                <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
                    <Link href="#solutii" className="hover:text-brand-primary transition-colors">Soluții Live</Link>
                    <Link href="#servicii" className="hover:text-brand-primary transition-colors">Servicii</Link>
                    <Link href="#despre" className="hover:text-brand-primary transition-colors">Despre PFA</Link>
                </div>

                {/* Call to Action */}
                <div>
                    <Link
                        href="#contact"
                        className="bg-brand-primary hover:bg-brand-primary/90 text-slate-950 px-5 py-2 rounded-full text-sm font-bold transition-all"
                    >
                        Contact
                    </Link>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;