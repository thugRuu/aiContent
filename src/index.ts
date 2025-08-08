import express, { Express, Request, Response } from "express";
import userRoute from "./routes/users.routes"
import aiRouter from "./routes/ai.routers"

const app: Express = express();

app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.send("api is running");
});

app.use("/users",userRoute)
app.use("/ai", aiRouter);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
