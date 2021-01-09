import express, { Router } from "express";
import curl from "curl"; 
import Github from "../Models/GithubModel";
import config from "../config";

const router = Router();

let { token } = config.mongoGithub;

router.get("/", (req, res) => {
  res.send("route /github")
})

export default router;
