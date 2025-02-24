"use client"
import { budgetCardFeatures } from '@/utils/constants'
import IncomeCard from '../../../components/transaction/IncomeCard'
import BudgetTable from './BudgetTable'


const page = () => {
  return (
    <>
      <h1 className="white ml-10 text-lg text-gray-400 mb-10 lg:mb-0">Stay within your budget limits !</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 relative">
        <IncomeCard cardFeatures={budgetCardFeatures} />
      </div>
      <div className='mt-10 lg:mt-0'>
        <BudgetTable />
      </div>
    </>
  )
}

export default page