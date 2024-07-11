import mongoose from "mongoose"
 import dotenv from "dotenv";

 dotenv.config();
 const url=process.env.DB_URL;

 export const connectUsingMongoose=async()=>{
    try{
        await mongoose.connect(url,{useNewUrlParse:true,useUnifiedTopology:true})
        console.log("mongoDb using mongoose is connected");
    }
    catch(err){
        console.log(err);
    }
 }