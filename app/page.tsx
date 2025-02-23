import HomeCard from "@/components/home/HomeCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import "react-toastify/dist/ReactToastify.css";

export default function Home() {
  return (
    <>
      <div className="relative">
        <div className="absolute transform  md:-translate-x-1/6  -translate-y-24">
          <HomeCard />
        </div>
        <div className="lg:p-10 md:mt-24 grid grid-cols-1 bg-[url('/images/bg_home.jpg')] w-full bg-cover bg-center text-black min-h-[80vh] xl:min-h-[100vh] ">
          <div className="text-center grid-cols-">
            <h1 className=" mt-9 lg:mt-36 text-3xl md:text-5xl p-5 lg:px-52 md:px-28 font-pacifico leading-relaxed md:leading-normal">
              <span className="text_gradient">Fintrack</span> helps manage your budgets, <span className="text_gradient">Track</span>  youir expenses and<span className="text_gradient"> Visualises </span>spending !</h1>
            <Button className="bg-blue-600 mt-10" size="lg"><Link href="/user/dashboard">Get Started !</Link></Button>
          </div>
        </div>
      </div>
    </>
  );
}
