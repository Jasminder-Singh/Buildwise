import mongoose from "mongoose";

const dbConnect = async()=>{
    try{
        await mongoose.connect(process.env.DATABASE_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true
          })
        console.log('Connected');
        
    }catch(err){
        console.log(err);

    }
}
export const disconnectDB = async()=>{
    try{
        await mongoose.disconnect(process.env.DATABASE_URL);
        console.log("Disconnected");
    }catch(err){
        console.log("Error in disconnected");
        console.log(err);
    }
}
export default dbConnect;