import express from "express";
import connectToDatabase from "./db";
import postsRouter from "./routes/PostRouter";
import commentsRouter from "./routes/CommentsRouter";
import authRouter from "./routes/UserRouter";

const app = express();
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);
app.use("/auth", authRouter);

app.listen(8080, async () => {
  console.log("Server is running on port 8080");
  await connectToDatabase;
  console.log("MongoDB is running");
});
