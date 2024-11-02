const mongoose= require("mongoose");

const admin=mongoose.Schema({
    dl_code:{
        type:String,
        required:[true,"dl_code is mandatory"]
    },
    password:{
        type:String,
        required:[true,"password is mandatory"]
    }
},
{
    timestamps:true
})

module.exports= mongoose.model("Admin",admin);