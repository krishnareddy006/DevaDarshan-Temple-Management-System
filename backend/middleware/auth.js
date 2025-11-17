import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_fallback";

// Middleware function to verify JWT token for admin authentication
const verifyAdminToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  // Verify token authenticity and extract admin ID
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.adminId = decoded.id;
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

// Export middleware function and JWT secret for use in other modules
export { verifyAdminToken, JWT_SECRET };
