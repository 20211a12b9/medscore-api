const mongoose=require('mongoose');

const oustandingModel=mongoose.Schema({
    customerId:{
        type:mongoose.Schema.Types.ObjectId,
        required:[true,"customerId is mandatory"],
        ref:'Register2'
    },
    uploadData:[
        {
            Description:{
                type:String,
                required:[true,"Description is mandatory"],
                set: (value) => value.toUpperCase()
            },
            Total:{
                type:String,
                required:[true,"Description is mandatory"]
            },
            uploadedAt: {
                type: Date,
                required: [true, "uploadedAt is mandatory"],
                default: Date.now
              }
            
        }
    ]
    

},
{
    timestamps:true
})

module.exports=mongoose.model('oustatnding',oustandingModel);