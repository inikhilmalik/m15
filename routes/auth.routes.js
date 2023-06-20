const express=require("express");
const { AuthModel } = require("../model/auth.model");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");

const authRouter=express.Router();

authRouter.post("/signup",async(req,res)=>{
    const {email,password}=req.body;
    try{
        bcrypt.hash(password,2,async(err,hash)=>{
            const user=new AuthModel({email,password:hash});
            await user.save();
            res.send({"msg":"user is added"});
        })
    }
    catch(err){
        res.send({"err":err})
    }
})

authRouter.post("/login",async(req,res)=>{
    const {email,password}=req.body;
    try{
        const user=await AuthModel.findOne({email});
        if(user){
            bcrypt.compare(password,user.password).then((result)=>{
                if(result)
                {
                    const token=jwt.sign({},"board");
                    res.send({"msg":"Login Successful","token":token})
                }
            })
        }
        else{
            res.send({"msg":"Invalid Credentials"})
        }
    }catch(err){
        res.status(400).send({"err":err})
    }
})

module.exports={authRouter}