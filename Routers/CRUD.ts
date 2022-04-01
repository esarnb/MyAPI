import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("", (req, res) => {
  res.send("Get /Main success")
});

router.post("", (req, res) => {
  res.send("Post /Main success")
});

router.put("", (req, res) => {
  res.send("Put /Main success")
});

router.delete("", (req, res) => {
  res.send("Delete /Main success")
});

export default router;
