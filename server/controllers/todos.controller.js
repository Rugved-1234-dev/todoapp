import mongoose from "mongoose";
import z from "zod";
import { Todo } from "../models/todo.models.js";

// Zod schema for validation
const todoSchema = z.object({
    title: z.string(),
    description: z.string(),
    status: z.enum(["On Going", "Completed"]) 
});

// Add Todo
export const addTodo = async (req, res) => {
    try {
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        };

        const validate = todoSchema.safeParse(data);

        if (validate.success) {
            const newTodo = new Todo(data);
            await newTodo.save();

            res.status(200).json({
                success: true,
                status: 200,
                message: "Todo successfully created",
            });
        } else {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Input",
                errors: validate.error.errors,
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
};

// Update Todo
export const updateTodo = async (req, res) => {
    try {
        const id  = req.body.id;
        const data = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
        };

        const validate = todoSchema.safeParse(data);

        if (validate.success) {
            const updatedTodo = await Todo.findByIdAndUpdate(id, data, { new: true });
            console.log(updatedTodo);

            if (updatedTodo) {
                res.status(200).json({
                    success: true,
                    status: 200,
                    message: "Todo successfully updated",
                    todo: updatedTodo,
                });
            } else {
                res.status(404).json({
                    success: false,
                    status: 404,
                    message: "Todo not found",
                });
            }
        } else {
            res.status(400).json({
                success: false,
                status: 400,
                message: "Invalid Input",
                errors: validate.error.errors,
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
};

// Delete Todo
export const deleteTodo = async (req, res) => {
    try {
        const id  = req.body.id;
        const deletedTodo = await Todo.findByIdAndDelete(id);

        if (deletedTodo) {
            res.status(200).json({
                success: true,
                status: 200,
                message: "Todo successfully deleted",
            });
        } else {
            res.status(404).json({
                success: false,
                status: 404,
                message: "Todo not found",
            });
        }
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
};

// Get All Todos
export const getTodos = async (req, res) => {
    try {
        const todos = await Todo.find({});
        res.status(200).json({
            success: true,
            status: 200,
            todos,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            status: 500,
            message: "Internal Server Error",
        });
    }
};
