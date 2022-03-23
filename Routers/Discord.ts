import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("Get /discord")
})

router.get('/repos', async (req, res) => {
  fetch("bot socket").then(x => x.json()).then(data => {
    res.json(data);
  });
});

export default router;
