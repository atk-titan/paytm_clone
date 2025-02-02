const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const {jwt_secret} = require('../config');
const auth = require("../middlewares/auth");

const {signupValidation,signinValidation,updateValidation} = require('../middlewares/inputValidation');

const {Users,Accounts} = require("../db");
const { rand } = require('elliptic');

const UserRouter = express.Router();

UserRouter.post("/signup", signupValidation ,async (req,res)=>{
    try {
        const user = {
            UserName: req.body.UserName,
            FirstName: req.body.FirstName,
            LastName: req.body.LastName,
            password: await bcrypt.hash(req.body.password,10),
        };
        
        const checker = await Users.findOne({UserName:user.UserName});
        if(checker){
            return res.status(411).json({
                message:"email already taken"
            })
        }

        const payload = await Users.create(user);

        await Accounts.create({
            UserId: payload._id,
            Balance: Math.floor(Math.random()*100000)+1
        });

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

UserRouter.post("/signin", signinValidation ,async (req,res)=>{
    try{
        const payload = await Users.findOne({UserName:req.body.UserName});

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

UserRouter.put("/", auth , updateValidation , async (req,res)=>{
    try {
        const user = await Users.findOne({UserName:req.body.UserName});
        if (req.user.userId !== user._id.toString()) {
            return res.status(403).json({ msg: "Unauthorized: You can only update your own profile" });
        }        

        await Users.updateOne({UserName:req.body.UserName},req.body);
        return res.status(200).json({msg : "updated successfully"});

    }catch (error) {
        console.error("Error updating user:", error);
        return res.status(500).json({ msg: "Internal server error" });
    }    
});

UserRouter.get("/bulk",auth,async (req,res)=>{
    try {
        const filter = req.query.filter || "";

        const users = await Users.find({
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
});

module.exports = UserRouter;