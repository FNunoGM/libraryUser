import "@/styles/globals.css";
import { Inter } from "next/font/google";
import { NavBar } from "@/components/nav-bar";
import { AuthProvider } from "@/components/auth-context";
import type React from "react";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <NavBar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
