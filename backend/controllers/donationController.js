const { getDonationsCollection, getDb } = require("../config/database");

// Add Donation
const addDonation = async (req, res) => {
  try {
    const { donationType, amount, paymentMethod, cardNumber, expiryDate, cvv, upiId } = req.body;

    if (!donationType || !amount || !paymentMethod) {
      return res.status(400).json({ message: "Donation type, amount, and payment method are required" });
    }

    const donationData = {
      donationType,
      amount: parseFloat(amount),
      paymentMethod,
      createdAt: new Date(),
    };

    if (paymentMethod === "card" && cardNumber && expiryDate && cvv) {
      donationData.cardNumber = cardNumber.replace(/\s/g, "").slice(-4);
      donationData.expiryDate = expiryDate;
    } else if (paymentMethod === "upi" && upiId) {
      donationData.upiId = upiId;
    }

    const donationsCollection = getDonationsCollection();
    const result = await donationsCollection.insertOne(donationData);

    res.status(201).json({
      message: "Donation recorded successfully",
      donationId: result.insertedId.toString(),
    });
  } catch (err) {
    console.error("❌ Error adding donation:", err);
    res.status(500).json({ message: "Failed to record donation" });
  }
};

// Get all Donations
const getAllDonations = async (req, res) => {
  try {
    const donationsCollection = getDonationsCollection();
    const donations = await donationsCollection.find().toArray();
    res.status(200).json(donations);
  } catch (err) {
    console.error("❌ Error fetching donations:", err);
    res.status(500).json({ message: "Failed to load donations" });
  }
};

// Add Donation Usage
const addDonationUsage = async (req, res) => {
  try {
    const { purpose, amountSpent, date, description } = req.body;

    if (!purpose || !amountSpent || !date) {
      return res.status(400).json({ message: "Purpose, amount spent, and date are required" });
    }

    const db = getDb();
    const result = await db.collection("donationUsage").insertOne({
      purpose,
      amountSpent: parseFloat(amountSpent),
      date,
      description: description || "",
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Donation usage recorded successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error recording donation usage:", err);
    res.status(500).json({ message: "Failed to record donation usage" });
  }
};

// Get all Donation Usage
const getAllDonationUsage = async (req, res) => {
  try {
    const db = getDb();
    const usageRecords = await db.collection("donationUsage").find().toArray();
    res.status(200).json(usageRecords);
  } catch (err) {
    console.error("❌ Error fetching donation usage:", err);
    res.status(500).json({ message: "Failed to load donation usage records" });
  }
};

module.exports = {
  addDonation,
  getAllDonations,
  addDonationUsage,
  getAllDonationUsage
};
