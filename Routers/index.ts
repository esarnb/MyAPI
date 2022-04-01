import { Router } from "express"; // Express Router for grouping different pages
import cors from "cors";

//API Routers
import GithubRouter from "./Github"; 
import CRUD from "./CRUD"; 
// import DiscordRouter from "../Routers/Discord"; 

// const app = express();
const router = Router();
router.use(cors());

router.use("/", CRUD); 
router.use("/github", GithubRouter); 
// app.use("/discord", DiscordRouter); 

export default router;
