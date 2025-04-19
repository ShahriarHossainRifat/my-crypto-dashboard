// src/app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/providers/ThemeProvider";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Crypto Dashboard",
  description: "Interactive dashboard for cryptocurrency prices",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // Ensure no extra spaces or newlines inside the <html> tag itself
    <html lang="en" suppressHydrationWarning>
      {/* Head tag content is inferred from metadata object */}
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange // You might experiment removing this later if needed
        >
          <Header />
          <main className="flex-grow container mx-auto px-4 w-full pt-20 pb-12">
            {" "}
            {/* Use flex-grow, adjust padding */}{" "}
            {/* Example basic main layout */}
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
