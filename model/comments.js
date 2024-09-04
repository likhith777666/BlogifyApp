const mongodb=require("mongoose");

const commentsShema=new mongodb.Schema({
    content:{
        type:String,
        required:true
    },
    blogId:{
     type:mongodb.Schema.Types.ObjectId,
     ref:"blogModel"
    },
    createdBy:{
        type:mongodb.Schema.Types.ObjectId,
        ref:"SignUpUser",
    }
},{timestamps:true})

const comments=mongodb.model("UserComments",commentsShema);

module.exports={comments}