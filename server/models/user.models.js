import mongoose, { Schema } from "mongoose";
import { todoSchema } from "./todo.models.js";
import bcrypt from "bcryptjs";


const userSchema = new Schema({
    username: {
        type: String,
        required: true
    }, 
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    todos: {
        type: [todoSchema], 
        default: []
    }
});



export const User = mongoose.model("User", userSchema);
