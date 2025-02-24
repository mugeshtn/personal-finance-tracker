"use client";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";



export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname()
  const isActive = (route: string) => pathname === route;

  return (
    <nav className="flex sticky top-0 z-30 items-center justify-around sm:justify-start sm:gap-4 p-4 bg-gray-900 text-white">
      <div className="flex gap-2 sm:mx-5  items-center">
        <Image alt="brand-icon" src="/icons/brand_icon.png" width={32} height={32} />
        <div className="text-xl font-pacifico"><Link href="/">FinTrack</Link></div>
      </div>
      <div className="hidden sm:flex items-center">
        <Link href="/user/dashboard" className={`hover:bg-gray-700 px-3 py-1 rounded ${isActive("/user/dashboard") ? "bg-gray-800 text-white" : ""
          }`}>Dashboard</Link>
        <Link href="/user/transactions" className={`hover:bg-gray-700 px-3 py-1 rounded ${isActive("/user/transactions") ? "bg-gray-800 text-white" : ""
          }`}>Transactions</Link>
        <Link href="/user/budget" className={`hover:bg-gray-700 px-3 py-1 rounded ${isActive("/user/budget") ? "bg-gray-800 text-white" : ""
          }`}>Budgets</Link>
      </div>

      <button onClick={() => setIsOpen(!isOpen)} className="sm:hidden">
        {isOpen ? <X size={28} /> : <Menu size={28} />}
      </button>

      {isOpen && (
        <div className="absolute top-14 right-4 bg-gray-800 text-white p-4 rounded-md shadow-md flex flex-col space-y-2 sm:hidden">
          <Link href="/user/dashboard" className="hover:bg-gray-700 p-2 rounded">Dashboard</Link>
          <Link href="/user/transactions" className="hover:bg-gray-700 p-2 rounded">Transactions</Link>
          <Link href="/user/budget" className="hover:bg-gray-700 p-2 rounded">Budget</Link>
        </div>
      )}
    </nav>
  );
}
