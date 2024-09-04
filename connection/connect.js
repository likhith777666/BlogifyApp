const mongoose=require("mongoose");

async function connectToTheDb(url) {

    return mongoose.connect(url)
    
}

module.exports={connectToTheDb}