import axios from "axios";
import dotenv from "dotenv";
import { updateGitDB } from "../Scripts/updateGitDB";
import { gitRepos } from "../Types/gitTypes";
dotenv.config();
const au = "token " + process.env.gtoken;

export function fetchGitRepo() {

    let limit = 5000, remaining = null, reset = null, updated = null;

    const fetchData = async () => {
        if (remaining && remaining < 2) clearInterval(githubInterval);
        
        try {
            let response = await axios.get("https://api.github.com/users/esarnb/repos?per_page=100", {
                headers: {
                    Authorization: au,
                    "If-None-Match": updated
                }
            });

            let headers = response.headers
            updated = headers["etag"]; //etag id
            limit = +headers["x-ratelimit-limit"];
            remaining = +headers["x-ratelimit-remaining"];
            reset = new Date(headers["x-ratelimit-reset"]);
            console.log(limit, remaining, updated, reset);
            console.log(limit, remaining);
            
            let data = response.data;

            let gitResult: gitRepos[] = data.map(record => {
                return {
                    name: record.name, 
                    repo: record.html_url, 
                    live: record.homepage ?? record.homepage, 
                    updated: new Date(record.pushed_at),
                    language: [record.language]
                }
            });

            updateGitDB(gitResult);
            
            // setup auto refresh
        } catch (err: any) {
            console.error(err.message.includes("status code 304") ? "Unchanged Response" : err); // 304 etag unchanged
        }

    }

    const githubInterval = setInterval(fetchData, 6e3);

}
