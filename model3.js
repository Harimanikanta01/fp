const mongoose=require("mongoose")
const Cart=new mongoose.Schema({
    name:{
        type:String,
        require:true
    },
    img:{
type:String,
require:true
    },
    price:{
        type:String,
        require:true
    },
    discount:{
        type:String,
        require:true
    }
})
module.exports=mongoose.model("cart",Cart)

