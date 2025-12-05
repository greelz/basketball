import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Trivia',
  description: "The best trivia game you'll play today",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <section className={`flex bg-black text-white min-h-dvh w-full ${roboto.className}`}>
      {children}
    </section>
  );
}
