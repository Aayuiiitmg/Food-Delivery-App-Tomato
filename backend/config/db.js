import mongoose from "mongoose";
 export const connectDB= async()=>{
        await mongoose.connect('mongodb+srv://Aayush_Shankar:591969@cluster0.don9obk.mongodb.net/appName=food-del').then(()=>{
            console.log("DB CONNECTED")
        })
}