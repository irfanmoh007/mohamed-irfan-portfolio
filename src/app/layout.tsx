import type { Metadata } from "next";
import { Syne, Roboto } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mohamed Irfan | SOC Analyst & Security Engineer Portfolio",
  description: "SOC-focused security engineer specializing in security operations (SOC), threat detection, home labs, and penetration testing. Top 1% TryHackMe, SC-900 certified, CEH in progress.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${syne.variable} ${roboto.variable} h-full antialiased`}>
      <body className="bg-bg-dark text-text-primary min-h-full flex flex-col relative font-sans">
        
        {/* Background Grids & Ambient Lights */}
        <div className="bg-grid-overlay">
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          <div className="grid-line vertical"></div>
          
          {/* Custom glows with theme colors */}
          <div 
            className="ambient-glow glow-1 w-[40vw] h-[40vw] top-[-10vw] left-[-10vw]"
            style={{ background: 'radial-gradient(circle, var(--color-text-primary) 0%, rgba(0,0,0,0) 70%)' }}
          />
          <div 
            className="ambient-glow glow-2 w-[50vw] h-[50vw] bottom-[-15vw] right-[-10vw]"
            style={{ background: 'radial-gradient(circle, var(--color-accent-rust) 0%, rgba(0,0,0,0) 70%)' }}
          />
        </div>

        {/* Global Navigation Header */}
        <Header />

        {/* Page Content */}
        {children}
      </body>
    </html>
  );
}
