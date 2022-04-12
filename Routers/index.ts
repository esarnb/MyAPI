import { Router } from "express"; // Express Router for grouping different pages
import cors from "cors";

//API Routers
import GithubRouter from "./Github"; 
import CRUD from "./CRUD"; 
// import DiscordRouter from "../Routers/Discord"; 

// const app = express();
const router = Router();
router.use(cors());

router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', ['http://localhost:3434', 'http://localhost:4242', 'http://localhost:3000']);

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    // res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

router.use("/", CRUD); 
router.use("/github", GithubRouter); 
// app.use("/discord", DiscordRouter); 

export default router;
