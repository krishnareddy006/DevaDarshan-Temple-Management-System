import { ObjectId } from "mongodb";
import { getEventsCollection } from "../config/database.js";

// Create new event record in database
const addEvent = async (req, res) => {
  try {
    const { title, date, description } = req.body;

    // Validate required fields for event creation
    if (!title || !date || !description) {
      return res.status(400).json({ message: "Title, date, and description are required" });
    }

    // Insert event record with timestamp
    const eventsCollection = getEventsCollection();
    const result = await eventsCollection.insertOne({
      title,
      date,
      description,
      createdAt: new Date(),
    });

    res.status(201).json({ message: "Event added successfully", id: result.insertedId });
  } catch (err) {
    console.error("Error adding event:", err);
    res.status(500).json({ message: "Failed to add event" });
  }
};

// Retrieve all events from database
const getAllEvents = async (req, res) => {
  try {
    const eventsCollection = getEventsCollection();
    const events = await eventsCollection.find().toArray();
    res.status(200).json(events);
  } catch (err) {
    console.error("Error fetching events:", err);
    res.status(500).json({ message: "Failed to load events" });
  }
};

// Delete specific event by ID
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    // Validate event ID format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid event ID" });
    }

    const eventsCollection = getEventsCollection();
    const result = await eventsCollection.deleteOne({ _id: new ObjectId(id) });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Event not found" });
    }

    res.status(200).json({ message: "Event deleted successfully" });
  } catch (err) {
    console.error("Error deleting event:", err);
    res.status(500).json({ message: "Failed to delete event" });
  }
};

// Auto-delete expired events
const deleteExpiredEvents = async (req, res) => {
  try {
    const eventsCollection = getEventsCollection();
    const today = new Date().toISOString().split('T')[0];
    
    const result = await eventsCollection.deleteMany({
      date: { $lt: today }
    });

    res.status(200).json({ 
      message: `Deleted ${result.deletedCount} expired events`,
      deletedCount: result.deletedCount 
    });
  } catch (err) {
    console.error("Error deleting expired events:", err);
    res.status(500).json({ message: "Failed to delete expired events" });
  }
};

// Export all event controller functions
export {
  addEvent,
  getAllEvents,
  deleteEvent,
  deleteExpiredEvents
};
