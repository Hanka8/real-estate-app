import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import leadRoutes from "./routes/leadRoutes";
import getConfig from "./config";
import rateLimit from "express-rate-limit";

// Initialize configuration values
const { mongoURI, port } = getConfig();

const app = express();

// Middleware
app.use(bodyParser.json());

// Set up rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use("/lead", limiter);

// Connect to MongoDB
mongoose
  .connect(mongoURI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDB connection error:", err));

// Routes
app.use("/lead", leadRoutes);

// Sample route to check if the server is running
app.get("/", (req: Request, res: Response) => {
  res.send("Server is running");
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app for testing
export default app;
