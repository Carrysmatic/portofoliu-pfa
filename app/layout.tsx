import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nume Prenume | Soluții Digitalizare B2B & Fullstack Dev",
  description: "Dezvoltare software personalizată pentru afaceri locale. Automatizări HoReCa, sisteme QR și soluții SaaS pentru optimizarea proceselor.",
  icons: {
    icon: "/favicon.ico", // Asigură-te că ai fișierul în public/
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-50`}
      >
        <Navbar />
        <div className="relative min-h-screen overflow-x-hidden">
          {/* Background Decorativ Subtil */}
          <div className="absolute inset-0 -z-10 h-full w-full bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

          <main className="pt-20">{children}</main>

          {/* Aici vom introduce ulterior Footer-ul */}
        </div>
      </body>
    </html>
  );
}