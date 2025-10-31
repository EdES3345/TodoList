import express from "express";
import sqlite3 from "sqlite3";
const server = express();

const port = 5174;
const dbname = "database.db";

const db = new sqlite3.Database(dbname, (err) => {
    if (err) console.log(err)
    else console.log(`Base de données configuré sur ${dbname}`)
})

db.run("CREATE TABLE IF NOT EXISTS users (user_id VARCHAR(3), login_id VARCHAR(30), password VARCHAR(30), tasks TEXT)")


server.listen(port, () => {
    console.log(`Serveur lancé sur http://localhost:${port}`)
    
})