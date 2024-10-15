import express, { Request, Response, Express } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();

app.get("/", (req: Request, res: Response) => {
    res.send("Hello World");
});

app.listen(process.env.PORT, () => {
    console.log(`Server Running on Port : ${process.env.PORT}`);
});
