import { Router } from "express";
import dotenv from "dotenv";
import { corsMiddle } from "../CORS/cors";

dotenv.config();
const router = Router();

router.get("/", corsMiddle, (req, res) => {
  res.send("I exist.")
});

/*
    CORS SECURITY ENABLED
*/

router.post("", corsMiddle, (req, res) => {
  res.send("Post /Main success")
});

router.put("", corsMiddle, (req, res) => {
  res.send("Put /Main success")
});

router.delete("", corsMiddle, (req, res) => {
  res.send("Delete /Main success")
});

export default router;
