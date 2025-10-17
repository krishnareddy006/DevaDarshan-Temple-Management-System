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

// const allowedOrigins = [
//   "http://localhost:5173",
//   process.env.FRONTEND_URL, // production frontend
// ];

// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps, curl, Postman)
//       if (!origin) return callback(null, true);
//       if (allowedOrigins.includes(origin)) {
//         callback(null, true);
//       } else {
//         callback(new Error(`CORS policy: ${origin} not allowed`));
//       }
//     },
//     credentials: true, // allow cookies, auth headers
//   })
// );


// // Middleware for parsing JSON and URL-encoded data
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

// // Root endpoint
// app.get("/", (req, res) => {
//   res.send("Deva Darshan Backend is Running ");
// });

// // Start server
// app.listen(PORT, () => {
//   console.log(` Server is running on port ${PORT}`);
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

// CORS Configuration - Updated for production
const allowedOrigins = [
  "http://localhost:5173",
  "https://deva-darshan.vercel.app", // Production Vercel frontend
  process.env.FRONTEND_URL || "https://deva-darshan.vercel.app", // Environment variable fallback
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (mobile apps, Postman, etc.)
      if (!origin) return callback(null, true);
      
      // Check if origin is in allowed list
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        console.log(`CORS blocked origin: ${origin}`); // Log blocked origins for debugging
        callback(new Error(`CORS policy: Origin ${origin} not allowed`));
      }
    },
    credentials: true, // Allow cookies and Authorization headers
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Explicitly allow methods
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'Authorization',
      'Cache-Control'
    ],
    preflightContinue: false,
  })
);

// Handle preflight OPTIONS requests explicitly
app.options('*', cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json({ limit: '50mb' })); // Increased limit for image uploads
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// Register API route handlers - Ensure all routes start with /api
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", darshanRoutes);
app.use("/api", poojaRoutes);
app.use("/api", accommodationRoutes);
app.use("/api", donationRoutes);
app.use("/api", eventRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", membershipRoutes);

// Root endpoint for health check
app.get("/", (req, res) => {
  res.json({ 
    message: "Deva Darshan Backend is Running",
    status: "healthy",
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware for CORS issues
app.use((err, req, res, next) => {
  if (err.message.includes('CORS policy')) {
    return res.status(403).json({ 
      error: 'CORS policy violation',
      message: 'Origin not allowed'
    });
  }
  next(err);
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Server Error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error',
    message: 'Something went wrong'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Allowed CORS origins: ${allowedOrigins.join(', ')}`);
});
