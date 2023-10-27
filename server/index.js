import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import User from './models/User.js'
import Product from './models/Product.js'

const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000

//connect to mongodb
const connectMongo = async () => {
    const conn = await mongoose.connect(process.env.MONGO_URI)
    if (conn) {
        console.log('connected to MongoDB')
    }
}

app.post('/signup', async (req, res) => {
    const { name, address, email, password, mobile } = req.body
    const newUser = new User({
        name,
        address,
        mobile,
        password,
        email
    })
    try {
        const signinfo = await newUser.save()
        res.json({
            success: true,
            data: signinfo,
            message: 'user created successfully'
        })
    } catch (e) {
        res.json({
            success: false,
            error: e.message
        })
    }
})


app.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const logininfo = await User.findOne({ email: email, password: password }).select("name email mobile")
    if (logininfo) {
        res.json({
            success: true,
            data: logininfo,
            message: "successfully logged in"

        })
    } else {
        res.json({
            success: false,
            message: 'Login Fail'
        })
    }

})

app.post('/product', async (req, res) => {
    const {
        name,
        description,
        price,
        category,
        imgUrl,
        brand
    } = req.body

    const addProduct = new Product({
        name,
        description,
        price,
        category,
        imgUrl,
        brand
    })
    try {
        const productAdded = await addProduct.save()
        res.json({
            success: true,
            data: productAdded,
            message: "Successfully added the product"
        })
    } catch (err) {
        res.json({
            success: false,
            message: err.message
        })
    }
})

app.get('/products', async (req, res) => {
    const getProduct = await Product.find()
    if (!getProduct) return res.status(404).send('No products found')
    res.json({
        success: true,
        data: getProduct,
        message: 'Products retrieved successfully.'
    })
})

app.get('/product/search',async(req,res)=>{
    const {q}=req.query
    const search= await Product.find({name:{$regex:q,$options:"i"}})

    if(!search)return res.status(404).send("no result")
    res.json({success:true,data:search,message:'Search Successful'})
})

app.delete('/product/:_id',async(req,res)=>{
    const _id=req.params._id;
    await Product.deleteOne({_id:_id})
    res.json({
        success:true,
        message:"Deleted Successfully",
    })
})

app.get('/product/:_id',async(req,res)=>{
    const _id=req.params;
    const singleProduct=await Product.findById(_id);
    res.json({
        success:true,
        data:singleProduct,
        message:"Single product fetched."
    })
})

app.put('/product/:_id',async(req,res)=>{
    const _id=req.params
    const {
        name,
        description,
        price,
        category,
        imgUrl,
        brand
    } = req.body

    await Product.updateOne({_id:_id},{$set:{
        name,
        description,
        price,
        category,
        imgUrl,
        brand
    }})

    const updateProduct= await Product.find({_id:_id})
    res.json({
        success:true,
        data:updateProduct,
        message:"Updated Successfully"
    })
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongo()
})
