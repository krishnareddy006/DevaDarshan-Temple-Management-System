const { getFeedbackCollection } = require("../config/database");
const { transporter, EMAIL_USER } = require("../config/email");

// Submit Feedback
const submitFeedback = async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ message: "Name, email, and message are required" });
    }

    const feedbackCollection = getFeedbackCollection();
    const result = await feedbackCollection.insertOne({
      name,
      email,
      message,
      createdAt: new Date(),
    });

    const mailOptions = {
      from: `"Temple Administration" <${EMAIL_USER}>`,
      to: email,
      subject: "Thank You for Your Feedback",
      html: `
        <h2>Feedback Received</h2>
        <p>Dear ${name},</p>
        <p>Thank you for sharing your feedback with Ramalayam Temple. We value your input and will review it carefully.</p>
        <p>Your message: ${message}</p>
        <p>Best regards,<br>Temple Administration</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Feedback confirmation email sent to ${email}`);

    res.status(201).json({ message: "Feedback submitted successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error submitting feedback:", err);
    res.status(500).json({ message: "Failed to submit feedback" });
  }
};

module.exports = {
  submitFeedback
};
