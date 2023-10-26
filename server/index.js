import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import User from './models/User.js'

const app=express();
app.use(express.json());

const PORT=process.env.PORT ||5000

//connect to mongodb
const connectMongo= async ()=>{
     const  conn= await mongoose.connect(process.env.MONGO_URI)
     if(conn){
        console.log('connected to MongoDB')
     }
}

app.post('/signup',async (req,res)=>{
    const {name,address,email,password,mobile}=req.body
   const newUser= new User({
    name,
    address,
    mobile,
    password,
    email
   })
    try{
       const signinfo= await newUser.save()
       res.json({
        success:true,
        data:signinfo,
        message:'user created successfully'
       })
    }catch(e){
        res.json({
            success:false,
            error:e.message
        })
    }
})


app.post('/login',async(req,res)=>{
    const {email,password}=req.body;
   
        const logininfo = await User.findOne({email:email,password:password}).select("name email mobile")
        if(logininfo){
        res.json({
            success:true,
            data:logininfo,
            message:"successfully logged in"

        })
    }else{
        res.json({
            success:false,
            message:'Login Fail'
            })
    }
   
})

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongo()
})
