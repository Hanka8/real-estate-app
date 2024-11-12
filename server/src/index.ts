import express, { Request, Response } from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import leadRoutes from "./routes/leadRoutes";
import getConfig from "./config";

// Initialize configuration values
const { mongoURI, port } = getConfig();

const app = express();

// Middleware
app.use(bodyParser.json());

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
