const { ObjectId } = require("mongodb");
const { getDarshanCollection } = require("../config/database");
const { transporter, EMAIL_USER } = require("../config/email");

// Book Darshan
const bookDarshan = async (req, res) => {
  try {
    const { name, email, phone, address, date, time, type, numberOfPeople } = req.body;

    if (!name || !email || !phone || !address || !date || !time || !type || !numberOfPeople) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const darshanCollection = getDarshanCollection();
    const result = await darshanCollection.insertOne({
      name,
      email,
      phone,
      address,
      date,
      time,
      type,
      numberOfPeople: parseInt(numberOfPeople),
      status: "pending",
      bookedAt: new Date(),
    });

    res.status(201).json({ success: true, message: "Darshan booked successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error booking darshan:", err);
    res.status(500).json({ message: "Failed to book darshan" });
  }
};

// Get all Darshan bookings
const getAllDarshan = async (req, res) => {
  try {
    const darshanCollection = getDarshanCollection();
    const bookings = await darshanCollection.find().toArray();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Error fetching darshan bookings:", err);
    res.status(500).json({ message: "Failed to load darshan bookings" });
  }
};

// Confirm Darshan booking
const confirmDarshan = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const darshanCollection = getDarshanCollection();
    const booking = await darshanCollection.findOne({ _id: new ObjectId(id) });

    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    if (booking.status === "confirmed") {
      return res.status(400).json({ message: "Booking already confirmed" });
    }

    const result = await darshanCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "confirmed", confirmedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to confirm booking" });
    }

    const mailOptions = {
      from: `"Temple Administration" <${EMAIL_USER}>`,
      to: booking.email,
      subject: "Darshan Booking Confirmation",
      html: `
        <h2>Darshan Booking Confirmed</h2>
        <p>Dear ${booking.name},</p>
        <p>Your Darshan booking has been confirmed with the following details:</p>
        <ul>
          <li><strong>Date:</strong> ${booking.date}</li>
          <li><strong>Time:</strong> ${booking.time}</li>
          <li><strong>Type:</strong> ${booking.type}</li>
          <li><strong>Number of People:</strong> ${booking.numberOfPeople}</li>
          <li><strong>Address:</strong> ${booking.address}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,<br>Temple Administration</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Confirmation email sent to ${booking.email}`);

    res.status(200).json({ message: "Darshan booking confirmed and email sent" });
  } catch (err) {
    console.error("❌ Error confirming darshan:", err);
    res.status(500).json({ message: "Failed to confirm darshan booking" });
  }
};

module.exports = {
  bookDarshan,
  getAllDarshan,
  confirmDarshan
};
