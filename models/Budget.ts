import { models, model, Schema } from "mongoose";


const BudgetSchema = new Schema({
    category: { type: String, required: true,
       enum: ["Food & Drinks", "Transport", "Entertainment", "Bills", "Shopping", "Education", "Health & fitness", "Investment", "others"] 
      },
    amount: { type: Number, required: true },
    date: { type: String, required: true }
  });
  

  const BudgetModel = models.Budget || model("Budget", BudgetSchema)

  export default BudgetModel;