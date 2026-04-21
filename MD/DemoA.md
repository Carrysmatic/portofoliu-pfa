Digital Concierge & Smart Tourism Hub - Demo A+B (v4)
Ultima actualizare: 21 Aprilie 2026

Status: Prototip UI de înaltă fidelitate (Logic & Design Finalizat)
Model de Business: White Glove Service (Serviciu Administrat Expert)

✅ Pașii Realizați Până Acum
🛠️ Infrastructură & State Management
[X] Setup Proiect: Next.js 14, Tailwind CSS și Lucide Icons.

[X] Logică de Store: Configurare Zustand (store.ts) pentru sincronizarea datelor în timp real între telefoanele de demo.

[X] Motor de Alerte: Implementare sistem de trimitere cereri de la Turist la Staff.

📱 Interfața Turistului (TouristMobileView.tsx)
[X] Ecran Home: Meniu principal cu acces la toate modulele.

[X] Modul WiFi: Afișare parolă dinamică.

[X] Wizard Servicii Cameră: Flux complet în 3 pași (Selectare -> Notă -> Succes).

[X] Recomandări Locale: Sistem de tab-uri cu link-uri Google Maps.

[X] Regulile Casei: Afișare hibridă (Grid 12 carduri + Ecran text).

[X] Ecrane B2G (Placeholders): Module dedicate pentru "Trasee & Activități" și "Istoric & Tradiții".

🛠️ Interfața Managerului (ManagerMobileView.tsx)
[X] Admin Layout: Design dark-mode profesional.

[X] Gestiune WiFi & Conținut: Editare rapidă parolă, adăugare/ștergere recomandări și reguli.

[X] Log Alerte: Monitorizare vizuală a cererilor recente.

🛡️ Strategia de Securitate: "Cheia Invizibilă"
URL-uri Securizate: Link unic per cameră (.../camera/101?auth=xyz789).

Activare Fizică: Codul auth_token programat de tine pe suporturile fizice (QR).

Validare la Sursă: Respingerea solicitărilor dacă token-ul nu este valid în baza de date.

🚀 Modelul de Implementare: "White Glove Service"
Instalare Fizică: Te ocupi personal de plasarea suporturilor cu coduri QR în locație.

Control Total: Tu garantezi funcționarea "Tap-ului", eliminând nevoia ca managerul să fie tehnic.

Management Centralizat: Accesul este controlat prin dashboard-ul tău de Super-Admin.

🛤️ Roadmap Viitor (Următorii Pași)
1. Database & Persistence (URMĂTORUL PAS)
[ ] Configurare Supabase: Crearea tabelelor pensiuni, camere (cu auth_token) și locatii.

[ ] Migrare Logică: Mutarea datelor din Zustand în tabele PostgreSQL cu politici RLS (Row Level Security).

2. Autentificare & Super-Admin
[ ] Auth Manager: Sistem de login (Magic Link sau Email/Parolă) pentru manageri.

[ ] Dashboard Super-Admin: Panou de control pentru activarea/suspendarea pensiunilor.

[ ] Modul Analytics (Nou): Monitorizarea traficului pe module (ex: care trasee sunt cele mai accesate) pentru raportări B2G.

3. Integrare Live & Notificări
[ ] Twilio WhatsApp: Trecerea la notificări reale pe telefonul staff-ului când un turist face o cerere.

[ ] Generare QR Bulk: Script pentru generarea automată a URL-urilor securizate pentru imprimare.

4. Scalare (Viitor)
[ ] Integrare NFC: Implementarea tag-urilor NTAG213 pentru o experiență "premium tap" odată cu creșterea volumului de clienți.