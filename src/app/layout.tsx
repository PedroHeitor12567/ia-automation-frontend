import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Toaster } from "react-hot-toast";
import Sidebar from "../components/layout/Sidebar";
import "./globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: "AI Automation",
  description: "Plataforma de automação inteligente com IA",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
      <html lang="pt-BR" className={`${geist.variable} ${geistMono.variable}`}>
      <body className="bg-gray-900 text-white flex h-screen overflow-hidden antialiased">
      <Sidebar />
      <main className="flex-1 overflow-y-auto">{children}</main>
      <Toaster
          position="top-right"
          toastOptions={{
            style: { background: "#1f2937", color: "#f9fafb", border: "1px solid #374151" },
          }}
      />
      </body>
      </html>
  );
}