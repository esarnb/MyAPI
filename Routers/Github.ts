import { Router } from "express";
import axios from "axios";
import dotenv from "dotenv";
dotenv.config();
const router = Router();

const au = "token " + process.env.gtoken;

router.get("/", (req, res) => {
  res.send("route /github");
});

router.get('/repos', async (req, res) => {
  res.json({records: "db records"})
});

router.get('/langs', (req, res) => {
  let limit = 5000, remaining = null, reset = null, updated = null;

  const fetchData = async () => {
    try {
        let response = await axios.get("https://api.github.com/users/esarnb/repos?per_page=100", {
            headers: {
                Authorization: au,
                "If-None-Match": updated
            }
        });

        // // "languages_url": "https://api.github.com/repos/esarnb/Bamazon/languages",
        // let languages = await axios.get("https://api.github.com/repos/esarnb/Bamazon/languages")
        

        let headers = response.headers
        updated = headers["etag"]; //etag id
        limit = +headers["x-ratelimit-limit"];
        remaining = +headers["x-ratelimit-remaining"];
        reset = new Date(headers["x-ratelimit-reset"]);
        console.log(limit, remaining, updated, reset);
        console.log(limit, remaining);
        
        // setup auto refresh
    } catch (err: any) {
        console.error(err.message); // 304 etag unchanged
        
        
        axios.get("https://api.github.com/rate_limit", {
            headers: {
                Accept: "application/vnd.github.v3+json",
                Authorization: au,
            }
        }).then((res) => {
            // let headers = res.headers;
            let data = res.data;
            console.error(data.resources.core)
        })


    }
  }
})

router.post("/add", (req, res) => {
  res.send("Post /DB")
});

router.put("/edit", (req, res) => {
  res.send("Put /DB")
});

router.delete("/delete", (req, res) => {
  res.send("Delete /DB")
});


export default router;