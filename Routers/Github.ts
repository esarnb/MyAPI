import { Router } from "express";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

router.get("/", (req, res) => {
  res.send("route /github")
})

router.get('/repos', async (req, res) => {
  fetch("https://api.github.com/users/esarnb/repos?per_page=100", { 
    headers: { "Authentication": process.env.gtoken, "User-Agent": "Sick App" }
  }).then(x => x.json()).then(data => {
    res.json(data);
  });
});

export default router;
