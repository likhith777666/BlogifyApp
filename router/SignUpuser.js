const express=require("express");
const router=express.Router();
const {handleUserSignUpData,handleUserLoginData,handleLogOut}=require("../controller/SignUpUserController")

router.post("/",handleUserSignUpData);

router.post("/login",handleUserLoginData)

router.get("/logout",handleLogOut)

module.exports=router;