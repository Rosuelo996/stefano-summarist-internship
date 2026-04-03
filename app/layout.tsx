import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import AuthModal from "../components/ui/AuthModal";
import AuthListener from "../components/auth/AuthListener";

export const metadata: Metadata = {
  title: "Summarist",
  description: "Book summary app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <AuthListener />
          <AuthModal />
          {children}
        </Providers>
      </body>
    </html>
  );
}
