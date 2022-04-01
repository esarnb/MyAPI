import axios from "axios";
import GHRepo from "../Sequelize/Models/GithubModel";
import { gitRepos } from "../Types/gitTypes";

export function updateGitDB(allRepos: gitRepos[]) {
    // post all updated repos to db with unique id
    // on unique id duplicate, update the record
    GHRepo.bulkCreate(allRepos, {
        updateOnDuplicate: ["name"],
        individualHooks: true
    })
}