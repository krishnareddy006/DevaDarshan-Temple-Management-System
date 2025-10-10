const { getEventsCollection } = require("../config/database");

// Add Event
const addEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    if (!title || !date || !description) {
      return res.status(400).json({ message: "Title, date, and description are required" });
    }

    const eventsCollection = getEventsCollection();
    const result = await eventsCollection.insertOne({
      title,
      date,
      description,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Event added successfully", id: result.insertedId });
  } catch (err) {
    console.error("❌ Error adding event:", err);
    res.status(500).json({ message: "Failed to add event" });
  }
};

// Get all Events
const getAllEvents = async (req, res) => {
  try {
    const eventsCollection = getEventsCollection();
    const events = await eventsCollection.find().toArray();
    res.status(200).json(events);
  } catch (err) {
    console.error("❌ Error fetching events:", err);
    res.status(500).json({ message: "Failed to load events" });
  }
};

module.exports = {
  addEvent,
  getAllEvents
};
