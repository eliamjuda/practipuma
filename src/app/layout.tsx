import type { Metadata } from "next";
import { Baloo_Bhaijaan_2 } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import "katex/dist/katex.min.css";
import { QueryProvider } from '@/components/providers/QueryProvider';


const baloo = Baloo_Bhaijaan_2({
  variable: "--font-baloo",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PractiPuma",
  description: "Ingresa a la UNAM de una manera divertida y práctica",
  icons: {
    icon: "/pp-logo.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX" suppressHydrationWarning>
      <body className={`${baloo.variable} ${baloo.variable} antialiased`}>
        <QueryProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem={true}
          >
            {children}
          </ThemeProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
