1. Tabelul properties (Pensiuni)
Rol: Inima sistemului; definește cine este clientul (B2B).

Puncte cheie: ID unic, nume, slug (pentru URL), date WiFi, setări de branding (culori/logo) și statusul de activare.

2. Tabelul profiles (Utilizatori/Manageri)
Rol: Face legătura între sistemul de login (Auth) și pensiunea gestionată.

Puncte cheie: ID (legat de Supabase Auth), property_id, rol (Manager, Staff, sau Admin) și date de contact.

3. Tabelul rooms (Acces & Securitate)
Rol: Identifică locația fizică a turistului și securizează sesiunea fără login.

Puncte cheie: ID, property_id, număr cameră și auth_token (codul unic din QR).

4. Tabelul recommendations (Conținut Local)
Rol: Recomandări de restaurante, producători și obiective.

Puncte cheie: ID, property_id, categorie, titlu, descriere, link Maps și suport pentru traduceri (RO/EN).

5. Tabelul house_rules (Regulament)
Rol: Digitalizarea dosarului cu reguli din cameră.

Puncte cheie: ID, property_id, iconiță, titlu, tip (Quick Rule vs. Full Text) și ordinea de afișare.

6. Tabelul alerts (Operațiuni Live)
Rol: Gestionarea cererilor de la turiști către staff în timp real.

Puncte cheie: ID, room_id, categorie cerere (curățenie, cafea etc.), mesaj, status (Nou/În lucru/Finalizat) și timestamp.

7. Tabelul subscriptions (Tab-ul tău de Monitorizare)
Rol: Motorul tău de business (White Glove control).

Puncte cheie: property_id, tip plan (Basic/Premium), data expirării, limita de camere active și istoricul plății.

8. Tabelul analytics (Valoare B2G)
Rol: Colectarea datelor de utilizare pentru raportări către clienți/primării.

Puncte cheie: ID, property_id, tip eveniment (ex: "click_traseu_istoria"), metadata (JSONB) și data.





=========================================================================================
Documentație Bază de Date - Digital Concierge

**Versiune:** 1.0 (Planificare)
**Ultima actualizare:** 21 Aprilie 2026
**Arhitectură:** Multi-tenant (B2B & B2G)

---

## 🏗️ Obiective Arhitecturale
1. **Scalabilitate:** Suport pentru pensiuni individuale și Hub-uri regionale (Primării).
2. **Securitate:** Acces pe bază de token (Cheia Invizibilă) fără login pentru turiști.
3. **Personalizare:** Branding dinamic (culori/logo) per locație.

---

## 🛠️ Tipuri de Date Personalizate (Enums)
Înainte de tabele, definim următoarele tipuri în Supabase pentru a restricționa valorile:

- `property_type`: `['accommodation', 'public_hub']`
- `property_status`: `['active', 'suspended', 'trial']`

---

## 📋 Tabel: `properties`
Acesta este tabelul părinte care stochează entitățile (Pensiuni sau Primării).

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `uuid_generate_v4()` | Identificator unic universal. |
| `name` | `text` | NOT NULL | Numele locației (ex: Pensiunea Smarald). |
| `slug` | `text` | UNIQUE, NOT NULL | URL-friendly name (ex: `smarald-resort`). |
| `type` | `property_type`| Default: `'accommodation'` | Diferențiază B2B (Pensiune) de B2G (Hub Public). |
| `parent_id` | `uuid` | FK (`properties.id`) | **Portiță Scalabilitate:** Leagă o pensiune de o Primărie. |
| `status` | `property_status`| Default: `'trial'` | Control acces (Activ/Suspendat). |
| `wifi_ssid` | `text` | NULLABLE | Numele rețelei WiFi (pentru turism). |
| `wifi_password`| `text` | NULLABLE | Parola WiFi. |
| `primary_color`| `text` | Default: `'#10b981'` | Culoarea principală a interfeței (Hex). |
| `logo_url` | `text` | NULLABLE | Calea către logo în Supabase Storage. |
| `region_name` | `text` | NOT NULL | Grupare regională (ex: "Vama Buzăului"). |
| `config` | `jsonb` | Default: `{}` | **Portiță Viitor:** Setări extra (teme, module active). |
| `created_at` | `timestamp` | Default: `now()` | Data înregistrării. |

---

## 💡 Note de Implementare (Asul din Mânecă)

### 1. Logica de Moștenire (Region-based)
Coloana `region_name` nu este doar informativă. Aplicația va folosi acest câmp pentru a injecta automat în vizualizarea turistului traseele și activitățile pe care **tu** (Super-Admin) le-ai creat pentru acea zonă, fără ca managerul pensiunii să poată interveni.

