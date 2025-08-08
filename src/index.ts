import express, { Express, Request, Response } from "express";
import userRoute from "./routes/users.routes"
import aiRouter from "./routes/ai.routers"
import blogs from "./routes/blog.routers";
import connectDB from "./services/connectDB";


const app: Express = express();

app.use(express.json());
connectDB()

app.get("/", (req: Request, res: Response) => {
  res.send("api is running");
});

app.use("/user",userRoute)
app.use("/ai", aiRouter);
app.use("/blogs", blogs);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
