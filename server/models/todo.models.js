import mongoose, { Schema } from "mongoose";

export const todoSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: ['Completed', 'On Going'],  
        required: true
    }
});

export const Todo = mongoose.model("Todo", todoSchema);