### 2. Portița B2G
Câmpul `parent_id` permite crearea unei ierarhii. Dacă o Primărie contractează Hub-ul Public, toate proprietățile care au `parent_id` setat către ID-ul Primăriei vor fi marcate ca "Parteneri Oficiali" în aplicația de stradă.

### 3. Securitate RLS (Row Level Security)
- **Turist:** Acces `SELECT` doar pe proprietatea identificată prin `auth_token` (din tabelul `rooms`).
- **Manager:** Acces `SELECT/UPDATE` doar pe proprietatea proprie.
- **Super-Admin (Tu):** Acces total.

---

## 💬 Flux Notificări WhatsApp (The Real-time Link)

1. **Trigger:** Inserare rând nou în tabelul `alerts`.
2. **Action:** Supabase Webhook declanșează o funcție Edge.
3. **Delivery:** Mesajul este trimis via Twilio către un **Grup de WhatsApp** predefinit al locației.
4. **Beneficiu:** Staff-ul primește notificarea instant, fără a fi nevoie să aibă dashboard-ul deschis.


## 👥 Tabel: `profiles`
Acest tabel extinde datele utilizatorilor din `auth.users` și definește permisiunile acestora.

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, FK (`auth.users.id`) | Trebuie să coincidă cu ID-ul de autentificare. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea la care lucrează / pe care o deține. |
| `full_name` | `text` | NOT NULL | Numele complet al managerului sau staff-ului. |
| `role` | `user_role` | Default: `'staff'` | Permisiuni: `manager`, `staff` sau `super_admin`. |
| `avatar_url` | `text` | NULLABLE | Link către poza de profil (opțional). |
| `email` | `text` | NOT NULL | Adresa de email pentru contact/notificări. |
| `updated_at` | `timestamp` | Default: `now()` | Ultima actualizare a profilului. |

---

## 🔐 Ierarhia Rolurilor (Logica de Acces)

1. **Super-Admin (Tu):**
   - Are `property_id` NULL sau către o entitate proprie.
   - Singurul care poate edita tabelele de `routes` și `activities`.
   - Poate activa/suspenda orice `property`.

2. **Manager:**
   - Legat de un singur `property_id`.
   - Poate edita: WiFi, Reguli, Recomandări Locale (Restaurante).
   - **NU** vede și nu poate edita Traseele/Istoricul regional (Asul tău din mânecă).

3. **Staff:**
   - Legat de un singur `property_id`.
   - Are acces doar la panoul de **Alerte** (Cereri Turist) pentru a le bifa ca rezolvate.
   - Vizualizare limitată a setărilor de configurare.

---

## 💡 Note de Implementare pentru `profiles`

### 1. Sincronizarea cu Supabase Auth
Vom folosi un **Trigger** în baza de date. În momentul în care tu creezi un cont nou de manager din dashboard, Supabase va insera automat un rând corespondent în acest tabel `profiles`.

### 2. Securitate (RLS)
Managerii vor avea o politică de tip: `USING (auth.uid() = id)`. Asta înseamnă că niciun manager nu poate vedea sau edita profilul altui manager de la o altă pensiune.

### 3. "The Multi-Property Owner" (Edge Case)
Dacă pe viitor un client are 2-3 pensiuni, nu vom schimba tabelul. Pur și simplu îi vom crea un profil de `manager` pentru fiecare, sau vom face un tabel de legătură. Pentru MVP, rămânem la **1 Profil = 1 Pensiune**.



## 🔑 Tabel: `rooms`
Acest tabel gestionează punctele de acces fizic (Camerele) și securitatea sesiunilor fără login.

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `uuid_generate_v4()` | Identificator unic al camerei. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea de care aparține camera. |
| `room_number` | `text` | NOT NULL | Denumirea/Numărul (ex: "Camera 101", "Apartament"). |
| `auth_token` | `text` | UNIQUE, NOT NULL | **Cheia Invizibilă:** Codul secret din URL-ul QR. |
| `is_active` | `boolean` | Default: `true` | Permite dezactivarea unei camere fără a șterge datele. |
| `last_active` | `timestamp` | NULLABLE | Monitorizează ultima scanare a QR-ului (Analytics). |
| `created_at` | `timestamp` | Default: `now()` | Data creării codului. |

---

## 🛡️ Logica "Cheia Invizibilă" (Security Flow)

