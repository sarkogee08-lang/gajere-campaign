import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gajere 2027",
  description:
    "Official campaign website of General Jafaru Mohammed Gajere (Rtd.)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">

        {/* Global National Assembly Watermark */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 bg-cover bg-center bg-no-repeat grayscale"
          style={{
            zIndex: 40,
            backgroundImage: "url('/images/national-assembly.jpg')",
            opacity: 0.12,
            backgroundAttachment: "fixed",
          }}
        />

        {/* Website Content */}
        <div
          className="relative flex min-h-full flex-1 flex-col"
          style={{
            zIndex: 1,
          }}
        >
          {children}
        </div>

      </body>
    </html>
  );
}

