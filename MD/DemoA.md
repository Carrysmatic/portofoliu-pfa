Digital Concierge & Smart Tourism Hub - Demo A+B (v3)
Ultima actualizare: 21 Aprilie 2026

Status: Prototip UI de înaltă fidelitate (Logic & Design Finalizat)

Model de Business: White Glove Service (Serviciu Administrat Expert)

✅ Pașii Realizați Până Acum
🛠️ Infrastructură & State Management
[X] Setup Proiect: Next.js 14, Tailwind CSS și Lucide Icons.

[X] Logică de Store: Configurare Zustand (store.ts) pentru sincronizarea datelor în timp real între telefoanele de demo.

[X] Motor de Alerte: Implementare sistem de trimitere cereri de la Turist la Staff.

📱 Interfața Turistului (TouristMobileView.tsx)
[X] Ecran Home: Meniu principal cu acces la toate modulele (Servicii, Recomandări, Reguli, Trasee, Istoric).

[X] Modul WiFi: Afișare parolă (dinamică din store).

[X] Wizard Servicii Cameră: Flux complet în 3 pași (Selectare -> Notă Emerald Theme -> Succes).

[X] Recomandări Locale: Sistem de tab-uri (Restaurante vs. Producători Locali) cu link-uri Google Maps.

[X] Regulile Casei: Afișare hibridă (Grid "Quick Info" de 12 carduri + Ecran text complet).

[X] Ecrane B2G (Placeholders): Module dedicate pentru "Trasee & Activități" și "Istoric & Tradiții" pregătite pentru prezentări oficiale.

🛠️ Interfața Managerului (ManagerMobileView.tsx)
[X] Admin Layout: Design dark-mode profesional.

[X] Gestiune WiFi: Editare rapidă a parolei.

[X] Gestiune Recomandări: Formular adăugare/ștergere (X roșu) locații externe.

[X] Gestiune Reguli: Control total asupra celor 12 reguli rapide și a regulamentului complet.

[X] Log Alerte: Monitorizare vizuală a cererilor recente venite de la camere.

🛡️ Strategia de Securitate: "Cheia Invizibilă"
Pentru a asigura integritatea sistemului și a preveni solicitările abuzive de la distanță:

URL-uri Securizate: Fiecare cameră utilizează un link unic de tip .../camera/101?auth=xyz789.

Activare Fizică: Codul auth_token este programat fizic de către tine (Super-Admin) pe tag-urile NFC și codurile QR.

Validare la Sursă: Sistemul respinge orice solicitare dacă token-ul din URL nu coincide cu cel stocat în baza de date pentru camera respectivă.

🚀 Modelul de Implementare: "White Glove Service"
Spre deosebire de o soluție software standard, acest proiect se livrează ca un pachet premium administrat:

Instalare Fizică: Tu te ocupi personal de programarea tag-urilor și instalarea suporturilor fizice în locație.

Control asupra Echipamentului: Nu se lasă configurarea tehnică în mâna managerilor non-tehnici; tu garantezi funcționarea Tap-ului.

Gestiune Subscription: Accesul managerului și validitatea codurilor QR sunt controlate prin dashboard-ul tău de Super-Admin.

Poziționare Strategică: Soluție ideală pentru Primării și Proiecte Europene (External Digital Management regional).

🛤️ Roadmap Viitor (Următorii Pași)
1. Database & Persistence (Next Step)
[ ] Configurare Supabase: Crearea tabelelor pensiuni, camere (cu auth_token) și locatii.

[ ] Migrare Logică: Mutarea datelor din Zustand în tabele PostgreSQL cu politici RLS active.

2. Autentificare & Super-Admin
[ ] Auth Manager: Sistem de login prin email pentru managerii pensiunilor.

[ ] Dashboard Super-Admin: Crearea panoului tău de control pentru a activa/suspenda pensiuni și a monitoriza numărul de QR-uri instalate.

3. Integrare Live Hardware
[ ] Twilio WhatsApp: Trecerea de la simulatorul vizual la notificări WhatsApp reale pe telefonul staff-ului.

[ ] Programare NFC: Testarea bulk a tag-urilor NTAG213 cu link-urile securizate.

Ultima actualizare: 21.04.2026