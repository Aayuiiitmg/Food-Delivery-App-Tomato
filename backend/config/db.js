import mongoose from "mongoose";

export const connectDB = async () => {
    // We are using the new 'testuser' and the 'Direct Mode' link to be 100% safe
    const directUri = "mongodb://Aayush_Shankar:591969@cluster0-shard-00-00.don9obk.mongodb.net:27017,cluster0-shard-00-01.don9obk.mongodb.net:27017,cluster0-shard-00-02.don9obk.mongodb.net:27017/food-del?ssl=true&replicaSet=atlas-m4q6p7-shard-0&authSource=admin&retryWrites=true&w=majority";

    try {
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