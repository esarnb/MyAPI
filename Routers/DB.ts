import { Router } from "express";
import dotenv from "dotenv";

const {host, user, pass, db, dialect}: any = dotenv.config();
const router = Router();

/* Log into DB */
const { Sequelize } = require('@sequelize/core');

// // Option 1: Passing a connection URI
// const sequelize = new Sequelize('sqlite::memory:') // Example for sqlite
// const sequelize = new Sequelize('postgres://user:pass@example.com:5432/dbname') // Example for postgres

// // Option 2: Passing parameters separately (sqlite)
// const sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: 'path/to/database.sqlite'
// });

// // Option 3: Passing parameters separately (other dialects)
// const sequelize = new Sequelize('database', 'username', 'password', {
//   host: 'localhost',
//   dialect: 'mysql'
// });

router.get("/repos", (req, res) => {
  res.json({records: "db records"})
});

router.post("", (req, res) => {
  res.send("Post /DB")
});

router.put("", (req, res) => {
  res.send("Put /DB")
});

router.delete("", (req, res) => {
  res.send("Delete /DB")
});

export default router;
