import { Router } from "express";
import { addTodo, deleteTodo, getTodos, updateTodo } from "../controllers/todos.controller.js";

const todoRouter = Router();

todoRouter.get("/getTodos", getTodos);
todoRouter.post("/addTodo", addTodo);
todoRouter.post("/updateTodo", updateTodo);
todoRouter.delete("/deleteTodo", deleteTodo);


export default todoRouter;