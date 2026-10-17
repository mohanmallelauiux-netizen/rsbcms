import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Ramasri Builders & Interiors | Constructing Your Dreams",
  description: "Premium residential developments & interior designs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
