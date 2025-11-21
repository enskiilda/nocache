import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/react"

export const metadata: Metadata = {
  title: "Gemini Computer Use Demo",
  description: "A Next.js app that uses Google Gemini 2.5 Flash to create a computer using agent.",
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Toaster />
        <Analytics />
      </body>
    </html>
  );
}
