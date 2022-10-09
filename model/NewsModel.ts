import mongoose, { Schema } from 'mongoose';

const userSchema = new Schema({
    title: String,
    description: String,
    createdAt: Date,
});

export default mongoose.models["news"] ?? mongoose.model("news", userSchema, "news")