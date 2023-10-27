import { Schema,model } from "mongoose";

const productSchema= new Schema({
    name:{type:String , required:[true,"Please provide a name"]},
    description:{type:String,require:true },
    price:{ type : Number, require: true},
    category:{
        type:String,
    },
    imgUrl:{
        type: String
    },
    brand:{
        type:String
    }

},{
    timestamps:true
})
const Product = model('Product',productSchema)

export default Product;