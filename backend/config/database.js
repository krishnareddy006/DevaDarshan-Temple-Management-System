import dotenv from "dotenv";
dotenv.config({ path: "./.env" });
import { MongoClient } from "mongodb";

const uri = process.env.ATLAS_URI;

// Check if MongoDB URI is defined in environment variables
if (!uri) {
  console.error("ATLAS_URI is not defined in .env file");
  process.exit(1);
}

const client = new MongoClient(uri);

// Database and collection variables
let db;
let usersCollection;
let poojasCollection;
let accommodationsCollection;
let donationsCollection;
let adminsCollection;
let darshanCollection;
let eventsCollection;
let feedbackCollection;
let membershipCollection;

// Connect to MongoDB and initialize database collections
async function connectDB() {
  try {
    await client.connect();
    db = client.db("Temple");
    usersCollection = db.collection("users");
    poojasCollection = db.collection("poojas");
    accommodationsCollection = db.collection("accommodations");
    donationsCollection = db.collection("donations");
    adminsCollection = db.collection("admins");
    darshanCollection = db.collection("darshan");
    eventsCollection = db.collection("events");
    feedbackCollection = db.collection("feedback");
    membershipCollection = db.collection("membership");
    console.log("MongoDB connected to 'Temple' database");
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

// Export database connection and collection getter functions
const getDb = () => db;
const getUsersCollection = () => usersCollection;
const getPoojasCollection = () => poojasCollection;
const getAccommodationsCollection = () => accommodationsCollection;
const getDonationsCollection = () => donationsCollection;
const getAdminsCollection = () => adminsCollection;
const getDarshanCollection = () => darshanCollection;
const getEventsCollection = () => eventsCollection;
const getFeedbackCollection = () => feedbackCollection;
const getMembershipCollection = () => membershipCollection;

// Export the functions
export {
  connectDB,
  getDb,
  getUsersCollection,
  getPoojasCollection,
  getAccommodationsCollection,
  getDonationsCollection,
  getAdminsCollection,
  getDarshanCollection,
  getEventsCollection,
  getFeedbackCollection,
  getMembershipCollection
};
