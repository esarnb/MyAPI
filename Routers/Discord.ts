import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("Get user status and call bot status");
})

export default router;
