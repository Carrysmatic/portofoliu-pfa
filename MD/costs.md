0. Infrastructura Generală (Bază de Date & Real-time)
Detalii: Nucleul care ține în viață sincronizarea între telefon și laptop. Trebuie să suporte WebSockets/Real-time.

Componente Software: Supabase (PostgreSQL), Firebase (NoSQL), sau Appwrite.

Alte detalii pertinente (Costuri): * Supabase: Planul Free e generos, planul Pro costă $25/lună. Plătești pe „Compute” (puterea serverului) și mărimea bazei de date, indiferent câte citiri/scrieri faci. Ideal pentru scalare predictibilă.

Firebase: Planul „Blaze” (Pay-as-you-go). Plătești la numărul de documente citite/scrise (ex. $0.06 / 100,000 citiri). La un demo cu actualizări foarte rapide (ex: drag & drop, stocuri), costurile pot crește brusc.

Pusher (Opțional, doar pt Websockets): Dacă vrei să ții baza de date separată și ai nevoie doar de țeava de comunicare live.

A. Digital Guestbook & Smart Check-out
Detalii: Sincronizare instantă a unei stări (parolă WiFi) și declanșarea unei alerte vizuale/sonore la check-out.

Componente Software: * Preluare/Sincronizare date: TanStack Query sau SWR.

Efecte audio: use-sound (pachet npm).

Management stare temporară: Zustand.

Alte detalii pertinente (Costuri): Păstrarea conexiunilor deschise consumă "Concurrent Connections" în backend (Supabase are limită de 500 pe gratis, suficient pentru demo-uri; Firebase are limită de 100k pe gratis). Librăriile audio și de stare sunt open-source, 100% gratuite.

B. Alerter Mentenanță & Curățenie
Detalii: Trimiterea unui formular rapid de pe mobil care declanșează un sistem de tip "Inbox/Notificare" pe laptop, cu timer.

Componente Software:

Notificări UI (Clopoțel/Inbox): Novu (recomandat, open-source) sau MagicBell.

Manipulare Timp (Timer): date-fns sau dayjs.

Formulare rapide: React Hook Form.

Alte detalii pertinente (Costuri): Serviciile de notificare (Novu/MagicBell) percep costuri în funcție de numărul de utilizatori activi lunar (MAU) și volumul de notificări. Novu Cloud e gratuit până la un punct, dar poate fi și self-hosted (gratuit total, dar necesită server). Librăriile de timp și formulare sunt gratuite.

C. Ticketing & Mentenanță Active
Detalii: Dashboard Kanban pe laptop (drag-and-drop) care modifică un status în baza de date și se reflectă pe telefon. Opțional: stocare poze simulate.

Componente Software:

Drag-and-Drop: @dnd-kit/core (modern, excelent pe Next.js) sau @hello-pangea/dnd.

Stocare imagini (dacă renunți la simulare): Supabase Storage sau AWS S3.

Alte detalii pertinente (Costuri): Fiecare mutare a unui tichet într-o coloană nouă înseamnă o operațiune de Scriere (Write) în baza de date. La Firebase costă per mutare, la Supabase e inclus în pachetul lunar. Stocarea de imagini reale (dacă adaugi) va genera costuri de Bandwidth (Trafic) și Storage (Stocare). Librăriile drag-and-drop sunt gratuite.

D. Terminal Digital de Feedback (NPS)
Detalii: Prezentarea datelor în grafice live și analiza sentimentului dintr-un text lăsat de utilizator.

Componente Software:

Grafice: Recharts (foarte ușor de stilizat cu Tailwind) sau Tremor (componente React gata făcute pentru dashboard-uri).

Sentiment Analysis: OpenAI API (modelul gpt-4o-mini sau gpt-3.5-turbo) sau Anthropic API (Claude Haiku).

Alte detalii pertinente (Costuri): API-ul OpenAI/Anthropic se plătește la numărul de "tokeni" (cuvinte/silabe analizate). Modelul GPT-4o-mini este extrem de ieftin ($0.15 / 1 milion de tokeni de input). Practic, analiza a zeci de mii de feedback-uri te va costa sub 1 dolar. Librăriile de grafice sunt open-source (gratuite).

E. Cărți de Vizită Digitale (vCard)
Detalii: Generarea unui fișier .vcf bazat pe date introduse în Next.js și afișarea unui QR scanabil.

Componente Software:

Generare fișier: vcf sau vcards-js.

Generare cod QR: qrcode.react.

Descărcare fișier pe client: file-saver.

Alte detalii pertinente (Costuri): Această funcționalitate rulează 100% "Client-Side" (în browser-ul utilizatorului) dacă nu salvezi profilele în baza ta de date. Generarea QR-urilor și a vCard-urilor nu consumă resurse de server. Cost zero ($0), toate librăriile sunt open-source.

F. Gestiune Stocuri "On-the-Go"
Detalii: Actualizări super rapide la apăsarea +/- pe telefon, sincronizate cu un tabel pe laptop unde rândurile afectate pulsează/se colorează.

Componente Software:

Tabel UI: shadcn/ui (Tabel component).

Animații UI: Framer Motion (pentru pulsația roșie) sau @formkit/auto-animate.

Alte detalii pertinente (Costuri): La fel ca la Kanban, aici e vorba de frecvența scrierilor în baza de date. Ca să economisești bani (dacă folosești Firebase) și să scazi latența (să se simtă instant), se folosește un concept numit "Optimistic UI Update" (TanStack Query știe să facă asta nativ): actualizezi interfața grafică imediat, gratuit, și trimiți o singură actualizare "bulk" (în grup) către baza de date după ce utilizatorul termină de apăsat butoanele de stoc. Toate librăriile vizuale sunt gratuite.