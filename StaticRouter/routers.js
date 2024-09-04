const express=require("express");
const router=express.Router();
const blog=require("../model/blog")
router.get("/",async(req,res)=>{
     const allBlog=await blog.find({});
    return res.render("Home",{

        user:req.user,
        allBlog:allBlog
    });
})
router.get("/SignUp",(req,res)=>{
    return res.render("SignUpPage"); 
})
router.get("/login",(req,res)=>{
    return res.render("Login");
})

module.exports=router