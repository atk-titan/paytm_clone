const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {jwt_secret} = require('../config')

const {signupValidation,signinValidation} = require('../middlewares/inputValidation');

const User = require("../db");

const userRouter = express.Router();

userRouter.post("/signup", signupValidation ,async (req,res)=>{
    try {
        const user = {
            UserName: req.body.UserName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            password: await bcrypt.hash(req.body.password,10),
        };
        
        const checker = await User.findOne({UserName:user.UserName});
        if(checker){
            res.status(411).json({
                message:"email already taken"
            })
        }

        const payload = await User.create(user);

        const token = jwt.sign({userId:payload._id},jwt_secret);

        res.status(200).json({
            userId: payload._id,
            token:token
        });
    } catch (error) {
        console.error("error while creating a new user"+err);
    }
});

userRouter.post("/signin", signinValidation ,async (req,res)=>{
    try{
        const payload = await User.findOne({UserName:req.body.UserName})
        const token = jwt.sign({userId:payload._id},jwt_secret)

        res.status(200).json({
            userId: payload._id,
            token:token
        });
    }catch(err){
        console.error(err);
    }
})

module.exports = userRouter;