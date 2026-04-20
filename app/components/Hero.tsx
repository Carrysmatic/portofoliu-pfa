import React from 'react';
import Link from 'next/link';

const Hero = () => {
    return (
        <section className="relative min-h-[calc(100vh-5rem)] flex items-center justify-center overflow-hidden pb-10">
            <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
                {/* Partea de Text (Stânga) */}
                <div className="flex flex-col gap-6 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm w-fit mx-auto lg:mx-0 border border-brand-primary/20">
                        <span className="w-2 h-2 rounded-full bg-brand-primary animate-pulse"></span>
                        Dezvoltare Web & Soluții B2B
                    </div>

                    <h1 className="text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
                        De la prezență online la <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-emerald-300">soluții software</span> complete.
                    </h1>

                    <p className="text-lg text-slate-400 max-w-2xl mx-auto lg:mx-0">
                        Sunt programator fullstack. Te ajut să te remarci pe piață prin <strong>site-uri de prezentare</strong> și <strong>magazine eCommerce</strong> moderne, dar și să îți eficientizezi afacerea prin automatizări interne și aplicații web complexe.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center gap-4 mt-4 justify-center lg:justify-start">
                        <Link
                            href="#solutii"
                            className="w-full sm:w-auto px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-slate-950 font-bold rounded-lg transition-all transform hover:scale-105 shadow-[0_0_20px_rgba(16,185,129,0.3)]"
                        >
                            Vezi Portofoliul & Demo-urile
                        </Link>
                        <Link
                            href="#servicii"
                            className="w-full sm:w-auto px-8 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-lg transition-all border border-slate-700"
                        >
                            Descoperă Serviciile
                        </Link>
                    </div>
                </div>
                {/* Partea Vizuală (Dreapta) - Un placeholder de Dashboard/QR */}
                <div className="relative mx-auto w-full max-w-md lg:max-w-full lg:mt-0 mt-10">
                    <div className="relative rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl p-6 aspect-square lg:aspect-auto lg:h-[500px] flex flex-col items-center justify-center overflow-hidden group">
                        {/* Un mock de "Scan me" vizual */}
                        <div className="absolute inset-0 bg-[linear-gradient(to_right,#10b9811a_1px,transparent_1px),linear-gradient(to_bottom,#10b9811a_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 group-hover:opacity-40 transition-opacity"></div>

                        <div className="relative z-10 w-48 h-48 bg-white rounded-xl p-4 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.2)]">
                            {/* Aici poți pune ulterior o imagine cu un QR code real. Deocamdată facem un placeholder din div-uri */}
                            <div className="w-full h-full border-8 border-slate-950 rounded-lg flex items-center justify-center relative">
                                <div className="w-16 h-16 bg-slate-950 rounded-sm"></div>
                                <div className="absolute top-2 left-2 w-6 h-6 bg-slate-950"></div>
                                <div className="absolute top-2 right-2 w-6 h-6 bg-slate-950"></div>
                                <div className="absolute bottom-2 left-2 w-6 h-6 bg-slate-950"></div>
                            </div>
                        </div>
                        <p className="relative z-10 mt-6 text-slate-400 font-mono text-sm">
                            &lt; Interacționează în timp real /&gt;
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;