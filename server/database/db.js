import mongoose from 'mongoose';


const connection= async (user="admin",password="admin")=>{
    const URL=`mongodb://${user}:${password}@ac-hgjjika-shard-00-00.qmxzqkr.mongodb.net:27017,ac-hgjjika-shard-00-01.qmxzqkr.mongodb.net:27017,ac-hgjjika-shard-00-02.qmxzqkr.mongodb.net:27017/?ssl=true&replicaSet=atlas-133b9u-shard-0&authSource=admin&retryWrites=true&w=majority`
    try{
       await mongoose.connect(URL,{
             useUnifiedTopology:true,
             useNewUrlParser:true
        })
        console.log("Database connected")
    }
    catch(err){
        console.log("error while connecting database",err);
    }
}

export default connection;