import { Router } from "express";
import dotenv from "dotenv";
import axios from "axios";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("route /github");
});

router.get('/repos', async (req, res) => {
  let resp = await axios.get("http://localhost:4242/db/repos");
  console.log(resp.data)
  res.json(resp.data)
});

export default router;