const express=require("express");
const router=express.Router();

router.get("/add-blog",(req,res)=>{
   
    return res.render("AddBlog",{
        user:req.user
    })
})

module.exports=router