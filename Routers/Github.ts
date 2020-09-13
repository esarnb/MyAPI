import express, { Router } from "express";
import curl from "curl"; 
import Github from "../Models/GithubModel";
import config from "../config";

const router = Router();

let { token } = config.mongoGithub;

router.get("/", (req, res) => {
  res.send("route /github")
})

router.get('/repos', async (req, res) => {
  
    // Github.find({}, (err, data) => {
    //     if (err) return res.send(err)
    //     if (data.length) res.send(data)
    //     else res.send("No data")
    // })

// });


  Github.find({}, (err, data) => {
    if (err) return res.send(err);
    if (!data) return res.send("No Data")
    let currentDate = new Date().getTime(), repoDate = null, nextDate = null;
    
    if (data.length) {
      repoDate = data[0].toObject().lastServerUpdate;
      nextDate = repoDate.setHours( repoDate.getHours() + 1 );
    }
    if ((currentDate > nextDate) || !data.length) {
      Github.deleteMany({}, (err) => {
        if (err) return res.send(err)
        
        curl.get("https://api.github.com/users/esarnb/repos", { headers: { "Authentication": token, "User-Agent": "Sick App" }}, async (err, resp, body) => { 
          if (err) return res.send(err);
          if (!body) return res.send("No body");
          body = JSON.parse(body);
          for (let x of body) {
            let repos = await new Github({
              title: x.name,
              desc: x.description,
              b1: {
                  link: x.html_url,
                  name: "Repo"
              },
              b2: {
                  link: `https://esarnb.github.io/${x.name}/`,
                  name: "Live"
              },
              img: {
                  link: x.imgURL ? x.imgURL : x.owner.avatar_url, 
                  title: x.name
              },
              hasPage: x.has_pages,
              lastRepoUpdate: x.updated_at,
              lastServerUpdate: currentDate
            })
            await repos.save();
          }
  
          Github.find({}, (err, data) => {
            if (err) res.send(err);
            if(data.length) res.json(data);
          });

        })

      })
      
    } else return res.json(data)
  })
});

export default router;
