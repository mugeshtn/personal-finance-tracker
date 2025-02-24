"use client"

import { dashCardFeatures } from "@/utils/constants"
import { CategoryPieChart, DailyBarChart } from "./Charts"
import IncomeCard from "../../../components/transaction/IncomeCard"

const page = () => {

  return (
    <>
      <h1 className="white ml-10 text-lgtext-gray-400">Dashboard with financial reports overview !</h1>
      <div className="grid grid-cols-1 relative sm:grid-cols-3 gap-2">
        <IncomeCard cardFeatures={dashCardFeatures} />
      </div>
      <div className="flex flex-col xl:ml-32 sm:ml-10 md:flex-row gap-8 px-5 text-black mb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full">
          <div>
            <DailyBarChart />
          </div>
          <div className=" md:ml-24 grid grid-cols-1 md:grid-cols-2">
            <div>
              <CategoryPieChart />
            </div>
          </div>
        </div>
      </div>
    </>

  )
}

export default page