require("dotenv").config();
const express = require("express");
const app = express();
const { connectToTheDb } = require("./connection/connect");
const Staticrouter = require("./StaticRouter/routers");
const StaticBlogrouter = require("./StaticRouter/addBlog");
const router = require("./router/SignUpuser");
const blogModel=require("./model/blog")
const Blogrouter = require("./router/addBlogrouter");
const { authCheck } = require("./middleware/auth");
const userEnterComments=require("./model/UserComments")
const cookieParser = require("cookie-parser");
const path = require("path");
const PORT = process.env.PORT||4000;

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for parsing URL-encoded form data (this should come before your routes)
app.use(express.urlencoded({ extended: false }));

// Set EJS as the view engine
app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

// Serve static files from the public directory
app.use(express.static(path.resolve("./public")));

// Routes
app.use("/home", authCheck, Staticrouter);
app.use("/Static", Staticrouter);
app.use("/createaccount",authCheck, router);
app.use("/",authCheck, router);
app.use("/add", authCheck, Blogrouter);
app.use("/view", authCheck, Blogrouter);
app.use("/view", authCheck, Blogrouter);
app.use("/comments", Blogrouter);

// Post route for handling comments
app.post("/UserComments/:blogId",authCheck, async(req, res) => {
    console.log("Request Body:", req.body);  // Log the request body to check what's being received
    const { usercontent } = req.body;
    console.log(usercontent)
    if (!usercontent) {
        return res.status(400).send("No comment content provided");
    }
   await userEnterComments.create({
        usercontent,
        blogId:req.params.blogId,
        createdBy:req.user._id
       
   })
     return res.redirect(`/view/${req.params.blogId}`)
});



// Static Blog routes
app.use("/", authCheck, StaticBlogrouter);

// Database connection
connectToTheDb(process.env.MONGO_URL)
    .then(() => console.log("MongoDB is connected"))
    .catch((err) => console.log("MongoDB is not connected", err));

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
