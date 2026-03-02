import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mahima Gavesh - UI/UX & Full Stack Developer",
  description: "Portfolio of Mahima Gavesh - Interactive Media specialist and full-stack developer",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
