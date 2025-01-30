const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {jwt_secret} = require('../config');
const auth = require("../middlewares/auth");

const {signupValidation,signinValidation,updateValidation} = require('../middlewares/inputValidation');

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
            return res.status(411).json({
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
        console.error("Error while creating a new user:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

userRouter.post("/signin", signinValidation ,async (req,res)=>{
    try{
        const payload = await User.findOne({UserName:req.body.UserName});

        if (!payload) {
            return res.status(404).json({ msg: "User not found" });
        }        

        const checker = await bcrypt.compare(req.body.password,payload.password);

        if (!checker) {
            return res.status(401).json({ msg: "Incorrect password" });
        }        

        const token = jwt.sign({userId:payload._id},jwt_secret);

        res.status(200).json({
            userId: payload._id,
            token:token
        });
    }catch(err){
        console.error(err);
    }
});

userRouter.put("/", auth , updateValidation , async (req,res)=>{
    try {
        if (req.user.UserName !== req.body.UserName) {
            return res.status(403).json({ msg: "Unauthorized: You can only update your own profile" });
        }        

        await User.updateOne({UserName:req.body.UserName},req.body);
        return res.status(200).json({msg : "updated successfully"});

    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }    
});

userRouter.get("/bulk",auth,async (req,res)=>{
    try {
        const filter = req.query.filter || "";

        const users = await User.find({
            $or:[
                {
                    FirstName:{
                        "$regex":filter
                    }
                },{
                    LastName:{
                        "$regex":filter
                    }
                }
            ]
        })

        return res.status(200).json({
            user:users.map((user)=>({
                UserName:user.UserName,
                FirstName:user.FirstName,
                LastName:user.LastName,
                _id:user._id
            }))
        })
    } catch (error) {
        console.error(error);
    }
})

module.exports = userRouter;