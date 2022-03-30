import axios from "axios";
import { gitRepos } from "../Types/gitTypes";

export function updateGitDB(allRepos: gitRepos[]) {
    // post all repos to db with unique id
    // on unique id duplicate, update the record
}