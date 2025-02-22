import { models, model, Schema } from "mongoose";

const TransactionSchema = new Schema({
    amount: { 
        type: Number, 
        required: true,
        min: 0.01 
    },
    date: { 
        type: Date, 
        required: true,
        default: Date.now
    },
    notes: { type: String , trim: true},
    paymentMethod: {
        type: String,
        enum: ["Cash", "Account"],
        required: true
    }
}, {timestamps: true})


const TransactionModel = models.Transaction || model("Transaction", TransactionSchema)

export default TransactionModel;