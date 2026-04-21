import { Mail, Phone, MessageSquare, Clock, CreditCard, Smartphone, Send } from "lucide-react";

export default function ContactPage() {
    return (
        <div className="flex flex-col gap-20 py-20">
            {/* --- HEADER --- */}
            <section className="max-w-7xl mx-auto px-6 text-center w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-6 border border-brand-primary/20">
                    Hai să pornim treaba
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
                    Gata să scapi de <span className="text-brand-primary underline decoration-brand-primary/30">hârțogărie?</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Nu-ți face griji, nu trebuie să știi programare ca să lucrăm împreună. Spune-mi ce vrei să îmbunătățești și eu vin cu soluția tehnică.
                </p>
            </section>

            <section className="max-w-7xl mx-auto px-6 w-full grid lg:grid-cols-5 gap-12 items-start">
                {/* --- FORMULAR (3/5 din grid) --- */}
                <div className="lg:col-span-3 bg-slate-900/40 border border-slate-800 p-8 lg:p-12 rounded-[2.5rem] shadow-2xl">
                    <form className="space-y-6">
                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">Cum te cheamă?</label>
                                <input
                                    type="text"
                                    placeholder="Ex: Ion Popescu"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-300 ml-1">Număr de telefon</label>
                                <input
                                    type="tel"
                                    placeholder="07xx xxx xxx"
                                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-bold text-slate-300 ml-1">Ce te doare cel mai mult în afacere acum?</label>
                            <textarea
                                rows={4}
                                placeholder="Ex: Pierd prea mult timp cu facturile / Clienții nu mă găsesc online / Vreau să văd stocul pe telefon."
                                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-5 py-4 text-white focus:border-brand-primary outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full py-5 bg-brand-primary text-slate-950 font-black text-lg rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_10px_30px_rgba(16,185,129,0.2)] flex items-center justify-center gap-2"
                        >
                            TRIMITE MESAJUL <Send className="w-5 h-5" />
                        </button>
                        <p className="text-center text-xs text-slate-500 mt-4">
                            * Îți răspund în maxim 24 de ore (de obicei mult mai repede).
                        </p>
                    </form>
                </div>

                {/* --- CONTACT RAPID & FAQ (2/5 din grid) --- */}
                <div className="lg:col-span-2 space-y-10">
                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white italic ml-2">Contact Rapid</h3>
                        <div className="space-y-4">
                            <a href="tel:0700000000" className="flex items-center gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-brand-primary/50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                                    <Phone className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Sună-mă</p>
                                    <p className="text-white font-bold">07xx xxx xxx</p>
                                </div>
                            </a>
                            <a href="https://wa.me/0700000000" className="flex items-center gap-4 p-5 bg-slate-900/50 border border-slate-800 rounded-2xl hover:border-emerald-500/50 transition-all group">
                                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                                    <MessageSquare className="w-6 h-6" />
                                </div>
                                <div>
                                    <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">WhatsApp</p>
                                    <p className="text-white font-bold">Trimite un mesaj rapid</p>
                                </div>
                            </a>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <h3 className="text-2xl font-bold text-white italic ml-2">Întrebări frecvente</h3>
                        <div className="space-y-4">
                            <div className="p-5 border-l-2 border-brand-primary bg-slate-900/20">
                                <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                                    <CreditCard className="w-4 h-4 text-brand-primary" /> E scump?
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Nu e o cheltuială, e o investiție. Construim doar ce îți aduce profit sau îți salvează timp real.
                                </p>
                            </div>
                            <div className="p-5 border-l-2 border-brand-primary bg-slate-900/20">
                                <h4 className="text-white font-bold text-sm mb-1 flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-brand-primary" /> Merge pe telefon?
                                </h4>
                                <p className="text-xs text-slate-500 leading-relaxed">
                                    Absolut. Tot ce fac este gândit să poți verifica afacerea de oriunde te afli.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}