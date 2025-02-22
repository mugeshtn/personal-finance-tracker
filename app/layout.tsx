import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/pages/home/NavbarStyle";
import { ToastContainer } from "react-toastify";


export const metadata: Metadata = {
  title: "FinTrack",
  description: "Track your expenses and budgets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <div className="w-full h-80 bg-blue-950 text-white">
          <ToastContainer />
          <Navbar />
          <h1 className="text-4xl p-10"> Welcome back, User !<i>👋🏻</i></h1>
          {children}
        </div>
      </body>
    </html>
  );
}
