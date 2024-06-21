const { mongoose } = require('mongoose');
const ConnectDB = () =>{
    mongoose.connect(process.env.MONGO_URI).then((res)=>{
        console.log("connect")
    })
    .catch((error)=>{
        console.log(error)
    });
    
    
}

module.exports =  ConnectDB