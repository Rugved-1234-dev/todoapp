import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors());

app.use(express.json({ limit: "16kb" }));
app.use(
  express.urlencoded({
    extended: true,
    limit: "16kb",
  })
);
app.use(express.static("public"));
app.use(cookieParser());

// routes import

import todoRouter from "./routes/todos.routes.js";
import authRouter from "./routes/user.routes.js";


// User middle

app.use("/api/v1/todo", todoRouter)
app.use("/api/v1/auth", authRouter);



// User middle



export default app;