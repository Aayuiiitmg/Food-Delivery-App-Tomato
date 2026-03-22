import mongoose from "mongoose";

export const connectDB = async () => {
    // We are using the new 'testuser' and the 'Direct Mode' link to be 100% safe
   const directUri = "mongodb+srv://Aayush_Shankar:591969@cluster0.don9obk.mongodb.net/food-del?retryWrites=true&w=majority"

    try {

        mongoose.set('bufferCommands', false);
        await mongoose.connect(directUri, {
            family: 4, // Forces IPv4
            tlsAllowInvalidCertificates: true, // Bypasses local Windows SSL blocks
            serverSelectionTimeoutMS: 5000
        });
        console.log("✅ ✅ DATABASE CONNECTED SUCCESSFULLY!");
    } catch (error) {
        console.error("❌ ERROR DETAILS:", error.message);
    }
}