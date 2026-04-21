# 💰 Analiză și Planificare Costuri

Acest document detaliază proiecția financiară pentru dezvoltarea, echiparea fizică și scalarea platformei, acoperind etapele de lansare, implementare fizică și mentenanță lunară.

---

## A. Costuri de Bază (Creare MVP & Lansare)
*Costuri necesare pentru a avea aplicația online, funcțională și gata de prezentat clienților.*

| Element | Descriere | Cost Estimat |
| :--- | :--- | :--- |
| **Domeniu Web** | Numele platformei (ex: `nume-platforma.ro`) | ~50 - 70 RON / an |
| **Găzduire (Hosting)** | Vercel (Planul Hobby) pentru frontend. | 0 RON |
| **Bază de Date** | Supabase (Planul Free, suportă până la 500 MB). | 0 RON |
| **Număr Twilio** | Pentru testarea alertelor SMS/WhatsApp (Sandbox). | 0 RON |
| **TOTAL LANSARE** | **Cost inițial minim pentru validarea ideii.** | **~50 RON** |

---

## B. Costuri Fizice "La Cheie" (per Pensiune - Medie 15 camere)
*Aceste costuri sunt acoperite din taxa de "Setup" percepută la semnarea contractului (Preț recomandat pentru client: 400 - 500 RON).*

| Material per Cameră | Detalii | Cost Unitar | Cost Total (15 cam) |
| :--- | :--- | :--- | :--- |
| **Suport Plexiglas** | Format A6 (Tip T sau L), transparent, rezistent. | ~10.00 RON | 150.00 RON |
| **Sticker NFC** | Tag-uri NTAG213 (achiziție la rolă). | ~1.50 RON | 22.50 RON |
| **Print Grafică** | Print color pe carton de calitate medie/groasă. | ~1.00 RON | 15.00 RON |
| **TOTAL HARDWARE**| **Cost brut pentru a livra materialele.** | **~12.50 RON/cam** | **~187.50 RON** |

> **Notă de Cashflow:** Încasezi ~450 RON (Taxă Setup) - Cheltui ~190 RON (Materiale fizice) = **Profit imediat: ~260 RON**. Acest profit acoperă timpul de implementare software și deplasarea pentru instalare.

---

## C. Costuri Operaționale Lunare (Abonament SaaS)
*Proiecție bazată pe un abonament recurent perceput clientului de 99 RON/lună/pensiune.*

### Scenariul 1: Start (1 - 5 Pensiuni)
* **Servere (Vercel + Supabase):** 0 RON (Încadrare în limitele gratuite).
* **API Mesaje (Twilio):** ~17 RON / lună / pensiune (estimare la 100 de alerte trimise lunar).
* **Bilanț estimat (5 pensiuni):** Venituri (495 RON) - Costuri Twilio (85 RON) = **Profit: 410 RON/lună.**

### Scenariul 2: Creștere (10 - 20 Pensiuni)
* **Hosting (Vercel Pro):** ~100 RON ($20) / lună.
* **Bază de date (Supabase Pro):** ~125 RON ($25) / lună.
* **API Mesaje (Twilio):** ~340 RON / lună (cumulat pt. 20 pensiuni).
* **Bilanț estimat (20 pensiuni):** Venituri (1.980 RON) - Costuri Servere & API (565 RON) = **Profit: 1.415 RON/lună.**

### Scenariul 3: Scalare (50 Pensiuni)
* **Servere:** Limitate la costul cumulat de ~225 RON / lună (capacitatea planurilor Pro susține acest volum).
* **API Mesaje:** ~850 RON / lună.
* **Bilanț estimat (50 pensiuni):** Venituri (4.950 RON) - Costuri (1.075 RON) = **Profit: 3.875 RON/lună.**

---

## 💡 Concluzii și Politici de Business

1. **Risc financiar minim la lansare:** Se investește doar în domeniul web. Infrastructura software gratuită permite testarea de teren fără presiune financiară.
2. **Hardware "Just in Time":** Echipamentele fizice (suporturi plexiglas, rolă NFC) se achiziționează exclusiv după semnarea contractului și încasarea taxei de setup.
3. **Clauză "Fair Use" (Protecția profitului):** Pentru a evita reducerea marjei de profit din cauza volumului neașteptat de mesaje Twilio, contractul SaaS va include o clauză de limitare (Ex: *Abonamentul de bază include maximum 150 de alerte lunare. Depășirile vor fi facturate suplimentar cu 0.20 RON/alertă*).