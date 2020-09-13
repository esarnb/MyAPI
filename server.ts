import express from "express"; // Express API for serving data and files
import vhost from "vhost"; // Handle subdomain routing
import helmet from "helmet"; // Adds additional http headers, used in serving images
import compression from "compression"; // Compress response bodies
import "colors";

import config from "./config";

// Subdomain serving files [Routers]
import API from "./Domains/API";
import Pics from "./Domains/Pics";

// initializing express and middleware
const app = express();
app.use(helmet());
app.use(compression());

// Logs out all express interaction
app.use((req, res, next) => {
  console.log(`PATH: ${req.path}`);
  next();
});

// Main domain root page (api.esarnb.com and pics.esarnb.com)
app.get("/", (req, res) => {
  res.send(" redirect https://esarnb.com/");
});

app.use(vhost("api.esarnb.com", API));
app.use(vhost("pics.esarnb.com", Pics));

app.listen(config.port, () => {
  console.log(`App listening on port ${config.port}`.green);
});
