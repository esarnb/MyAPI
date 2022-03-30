import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();
const { host, user, pass, dbname, dialect } = process.env;

export const db = mysql.createConnection({
  host: host,
  user: user,
  password: pass,
  database: dbname
});