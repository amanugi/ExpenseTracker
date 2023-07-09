const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    text: {
        type: String,
        trim: true,      // removes white spaces
        required: [true, "Please enter some text"]
    },
    amount: {
        type: Number,
        required: [true, "Please add a positive number or negative number"]
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("Transaction", TransactionSchema);