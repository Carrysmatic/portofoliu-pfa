Strategia Financiară și de Scalare: Digital Concierge (2026)
Această strategie acoperă tranziția de la prototip la un business SaaS (Software as a Service) matur, optimizat pentru operare de către un PFA/SRL în România.

1. Faza de Lansare: MVP & Validare (0 - 5 Pensiuni)
Obiectiv: Intrare pe piață cu investiție inițială minimă.

Costuri Fixe Inițiale: ~50 - 70 RON / an pentru domeniul web.

Infrastructură Software: 0 RON prin utilizarea planurilor gratuite Vercel Hobby și Supabase Free.


Notă Tehnică: Planul Supabase Free impune o limită de 500 MB stocare și suspendă automat baza de date după o săptămână de inactivitate.

2. Model de Tarifare pentru Clienți (Venituri)
A. Taxă de Setup (Plată unică per locație)
Preț recomandat: 250 RON (fix) + 20 RON / cameră.

Cost Materiale per Cameră: ~12.50 RON (include suport Plexiglas, sticker NFC și print grafică).

Profit Setup (Exemplu 15 camere): Încasat 550 RON - Cost materiale ~187.50 RON = ~362.50 RON profit imediat.

Rol: Acoperă timpul alocat pentru instalarea fizică și configurarea tabelului rooms cu auth_tokens unici.

B. Abonament Lunar SaaS (Venit recurent)
Preț recomandat: 249 RON (bază) + 10 RON / cameră / lună.

Pensiune Mică (10 camere): 349 RON / lună.

Pensiune Medie (25 camere): 499 RON / lună.

Pensiune Mare (50 camere): 749 RON / lună.

3. Costuri Operative și Proiecție de Profit (Scenariul: 50 Pensiuni)

Estimare pentru o medie de 20 camere per pensiune, deservind ~50.000 de utilizatori activi lunar.

Cheltuieli Lunare Estimate (Infrastructură Cloud):

Supabase Pro & Medii de Lucru: ~$75 (pentru izolare medii Dev/Staging/Prod).


Putere de Calcul (Compute Medium): ~$60 (4 GB RAM pentru interogări complexe).

Alerte WhatsApp (Twilio): ~850 RON (estimat la ~100 alerte/lună per locație).


Email Tranzacțional (Resend Pro): ~$20 (pentru Magic Links și notificări sigure).


Trafic Date (Egress): ~$45 (taxare peste cota de 250 GB inclusă).

Total Cheltuieli: ~1.860 RON / lună.

Bilanț Financiar:
Venit Recurent Total: ~22.450 RON / lună.


Profit Brut Lunar (Solo PFA): ~20.590 RON.

Profit Brut Anual: ~247.000 RON.

4. Clauze Strategice și Garanții (Managementul Riscului)
Clauză Fair Use (WhatsApp): Abonamentul include 150 de alerte/lună; depășirile se taxează cu 0.20 RON/alertă.


Limită Edge Functions: Primele 50.000 de invocări incluse; ulterior se aplică tarifele platformei (aprox. 2$ per milion).

Securitate Row Level Security (RLS): Toate datele sunt izolate la nivel de bază de date pentru a preveni accesul neautorizat între pensiuni.

Kill-Switch Automat: În caz de neplată, statusul pensiunii în tabelul properties devine suspended, blocând instantaneu accesul turiștilor la servicii.


Conformitate GDPR: Orice prelucrare a datelor cetățenilor români trebuie să respecte Legea 190/2018, sub sancțiunea unor amenzi de până la 4% din cifra de afaceri globală.