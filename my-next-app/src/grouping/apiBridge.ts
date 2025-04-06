import express from "express";
import { connectToDatabase } from "./back-end/database.back-end";
import { fetchDataFromMongo, storeDataInMongo } from "./back-end/mongo.back-end";  // Placeholder imports

const app = express();
const port = 3000;

app.use(express.json());

//declare functions
const processingFunction = (query: any) => {
  const data = await fetchDataFromMongo(collectionName, query);
  console.log("Processing data:", data);
  return data; // Return processed data
};

// Wait for the database connection before starting the server
connectToDatabase()
  .then(() => {
    // MongoDB connected, define API routes
    app.post("/api/storeData", async (req, res) => {
      try {
        const { collectionName, document } = req.body;
        const result = await storeDataInMongo(collectionName, document);  // Placeholder for storing logic
        res.status(200).json({ message: "Data stored successfully", result });
      } catch (error) {
        console.error("Error storing data:", error);
        res.status(500).json({ error: "Failed to store data" });
      }
    });

    app.post("/api/fetchData", async (req, res) => {
      try {
        const { collectionName, query } = req.body;
        const data = await fetchDataFromMongo(collectionName, query);  // Placeholder for fetch logic
        res.status(200).json({ data });
      } catch (error) {
        console.error("Error fetching data:", error);
        res.status(500).json({ error: "Failed to fetch data" });
      }
    });

    app.post("/api/processData", async (req, res) => {
      try {
        const { data } = req.body;
        const processedData = processingFunction(data);  // Placeholder for your algorithm
        res.status(200).json({ processedData });
      } catch (error) {
        console.error("Error processing data:", error);
        res.status(500).json({ error: "Failed to process data" });
      }
    });

    // Start the server after database connection
    app.listen(port, () => {
      console.log(`Server started at http://localhost:${port}`);
    });
  })
  .catch((error: Error) => {
    console.error("Database connection failed", error);
    process.exit(1);
  });

  