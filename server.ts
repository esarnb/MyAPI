import express from "express"; // Express API for serving data and files
import sequelizeInit from "./Sequelize/init";

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


// app.use(vhost("api.esarnb.com", API));
// app.use(vhost("pics.esarnb.com", Pics));
// app.use(vhost("economysf.esarnb.com", Discord));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
