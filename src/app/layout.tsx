import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { AdminProvider } from "@/context/AdminContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sourabh Sah - Personal Blog",
  description: "Personal blog and portfolio showcasing my work and thoughts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100`}>
        <AdminProvider>
          <Navigation />
          <main className="min-h-screen pt-16">
            {children}
          </main>
        </AdminProvider>
      </body>
    </html>
  );
}
