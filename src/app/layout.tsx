import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

export const metadata: Metadata = {
  title: "Kard OS — Engineering & Supplies",
  description: "Unified operating platform for Kard Engineering & Supplies Limited",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Sidebar />
        <main className="pl-64">
          <div className="p-6 max-w-[1600px]">{children}</div>
        </main>
      </body>
    </html>
  );
}
