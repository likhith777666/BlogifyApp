const {Schema, model}=require("mongoose");


const textCommentsSchema=new Schema({
    usercontent:{
        type:String,
        required:true
    }, blogId:{
        type:Schema.Types.ObjectId,
        ref:"blogModel"
       },
       createdBy:{
           type:Schema.Types.ObjectId,
           ref:"SignUpUser",
       }
},{timestamps:true})

const UserComments=model("TextComments",textCommentsSchema);
module.exports=UserComments