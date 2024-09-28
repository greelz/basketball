import type { Metadata } from "next";
import "./globals.css";
import Header from "./components/Header";


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
    <html lang="en" className="min-h-screen max-h-full ">
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
