import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "@/styles/globals.css";
import { Toaster } from "@/components/ui/sonner";

const lato = Lato({
  subsets: ["latin"],
  weight: ["100", "300", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Slack Clone",
  description: "Slack Clone built with Next.js",
};
export const revalidate = 0;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={lato.className}>
        <main>{children}</main>
        <Toaster />
      </body>
    </html>
  );
}
