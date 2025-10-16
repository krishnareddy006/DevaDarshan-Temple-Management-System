// import dotenv from "dotenv";
// dotenv.config({ path: "./.env" });

// import express from "express";
// import cors from "cors";
// import { connectDB } from "./config/database.js";

// // Import route modules
// import adminRoutes from "./routes/adminRoutes.js";
// import userRoutes from "./routes/userRoutes.js";
// import darshanRoutes from "./routes/darshanRoutes.js";
// import poojaRoutes from "./routes/poojaRoutes.js";
// import accommodationRoutes from "./routes/accommodationRoutes.js";
// import donationRoutes from "./routes/donationRoutes.js";
// import eventRoutes from "./routes/eventRoutes.js";
// import feedbackRoutes from "./routes/feedbackRoutes.js";
// import membershipRoutes from "./routes/membershipRoutes.js";

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Establish database connection
// connectDB();

// // Configure middleware for CORS and request parsing
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Register API route handlers
// app.use("/api", adminRoutes);
// app.use("/api", userRoutes);
// app.use("/api", darshanRoutes);
// app.use("/api", poojaRoutes);
// app.use("/api", accommodationRoutes);
// app.use("/api", donationRoutes);
// app.use("/api", eventRoutes);
// app.use("/api", feedbackRoutes);
// app.use("/api", membershipRoutes);

// // Start server on specified port
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


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

const allowedOrigins = [
  "http://localhost:5173",
  process.env.FRONTEND_URL, // production frontend
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps, curl, Postman)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: ${origin} not allowed`));
      }
    },
    credentials: true, // allow cookies, auth headers
  })
);


// Middleware for parsing JSON and URL-encoded data
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
app.use("/api", membershipRoutes);

// Root endpoint
app.get("/", (req, res) => {
  res.send("Deva Darshan Backend is Running ");
});

// Start server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
