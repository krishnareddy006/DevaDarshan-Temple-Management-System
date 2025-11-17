import { transporter, EMAIL_USER } from "../config/email.js";

const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    // (A) Send email to admin
    if (transporter) {
      const adminOptions = {
        from: `"Temple Website" <${EMAIL_USER}>`,
        to: EMAIL_USER, // or your actual admin email, if different
        subject: "New Feedback Received",
        html: `
          <h2>New Feedback Submission</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Message:</strong> ${message}</p>
        `,
      };

      await transporter.sendMail(adminOptions);

      // (B) Send thank you reply to user
      const userOptions = {
        from: `"Temple Administration" <${EMAIL_USER}>`,
        to: email,
        subject: "Thank You for Your Feedback",
        html: `
          <h2>Feedback Received</h2>
          <p>Dear ${name},</p>
          <p>Thank you for sharing your feedback with Shiva Temple. We value your input and will review it carefully.</p>
          <p>Your message: ${message}</p>
          <p>Best regards,<br>Temple Administration</p>
        `,
      };

      await transporter.sendMail(userOptions);

      res.status(201).json({ message: "Feedback submitted and emails sent successfully" });
    } else {
      res.status(500).json({ message: "Email transporter not available" });
    }
  } catch (err) {
    console.error("Error sending feedback emails:", err);
    res.status(500).json({ message: "Failed to send feedback emails" });
  }
};

export { submitFeedback };
