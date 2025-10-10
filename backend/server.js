require("dotenv").config({ path: "./.env" });

const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/database");

// Import routes
const adminRoutes = require("./routes/adminRoutes");
const userRoutes = require("./routes/userRoutes");
const darshanRoutes = require("./routes/darshanRoutes");
const poojaRoutes = require("./routes/poojaRoutes");
const accommodationRoutes = require("./routes/accommodationRoutes");
const donationRoutes = require("./routes/donationRoutes");
const eventRoutes = require("./routes/eventRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const membershipRoutes = require("./routes/membershipRoutes");

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api", adminRoutes);
app.use("/api", userRoutes);
app.use("/api", darshanRoutes);
app.use("/api", poojaRoutes);
app.use("/api", accommodationRoutes);
app.use("/api", donationRoutes);
app.use("/api", eventRoutes);
app.use("/api", feedbackRoutes);
app.use("/api", membershipRoutes);

app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
});
