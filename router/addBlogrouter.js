const express = require("express");
const multer = require("multer");
const router = express.Router();
const path = require("path");
const blogModel = require("../model/blog");
const {comments}=require("../model/comments");
const userEnterComments=require("../model/UserComments")
const e = require("express");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve("./public/uploads"));  // Ensure path is relative to your project root
  },
  filename: function (req, file, cb) {
    const fileName = `${Date.now()}-${file.originalname}`;  // Add timestamp for uniqueness
    cb(null, fileName);
  },
});

const upload = multer({ storage: storage });

router.post("/blog", upload.single("covetImagURL"), async (req, res) => {
  try {
    const { title, body } = req.body;
    
    // Ensure a blog is created with the correct image URL
    const blog = await blogModel.create({
      title,
      body,
      createdBy: req.user._id,
      covetImagURL: `/uploads/${req.file.filename}`,  // Store relative path for serving static files
    });

    console.log("Blog created:", blog);
    
    // Fetch all blogs after creating the new one
    const allBlog = await blogModel.find({});  // Fetch all blogs to display in the home view

    return res.render("Home", { 
      allBlog,  // Pass the full list of blogs to the Home view
      user: req.user  // Ensure user information is also passed
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).send("Server Error");
  }
});





router.get("/:id", async(req,res)=>{
  const blog=await blogModel.findById(req.params.id).populate("createdBy");
  const allComments=await userEnterComments.find({blogId:req.params.id}).populate("createdBy")
  
  return res.render("Blog",{
    user: req.user,
    blog,
    allComments
  })
}
)

router.post("/blog/:Blogid", async (req, res) => {
  try {
     // Extract content from req.body
  console.log(req.body.content)
    // Create a new comment
    await comments.create({
      content:req.body.content,  // Use the correct field name
      blogId: req.params.Blogid,
     
    });

    return res.redirect(`/view/${req.params.Blogid}`);
  } catch (error) {
    console.error("Error creating comment:", error);
    return res.status(500).send("Server Error");
  }
});

module.exports = router;