1. **Generare:** Tu (Super-Admin) generezi un link de tip: `https://app.tu.ro/camera/101?auth=ABC_123`.
2. **Scanare:** Turistul scanează QR-ul. Aplicația citește `auth=ABC_123`.
3. **Validare:** Înainte de a arăta orice dată, sistemul caută în tabelul `rooms` rândul unde `auth_token == 'ABC_123'`.
4. **Contextualizare:**
   - Dacă token-ul este valid, aplicația află `property_id`.
   - Încarcă automat: Culoarea pensiunii, WiFi-ul, Regulile și Traseele din acea regiune.
   - Orice alertă trimisă va fi marcată automat ca venind de la "Camera 101".

---

## 💡 Note de Implementare pentru `rooms`

### 1. Prevenirea "Guessing-ului" (Brute Force)
`auth_token` nu ar trebui să fie ceva simplu (ca "123"). Vom folosi șiruri de caractere aleatorii (NanoID sau UUID scurt) pentru a fi imposibil de ghicit.

### 2. Kill-Switch Instant
Dacă un manager nu își plătește abonamentul, tu schimbi statusul în tabelul `properties` la `suspended`. Deși QR-ul fizic rămâne în cameră, validarea de la pasul 3 va eșua, iar turistul va vedea un mesaj de tip "Serviciu indisponibil".

### 3. Analytics per Cameră
Fiecare scanare actualizează `last_active`. La final de lună, îi poți spune managerului: *"Camera 105 nu a scanat niciodată QR-ul, poate suportul este pus într-un loc unde nu se vede."* (Valoare adăugată prin consultanță).


## 🏗️ Tabel Nou: `master_places` (Baza de Date Centrală)
Acesta este "Seiful" tău cu toate locațiile din regiune. Tu (Super-Admin) ești singurul care îl gestionează.

| Coloană | Tip de Date | Descriere |
| :--- | :--- | :--- |
| `id` | `uuid` (PK) | Identificator unic. |
| `name` | `text` | Numele restaurantului/obiectivului. |
| `category` | `text` | Restaurant, Producător, Muzeu, etc. |
| `maps_url` | `text` | Link Google Maps oficial. |
| `base_image`| `text` | Fotografia oficială a locației. |
| `is_verified`| `boolean` | Dacă este o locație validată de tine. |

---

## 🍴 Tabel Actualizat: `recommendations` (Link-ul Comercial)
Acest tabel nu mai conține datele restaurantului, ci doar **relația** dintre Pensiune și Restaurant.

| Coloană | Tip de Date | Descriere |
| :--- | :--- | :--- |
| `id` | `uuid` (PK) | Identificator unic. |
| `property_id` | `uuid` (FK) | Pensiunea care afișează recomandarea. |
| `place_id` | `uuid` (FK) | Legătura către restaurantul din `master_places`. |
| `is_sponsored`| `boolean` | **PORTIȚA DE BANI:** Dacă pensiunea primește bani pentru asta. |
| `priority` | `integer` | Ordinea de afișare (cele cu bani apar primele). |
| `custom_note` | `text` | Nota specifică a pensiunii (ex: "Ziceți că veniți de la noi pentru un digestiv gratis"). |


## 📜 Tabel: `house_rules`
Digitalizarea regulamentului intern și a informațiilor utile "la o privire".

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK, Default: `uuid_generate_v4()` | Identificator unic. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea de care aparține regula. |
| `title` | `text` | NOT NULL | Titlul regulii (ex: "Fumatul interzis"). |
| `icon_name` | `text` | Default: `'Info'` | Numele iconiței din Lucide (ex: `SmokingArea`, `Clock`). |
| `short_desc` | `text` | NULLABLE | Descriere scurtă (ex: "Doar pe balcon/terasă"). |
| `order_index` | `integer` | Default: `0` | **Crucial:** Ordinea de afișare în grid-ul de 12. |
| `is_quick_info`| `boolean` | Default: `true` | Dacă apare în grid-ul principal sau doar în lista lungă. |
| `created_at` | `timestamp` | Default: `now()` | Data creării. |

---

## 📄 Notă despre "Regulamentul Complet"
Pentru a păstra baza de date eficientă, textul lung al regulamentului (pagini întregi de text juridic) **nu** va fi stocat rând cu rând în acest tabel. 

**Soluție:** Vom adăuga o coloană de tip `text` (sau `markdown`) direct în tabelul **`properties`** numită `full_regulation`. 
- **De ce?** Pentru că este un singur bloc mare de text per pensiune, spre deosebire de cele 12 carduri care sunt entități individuale ce pot fi mutate, editate sau șterse separat.

---

## 🛠️ Logica de Interfață (The 12 Card Grid)

