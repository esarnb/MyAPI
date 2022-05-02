import express from "express"; // Express API for serving data and files
import sequelizeInit from "./Sequelize/init";
// import cookieSession from 'cookie-session';

// Subdomain serving files [Routers]
import index from "./Routers";

// import automatic polling scripts
import { fetchGitRepo } from "./Scripts/fetchGitRepo";

// init sequelize
sequelizeInit();

// execute scripts
// fetchGitRepo()
(async () => await fetchGitRepo())();

// initializing express and middleware
const PORT = 4242;
const app = express();

// Logs out all express interaction
app.use((req, res, next) => {
  console.log(`PATH: ${req.path}`);
  next();
});

app.use(index);

// let options = {
//   maxAge: 24 * 60 * 60 * 1000 // 24 hours
// }
// app.use(cookieSession(options));
// app.use(function (req, res, next) {
//   if (req?.sessionOptions?.maxAge && req?.session?.maxAge)
//   req.sessionOptions.maxAge = req.session.maxAge || req.sessionOptions.maxAge
// });

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
