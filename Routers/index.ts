import { Router } from "express"; // Express Router for grouping different pages
import cors from "cors";
import "colors";

//API Routers
import GithubRouter from "./Github"; 
import CRUD from "./CRUD"; 
// import DiscordRouter from "../Routers/Discord"; 
// import PicsRouter from "../Routers/Pics"; 

// const app = express();
const router = Router();
router.use(cors());


// =  =  =  =  =  =  =  =  =  =  Main  =  =  =  =  =  =  =  =  =  = //
router.use("/", CRUD); 

// =  =  =  =  =  =  =  =  =  =  Github  =  =  =  =  =  =  =  =  =  = //
router.use("/github", GithubRouter); 

// =  =  =  =  =  =  =  =  =  =  Discord  =  =  =  =  =  =  =  =  =  = //
// app.use("/discord", DiscordRouter); 

// =  =  =  =  =  =  =  =  =  =  Pics  =  =  =  =  =  =  =  =  =  = //
// app.use("/pics", PicsRouter); 

export default router;
