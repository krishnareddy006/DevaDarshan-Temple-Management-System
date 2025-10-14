import { ObjectId } from "mongodb";
import { getAccommodationsCollection } from "../config/database.js";
import { transporter, EMAIL_USER } from "../config/email.js";

// Handle accommodation booking requests from users
const bookAccommodation = async (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      numberOfPeople,
      roomType,
      totalPrice,
    } = req.body;

    // Validate required fields before processing
    if (
      !fullName ||
      !email ||
      !phone ||
      !checkInDate ||
      !checkOutDate ||
      !roomType
    ) {
      return res
        .status(400)
        .json({ message: "All required fields must be filled" });
    }

    // Insert booking record into database
    const accommodationsCollection = getAccommodationsCollection();
    const result = await accommodationsCollection.insertOne({
      fullName,
      email,
      phone,
      checkInDate,
      checkOutDate,
      numberOfPeople: parseInt(numberOfPeople) || 1,
      roomType,
      totalPrice: parseFloat(totalPrice) || 0,
      status: "pending",
      bookedAt: new Date(),
    });

    // Send booking acknowledgment email to user
    const mailOptions = {
      from: `"Temple Administration" <${EMAIL_USER}>`,
      to: email,
      subject: "Accommodation Booking Request Received",
      html: `
        <h2>Booking Request Received</h2>
        <p>Dear ${fullName},</p>
        <p>We have received your accommodation booking request with the following details:</p>
        <ul>
          <li><strong>Room Type:</strong> ${roomType}</li>
          <li><strong>Check-in Date:</strong> ${checkInDate}</li>
          <li><strong>Check-out Date:</strong> ${checkOutDate}</li>
          <li><strong>Number of Guests:</strong> ${numberOfPeople}</li>
          <li><strong>Phone:</strong> ${phone}</li>
          <li><strong>Total Price:</strong> ₹${totalPrice}</li>
        </ul>
        <p>Your booking is pending admin confirmation. You will receive a confirmation email once approved.</p>
        <p>Best regards,<br>Temple Administration</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Acknowledgment email sent to ${email}`);

    res.status(201).json({
      message: "Accommodation booking request submitted successfully",
      id: result.insertedId,
    });
  } catch (err) {
    console.error("Error booking accommodation:", err);
    res.status(500).json({ message: "Failed to submit booking request" });
  }
};

// Retrieve all accommodation bookings from database
const getAllAccommodations = async (req, res) => {
  try {
    const accommodationsCollection = getAccommodationsCollection();
    const bookings = await accommodationsCollection.find().toArray();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching bookings:", err);
    res.status(500).json({ message: "Failed to load accommodation bookings" });
  }
};

// Updated checkAvailability function to handle room types
const checkAvailability = async (req, res) => {
  try {
    const { roomType } = req.query; // Get room type from query params
    const accommodationsCollection = getAccommodationsCollection();
    
    // Filter by room type if provided
    const query = roomType ? { roomType } : {};
    const bookings = await accommodationsCollection.find(query).toArray();
    const availability = {};

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Generate availability status for each day in the next year
    for (let i = 0; i < 365; i++) {
      const date = new Date(today.getTime() + i * 24 * 60 * 60 * 1000);
      const dateStr = date.toISOString().split("T")[0];

      let isBooked = false;
      let isFilling = false;

      // Check if date conflicts with existing bookings for the specific room type
      bookings.forEach((booking) => {
        const checkIn = new Date(booking.checkInDate);
        const checkOut = new Date(booking.checkOutDate);
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);
        date.setHours(0, 0, 0, 0);

        if (date >= checkIn && date < checkOut) {
          isBooked = true;
        } else if (
          date.getTime() === checkIn.getTime() ||
          date.getTime() === checkOut.getTime()
        ) {
          isFilling = true;
        }
      });

      availability[dateStr] = isBooked
        ? "unavailable"
        : isFilling
        ? "filling"
        : "available";
    }

    res.status(200).json(availability);
  } catch (err) {
    console.error("Error fetching availability:", err);
    res.status(500).json({ message: "Failed to fetch availability" });
  }
};

// Check availability for specific date range
const checkDateRange = async (req, res) => {
  try {
    const { checkInDate, checkOutDate, roomType } = req.body; 

    // Validate required date parameters
    if (!checkInDate || !checkOutDate) {
      return res
        .status(400)
        .json({ message: "Check-in and check-out dates are required" });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    checkIn.setHours(0, 0, 0, 0);
    checkOut.setHours(0, 0, 0, 0);

    const accommodationsCollection = getAccommodationsCollection();
    // Filter bookings by room type if provided
    const query = roomType ? { roomType } : {};
    const bookings = await accommodationsCollection.find(query).toArray();

    // Check if requested dates overlap with existing bookings for the specific room type
    const isAvailable = !bookings.some((booking) => {
      const bookedCheckIn = new Date(booking.checkInDate);
      const bookedCheckOut = new Date(booking.checkOutDate);
      bookedCheckIn.setHours(0, 0, 0, 0);
      bookedCheckOut.setHours(0, 0, 0, 0);

      return (
        (checkIn >= bookedCheckIn && checkIn < bookedCheckOut) ||
        (checkOut > bookedCheckIn && checkOut <= bookedCheckOut) ||
        (checkIn <= bookedCheckIn && checkOut >= bookedCheckOut)
      );
    });

    res.status(200).json({ isAvailable });
  } catch (err) {
    console.error("Error checking availability:", err);
    res.status(500).json({ message: "Failed to check availability" });
  }
};

// Confirm pending accommodation booking and send notification
const confirmAccommodation = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate booking ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid booking ID" });
    }

    const accommodationsCollection = getAccommodationsCollection();
    const booking = await accommodationsCollection.findOne({
      _id: new ObjectId(id),
    });

    // Check if booking exists
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Prevent duplicate confirmations
    if (booking.status === "confirmed") {
      return res.status(400).json({ message: "Booking already confirmed" });
    }

    // Update booking status to confirmed
    const result = await accommodationsCollection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status: "confirmed", confirmedAt: new Date() } }
    );

    if (result.modifiedCount === 0) {
      return res.status(500).json({ message: "Failed to confirm booking" });
    }

    // Send confirmation email to guest
    const mailOptions = {
      from: `"Temple Administration" <${EMAIL_USER}>`,
      to: booking.email,
      subject: "Accommodation Booking Confirmation",
      html: `
        <h2>Accommodation Booking Confirmed</h2>
        <p>Dear ${booking.fullName},</p>
        <p>Your accommodation booking has been confirmed with the following details:</p>
        <ul>
          <li><strong>Room Type:</strong> ${booking.roomType}</li>
          <li><strong>Check-in Date:</strong> ${booking.checkInDate}</li>
          <li><strong>Check-out Date:</strong> ${booking.checkOutDate}</li>
          <li><strong>Number of Guests:</strong> ${booking.numberOfPeople}</li>
          <li><strong>Phone:</strong> ${booking.phone}</li>
        </ul>
        <p>We look forward to welcoming you!</p>
        <p>Best regards,<br>Temple Administration</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Confirmation email sent to ${booking.email}`);

    res
      .status(200)
      .json({ message: "Accommodation booking confirmed and email sent" });
  } catch (err) {
    console.error("Error confirming accommodation:", err);
    res.status(500).json({ message: "Failed to confirm accommodation booking" });
  }
};

// Export all accommodation controller functions
export {
  bookAccommodation,
  getAllAccommodations,
  checkAvailability,
  checkDateRange,
  confirmAccommodation
};
