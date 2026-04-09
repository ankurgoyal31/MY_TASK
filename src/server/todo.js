import express from "express";
import dotenv from "dotenv";
import cors from "cors"
dotenv.config();
import { db } from "./connect.js";

const app = express();
app.use(express.json());
app.use(cors())

// create Task
app.post("/create_tasks", async (req, res) => {
  try {
    if (!req.body.title ||req.body.title.trim() === "") {
      return res.status(400).json({ message: "Title is required" });
    }
    const [result] = await db.query("INSERT INTO tasks (task,userId,complete) VALUES (?,?,?)",[req.body.title,req.body.userId,false]);
    res.status(201).json({success:true});
  } catch (err) {
    console.log(err)
    res.status(500).json({ message: err.message });
  }   
});   
      
//get task by user

 app.get("/tasks", async (req, res) => {
  try {
    console.log(req.query.id)
    const [task] = await db.query("SELECT * FROM tasks WHERE userId = ?",[req.query.userId]);
    res.status(200).json(task);     
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});

// mark complete 
 app.patch("/tasks/:id/complete", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT * FROM tasks WHERE id=? AND userId=?", [req.params.id, req.body.userId]);
if (rows.length === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
  await db.query("UPDATE tasks SET complete = NOT complete WHERE id=? AND userId=?",[req.params.id, req.body.userId]);
   res.json({ message: "toggled" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// update task
 app.patch("/tasks/:id/update", async (req, res) => {
  try {
    const [result] = await db.query("UPDATE tasks SET task=? WHERE id=? AND userId=?",[req.body.title, req.params.id,req.body.userId]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
    res.status(200).json({ message: "Task updated" });
  } catch (err) {
     res.status(500).json({ message: err.message });
   }
});

//delete task
 app.delete("/tasks/:id/delete", async (req, res) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id=? AND userId=?", [req.params.id,req.body.userId]);
 
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Task not found" });
    }
     res.status(200).json({ message: "Task deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  } 
});


app.listen(3000, () => {
  console.log("Server running on port 3000");
}); 