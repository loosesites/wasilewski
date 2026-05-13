import type { Metadata } from "next";
import { Unbounded, Outfit } from "next/font/google";
import "./globals.css";

const unbounded = Unbounded({
  variable: "--font-display",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "600", "700", "800", "900"],
  display: "swap",
});

const outfit = Outfit({
  variable: "--font-body",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});



export const metadata: Metadata = {
  title: "AGA MAX Wasilewscy — Ekskluzywny Serwis i Detailing Samochodowy",
  description:
    "Profesjonalny detailing, ochrona lakieru PPF, serwis mechaniczny i diagnostyka komputerowa. 12+ lat doświadczenia. Poznaj AGA MAX — gdzie pasja spotyka precyzję.",
  keywords: "detailing samochodowy, serwis mechaniczny, powłoka ceramiczna, PPF, diagnostyka, tuning, AGA MAX",
  openGraph: {
    title: "AGA MAX Wasilewscy — Ekskluzywny Serwis i Detailing",
    description: "Precyzja bez kompromisów. Kompleksowa opieka nad Twoim autem.",
    type: "website",
    locale: "pl_PL",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pl"
      className={`${unbounded.variable} ${outfit.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#0a0a0a]">{children}</body>
    </html>
  );
}
