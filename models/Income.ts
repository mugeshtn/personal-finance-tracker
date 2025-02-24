import { models, model, Schema } from "mongoose";

const IncomeSchema = new Schema({
    source: {
        type: String,
        enum: ["Salary", "Business", "Others"],
        required: true
    },
    amount: { type: Number, required: true },
    date: { type: Date, required: true },
});

const IncomeModel = models.Income || model("Income", IncomeSchema)

export default IncomeModel;