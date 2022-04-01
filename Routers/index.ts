import { Router } from "express"; // Express Router for grouping different pages
import cors from "cors";

//API Routers
import GithubRouter from "./Github"; 
import CRUD from "./CRUD"; 
// import DiscordRouter from "../Routers/Discord"; 
// import DBRouter from "./DB"; 

// const app = express();
const router = Router();
router.use(cors());

router.use("/", CRUD); 
router.use("/github", GithubRouter); 
// router.use("/db", DBRouter); 
// app.use("/discord", DiscordRouter); 

export default router;
