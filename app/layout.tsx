import type { Metadata } from "next";
import "./globals.css";
import localFont from "next/font/local";
import Link from "next/link";
import Header from "./components/Header";
import AdminFooter from "./steveWork/components/admin/AdminFooter";
import AdminSidebar from "./steveWork/components/admin/AdminSidebar";

const selawik = localFont({ src: "../public/fonts/selawik.ttf" });
const shotfont = localFont({ src: "../public/fonts/alarmclock.ttf" });
const statfont = localFont({ src: "../public/fonts/dsdigi.ttf" });

export const metadata: Metadata = {
  title: "Basketball",
  description: "Create a basketball league and run the show",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (<>
    <html lang="en">
      <body className="homeRadial ">
        <Header />
        <main >
          {children}
        </main>
      </body >

    </html >

  </>
  );
}
