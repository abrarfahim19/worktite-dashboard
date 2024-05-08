import { Sidebar } from "@/components/sidebar";
import { TopBar } from "@/components/topbar";
import "../../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="container mx-auto">
      <div className="flex">
        <Sidebar />
        <div className="w-full">
          <TopBar />
          {children}
        </div>
      </div>
    </div>
  );
}
