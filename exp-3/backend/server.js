const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "auth_db",
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  const sql =
    "SELECT role FROM users WHERE username=? AND password=?";

  db.query(sql, [username, password], (err, result) => {
    if (result.length > 0) {
      res.send({ role: result[0].role });
    } else {
      res.send({ role: "none" });
    }
  });
});

app.listen(5000, () =>
  console.log("Server running on port 5000")
);
