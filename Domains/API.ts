import express, { Router } from "express"; // Express Router for grouping different pages
import mongoose from "mongoose";
import config from "../config";
import cors from "cors";
import "colors";

//API Routers
import GithubRouter from "../Routers/Github"; 
// import DiscordRouter from "../Routers/Discord"; 
// import picsRouter from "../Routers/Pics"; 

const app = express();
// const router = Router();
app.use(cors());


// =  =  =  =  =  =  =  =  =  =  Github  =  =  =  =  =  =  =  =  =  = //
app.use("/github", GithubRouter); 

// =  =  =  =  =  =  =  =  =  =  Discord  =  =  =  =  =  =  =  =  =  = //
// app.use("/discord", DiscordRouter); 

// app.use(router); // package above as API router

export default app;
