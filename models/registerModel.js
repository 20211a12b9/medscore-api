const mongoose=require("mongoose")

const registerSchema =mongoose.Schema(
    {
    pharmacy_name:{
        type:String,
        required:[true,"pharmacy_name is mandatory"]
    },
    email:{
        type:String,
        required:[true,"email is mandatory"]
    },
    phone_number:{
        type:String,
        required:[true,"phone_number is mandatory"]
    },
    dl_code:{
        type:String,
        required:[true,"dl_code is mandatory"],
        unique: true
    },
    address:{
        type:String,
        required:[true,"address is mandatory"]
    },
    password:{
        type:String,
        required:[true,"password is mandatory"]
    },
    expiry_date:{
        type:String,
       
    }
},
{
    timestamps:true
})
module.exports=mongoose.model("Register",registerSchema);