import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";
import { getAdminsCollection } from "../config/database.js";
import { JWT_SECRET } from "../middleware/auth.js";

// Handle admin registration with password hashing
const adminSignup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    // Validate required fields for admin registration
    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Email, password, and full name are required" });
    }

    // Check if admin already exists in database
    const adminsCollection = getAdminsCollection();
    const existingAdmin = await adminsCollection.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    // Hash password before storing in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new admin record with hashed password
    const result = await adminsCollection.insertOne({
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Admin signup successful" });
  } catch (err) {
    console.error("Admin signup error:", err);
    res.status(500).json({ message: "Server error during admin signup" });
  }
};

// Handle admin authentication and JWT token generation
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email in database
    const adminsCollection = getAdminsCollection();
    const admin = await adminsCollection.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password against stored hash
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Generate JWT token for authenticated admin
    const token = jwt.sign({ id: admin._id.toString() }, JWT_SECRET, { expiresIn: "1h" });

    // Update last login timestamp
    await adminsCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date() } }
    );

    res.status(200).json({ message: "Admin login successful", token });
  } catch (err) {
    console.error("Admin login error:", err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

// Verify admin token and return admin status
const verifyAdmin = async (req, res) => {
  try {
    const adminsCollection = getAdminsCollection();
    const admin = await adminsCollection.findOne({ _id: new ObjectId(req.adminId) });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin verified" });
  } catch (err) {
    console.error("Admin verification error:", err);
    res.status(500).json({ message: "Server error during verification" });
  }
};

// Retrieve all admin accounts excluding passwords
const getAllAdmins = async (req, res) => {
  try {
    const adminsCollection = getAdminsCollection();
    const admins = await adminsCollection.find({}, { projection: { password: 0 } }).toArray();
    res.status(200).json(admins);
  } catch (err) {
    console.error("Error fetching admins:", err);
    res.status(500).json({ message: "Failed to load admins" });
  }
};

// Export all admin controller functions
export {
  adminSignup,
  adminLogin,
  verifyAdmin,
  getAllAdmins
};

