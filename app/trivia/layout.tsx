import type { Metadata } from "next";
import { TikTok_Sans } from "next/font/google";

const passion = TikTok_Sans({
  subsets: ["latin", "latin-ext"],
});

export const metadata: Metadata = {
  title: "Trivia",
  description: "The best trivia game you'll play today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section
      className={`flex bg-black text-white min-h-dvh ${passion.className}`}
    >
      {children}
    </section>
  );
}
