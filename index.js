import express from "express";
import connectToDatabase from "./db.js";
import postsRouter from "./routes/PostRouter.js";
import commentsRouter from "./routes/CommentsRouter.js";

const app = express();
app.use(express.json());

app.use("/posts", postsRouter);
app.use("/comments", commentsRouter);

app.listen(8080, async () => {
  console.log("Server is running on port 8080");
  await connectToDatabase;
  console.log("MongoDB is running");
});
