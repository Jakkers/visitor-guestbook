import { db } from "./server.js";

//create table in database
// date, name, email, comment
db.query(`CREATE TABLE IF NOT EXISTS visitor_information(
    id SERIAL PRIMARY KEY,
    Date DATE,
    Name VARCHAR(255),
    Email VARCHAR(320),
    Comment TEXT
)`);
