const { MongoClient } = require("mongodb");

const uri = process.env.ATLAS_URI;

if (!uri) {
  console.error(" MONGODB_URI is not defined in .env file");
  process.exit(1);
}

const client = new MongoClient(uri);

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
    console.log(" MongoDB connected to 'Temple' database");
  } catch (err) {
    console.error(" MongoDB connection error:", err);
    process.exit(1);
  }
}

module.exports = {
  connectDB,
  getDb: () => db,
  getUsersCollection: () => usersCollection,
  getPoojasCollection: () => poojasCollection,
  getAccommodationsCollection: () => accommodationsCollection,
  getDonationsCollection: () => donationsCollection,
  getAdminsCollection: () => adminsCollection,
  getDarshanCollection: () => darshanCollection,
  getEventsCollection: () => eventsCollection,
  getFeedbackCollection: () => feedbackCollection,
  getMembershipCollection: () => membershipCollection
};
