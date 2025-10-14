import bcrypt from "bcrypt";
import { getUsersCollection } from "../config/database.js";

// Handle user registration with password hashing
const userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    // Check if user already exists in database
    const usersCollection = getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash password before storing in database
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user record with hashed password
    await usersCollection.insertOne({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// Handle user authentication and login verification
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user by email in database
    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Verify password against stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

// Export all user controller functions
export {
  userSignup,
  userLogin
};
