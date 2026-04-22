import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // 1. Am importat noul Footer

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PlopianuStefanPFA | Soluții Digitale & Automatizări",
  description: "Digitalizarea afacerilor locale prin site-uri moderne și sisteme software care salvează timp.",
};

export default function RootLayout({ children }: { children: React.ReactNode; }) {
  return (
    <html lang="ro" className="scroll-smooth">
      <body className={`${inter.className} bg-slate-950 text-slate-200 antialiased selection:bg-brand-primary/30 selection:text-brand-primary`}>

        <Navbar />

        {/* Am lăsat main-ul cu padding-top pentru paginile de prezentare */}
        <main className="min-h-screen pt-20">
          {children}
        </main>

        <Footer /> {/* 2. Am pus componenta aici în loc de codul hardcodat */}

      </body>
    </html>
  );
}