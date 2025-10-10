const { getMembershipCollection } = require("../config/database");
const { transporter, EMAIL_USER } = require("../config/email");

// Submit Membership Application
const submitMembership = async (req, res) => {
  try {
    const { fullName, email, phone, membershipType } = req.body;

    if (!fullName || !email || !phone || !membershipType) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const membershipCollection = getMembershipCollection();
    const result = await membershipCollection.insertOne({
      fullName,
      email,
      phone,
      membershipType,
      status: "pending",
      createdAt: new Date(),
    });

    const mailOptions = {
      from: `"Temple Administration" <${EMAIL_USER}>`,
      to: email,
      subject: "Membership Application Received",
      html: `
        <h2>Membership Application</h2>
        <p>Dear ${fullName},</p>
        <p>Thank you for applying for our ${membershipType} membership. We will review your application and get back to you soon.</p>
        <p>Best regards,<br>Temple Administration</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Membership confirmation email sent to ${email}`);

    res.status(201).json({ message: "Membership application submitted successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error submitting membership:", err);
    res.status(500).json({ message: "Failed to submit membership application" });
  }
};

module.exports = {
  submitMembership
};
