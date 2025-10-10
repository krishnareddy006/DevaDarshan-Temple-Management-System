const { ObjectId } = require("mongodb");
const { getPoojasCollection } = require("../config/database");

// Add Pooja
const addPooja = async (req, res) => {
  try {
    const { name, date, time, thingsNeeded } = req.body;

    if (!name || !date || !time) {
      return res.status(400).json({ message: "Name, date, and time are required" });
    }

    const poojasCollection = getPoojasCollection();
    const result = await poojasCollection.insertOne({
      name,
      date,
      time,
      thingsNeeded: thingsNeeded || "",
    });

    res.status(201).json({ message: "Pooja added successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error adding pooja:", err);
    res.status(500).json({ message: "Failed to add pooja" });
  }
};

// Get all Poojas
const getAllPoojas = async (req, res) => {
  try {
    const poojasCollection = getPoojasCollection();
    const poojas = await poojasCollection.find().toArray();
    res.status(200).json(poojas);
  } catch (err) {
    console.error("❌ Error fetching poojas:", err);
    res.status(500).json({ message: "Failed to load poojas" });
  }
};

// Get Pooja by ID
const getPoojaById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid pooja ID" });
    }

    const poojasCollection = getPoojasCollection();
    const pooja = await poojasCollection.findOne({ _id: new ObjectId(id) });

    if (!pooja) {
      return res.status(404).json({ message: "Pooja not found" });
    }

    res.status(200).json(pooja);
  } catch (err) {
    console.error("❌ Error fetching pooja by ID:", err);
    res.status(500).json({ message: "Failed to fetch pooja details" });
  }
};

module.exports = {
  addPooja,
  getAllPoojas,
  getPoojaById
};
