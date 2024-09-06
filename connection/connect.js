const mongoose=require("mongoose");

async function connectToTheDb(url) {

    return mongoose.connect(url,{
        useNewUrlParser: true,
  connectTimeoutMS: 30000
    })
    
}

module.exports={connectToTheDb}