const config = {
    content: [
        "./pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./app/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/**/*.{js,ts,jsx,tsx,mdx}", // Adăugat pentru siguranță
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    primary: "#10b981",   // Emerald 500
                    secondary: "#3b82f6", // Blue 500
                    dark: "#020617",      // Slate 950
                    accent: "#f59e0b",    // Amber 500
                },
            },
        },
    },
    plugins: [],
};

export default config;