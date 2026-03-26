import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mooster Family Budget",
  description: "Family budgeting app to track income and expenses",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-100 min-h-screen">{children}</body>
    </html>
  );
}
