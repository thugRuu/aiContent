import express, { Express, Request, Response } from "express";
import userRoute from "./routes/users.routes"
import aiRouter from "./routes/ai.routers"
import blogs from "./routes/blog.routers";
import landingpage from "./routes/landingpage.routers";
import tag from "./routes/tag.routes";
import showcase from "./routes/showcase.routers";
import music from "./routes/music.routers";
import project from "./routes/project.routes";
import experience from "./routes/experience.routers";
import connectDB from "./services/connectDB";
import category from "./routes/category.routes";
import comment from "./routes/comment.routes";
import { setupSwagger } from "./services/swagger";
import adminCheck from "./routes/admincheck.routes";

const cors = require("cors");

const app: Express = express();
app.use(cors());
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
app.use("/adminCheck", adminCheck);
app.use("/experience", experience);
app.use("/categories", category);
app.use("/tags", tag);
app.use("/comments", comment);



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
