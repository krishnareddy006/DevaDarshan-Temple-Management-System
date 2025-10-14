import dotenv from "dotenv";
dotenv.config({ path: "./.env" });

import express from "express";
import cors from "cors";
import { connectDB } from "./config/database.js";

// Import route modules
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import darshanRoutes from "./routes/darshanRoutes.js";
import poojaRoutes from "./routes/poojaRoutes.js";
import accommodationRoutes from "./routes/accommodationRoutes.js";
import donationRoutes from "./routes/donationRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import feedbackRoutes from "./routes/feedbackRoutes.js";
import membershipRoutes from "./routes/membershipRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Establish database connection
connectDB();

// Configure middleware for CORS and request parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Register API route handlers
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", darshanRoutes);
app.use("/api", poojaRoutes);
app.use("/api", accommodationRoutes);
app.use("/api", donationRoutes);
app.use("/api", eventRoutes);
app.use("/api", feedbackRoutes);
app.use("/api/membership", membershipRoutes);

// Start server on specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
