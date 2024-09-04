const mongodb=require("mongoose");

const blogSchema=new mongodb.Schema({
    title:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    },
    covetImagURL:{
        type:String,

    },
    createdBy:{
        type:mongodb.Schema.Types.ObjectId,
        ref:"SignUpUser"
    },
},{timestamps:true})

const blogModel=mongodb.model("blogData",blogSchema);

module.exports=blogModel