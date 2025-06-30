import express from "express";
import noteRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(express.json()); // this middleware parse JSON bodies: req.body
app.use(rateLimiter);

// simple custom middleware
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

app.use("/api/notes", noteRoutes)

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: " + PORT);
  });
});