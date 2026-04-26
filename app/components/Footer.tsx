"use client";
import { usePathname } from "next/navigation";

const Footer = () => {
    const pathname = usePathname();

    if (pathname === '/scan') {
        return null;
    }

    return (
        <footer className="py-12 border-t border-white/5 bg-slate-950 text-center">
            <div className="max-w-7xl mx-auto px-6">
                <p className="text-slate-600 text-sm">
                    © {new Date().getFullYear()} PlopianuStefan PFA. Soluții digitale.
                </p>
            </div>
        </footer>
    );
};

export default Footer;