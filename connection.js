const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();
app.use(cors());
const PORT = 3000;

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "March@1313",
  database: "todo",
  
});

// // // Execute SQL query to create a table
// pool.query(
//     `CREATE TABLE IF NOT EXISTS todos (
//       id INT AUTO_INCREMENT PRIMARY KEY,
//       title VARCHAR(255) NOT NULL,
//       description TEXT,
//       completed BOOLEAN NOT NULL DEFAULT false
//     )`,
//     (error, results, fields) => {
//       if (error) {
//         console.error("Error creating table:", error);
//         return;
//       }
//       console.log("Table 'todos' created successfully");
//     }
//   );

// Middleware to parse JSON bodies
app.use(express.json());

// Route to fetch all tasks
app.get("/todos", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM todos");
    res.json(rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Route to add a new task
app.post("/todos", async (req, res) => {
  const { title } = req.body;
  try {
    await pool.query("INSERT INTO todos (title) VALUES (?)", [title]);
    res.sendStatus(200);
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
