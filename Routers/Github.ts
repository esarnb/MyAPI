import { Router } from "express";
// import axios from "axios";
import dotenv from "dotenv";
import { gitRepos } from "../Types/gitTypes";
import GHRepo from "../Sequelize/Models/GithubModel";
dotenv.config();

// Form new Model<gitRepos> interface
interface GHRepoI<gitRepos> {};

const router = Router();

router.get("/", (req, res) => {
  res.send("route /github");
});

router.get('/repos', async (req, res) => {
  let repos: GHRepoI<gitRepos[]> = await GHRepo.findAll();
  res.json(repos);
});

// router.post("/add", (req, res) => {
//   res.send("Post /DB")
// });

// router.put("/edit", (req, res) => {
//   res.send("Put /DB")
// });

// router.delete("/delete", (req, res) => {
//   res.send("Delete /DB")
// });


export default router;