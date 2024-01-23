import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export const connectDB = async () => {
    try {
        if (!process.env.MONOGDB_URI) {
            throw new Error('MongoDB connection URL is not defined.');
        }

        await mongoose.connect(process.env.MONOGDB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });

        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        throw error;
    }
};
