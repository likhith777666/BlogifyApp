const signupuser = require('../model/SignUpmodel');
const blogModel = require("../model/blog");
async function handleUserSignUpData(req, res) {
    const { Name, Email, Password } = req.body;
     console.log(Name,Email,Password)
    if (!Name || !Email || !Password) {
        return res.status(400).json({ msg: "Please enter all required fields" });
    }

    try {
        const newUser = await signupuser.create({
            Name,
            Email,
            Password
        });

        console.log("User created:", newUser);
        return res.render("Login")
    } catch (error) {
        console.error("Error creating user:", error);
        return res.status(500).json({ msg: "Server error" });
    }
}

async function handleUserLoginData(req,res) {
    const {Email,Password}=req.body
    if(!Email||!Password){
        return res.render("Login",{
            error:"Invalid email or password"
        });
    }

    console.log(Email,Password)

  
        const token= await signupuser.matchedpassword(Email,Password);
         if(token==null) return res.render("Login",{
            error:"Invalid email or password"
        });
        res.cookie("__stripe_sid",token);  
        const allBlog = await blogModel.find({});
        return res.render("AddBlog",{
            allBlog,  // Pass the full list of blogs to the Home view
            user: req.user  // Ensure user information is also passed
        })

    
}

async function handleLogOut(req,res){
    res.clearCookie("__stripe_sid").redirect('/home')
}

module.exports = { handleUserSignUpData ,handleUserLoginData,handleLogOut};
