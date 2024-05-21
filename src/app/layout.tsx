import { Toaster as SonnarToaster } from "@/components/ui/sonner";
// import { Toaster as BigToast } from "@/components/ui/toaster";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "./globals.css";

const raleway = Raleway({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Furnicore dashboard",
  description: "Admin dashboard for Furnicore",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background bg-brandBackground font-sans antialiased",
          raleway.variable,
        )}
      >
        <main>{children}</main>
        {/* <Toaster position="top-center" richColors /> */}
        {/* <BigToast  position="top-center" richColors/> */}
        <SonnarToaster />
        <Toaster />
      </body>
    </html>
  );
}
