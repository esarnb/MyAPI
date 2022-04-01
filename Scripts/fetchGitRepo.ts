import axios from "axios";
import dotenv from "dotenv";
import GHRepo from "../Sequelize/Models/GithubModel";
import { updateGitDB } from "../Scripts/updateGitDB";
import { gitRepos } from "../Types/gitTypes";
dotenv.config();
const au = "token " + process.env.gtoken;

export function fetchGitRepo() {

    let limit:Number = 5000, remaining: Number = limit, reset: number | Date = new Date(), updated: string = "";
    let lastUpdatedGitDB: Date = getLastRepoUpdate()

    const fetchData = async () => {
        if (remaining !== 5000 && remaining < 2) clearInterval(githubInterval);
        
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
            reset = +headers["x-ratelimit-reset"];
            console.log(limit, remaining, updated, new Date(1000 * reset).toLocaleString());
                        
            let data = response.data;
            let gitResult: gitRepos[] = data.map( async (record: any) => {
                return {
                    name: record.name, 
                    repo: record.html_url, 
                    live: record.homepage ?? record.homepage, 
                    updated: new Date(record.pushed_at),
                    language: [record.languages_url]
                }
            });
            
            let changedRepos: gitRepos[] = gitResult.filter((repo: gitRepos) => repo.updated > lastUpdatedGitDB);
            let updatedLangRepos: gitRepos[] = changedRepos.map( (repo: gitRepos) => {
                getLangs(repo.language).then((res) => repo.language = res);
                return repo;
            });

            lastUpdatedGitDB = new Date();
            updateGitDB(updatedLangRepos);
            
            // setup auto refresh
        } catch (err: any) {
            console.error(err.message.includes("status code 304") ? "Unchanged Response" : err); // 304 etag unchanged
        }

    }

    const githubInterval = setInterval(fetchData, 6e4);

}

async function getLangs(langURL: string[]): Promise<string[]> {
    return new Promise( async (resolve, reject) => {
        try {
            let response = await axios.get(langURL[0], { headers: { Authorization: au } });
            let data = response.data;
            let filtered: string[] = data.map( (x: string[]) => Object.keys(x) );
            console.log(filtered);
            resolve(filtered);
        } catch (err: any) {
            console.error(err);
            reject(err);
        }
    });  
}

function getLastRepoUpdate(): Date {
    // GHRepo.findBy
    return new Date();
}