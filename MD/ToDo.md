# 📝 Plan de Lucru - Laboratorul de Soluții

## 🚀 PROIECTUL 1: Smart Concierge Hub (Focus Actual)
*Unirea Demo A (Guestbook) cu Demo B (Alerter) într-un produs comercial.*

- [ ] **Infrastructură:** Integrare Supabase pentru managementul pensiunilor și regiunilor.
- [ ] **Real-time Sync:** Sincronizarea parolei WiFi și a regulilor între Admin și Client.
- [ ] **Canal Alerte:** Implementare Webhook pentru trimiterea cererilor (prosoape, curățenie) către staff (WhatsApp/SMS).
- [ ] **Componenta Turistică:** Modul de Ghid Local (Restaurante/Trasee) editabil de tine.
- [ ] **Livrabile Fizice:** Generare QR și programare stickere NFC pentru camere.

## 🧪 Laborator Demo-uri Viitoare (Module Independente)
*Acestea vor fi dezvoltate ulterior pentru a demonstra diverse competențe tehnice.*

### C. Mentenanță Active (Kanban System)
- [ ] Dashboard tip Kanban (Coloane: Nou, În lucru, Rezolvat).
- [ ] Drag-and-Drop Logic pentru tichete.

### D. Feedback & Analytics
- [ ] Implementare grafice Pie Charts care se actualizează live.
- [ ] Logica de "Sentiment Analysis" pentru feedback text.

### E. Digital vCard
- [ ] Implementare logică generare fișier `.vcf`.
- [ ] Testare scanare QR pentru salvare automată contact.

### F. Gestiune Stocuri
- [ ] Scanner simulat și butoane de + și - pentru inventar.
- [ ] Alerte vizuale pentru stoc redus (highlight roșu).

## 🛠️ General Tech Stack
- [ ] **State Provider:** Supabase Realtime pentru sincronizare instantanee.
- [ ] **Sound Effects:** `use-sound` pentru notificările managerului.
- [ ] **QR Engine:** `qrcode.react` configurat pentru printare.

## Plan de Viitor Detaliat: Laborator Demo-uri

### A+B. Smart Concierge Hub
## 🧪 Core Features (Prioritate Maximă / MVP)
- [ ] **Configurare Supabase:** Crearea tabelelor `Regiuni`, `Pensiuni`, `Recomandari_Locale`.
- [ ] **Sistem Rute Dinamice (Next.js):** Construirea linkurilor de tip `/[regiune]/[pensiune]/[camera]`.
- [ ] **Integrare Twilio (WhatsApp/SMS):** Setarea webhook-ului pentru a trimite alertele din camere către telefoanele staff-ului.
- [ ] **Panou Admin Simplificat:** Creare login via Magic Link pentru managerii de pensiuni.

## 📱 Interfața Turistului (Fără Logare)
- [ ] **UI Meniu Principal:** Butoane curate pentru WiFi, Curățenie, Ghid Local.
- [ ] **Modul WiFi & Reguli:** Fetching date din Supabase pe baza URL-ului.
- [ ] **Modul Solicitări:** Formular rapid ("Adu prosoape", "Defecțiune") cu blocare anti-spam (localStorage 10 min).
- [ ] **Modul Recomandări (Monetizare):** Afișarea restaurantelor partenere specifice pensiunii, cu oferte/reduceri.
- [ ] **Modul Ghid Local (Primărie):** Afișarea istoricului și traseelor pe baza `Regiunii`.

## ⚙️ Logica Operațională (Înlocuiește vechiul Dashboard Laptop)
- [ ] **Trimitere Alertă:** Turistul apasă butonul -> API Next.js -> Twilio -> Mesaj WhatsApp pe telefonul recepției.
- [ ] **Formular Manager (Telefon/Laptop):** 3 tab-uri simple (Setări WiFi, Setări Număr Contact, Adaugă Restaurant Partener).

## 🖨️ Livrabile Fizice (Premium)
- [ ] **Generator QR Bulk:** Script care generează QR coduri statice (`qrcode.react`) pentru toate camerele unei pensiuni odată.
- [ ] **Print CSS (`@media print`):** Formatare pentru printare directă pe suporturi A6.
- [ ] **NFC Tags:** Achiziționare și programare stickere NTAG213 pentru funcția de "Tap to open".

## 🗑️ Funcții Eliminate (Pentru Focus pe MVP)
- [x] Sistem Kanban (Ticketing complex).
- [x] Sincronizare WebSocket pentru parola WiFi (Trecut pe caching simplu).
- [x] Generare Cărți de vizită (.vcf).
- [x] Gestiune stocuri și scaner.

### C. Ticketing & Mentenanță Active
- [ ] **Interfață Client (Telefon):**
	- Selector de echipament (ex: Imprimantă, AC) + Câmp încărcare poză (simulat).
- [ ] **Interfață Manager (Laptop):**
	- Dashboard tip Kanban (Coloane: Nou, În lucru, Rezolvat).
- [ ] **Magia Live:**
	- [ ] Drag-and-Drop Logic: Managerul mută tichetul dintr-o coloană în alta.
	- [ ] Status Sync: Pe telefonul clientului, statusul tichetului se schimbă instant în „Echipa tehnică a plecat spre tine”.

### D. Terminal Digital de Feedback (NPS)
- [ ] **Interfață Client (Telefon):**
	- Selector de rating (1-5 stele) + Câmp opțional „Ce nu a mers bine?”.
- [ ] **Interfață Manager (Laptop):**
	- Grafice de evoluție (Pie Charts) și „Sentiment Analysis” simplificat.
- [ ] **Magia Live:**
	- [ ] Real-time Analytics: Vizitatorul lasă 1 stea -> Graficul de pe laptop scade instantaneu și alerta devine roșie („Intervenție necesară pentru a evita recenzia Google!”).

### E. Cărți de Vizită Digitale (vCard)
- [ ] **Interfață Client (Telefon):**
	- Profil personal cu Poză, Funcție și butoane de Social Media.
- [ ] **Interfață Manager (Laptop):**
	- Generator de profil (Input-uri: Nume, Tel, Email).
- [ ] **Magia Live:**
	- [ ] Generare vcf: Implementarea logicii care transformă datele într-un fișier .vcf.
	- [ ] QR Scan Test: QR-ul generat pe laptop trebuie să poată fi scanat de un telefon real pentru a salva contactul.

### F. Gestiune Stocuri "On-the-Go"
- [ ] **Interfață Client (Telefon):**
	- Scanner simulat și butoane de + și - pentru cantitate.
- [ ] **Interfață Manager (Laptop):**
	- Tabel centralizator de inventar (Produs | Stoc Actual | Alertă Stoc Mic).
- [ ] **Magia Live:**
	- [ ] Inventory Logic: Scăderea stocului pe telefon actualizează rândul corespunzător din tabelul de pe laptop cu o animație de evidențiere (highlight).
	- [ ] Low Stock Alert: Dacă stocul scade sub 5, rândul de pe laptop devine roșu intermitent.

---

## 🛠️ Infrastructură Tehnică Necesară (General TODO)
- [ ] State Provider: Alegerea unei metode de sincronizare (SWR, React Context cu Supabase Realtime sau un simplu sistem de WebSockets).
- [ ] QR Engine: Instalare și configurare qrcode.react.
- [ ] Sound Effects: Adăugarea de sunete discrete pentru notificările de manager (pentru acel efect de „aplicație vie”).
- [ ] Mobile Mockup: Rafinarea CSS-ului pentru simulatorul de telefon să arate impecabil pe toate rezoluțiile.