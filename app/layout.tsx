import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";

const selawik = localFont({ src: "../public/fonts/selawik.ttf" });

export const metadata: Metadata = {
  title: "Basketball",
  description: "Create a basketball league and run the show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <header className="bg-gray-800 py-3 text-white flex justify-evenly">
          <Link href="/">Home</Link>
          <Link href="/admin">Admin</Link>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
