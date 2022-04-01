import axios from "axios";
import dotenv from "dotenv";
import GHRepo from "../Sequelize/Models/GithubModel";
import { updateGitDB } from "../Scripts/updateGitDB";
import { gitRepos } from "../Types/gitTypes";
dotenv.config();
const au = "token " + process.env.gtoken;

export async function fetchGitRepo() {

    let limit:Number = 5000, remaining: Number = limit, reset: number | Date = new Date(), updated: string = "";
    
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
                        
            let data = response.data;
            let gitResult: gitRepos[] = data.map((record: any) => {
                return {
                    name: record.name, 
                    repo: record.html_url, 
                    live: record.homepage ?? record.homepage, 
                    updated: new Date(record.pushed_at),
                    language: [record.languages_url]
                }
            });
        
            let lastUpdatedGitDB: Date = await getLastRepoUpdate();    
            let changedRepos: gitRepos[] = gitResult.filter((repo: gitRepos) => {
                return repo.updated > lastUpdatedGitDB
            });

            var updatedLangRepos: gitRepos[] = await Promise.all(changedRepos.map(async (repo: gitRepos): Promise<gitRepos> => {
                let langs = await getLangs(repo.language);
                repo.language = langs;
                return repo;
            }));

            lastUpdatedGitDB = new Date();
            updateGitDB(updatedLangRepos);
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
            let languagesUsed: string[] = Object.keys(data);
            resolve(languagesUsed);
        } catch (err: any) {
            console.error(err);
            reject(err);
        }
    });  
}

async function getLastRepoUpdate(): Promise<Date> {
    let res: any = await GHRepo.findAll()
    if (!res.length) return new Date(0)
    else {
        res.sort((x: any, y: any) => y.updated - x.updated);
        return res[0].updated;
    }
};