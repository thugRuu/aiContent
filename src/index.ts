import express, { Express, Request, Response } from "express";
import userRoute from "./routes/users.routes"
import aiRouter from "./routes/ai.routers"
import blogs from "./routes/blog.routers";
import landingpage from "./routes/landingpage.routers";
import showcase from "./routes/showcase.routers";
import music from "./routes/music.routers";
import project from "./routes/project.routes";
import connectDB from "./services/connectDB";
import { setupSwagger } from "./services/swagger";

const app: Express = express();
setupSwagger(app);

app.use(express.json());
connectDB();

app.get("/", (req: Request, res: Response) => {
  res.send("api is running");
});

app.use("/user", userRoute);
app.use("/ai", aiRouter);
app.use("/blogs", blogs);
app.use("/projects", project);
app.use("/landingpage", landingpage);
app.use("/music", music);
app.use("/showcase", showcase);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
