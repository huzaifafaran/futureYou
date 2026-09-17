import type { Metadata } from "next";
import { Inter, Space_Grotesk, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ResetDemoAction } from "@/components/ResetDemoAction";

const inter = Inter({ subsets: ["latin"], variable: '--font-body' });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: '--font-display' });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: '--font-mono' });

export const metadata: Metadata = {
  title: "Future You - Fitness POC",
  description: "Meet the version of yourself who has already achieved your goal.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${spaceGrotesk.variable} ${geistMono.variable}`}>
      <body suppressHydrationWarning className="font-sans antialiased min-h-screen relative selection:bg-[var(--color-focus)] selection:text-white bg-[var(--color-paper)] overflow-x-hidden">
        
        {/* Ambient Glows */}
        <div className="pointer-events-none fixed -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-[var(--color-accent)] opacity-[0.05] blur-[120px] mix-blend-screen z-0" />
        <div className="pointer-events-none fixed -bottom-40 -left-40 h-[600px] w-[600px] rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-[150px] mix-blend-screen z-0" />
        
        {/* Noise Texture Overlay */}
        <div className="pointer-events-none fixed inset-0 opacity-[0.02] mix-blend-overlay z-50" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }} />
        
        <div className="relative z-10 flex min-h-screen flex-col">
          {children}
        </div>
        <ResetDemoAction />
      </body>
    </html>
  );
}
