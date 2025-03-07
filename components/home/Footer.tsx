import { Button } from "@/components/ui/button";
import Link from "next/link";
import { FaFacebook, FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-2 px-6 md:px-16">
            <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                    <h2 className="text-2xl font-pacifico mt-4">FinTrack</h2>
                    <p className="text-sm text-gray-400 ">Smart budgeting & expense tracking</p>
                </div>

                <div className="flex flex-wrap justify-center gap-4 text-gray-300">
                    <Link href="/" className="hover:text-blue-400 transition">Home</Link>
                    <Link href="/user/dashboard" className="hover:text-blue-400 transition">Dashboard</Link>
                    <Link href="/user/transactions" className="hover:text-blue-400 transition">Transactions</Link>
                    <Link href="/user/budget" className="hover:text-blue-400 transition">Budgets</Link>
                </div>

                <div className="flex gap-4">
                    <Button variant="ghost" disabled size="icon"><FaFacebook className="w-5 h-5 text-white" /></Button>
                    <Button disabled variant="ghost" size="icon"><FaTwitter className="w-5 h-5 text-white" /></Button>
                    <Button disabled variant="ghost" size="icon"><FaLinkedin className="w-5 h-5 text-white" /></Button>
                    <Button disabled variant="ghost" size="icon"><FaGithub className="w-5 h-5 text-white" /></Button>
                </div>
            </div>

            <div className="pb-4 text-center text-gray-500 text-sm">
                &copy; 2025 Fintrack by Mugesh TN; All rights reserved.
            </div>
        </footer>
    );
}
