import express from "express"; // Express API for serving data and files
import vhost from "vhost"; // Handle subdomain routing
import helmet from "helmet"; // Adds additional http headers, used in serving images
import compression from "compression"; // Compress response bodies
import "colors";

// Subdomain serving files [Routers]
import index from "./Routers";
// import Pics from "./Routers/Pics";
// import Discord from "./Routers/Discord";

// initializing express and middleware
const PORT = 4242;
const app = express();
app.use(helmet());
app.use(compression());

// Logs out all express interaction
app.use((req, res, next) => {
  console.log(`PATH: ${req.path}`);
  next();
});

app.use(index)

// app.use(vhost("api.esarnb.com", API));
// app.use(vhost("pics.esarnb.com", Pics));
// app.use(vhost("economysf.esarnb.com", Discord));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`.green);
});
