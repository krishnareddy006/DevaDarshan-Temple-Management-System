import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config({ path: "./config.env" });

// Main function to connect to MongoDB and list all collections
async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);

    // Connect to MongoDB and retrieve collection names
    try {
        await client.connect();
        const collections = await client.db("temple").collections();
        collections.forEach((collection) => 
            console.log(collection.s.namespace.collection)
        );
    } catch (e) {
        console.error(e);
    }
    // Ensure database connection is closed after operations
    finally{
        await client.close()
    }
}

// Execute the main function
main();

// Export main function for use in other modules
export { main };
