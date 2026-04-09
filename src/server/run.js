import fs from "fs"
import { db } from "./connect.js";
import dotenv from "dotenv";
dotenv.config();
const sql = fs.readFileSync("./src/server/init.sql", "utf-8");

async function run() {
   await db.query(sql) 
}
run();