1. **Limitarea Vizuală:** Deși tabelul poate accepta oricâte rânduri, în interfața Mobile a turistului vom afișa doar primele 12 rânduri care au `is_quick_info = true`, sortate după `order_index`.
2. **Iconițe Dinamice:** Managerul va alege dintr-o listă predefinită de iconițe (Wifi, PetFriendly, NoSmoking, Breakfast, etc.). În cod, vom mapa aceste nume de text direct către componentele `Lucide Icons`.

---

## 💡 Note de Implementare pentru `house_rules`

### 1. "The Standard Template" (Portița ta de viteză)
Când semnezi o pensiune nouă, nu vrei să introduci manual cele 12 reguli de fiecare dată.
- **Asul din mânecă:** Vom crea un script care inserează automat un set de "Reguli Standard" (WiFi, Check-in/Out, Fumat, Liniște) imediat ce pensiunea este creată. Managerul doar le editează dacă e cazul.

### 2. Actualizarea Real-time
Dacă managerul schimbă ora de mic dejun în dashboard, regula se actualizează instantaneu pe ecranele tuturor turiștilor cazați. Fără tipărituri, fără foi plastifiate modificate cu pixul.

### 3. Edge Case: "Reguli Temporare"
Dacă piscina este închisă pentru mentenanță timp de 2 zile, managerul poate adăuga o regulă cu `order_index = 0` (să apară prima) și un icon de alertă. Când mentenanța e gata, pur și simplu o șterge sau o dezactivează.


## 🔔 Tabel: `alerts` (Optimizat pentru WhatsApp)
Gestionarea cererilor fără ca staff-ul să folosească dashboard-ul.

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK | Identificator unic. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea respectivă. |
| `room_id` | `uuid` | FK (`rooms.id`) | Camera de unde provine cererea. |
| `category` | `text` | NOT NULL | Prosoape, Cafea, Curățenie, etc. |
| `status` | `enum` | Default: `'pending'` | `pending`, `completed`. |
| `whatsapp_msg_id` | `text` | NULLABLE | ID-ul mesajului trimis (pentru a putea primi răspuns). |
| `closed_at` | `timestamp` | NULLABLE | Momentul în care staff-ul a apăsat pe link-ul de finalizare. |
| `created_at` | `timestamp` | Default: `now()` | Ora cererii. |

---

## 📲 Workflow Staff-Only (WhatsApp)

1. **Turistul** trimite cererea din aplicație.
2. **Sistemul** creează rândul în `alerts` și trimite mesaj pe WhatsApp către grupul de staff.
3. **Mesajul** conține un link de tip: `tu.ro/finish/[id]`.
4. **Staff-ul** finalizează task-ul fizic și apasă link-ul din mesaj.
5. **Baza de Date** se actualizează automat la `status = 'completed'` și înregistrează `closed_at`.

---

## 💡 Note de Implementare (Staff UX)

- **Simplitate Extremă:** Pagina care se deschide din link-ul de WhatsApp trebuie să aibă un singur buton uriaș și verde: "MARCHEAZĂ CA FINALIZAT".
- **Fără Parole:** Staff-ul nu trebuie să se logheze. Link-ul conține un token de securitate unic pentru acea alertă specifică.
- **Confirmare Manager:** Managerul poate vedea în dashboard-ul lui exact ora la care staff-ul a apăsat butonul, având astfel control asupra performanței echipei fără să-i oblige să folosească aplicația.

## 📊 Tabel: `analytics`
Colectarea datelor de utilizare pentru rapoarte de performanță și vânzare către B2G.

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `bigint` | PK, Identity | Folosim bigint pentru volum mare de date. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea/Hub-ul unde a avut loc evenimentul. |
| `event_type` | `text` | NOT NULL | Tipul acțiunii: `scan_qr`, `view_route`, `view_wifi`, etc. |
| `event_data` | `jsonb` | Default: `{}` | **Portiță Scalabilitate:** Stochează detalii (ex: ce traseu anume). |
| `room_id` | `uuid` | FK (`rooms.id`), NULL | Opțional, pentru a vedea comportamentul per cameră. |
| `created_at` | `timestamp` | Default: `now()` | Ora exactă a interacțiunii. |

---

## 📈 Ce evenimente urmărim? (Catalog de Date)

1. **`scan_qr`**: Înregistrează momentul în care un turist intră în aplicație.
   - *Data:* `{"spot": "noptiera_stanga"}` sau `{"spot": "stalp_centru"}`.
2. **`view_route`**: Cel mai valoros pentru Primărie.
   - *Data:* `{"route_id": "cascada-cailor", "duration_on_page": 45}`.
3. **`service_request`**: Eficiența pensiunii.
   - *Data:* `{"type": "coffee", "time_to_complete": 300}` (în secunde).
