import dotenv from "dotenv";
import { app } from "./app.js";
import connectDB from "./db/index.js";

dotenv.config({ path: "./env" });

await connectDB(); // Ensure database is connected before handling requests

// Required for Vercel Deployment
export default app;
