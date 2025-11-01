import express from "express";
import sqlite3 from "sqlite3";
const server = express();

const port = 5174;
const dbname = "database.db";

const db = new sqlite3.Database(dbname, (err) => {
    if (err) console.log(err)
    else console.log(`Base de données configuré sur ${dbname}`)
})

db.run("CREATE TABLE IF NOT EXISTS users (user_id NUMBER(30), login_id VARCHAR(30), password VARCHAR(30), tasks TEXT)")

server.use(express.json());

server.options("/api/user", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    res.sendStatus(200);
});

server.post("/api/user", (req, res) => {
    res.header("Access-Control-Allow-Origin", "http://localhost:5173");
    res.header("Access-Control-Allow-Methods", "POST, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Content-Type");
    const userInformation = req.body;
        db.run(`INSERT INTO users (user_id, login_id, password, tasks) VALUES (?, ?, ?, ?)`, [String(Date.now()), String(userInformation.userId), String(userInformation.password), "[]"]);
        res.sendStatus(201)
        console.log(`Nouveau compte : ${userInformation.userId}`);
})

server.listen(port, (error) => {
    if(error) console.log(error);
    else console.log(`Serveur lancé sur http://localhost:${port}`);
})