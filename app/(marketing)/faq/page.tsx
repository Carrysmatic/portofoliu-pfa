import Link from "next/link";
import {
    HelpCircle,
    Wallet,
    ShieldCheck,
    FileCode,
    ChevronRight,
    Clock,
    Check
} from "lucide-react";

export default function FaqPage() {
    // Obiectul faqs cu întrebări și răspunsuri în română
    const faqs = [
        {
            q: "De ce plată lunară și nu o singură dată?",
            a: "Pentru că tehnologia se schimbă lunar. Un sistem lăsat nesupravegheat se strică sau devine vulnerabil. Prin abonament ai mereu pe cineva de încredere care are grijă de afacerea ta 24/7. E ca și cum ai avea un angajat IT, dar la un cost mult mai mic."
        },
        {
            q: "Ce primesc cu acest abonament?",
            a: "Primești tot: găzduire rapidă, securitate, actualizări constante (de exemplu, reguli noi e-Factura) și suport prioritar. Tu doar folosești uneltele, eu mă ocup de partea tehnică."
        },
        {
            q: "Pot să renunț oricând?",
            a: "Desigur. Nu te oblig să rămâi. Dar scopul meu este ca sistemul să fie atât de util încât să nu mai vrei să revii la hârtie și pix."
        },
        {
            q: "Dacă afacerea mea crește, cresc și costurile?",
            a: "Abonamentul este gândit să fie corect. Dacă ai nevoie de funcționalități noi, le adăugăm treptat. Avantajul tău este că nu plătești sume mari pentru fiecare modificare."
        }
    ];

    return (
        <div className="flex flex-col gap-20 py-20">
            {/* --- HEADER --- */}
            <section className="max-w-7xl mx-auto px-6 text-center w-full">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary font-medium text-sm mb-6 border border-brand-primary/20">
                    Transparență totală
                </div>
                <h1 className="text-4xl lg:text-6xl font-black text-white mb-6">
                    Întrebări clare, <br />
                    <span className="text-brand-primary underline decoration-brand-primary/20">Răspunsuri directe.</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed">
                    Fără „steluțe” sau note mici la subsol. Vreau să știi exact pentru ce plătești și ce primești în schimb.
                </p>
            </section>

            {/* --- CUM CALCULĂM PREȚUL (Grid informativ) --- */}
            <section className="max-w-7xl mx-auto px-6 w-full grid md:grid-cols-2 gap-8">
                <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 flex flex-col gap-6">
                    <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400">
                        <Wallet className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Investiție, nu cheltuială</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Dacă un sistem de management costă cât salariul unui angajat pe o lună, dar îți economisește 2 ore de muncă zilnic timp de 3 ani, se numește profit. Așa gândim prețurile.
                    </p>
                </div>

                <div className="p-8 rounded-[2rem] bg-slate-900/40 border border-slate-800 flex flex-col gap-6">
                    <div className="w-12 h-12 bg-brand-primary/10 rounded-xl flex items-center justify-center text-brand-primary">
                        <ShieldCheck className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">Garanția rezultatului</h3>
                    <p className="text-slate-400 leading-relaxed">
                        Nu lansăm nimic până nu ești 100% mulțumit de cum funcționează. Testezi totul în laborator înainte de lansarea mare.
                    </p>
                </div>
            </section>

            {/* --- FAQ ACCORDION-STYLE --- */}
            <section className="max-w-4xl mx-auto px-6 w-full">
                <div className="space-y-4">
                    {faqs.map((item, index) => (
                        <div key={index} className="group p-6 rounded-2xl bg-slate-900/20 border border-slate-800 hover:border-brand-primary/30 transition-all">
                            <h4 className="text-lg font-bold text-white flex items-center justify-between gap-4">
                                <span className="flex items-center gap-3">
                                    <HelpCircle className="w-5 h-5 text-brand-primary shrink-0" />
                                    {item.q}
                                </span>
                                <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-brand-primary transition-transform group-hover:translate-x-1" />
                            </h4>
                            <p className="mt-4 text-slate-400 leading-relaxed pl-8 border-l border-slate-800 ml-2">
                                {item.a}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* --- CTA FINAL --- */}
            <section className="max-w-7xl mx-auto px-6 w-full">
                <div className="bg-brand-primary p-10 lg:p-16 rounded-[3rem] flex flex-col lg:flex-row items-center justify-between gap-10 shadow-2xl shadow-brand-primary/10">
                    <div className="text-slate-950 max-w-xl">
                        <h2 className="text-3xl lg:text-4xl font-black mb-4 leading-tight">Ai alte întrebări?</h2>
                        <p className="font-medium opacity-80">
                            Nicio întrebare nu e prea simplă sau prea complicată. Hai să vorbim direct și să lămurim totul.
                        </p>
                    </div>
                    <Link
                        href="/contact"
                        className="w-full lg:w-auto px-12 py-6 bg-slate-950 text-white font-black rounded-2xl hover:scale-105 transition-all text-center"
                    >
                        CONTACTEAZĂ-MĂ ACUM
                    </Link>
                </div>
            </section>
        </div>
    );
}