import { ObjectId } from "mongodb";
import { getPoojasCollection } from "../config/database.js";

// Create new pooja record in database
const addPooja = async (req, res) => {
  try {
    const { name, date, time, thingsNeeded } = req.body;

    // Validate required fields for pooja creation
    if (!name || !date || !time) {
      return res.status(400).json({ message: "Name, date, and time are required" });
    }

    // Insert pooja record with optional things needed
    const poojasCollection = getPoojasCollection();
    const result = await poojasCollection.insertOne({
      name,
      date,
      time,
      thingsNeeded: thingsNeeded || "",
    });

    res.status(201).json({ message: "Pooja added successfully", id: result.insertedId });
  } catch (err) {
    console.error("Error adding pooja:", err);
    res.status(500).json({ message: "Failed to add pooja" });
  }
};

// Retrieve all pooja records from database
const getAllPoojas = async (req, res) => {
  try {
    const poojasCollection = getPoojasCollection();
    const poojas = await poojasCollection.find().toArray();
    res.status(200).json(poojas);
  } catch (err) {
    console.error("Error fetching poojas:", err);
    res.status(500).json({ message: "Failed to load poojas" });
  }
};

// Fetch specific pooja details by ID
const getPoojaById = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate ObjectId format before database query
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pooja ID" });
    }

    // Search for pooja by ID in database
    const poojasCollection = getPoojasCollection();
    const pooja = await poojasCollection.findOne({ _id: new ObjectId(id) });

    // Return 404 if pooja not found
    if (!pooja) {
      return res.status(404).json({ message: "Pooja not found" });
    }

    res.status(200).json(pooja);
  } catch (err) {
    console.error("Error fetching pooja by ID:", err);
    res.status(500).json({ message: "Failed to fetch pooja details" });
  }
};

// Delete specific pooja by ID
const deletePooja = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate pooja ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pooja ID" });
    }

    const poojasCollection = getPoojasCollection();
    const result = await poojasCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Pooja not found" });
    }

    res.status(200).json({ message: "Pooja deleted successfully" });
  } catch (err) {
    console.error("Error deleting pooja:", err);
    res.status(500).json({ message: "Failed to delete pooja" });
  }
};

// Auto-delete expired poojas
const deleteExpiredPoojas = async (req, res) => {
  try {
    const poojasCollection = getPoojasCollection();
    const today = new Date().toISOString().split('T')[0];
    
    const result = await poojasCollection.deleteMany({
      date: { $lt: today }
    });

    res.status(200).json({ 
      message: `Deleted ${result.deletedCount} expired poojas`,
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error("Error deleting expired poojas:", err);
    res.status(500).json({ message: "Failed to delete expired poojas" });
  }
};

// Export all pooja controller functions
export {
  addPooja,
  getAllPoojas,
  getPoojaById,
  deletePooja,
  deleteExpiredPoojas
};
