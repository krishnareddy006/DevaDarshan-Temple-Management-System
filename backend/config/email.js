import nodemailer from "nodemailer";

// Use environment variables for SMTP configuration
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;
const SMTP_HOST = process.env.SMTP_HOST || 'smtp.gmail.com';
const SMTP_PORT = process.env.SMTP_PORT || 587;

// Check if email credentials are defined in environment variables
if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("EMAIL_USER or EMAIL_PASS is not defined in .env file");
  console.error("Email notifications will be disabled");
}

// Configure SMTP transporter for Gmail service with proper error handling
let transporter;

if (EMAIL_USER && EMAIL_PASS) {
  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: parseInt(SMTP_PORT),
    secure: false, // Use TLS
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  // Test connection on startup (optional, for debugging)
  transporter.verify((error, success) => {
    if (error) {
      console.error("Email transporter verification failed:", error);
    } else {
      console.log("Email transporter is ready to send messages");
    }
  });
} else {
  console.warn("No email transporter created - missing credentials");
  transporter = null;
}

// Export transporter and email user for use in other modules
export { transporter, EMAIL_USER };
