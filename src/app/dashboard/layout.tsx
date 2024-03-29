import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";
import { cn } from "@/lib/utils";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";
import "../globals.css";

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
        <div className="container mx-auto">
          <div className="flex">
            <Sidebar />
            <div className="w-full">
              <TopBar />
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
