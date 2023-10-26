import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

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



app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
    connectMongo()
})
