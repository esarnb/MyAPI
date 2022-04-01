import GHRepo from "../Sequelize/Models/GithubModel";
import { gitRepos } from "../Types/gitTypes";

export function updateGitDB(allRepos: gitRepos[]) {
    GHRepo.bulkCreate(allRepos, {
        updateOnDuplicate: ["name", "updated", "language"],
        individualHooks: true
    })
}