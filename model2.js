const mongoose=require("mongoose")
const verify=new mongoose.Schema({
    name:{
        type:String,
        required:true

    },
    password:{
        type:String,
require:true
    }
})
module.exports=mongoose.model("authenticati",verify)
