import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import sqlite3 from "sqlite3";

const server = express();

const port = 5174;
const dbname = "database.db";

const db = new sqlite3.Database(dbname, (err) => {
    if (err) console.log(err)
})

db.run("CREATE TABLE IF NOT EXISTS users (user_id INTEGER PRIMARY KEY, login_id VARCHAR(30), password VARCHAR(30), tasks TEXT)")
db.run("CREATE TABLE IF NOT EXISTS session_id (session_id INTEGER(30), user_id INTEGER(3), expire_time INTEGER(30))")

server.use(express.json());
server.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET","POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],   
    credentials: true
}))
server.use(cookieParser())

server.get("/api/users/tasks", (req, res) => {
    if(req.cookies.session_id) {
        db.get("SELECT session_id, user_id, expire_time FROM session_id WHERE session_id = ?", [req.cookies.session_id], (error, rows) => {
            if(rows && rows.expire_time > Date.now()) {
                db.get('SELECT tasks FROM users WHERE user_id = ?', [String(rows.user_id)], (error, rows) => {
                    res.json(JSON.parse(rows.tasks));
                })
            } else {
                res.clearCookie("session_id", {
                    httpOnly: true
                })
                res.sendStatus(401);
            }
        })
    } else {
        res.sendStatus(401);
    }
})

server.post("/api/users/tasks", (req, res) => {
    if(req.cookies.session_id) {
        db.get("SELECT session_id, user_id, expire_time FROM session_id WHERE session_id = ?", [req.cookies.session_id], (error, rows) => {
            if(rows && rows.expire_time > Date.now()) {
                db.run("UPDATE users SET tasks = ? WHERE user_id = ?", [JSON.stringify(req.body), rows.user_id])
                res.sendStatus(200);
            } else {
                res.clearCookie("session_id", {
                    httpOnly: true
                })
                res.sendStatus(401);
            }
        })
    } else {
        res.sendStatus(401);
    }
})

server.post("/api/users/login", (req, res) => {
    const userInformation = req.body;
    db.get("SELECT login_id, password, user_id FROM users WHERE login_id = ?", [userInformation.userId], (error, rows) => {
        if(rows !== undefined) {
            if(rows.password === userInformation.password) {
                const session_id = Date.now();
                res.cookie("session_id", session_id, {maxAge: 60000, httpOnly: true});
                res.sendStatus(200);
                console.log(`Nouvelle connexion : ${userInformation.userId}`);
                db.run("INSERT INTO session_id (session_id, user_id, expire_time) VALUES (?, ?, ?)", [session_id, rows.user_id, session_id + 60000])
            }
            else {
                res.sendStatus(403);
            }
    }
    else {
        res.sendStatus(403);
    }
    })
})

server.post("/api/users/signup", (req, res) => {
    const userInformation = req.body;
    db.all("SELECT login_id FROM users WHERE login_id = ?", [userInformation.userId], (error, rows) => {
        let checkStatue = false;
        if(rows.length > 0) checkStatue = true;
        if (!checkStatue) {
            db.run(`INSERT INTO users (login_id, password, tasks) VALUES (?, ?, ?)`, [userInformation.userId, userInformation.password, JSON.stringify([])]);
            console.log(`Nouveau compte : ${userInformation.userId}`);
            res.sendStatus(201);
        } else {
            res.sendStatus(409);
        }
    })
})
    
server.listen(port, (error) => {
    if(error) console.log(error);
    else console.log(`Serveur lancé sur http://localhost:${port}`);
})