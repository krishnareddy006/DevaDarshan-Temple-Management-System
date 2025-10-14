import nodemailer from "nodemailer";

const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASS = process.env.EMAIL_PASS;

// Check if email credentials are defined in environment variables
if (!EMAIL_USER || !EMAIL_PASS) {
  console.error("EMAIL_USER or EMAIL_PASS is not defined in .env file");
  process.exit(1);
}

// Configure SMTP transporter for Gmail service
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: EMAIL_USER,
    pass: EMAIL_PASS,
  },
});

// Export transporter and email user for use in other modules
export { transporter, EMAIL_USER };
