# 🗺️ Plan Proiect: Digital Concierge & Smart Tourism Hub

Acest document servește drept foaie de parcurs pentru dezvoltarea platformei. Obiectivul este digitalizarea comunicării între pensiuni și turiști, oferind în același timp o platformă de promovare turistică regională (Parteneriate Primării & Restaurante), cu un nivel ridicat de accesibilitate prin tehnologia Scan & Tap (QR + NFC).

---

## 🛠️ Stack Tehnic & Hardware

| Strat | Tehnologie / Componentă | Rol |
| :--- | :--- | :--- |
| **Frontend** | `Next.js 14+ (App Router)` | Framework principal (SSR & Client-side) |
| **Styling** | `Tailwind CSS` + `shadcn/ui` | Design rapid, responsiv și profesional |
| **Bază de Date** | `Supabase (PostgreSQL)` | Stocare date, Autentificare și Real-time |
| **Icons** | `Lucide React` | Iconițe vectoriale pentru interfață |
| **State Management**| `TanStack Query` + `Zustand` | Caching date și stare globală simplificată |
| **Notificări** | `Twilio API` (WhatsApp/SMS) | Trimiterea alertelor către staff-ul pensiunii |
| **Generare QR** | `qrcode.react` | Generare coduri QR statice pentru print |
| **Hardware** | `Tag-uri NFC (NTAG213 / NTAG215)` | Stickere programabile pentru acces instantaneu ("Tap") |

---

## 🚀 Fazele Dezvoltării

### Faza 1: Infrastructură & Modelare Date
*Scop: Configurarea mediului și definirea relațiilor între entități.*

1. **Setup Proiect:** Inițializare Next.js, Tailwind și integrare `shadcn/ui`.
2. **Configurare Supabase:** Crearea tabelelor cu următoarea ierarhie:
    - `Regiuni` (Placeholder: `[Regiune_Pilot]`) - Conține istoric, obiective și trasee oficiale.
    - `Pensiuni` - Legate de o regiune. Conțin parola WiFi, reguli și contact WhatsApp.
    - `Camere` - Legate de pensiune (ID simplu: 101, 102, etc.).
    - `Parteneri_Locali` - Restaurante/Activități adăugate de managerul pensiunii sau admin.
3. **Componente Software:** `Supabase CLI`, `PostgreSQL`.

### Faza 2: Interfața Turistului (Mobile-First)
*Scop: Experiență fluidă, fără logare, accesată prin scanare QR sau atingere NFC.*

1. **Rute Dinamice:** Implementarea structurii `/[regiune]/[slug_pensiune]/[id_camera]`.
2. **Ecran Principal:**
    - **Modul WiFi:** Afișare parolă (sincronizată cu baza de date).
    - **Modul Utilitare:** Butoane pentru cereri (Prosoape, Gunoi, Curățenie).
    - **Modul Ghid Local:** Listă restaurante (cu oferte/coduri reducere).
    - **Modul Primărie:** Secțiune dedicată pentru istoric, trasee și evenimente regionale.
3. **Componente Software:** `Next.js Dynamic Routes`, `framer-motion` (pentru animații meniu).

### Faza 3: Motorul de Alerte (WhatsApp/SMS)
*Scop: Comunicare instantanee cu personalul fără dashboard-uri complicate.*

1. **Webhook Alerte:** Crearea unui API Route în Next.js care primește cererea de la turist.
2. **Integrare Twilio:** Trimiterea mesajului WhatsApp/SMS către numărul configurat de pensiune.
    - *Format mesaj:* `🛎️ Alertă [Pensiune]: Camera [X] solicită [Serviciu].`
3. **Protecție Anti-Spam:** Implementare `localStorage` throttling (limitare la o cerere la 10 minute per cameră).
4. **Componente Software:** `Twilio SDK`, `Next.js API Routes`.

### Faza 4: Management & Parteneriate (Admin Dashboards)
*Scop: Unelte de editare pentru tine și pentru managerii de pensiuni.*

1. **Dashboard Manager Pensiune:**
    - Editare Parolă WiFi & Regulile Casei.
    - Gestionare listă proprie de restaurante parteneri (Adăugare poze/descrieri).
    - Configurare număr recepție pentru alerte.
2. **Dashboard Super-Admin (Tu):**
    - Administrare Regiuni (Placeholder: `[Zona_Target]`).
    - Managementul conținutului istoric/turistic pentru Primării.
    - Analytics: Vizualizare număr de scanări/atingeri NFC și interacțiuni per regiune.
3. **Componente Software:** `Supabase Auth`, `react-hook-form`, `zod`.

### Faza 5: Livrabile Fizice (QR, NFC & Print Design)
*Scop: Pregătirea materialelor fizice premium ("La cheie") pentru camere.*

1. **Generator Bulk QR:** Pagină de admin pentru generarea automată a vizualurilor QR pentru toate camerele unei pensiuni.
2. **Programare Hardware (NFC):** - Achiziționarea stickerelor NFC ieftine (tip NTAG213).
    - Scrierea URL-ului dinamic al camerei (ex: `demo.ro/brasov/pensiunea-bradul/204`) pe cipul NFC folosind o aplicație mobilă (ex: NFC Tools).
3. **Asamblare & Print Styles:** - CSS dedicat (`Tailwind Print Classes`) pentru imprimarea graficii.
    - Designul va include un Call-to-Action dublu: *"Scanează codul QR sau atinge telefonul aici"*.
    - Aplicarea stickerului NFC pe spatele suportului de plexiglas (pentru a fi invizibil, dar funcțional).

---

## 📍 Note de Implementare & Business

- **Regiune Pilot:** `[De completat: Ex - Rasnov / Cazanele Dunarii]`
- **Canal Notificări:** Default: `WhatsApp` (via Twilio). Alternativă: `SMS`.
- **Model Business Propus:** - **Setup On-boarding:** Cost unic (hardware plexiglas, NFC, printare și configurare).
    - **SaaS:** Abonament lunar pentru pensiuni (include alertele WhatsApp și spațiu de reclamă vândut către restaurante).
    - **B2G:** Proiect de digitalizare turistică susținut de Primării (Fonduri UE/Buget Local).

---
*Ultima actualizare: 21.04.2026*