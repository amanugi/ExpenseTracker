const Transaction = require('../models/Transaction');  // Transaction is coming from models

// @desc ->  Get all transactions
// @route GET -> /api/v1/transactions
// @access -> public

// when we use a mongoose method it returns a promise
exports.getTransactions = async(req, res, next) => {
    
    try {
        const transactions = await Transaction.find();

        return res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions
        });    
    } 
    catch (err) {
        // 500 is internal server error
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}

// @desc ->  Add transaction
// @route  POST -> /api/v1/transactions
// @access -> public

exports.addTransaction = async(req, res, next) => {
    try {
        const {text, amount} = req.body;

        const transaction = await Transaction.create(req.body);    

        return res.status(201).json({
            success: true,
            data:transaction
        });
    } 
    catch (err) {
        if(err.name == "ValidationError"){
            const messages = Object.values(err.errors).map(val => val.message);
            
            // 400 is client side error
            return res.status(400).json({
                success: false,
                error:messages
            });
        }
        else{
            return res.status(500).json({
                success: false,
                error: "Internal Server Error"
            });
        }      
    }
}

// @desc ->  Delete transaction
// @route DELETE -> /api/v1/transactions/:id
// @access -> public

exports.deleteTransaction = async(req, res, next) => {
    try {
        const transaction = await Transaction.findById(req.params.id);
        //console.log("transaction: ", transaction);

        if(!transaction){
            return res.status(404).json({
                success: false,
                error: "No transaction found"
            });
        }

        await transaction.deleteOne();
        

        return res.status(200).json({
            success: true,
            data: {}
        });
    } 
    catch (err) {
        return res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });   
    }
}

