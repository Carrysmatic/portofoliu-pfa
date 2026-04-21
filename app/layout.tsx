import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Font modern, standard pentru Next.js
import "./globals.css";
import Navbar from "./components/Navbar";

// Configurăm fontul Inter pentru un aspect curat, profesional
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "NumePrenume PFA | Soluții Digitale & Automatizări",
  description: "Digitalizarea afacerilor locale prin site-uri moderne și sisteme software care salvează timp.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased selection:bg-brand-primary/30 selection:text-brand-primary`}>

        {/* Navbar-ul rămâne fix sus pe toate paginile */}
        <Navbar />

        {/* Main conține paginile propriu-zise. 
          'pt-20' este critic pentru a împinge conținutul sub Navbar-ul fix de 80px (h-20).
        */}
        <main className="min-h-screen pt-20">
          {children}
        </main>

        {/* Footer simplu pentru a închide vizual paginile */}
        <footer className="py-12 border-t border-white/5 bg-slate-950 text-center">
          <div className="max-w-7xl mx-auto px-6">
            <p className="text-slate-600 text-sm">
              © {new Date().getFullYear()} NumePrenume PFA. Soluții digitale construite cu Next.js 15.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}