import React from 'react';
import { Layout, Rocket, CheckCircle2, PhoneCall } from 'lucide-react'; // Folosim lucide-react pentru iconițe simple

const Services = () => {
    return (
        <section id="servicii" className="py-24 bg-slate-950">
            <div className="max-w-7xl mx-auto px-6">

                {/* Header Secțiune */}
                <div className="mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                        Hai să vorbim pe șleau: <br />
                        <span className="text-brand-primary font-light text-2xl md:text-3xl">Cum te ajută, concret, un partener digital?</span>
                    </h2>
                    <p className="text-slate-400 text-lg max-w-3xl leading-relaxed">
                        Știu cum e. Când conduci o afacere, ești și manager, și om de vânzări, și cel care stinge „incendiile” zilnice. Ultimul lucru de care ai nevoie e un programator care să-ți vorbească în termeni tehnici pe care nu-i folosește nimeni în viața reală.
                    </p>
                    <p className="text-white font-medium mt-4 text-lg">
                        Oportunitatea mea pentru tine e simplă: Eu nu-ți vând „linii de cod”. Îți vând timp liber și liniște, folosind tehnologia ca să facă treaba murdară în locul tău.
                    </p>
                </div>

                {/* Cele două coloane de servicii */}
                <div className="grid md:grid-cols-2 gap-8 mb-16">

                    {/* Card Serviciu 1 */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-primary/30 transition-all group">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                            <Layout size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Site-ul care chiar muncește (nu doar stă degeaba)</h3>
                        <p className="text-slate-400 mb-6 italic">
                            Dacă ai nevoie de un site de prezentare sau de un magazin online, abordarea mea e diferită de a agențiilor mari. Ei se uită la design, eu mă uit la <strong className="text-brand-primary">profitul tău</strong>.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-300"><strong>Cartea ta de vizită 24/7:</strong> Facem pagini care îi fac pe oameni să pună mâna pe telefon și să te sune, nu doar să dea scroll.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-300"><strong>Magazin online „deștept”:</strong> Te ajut să legi vânzările de stocuri, ca să nu mai pierzi ore întregi numărând cutii la final de zi.</span>
                            </li>
                        </ul>
                    </div>

                    {/* Card Serviciu 2 */}
                    <div className="p-8 rounded-2xl bg-slate-900/50 border border-slate-800 hover:border-brand-primary/30 transition-all group">
                        <div className="w-12 h-12 bg-brand-primary/10 rounded-lg flex items-center justify-center mb-6 text-brand-primary group-hover:scale-110 transition-transform">
                            <Rocket size={28} />
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-4">Digitalizare „fără dureri de cap” (Soluții B2B)</h3>
                        <p className="text-slate-400 mb-6 italic">
                            Aici e locul unde „rupem” birocrația. Dacă te-ai săturat de tabele în Excel, de post-it-uri pierdute sau de telefoane inutile, am o veste bună.
                        </p>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-300"><strong>Magia codului QR:</strong> Punem un simplu sticker la locație. Clientul scanează, iar tu primești informația instant în telefon. Fără hârtii, fără greșeli.</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <CheckCircle2 className="text-brand-primary mt-1 flex-shrink-0" size={20} />
                                <span className="text-slate-300"><strong>Rapiditate:</strong> Spre deosebire de softurile gigantice, eu îți fac ceva „pe mărimea ta”. E simplu, e agil și îl poți folosi de a doua zi.</span>
                            </li>
                        </ul>
                    </div>

                </div>

                {/* Footer Secțiune / Concluzie */}
                <div className="p-8 rounded-2xl bg-gradient-to-r from-brand-primary/10 to-transparent border border-brand-primary/20">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                        De ce să lucrăm împreună?
                    </h4>
                    <p className="text-slate-300 leading-relaxed italic">
                        „Pentru că sunt local, sunt flexibil și vorbesc pe limba ta. În loc să-ți explic ce e un API, prefer să-ți arăt cum un buton pe ecranul tău îi poate trimite automat factura clientului, în timp ce tu ești la masă cu familia. Vreau ca afacerea ta să ruleze de pe telefon, nu dintr-un morman de dosare.”
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Services;