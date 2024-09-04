const mongoose = require("mongoose");
const { createHmac, randomBytes } = require("crypto");
const {setUser}=require("../service/auth")
const SignUpSchema = new mongoose.Schema({
  Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
    unique: true,
  },
  salt: {
    type: String,
  },
  Password: {
    type: String,
    required: true,
  },
  ProfileImageUrl: {
    type: String,
    default: "/Images/307ce493-b254-4b2d-8ba4-d12c080d6651.jpg",
  },
  role: {
    type: String,
    enum: ["USER", "ADMIN"],
    default: "USER",
  },
}, {
  timestamps: true,
});

SignUpSchema.pre("save", function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified("Password")) return next();

  // Generate a salt and hash the password
  const salt = randomBytes(16).toString("hex");
  const hashedPassword = createHmac("sha256", salt)
    .update(user.Password)
    .digest("hex");

  user.salt = salt;
  user.Password = hashedPassword;
  next();
});

SignUpSchema.static("matchedpassword",async function(email,password){
  const user=await this.findOne({Email:email});
  if(!user) return null
  const salt=user.salt;
  const hashedPassword=user.Password;
  const userProvidedHash=createHmac("sha256",salt)
  .update(password)
  .digest("hex");

if(hashedPassword!=userProvidedHash){
  console.log("passsword incorrect!")
}
const token=setUser(user)
return token 
})



const SignUpUser = mongoose.model("SignUpUser", SignUpSchema);

module.exports = SignUpUser;
