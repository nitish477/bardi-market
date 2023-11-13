import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

import User from './models/User.js'
import Product from './models/Product.js'
import Order from './models/Order.js'

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
    if(!name||!email||!password||!mobile){
        return res.json({
            success: false,
            message:'Please provide all fields.'
        })
    }
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
//Add Product
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

//Show All Product
app.get('/products', async (req, res) => {
    const getProduct = await Product.find()
    if (!getProduct) return res.status(404).send('No products found')
    res.json({
        success: true,
        data: getProduct,
        message: 'Products retrieved successfully.'
    })
})

//Find a product By Query
app.get('/product/search',async(req,res)=>{
    const {q}=req.query
    const search= await Product.find({name:{$regex:q,$options:"i"}})

    if(!search)return res.status(404).send("no result")
    res.json({success:true,data:search,message:'Search Successful'})
})

// Delete Product
app.delete('/product/:_id',async(req,res)=>{
    const _id=req.params._id;
    await Product.deleteOne({_id:_id})
    res.json({
        success:true,
        message:"Deleted Successfully",
    })
})

// Find Product By id

app.get('/product/:_id',async(req,res)=>{
    const _id=req.params;
    const singleProduct=await Product.findById(_id);
    res.json({
        success:true,
        data:singleProduct,
        message:"Single product fetched."
    })
})


//Update Product
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


//Place Order

app.post('/order',async(req,res)=>{
    const {User,Product,shippingAddress,deliveryCharges,quantity}=req.body

    const placeOrder= new Order({
        User,
        Product,
        shippingAddress,
        deliveryCharges,
        quantity
    })
    

    try{
        const SaveOrder= await placeOrder.save()

        res.json({
            success: true,
            data:SaveOrder,
            message:'Order Placed'
        })
    }catch(e)
    {
        res.json({
            success: false,
            message: e.message
        })
    }
})

//get product byId

app.get('/order/:id',async(req,res)=>{
    const {id}=req.params
    const getOrderById= await Order.findById(id).populate("User Product")

    res.json({
        success:true,
        data:getOrderById,
        message:"Successfuly Retrieved"
    })
})

//get All Order Product

app.get('/orders',async(req,res)=>{
    const orders =await Order.find().populate('User Product')
     orders.forEach((order)=>{
        order.User.password=undefined
     })
     if(!orders){
        return res.status(404).send({success:false,message:'No Orders Found'});
        }

        res.json({
            success : true ,
            data    : orders,
            message: 'Order Featch Successfully'
        })

})

//Find Order of Specific User

app.get('/user/order/:_id',async(req,res)=>{
    const {_id} = req.params
      const getOrder= await Order.find({User:{_id:_id}}).populate("User Product")
      getOrder.forEach((order)=>{
        order.User.password=undefined
      })

     

      res.json({
        success :true ,
        data   : getOrder,
        message: "Orders Fetched"
      })
})

// Update Status 

app.patch('/updateorder/:_id',async(req,res)=>{
    const {_id}=req.params
    const {status}=req.body

    const Status_Priority={
        pending:0,
        Shipped:1,
        delivered:2,
        return: 3,
        cancelled:4,
        reject:5
    }

    const order=  Order.findById(_id)
    const currentStatus=order.status
    const current_priority=Status_Priority[currentStatus]
    const newStatus= Status_Priority[status]
   
  
    if(current_priority > newStatus){
       return res.json({
            success: false,
            message:"Invalid status transition"
        })
    }

     await Order.updateOne({_id:_id},{$set:{status:status}})

     const UpdateStatus= await Order.findById(_id)
   
            res.json({
                success: true,
                data:UpdateStatus,
                message: 'Status Updated successfully!'
            })
})



app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
    connectMongo()
})
