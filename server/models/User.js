import { Schema,model } from "mongoose";

const userSchema= new Schema({
    name:{type:String , 
     default: '-'
    },
    email:{
        type: String,
        required:[true,'Please provide your email'],
        unique: true
    },
    password:{
        type: String,
        required:[true,'Please provide a password'],
        minlength:6
    },
    address:{
        type: String,
        default:'-'
    },
    mobile:{
        type:String,
        require:[true,'Please Provide Number'],
        unique:true
    },

})

const User= model('User',userSchema)

export default User;