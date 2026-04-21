# 📝 Plan de Lucru - Laboratorul de Soluții

## 🧪 Core Lab Features (Prioritate Maximă)
- [ ] **Creare Pagina `/proiecte`:** Interfața principală a Laboratorului.
- [ ] **Dashboard Manager (Laptop):** Construirea panoului de control care primește datele.
- [ ] **Integrare QR Code:** Generarea de coduri scanabile pentru testarea live pe telefonul real al clientului.
- [ ] **Logica de Sincronizare:** Implementarea comunicării real-time între Simulatorul de Telefon și Dashboard-ul de Manager.

## 📱 Implementare Demo-uri Specifice
- [ ] **Demo A (Guestbook):** Logica de Check-out și notificări WiFi.
- [ ] **Demo B (Alerter):** Sistem de push notifications pentru curățenie/mentenanță.
- [ ] **Demo C (Ticketing):** Interfață Kanban pentru gestionarea defectelor.
- [ ] **Demo D (Feedback):** Grafice interactive (Charts) care se actualizează la fiecare recenzie primită.
- [ ] **Demo E (vCard):** Generare automată de fișier `.vcf`.
- [ ] **Demo F (Micro-WMS):** Actualizare instantanee a tabelelor de inventar.


## Plan de Viitor Detaliat: Laborator Demo-uri

### A. Digital Guestbook & Smart Check-out
- [ ] **Interfață Client (Telefon):**
	- Ecran cu butoane mari: „Parola WiFi”, „Regulile Casei”, „Check-out”.
- [ ] **Interfață Manager (Laptop):**
	- Panou de setări pentru schimbarea parolei WiFi în timp real.
- [ ] **Magia Live:**
	- [ ] Implementare State Sync: Când managerul schimbă parola pe laptop, textul se actualizează pe telefonul simulat fără refresh.
	- [ ] Logica Check-out: La apăsarea butonului pe telefon, în dashboard-ul managerului apare o alertă vizuală și sonoră „Camera 204 e liberă pentru curățenie”.

### B. Alerter Mentenanță & Curățenie
- [ ] **Interfață Client (Telefon):**
	- Formular ultra-rapid cu 3 opțiuni: „Lipsă consumabile”, „Murdărie”, „Defecțiune”.
- [ ] **Interfață Manager (Laptop):**
	- Listă de alerte active cu cronometru (de cât timp e alerta activă).
- [ ] **Magia Live:**
	- [ ] Integrare Notificări: Folosirea unui serviciu (sau simulare) de Push Notification.
	- [ ] Demo Flow: Vizitatorul apasă „Lipsă Săpun” pe telefon -> Laptopul „țipă” și afișează locația exactă a incidentului.

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