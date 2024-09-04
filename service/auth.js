const jwt=require("jsonwebtoken")
const secrete="Likhith777@"
function setUser(user){
    return jwt.sign({
        _id:user._id,
        Email:user.Email,
        ProfileImageUrl:user.ProfileImageUrl,
        role:user.role
    },secrete)
}

function getUser(token){
    if(!token) return null;
    try{
        const load=jwt.verify(token,secrete);
        return load;
    }catch(err){
        console.error("Invalid token or token expire",err);
        return null
    }
}

module.exports={setUser,getUser};
