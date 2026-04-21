import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pb-10">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Section: Text content */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    {/* Highlighted badge for business solutions */}
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm w-fit mx-auto lg:mx-0 border border-brand-primary/20">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        Soluții Digitale pentru Afaceri Locale
                    </div>

                    {/* Main heading with gradient text */}
                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        Transformă-ți afacerea într-un <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-300">sistem digital</span> care lucrează pentru tine.
                    </h1>

                    {/* Supporting paragraph explaining the value proposition */}
                    <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
                        Nu fac doar site-uri, construiesc unelte care îți aduc clienți și îți salvează ore de muncă manuală. Te ajut să scapi de hârțogărie și să treci la un <strong>sistem modern</strong>, ușor de folosit direct de pe telefon.
                    </p>

                    {/* Call-to-action buttons */}
                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
                        <Link
                            href="#demo"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)] text-center"
                        >
                            Testează Demo-ul (Live)
                        </Link>
                        <Link
                            href="#servicii"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all border border-slate-700 text-center"
                        >
                            Vezi cum te pot ajuta
                        </Link>
                    </div>
                </div>

                {/* Right Section: Placeholder for interactive component */}
                <div className="hidden lg:block relative">
                    {/* Background glow effect */}
                    <div className="absolute -inset-4 bg-brand-primary/20 blur-3xl rounded-full"></div>
                    <div className="relative border border-slate-800 bg-slate-900/50 backdrop-blur-xl rounded-2xl p-4 shadow-2xl">
                        {/* Placeholder for the interactive lab component */}
                        <p className="text-slate-500 text-center italic">Aici apare magia: Scanat QR, verificat rezultate.</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

// Hero component: Displays the main landing section with a call-to-action and a placeholder for interactive content.
export default Hero;