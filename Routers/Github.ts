import { Router } from "express";
// import axios from "axios";
import dotenv from "dotenv";
import { corsMiddle } from "../CORS/cors";
import { gitRepos } from "../Types/gitTypes";
import GHRepo from "../Sequelize/Models/GithubModel";
dotenv.config();

// Form new Model<gitRepos> interface.
interface GHRepoI<gitRepos> {};

const router = Router();

/*
    CORS SECURITY ENABLED
*/
router.get('/repos', corsMiddle, async (req, res) => {
  let repos: GHRepoI<gitRepos[]> = await GHRepo.findAll();
  res.json(repos);
});

export default router;