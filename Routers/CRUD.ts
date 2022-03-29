import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("", (req, res) => {
  res.send("Get /Main")
});

router.post("", (req, res) => {
  res.send("Post /Main")
});

router.put("", (req, res) => {
  res.send("Put /Main")
});

router.delete("", (req, res) => {
  res.send("Delete /Main")
});

export default router;
