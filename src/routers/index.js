import express from "express";
const app = express();
import userRouter from "./userRouter.js";
import listRouter from "./listRouter.js";
import movieRouter from "./movieRouter.js";
import rankRouter from "./rankRouter.js";

app.use("/api", [
    userRouter, 
    rankRouter,
    movieRouter,
    listRouter
]);

export default app;
