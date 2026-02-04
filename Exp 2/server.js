const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

app.use(express.json());
app.use(express.static("public"));

const FILE = "./tasks.json";

const read = () => {
  try {
    const data = fs.readFileSync(FILE, "utf8");
    return JSON.parse(data);
  } catch (err) {
    return { tasks: [] };
  }
};

const write = (data) => fs.writeFileSync(FILE, JSON.stringify(data, null, 2));

app.get("/tasks", (req, res) => {
  const data = read();
  res.json(data.tasks || []);
});

app.post("/tasks", (req, res) => {
  const { title, dueDate } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });

  const data = read();
  const newTask = {
    id: Date.now(),
    title,
    dueDate: dueDate || "No deadline",
    status: "pending"
  };

  data.tasks.push(newTask);
  write(data);
  res.status(201).json(newTask);
});

app.put("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const data = read();
  const taskIndex = data.tasks.findIndex((t) => t.id === taskId);

  if (taskIndex !== -1) {
    data.tasks[taskIndex] = { ...data.tasks[taskIndex], ...req.body };
    write(data);
    res.json(data.tasks[taskIndex]);
  } else {
    res.status(404).send("Task not found");
  }
});

app.delete("/tasks/:id", (req, res) => {
  const taskId = parseInt(req.params.id);
  const data = read();
  data.tasks = data.tasks.filter((t) => t.id !== taskId);
  write(data);
  res.sendStatus(204);
});

app.listen(3000, () => console.log("✅ Server running at http://localhost:3000"));
