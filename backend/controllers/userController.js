const bcrypt = require("bcrypt");
const { getUsersCollection } = require("../config/database");

// User Signup
const userSignup = async (req, res) => {
  try {
    const { fullName, email, password } = req.body;

    const usersCollection = getUsersCollection();
    const existingUser = await usersCollection.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await usersCollection.insertOne({
      fullName,
      email,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Signup successful!" });
  } catch (err) {
    console.error("❌ Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
};

// User Login
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const usersCollection = getUsersCollection();
    const user = await usersCollection.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    res.status(200).json({ message: "Login successful!" });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
};

module.exports = {
  userSignup,
  userLogin
};
