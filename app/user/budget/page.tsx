"use client"
import { budgetCardFeatures } from '@/utils/constants'
import IncomeCard from '../../../components/transaction/IncomeCard'
import BudgetTable from './BudgetTable'


const page = () => {
  return (
    <>
      <h1 className="white ml-10 text-lgtext-gray-400">Stay within your budget limits !</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
        <IncomeCard cardFeatures={budgetCardFeatures} />
      </div>
      <BudgetTable />
    </>
  )
}

export default page