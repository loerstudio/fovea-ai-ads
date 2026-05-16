import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fovea - AI Ads Manager con Garanzia ROI per Coach",
  description: "L'unico AI Ads Manager che garantisce ROI positivo o ti rimborsiamo. Ottimizza automaticamente le tue campagne Meta, Google e TikTok.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="it" className="dark">
        <body className={`${inter.className} bg-black text-white antialiased min-h-screen`}>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
