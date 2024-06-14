//import packages
import express from "express";
import cors from "cors";
import pg from "pg";
import dotenv from "dotenv";

// assign app to use express
const app = express();

//assign express to use packages
app.use(cors());
app.use(express.json());

//configure dotenv
dotenv.config();

//Get supabase pg connection from dotenv file
const dbConnectionString = process.env.DATABASE_URL;

//initialise database and export for use in seed.js
export const db = new pg.Pool({
  connectionString: dbConnectionString,
});

//assign port
const PORT = 6868;
app.listen(PORT, () => {
  console.log(`Your server is running on port: ${PORT}`);
});

//create endpoint
app.get("/", (request, response) => {
  response.json({ message: "Insert roude joke here" });
});

//create another endpoint to read data from guestbook table
app.get("/visitor-information", async (request, response) => {
  const result = await db.query(`SELECT * FROM visitor_information`);
  response.json(result.rows);
});

// Now to insert into the client from the database
app.post("/visitor-information", async (request, response) => {
  const { date, name, email, comment } = request.body;

  try {
    await db.query(
      `INSERT into visitor_information (date,name,email,comment) VALUES ($1, $2, $3, $4)`,
      [date, name, email, comment]
    );
    response.status(200).json({ success: true });
  } catch (error) {
    console.log("Insert not working", error);
    response.status(500).json({ success: false });
  }
});
