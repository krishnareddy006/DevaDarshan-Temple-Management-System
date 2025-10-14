import { ObjectId } from "mongodb";
import { getDarshanCollection } from "../config/database.js";
import { transporter, EMAIL_USER } from "../config/email.js";

const DAILY_SLOT_CAPACITY = 100;

const DARSHAN_COSTS = {
  special: 2000,
  vip: 1000,
  regular: 500,
};

// Calculate darshan cost
const calculateDarshanCost = (type, numberOfPeople) => {
  const normalizedType = type?.toLowerCase() || "";
  switch (normalizedType) {
    case "special":
      return DARSHAN_COSTS.special * (numberOfPeople || 1);
    case "vip":
      return DARSHAN_COSTS.vip * (numberOfPeople || 1);
    case "regular":
      return DARSHAN_COSTS.regular * (numberOfPeople || 1);
    default:
      return 0;
  }
};

// Check available slots for a date
const checkAvailableSlots = async (date) => {
  try {
    const darshanCollection = getDarshanCollection();
    const bookingsOnDate = await darshanCollection
      .find({ date, status: "confirmed" })
      .toArray();
    
    const totalPeople = bookingsOnDate.reduce(
      (sum, booking) => sum + (booking.numberOfPeople || 0),
      0
    );
    
    return Math.max(0, DAILY_SLOT_CAPACITY - totalPeople);
  } catch (err) {
    console.error("Error checking slots:", err);
    return 0;
  }
};

// Book darshan - auto-confirm and send email
const bookDarshan = async (req, res) => {
  try {
    const { name, email, phone, address, date, time, type, numberOfPeople } = req.body;

    // Validate all required fields
    if (!name || !email || !phone || !address || !date || !time || !type || !numberOfPeople) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate date is not in the past
    const selectedDate = new Date(date);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate < today) {
      return res.status(400).json({ 
        message: "Cannot book darshan for past dates. Please select today or a future date." 
      });
    }

    // Check available slots
    const availableSlots = await checkAvailableSlots(date);
    
    if (availableSlots < numberOfPeople) {
      return res.status(400).json({ 
        message: `Sorry, only ${availableSlots} slots available for ${date}. Please choose a different date or reduce the number of people.` 
      });
    }

    const totalCost = calculateDarshanCost(type, numberOfPeople);

    // Insert darshan booking with confirmed status
    const darshanCollection = getDarshanCollection();
    const result = await darshanCollection.insertOne({
      name,
      email,
      phone,
      address,
      date,
      time,
      type: type.toLowerCase(),
      numberOfPeople: parseInt(numberOfPeople),
      totalCost,
      status: "confirmed",
      bookedAt: new Date(),
      confirmedAt: new Date(),
    });

    // Send confirmation email immediately
    const mailOptions = {
      from: `"Shiva Temple" <${EMAIL_USER}>`,
      to: email,
      subject: "Darshan Booking Confirmed - Shiva Temple",
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #f97316, #fb923c); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
            .content { background: #fff; padding: 30px; border: 1px solid #e5e7eb; }
            .footer { background: #f9fafb; padding: 20px; text-align: center; font-size: 12px; color: #6b7280; border-radius: 0 0 10px 10px; }
            .success-box { background: #d1fae5; padding: 20px; border-left: 4px solid #10b981; margin: 20px 0; border-radius: 6px; }
            .details { background: #fef3c7; padding: 15px; border-left: 4px solid #f59e0b; margin: 20px 0; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>Darshan Booking Confirmed!</h1>
            </div>
            <div class="content">
              <p>Dear ${name},</p>
              
              <div class="success-box">
                <h3 style="color: #16a34a; margin-top: 0;">✓ Your Darshan is Confirmed</h3>
                <p>Your darshan booking has been successfully confirmed. We look forward to welcoming you!</p>
              </div>
              
              <div class="details">
                <h3>Booking Details:</h3>
                <p><strong>Date:</strong> ${date}</p>
                <p><strong>Time:</strong> ${time}</p>
                <p><strong>Darshan Type:</strong> ${type.charAt(0).toUpperCase() + type.slice(1)}</p>
                <p><strong>Number of People:</strong> ${numberOfPeople}</p>
                <p><strong>Total Amount:</strong> ₹${totalCost.toLocaleString()}</p>
                <p><strong>Address:</strong> ${address}</p>
              </div>
              
              <p><strong>Important Guidelines:</strong></p>
              <ul>
                <li>Please arrive 15 minutes before your scheduled time</li>
                <li>Carry a valid ID proof for verification</li>
                <li>Dress code: Traditional attire recommended</li>
                <li>Mobile phones must be switched off in the temple premises</li>
                <li>Complete payment at the temple counter before darshan</li>
              </ul>
              
              <p><strong>What to Bring:</strong></p>
              <ul>
                <li>Valid government-issued ID</li>
                <li>This confirmation email (printed or digital)</li>
                <li>Exact cash for payment (₹${totalCost.toLocaleString()})</li>
              </ul>
              
              <p>May Lord Shiva bless you with peace, prosperity, and divine grace!</p>
              
              <p>Om Namah Shivaya 🙏</p>
              
              <p>With divine blessings,<br><strong>Shiva Temple Administration</strong></p>
            </div>
            <div class="footer">
              <p>For any queries, please contact us at the temple office.</p>
              <p>© ${new Date().getFullYear()} Shiva Temple. All rights reserved.</p>
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(201).json({ 
      success: true, 
      message: "Darshan booked successfully", 
      id: result.insertedId,
      totalCost 
    });
  } catch (err) {
    console.error("Error booking darshan:", err);
    res.status(500).json({ message: "Failed to book darshan" });
  }
};

// Get all darshan bookings
const getAllDarshan = async (req, res) => {
  try {
    const darshanCollection = getDarshanCollection();
    const bookings = await darshanCollection.find().sort({ bookedAt: -1 }).toArray();
    res.status(200).json(bookings);
  } catch (err) {
    console.error("Error fetching darshan bookings:", err);
    res.status(500).json({ message: "Failed to load darshan bookings" });
  }
};

// This is now deprecated - bookings are auto-confirmed
const confirmDarshan = async (req, res) => {
  try {
    res.status(400).json({ 
      message: "Darshan bookings are now automatically confirmed upon submission" 
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({ message: "Operation not supported" });
  }
};

export {
  bookDarshan,
  getAllDarshan,
  confirmDarshan
};
