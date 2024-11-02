const mongoose=require("mongoose")

const linkPharma=mongoose.Schema({
    distId:{
        type:String,
        require:[true,"distId require"]
    },
    pharmaId:{
        type:String,
        require:[true,"pharma require"]
    }
})
module.exports=mongoose.model("Link",linkPharma);