4. **`external_click`**: Câți turiști au plecat spre restaurantele partenere.
   - *Data:* `{"place_id": "pizzeria-centru"}`.

---

## 💡 Note de Implementare (The "Data is Gold" Strategy)

### 1. JSONB pentru Flexibilitate
Am ales `jsonb` pentru `event_data` deoarece cerințele Primăriei se vor schimba. Azi vor să știe câți oameni au văzut traseul, mâine vor să știe dacă au dat click pe butonul de "Audio Guide". Cu JSONB, nu trebuie să mai modificăm tabelul niciodată.

### 2. Raportul "Căldura Zonei" (B2G Pitch)
Folosind acest tabel, îi poți prezenta Primarului un raport: 
- *"Domnule Primar, în weekend-ul de Paște, 80% din scanările de pe stradă au fost pentru 'Istoria Bisericii Vechi'. Turiștii stau în medie 3 minute să citească. E o oportunitate să punem acolo o bancă sau un punct de informare fizic."*

### 3. Optimizarea Staff-ului (B2B Value)
Dacă analizezi `event_type = 'view_wifi'`, managerul poate observa că turiștii caută parola WiFi imediat după check-in (ora 14:00-16:00). Asta îi confirmă că sistemul digital preia din munca recepției.

### 4. Portița de Anonimat
**Foarte Important:** Nu stocăm nume, CNP-uri sau numere de telefon ale turiștilor aici. Este o colectare de date anonimă, ceea ce te scutește de 90% din durerile de cap legate de GDPR, dar îți oferă 100% din valoarea statistică.

## 💳 Tabel: `subscriptions`
Monitorizarea financiară și controlul accesului pentru modelul White Glove.

| Coloană | Tip de Date | Constrângeri | Descriere |
| :--- | :--- | :--- | :--- |
| `id` | `uuid` | PK | Identificator unic subscripție. |
| `property_id` | `uuid` | FK (`properties.id`) | Pensiunea/Organizația vizată. |
| `plan_type` | `text` | Default: `'basic'` | `basic`, `premium`, `b2g_hub`. |
| `status` | `text` | Default: `'trial'` | `trial`, `active`, `past_due`, `canceled`. |
| `start_date` | `timestamp` | NOT NULL | Data activării serviciului. |
| `end_date` | `timestamp` | NOT NULL | Data expirării (pentru reînnoire). |
| `qr_limit` | `integer` | Default: `10` | Numărul maxim de QR-uri permise în pachet. |
| `monthly_price` | `numeric` | NOT NULL | Valoarea abonamentului. |
| `is_white_glove` | `boolean` | Default: `true` | Dacă pachetul include mentenanța ta fizică. |
| `last_payment` | `timestamp` | NULLABLE | Data ultimei tranzacții confirmate. |

---

## 🛠️ Logica de Business (Controlul tău)

1. **Sistemul de Kill-Switch:**
   Aplicația va rula o verificare: Dacă `end_date` este depășit și statusul nu este `active`, coloana `status` din tabelul `properties` se schimbă automat în `suspended`. Turiștii nu mai pot comanda nimic, forțând managerul să te sune pentru plată.

2. **Controlul Instalării (QR Limit):**
   În dashboard-ul de Super-Admin, vei vedea o comparație: `Total Rooms` vs. `QR Limit`. Dacă o pensiune se extinde și vrea 5 QR-uri în plus, trebuie să treacă la planul superior. Tu deții controlul asupra generării de noi token-uri.

3. **Trial Manager:**
   Toate proprietățile noi încep cu status `trial` pentru 14 sau 30 de zile. Tabelul `subscriptions` îți va trimite o alertă (sau va apărea cu roșu în dashboard-ul tău) cu 3 zile înainte de expirare, ca să poți merge la locație pentru "negocierea finală".

---

## 💡 Note de Implementare (Business Intelligence)

### 1. Istoricul de Facturare
Deși este un MVP, acest tabel îți permite să vezi dintr-o privire MRR-ul (**Monthly Recurring Revenue**). 
Formula simplă: $$\sum Monthly\_Price \text{ unde } Status = 'active'$$

### 2. White Glove Audit
Coloana `is_white_glove` te ajută să filtrezi locațiile unde trebuie să mergi fizic pentru mentenanță sau actualizări de QR-uri, versus cele (poate viitoare) care se gestionează singure digital.

### 3. Scalabilitate B2G
Pentru Primării, poți seta `qr_limit` la `999` și `plan_type` la `b2g_hub`, având o structură de preț total diferită, dar folosind același sistem de monitorizare.