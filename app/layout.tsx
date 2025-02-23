import type { Metadata } from "next";
import "./globals.css";
import { Navbar } from "@/components/home/NavbarStyle";
import { ToastContainer } from "react-toastify";
import { TransactionsProvider } from "@/context/context";
import { Pacifico, Inter } from "next/font/google";
import Footer from "@/components/home/Footer";

const pacifico = Pacifico({ subsets: ["latin"], weight: "400" });
const inter = Inter({ subsets: ["latin"], weight: "400" });
inter;
pacifico;
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
          <h1 className="text-4xl px-10 pt-10"> Welcome back, User !<i>👋🏻</i></h1>
          <h1 className="px-10 pt-2 pb-5 text-gray-400">Track Your Finances with Ease</h1>
          <TransactionsProvider>
            {children}
          </TransactionsProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
