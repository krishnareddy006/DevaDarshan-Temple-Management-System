const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getAdminsCollection } = require("../config/database");
const { JWT_SECRET } = require("../middleware/auth");

// Admin Signup
const adminSignup = async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ message: "Email, password, and full name are required" });
    }

    const adminsCollection = getAdminsCollection();
    const existingAdmin = await adminsCollection.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const result = await adminsCollection.insertOne({
      fullName,
      email,
      password: hashedPassword,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Admin signup successful" });
  } catch (err) {
    console.error(" Admin signup error:", err);
    res.status(500).json({ message: "Server error during admin signup" });
  }
};

// Admin Login
const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const adminsCollection = getAdminsCollection();
    const admin = await adminsCollection.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: admin._id.toString() }, JWT_SECRET, { expiresIn: "1h" });

    await adminsCollection.updateOne(
      { _id: admin._id },
      { $set: { lastLogin: new Date() } }
    );

    res.status(200).json({ message: "Admin login successful", token });
  } catch (err) {
    console.error(" Admin login error:", err);
    res.status(500).json({ message: "Server error during admin login" });
  }
};

// Verify Admin
const verifyAdmin = async (req, res) => {
  try {
    const adminsCollection = getAdminsCollection();
    const admin = await adminsCollection.findOne({ _id: new ObjectId(req.adminId) });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin verified" });
  } catch (err) {
    console.error(" Admin verification error:", err);
    res.status(500).json({ message: "Server error during verification" });
  }
};

// Get all admins
const getAllAdmins = async (req, res) => {
  try {
    const adminsCollection = getAdminsCollection();
    const admins = await adminsCollection.find({}, { projection: { password: 0 } }).toArray();
    res.status(200).json(admins);
  } catch (err) {
    console.error(" Error fetching admins:", err);
    res.status(500).json({ message: "Failed to load admins" });
  }
};

module.exports = {
  adminSignup,
  adminLogin,
  verifyAdmin,
  getAllAdmins
};
