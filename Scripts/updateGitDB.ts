import axios from "axios";
import dotenv from "dotenv";
import { gitRepos } from "../Types/gitTypes";
dotenv.config();
// const au = "token " + process.env.gtoken;
const { host, user, pass, db, dialect } = process.env;

export function updateGitDB(allRepos: gitRepos[]) {
    // post all repos to db with unique id
    // on unique id duplicate, update the record
}