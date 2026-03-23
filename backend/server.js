import express from "express" 
import cors from "cors"
import { connectDB } from "./config/db.js"
import mongoose from "mongoose";
import foodRouter from "./routes/foodRoute.js"
import userRouter from "./routes/userRoute.js"
import cartRouter from "./routes/cartRoute.js"
import 'dotenv/config.js'
import orderRouter from "./routes/orderRoute.js"



//app config
const app=express()
const port=4000

//middleware
app.use(express.json())
app.use(cors())

// DB Connection Middleware (Crucial for Vercel/Serverless)
app.use(async (req, res, next) => {
    if (mongoose.connection.readyState !== 1) {
        await connectDB();
    }
    next();
});

//db connection
const startServer = async () => {
    try {
        await connectDB(); 
        console.log("✅ Database Ready for Requests");
        
        app.listen(port, () => {
            console.log(`Server started on http://localhost:${port}`);
        });
    } catch (error) {
        console.error("❌ Critical Startup Error:", error);
    }
};

startServer();




//api endpoints
app.use("/api/food", foodRouter);
app.use("/images",express.static('uploads'))
app.use("/api/user", userRouter);
app.use("/api/cart",cartRouter);
app.use("/api/order",orderRouter);


app.get("/",(req,res)=>{
    res.send("API WORKING")
})

if (process.env.NODE_ENV !== 'production') {
    app.listen(port,()=>{
        console.log(`App running on port:http://localhost:${port}`)
    })
}

export default app;
