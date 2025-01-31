const express = require('express');
const auth = require('../middlewares/auth');
const {Users,Accounts} = require("../db");
const {tranferValidation} = require("../middlewares/inputValidation")

const AccountRouter = express.Router();

AccountRouter.get('/balance',auth,async (req,res)=>{
    try{
        const balance = await Accounts.findOne({UserId:req.user.UserId});

        return res.status(200).json({balance:balance});
    }catch(err){
        console.log(err);
        return res.status(403).json({msg:"error finding balance"})
    }
});

AccountRouter.post('/transfer', auth, transferValidation, async (req, res) => {
    const session = await Accounts.startSession();
    session.startTransaction();

    try {
        const { amount, to } = req.body;

        // Fetch sender's account
        const senderAccount = await Accounts.findOne({ UserId: req.user.UserId }).session(session);

        if (!senderAccount || senderAccount.Balance < amount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Insufficient Balance" });
        }

        // Fetch and update recipient's account
        const recipientAccount = await Accounts.findOneAndUpdate(
            { UserId: to },
            { $inc: { Balance: amount } },
            { new: true, session }
        );

        if (!recipientAccount) {
            await session.abortTransaction();
            return res.status(400).json({ msg: "Recipient account not found" });
        }

        // Deduct amount from sender
        await Accounts.updateOne(
            { UserId: req.user.UserId },
            { $inc: { Balance: -amount } },
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({ msg: "Transfer successful" });

    } catch (err) {
        await session.abortTransaction();
        session.endSession();
        console.error("Transfer error:", err);
        return res.status(500).json({ msg: "Internal Server Error" });
    }
});

module.exports=AccountRouter;