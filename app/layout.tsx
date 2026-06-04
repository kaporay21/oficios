import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OficiosYa — Encontrá el profesional que necesitás",
  description: "Plomeros, electricistas, gasistas y más. Verificados y cerca tuyo en toda Argentina.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;500;600;700;800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap" rel="stylesheet" />
      </head>
      <body style={{ fontFamily: "'DM Sans', sans-serif", margin: 0, padding: 0 }}>
        {children}
      </body>
    </html>
  );
}