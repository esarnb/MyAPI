


// import mongoose, { Schema } from "mongoose"; 
// import config from "../config";
// import "colors";

// let { user, pwd, db } = config.mongoGithub;
// let conn = mongoose.createConnection(`mongodb://${ user }:${ pwd }@localhost/${ db }`, 
// { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true })

// conn.on('connected', () => {
//   console.log('Connected to githubDB'.blue);
// });

// conn.on('connecting', () => {
//   console.log('Connecting to githubDB'.yellow);
// });

// conn.on('disconnected', () => {
//   console.log('Disconnected from githubDB'.red);
// });

// const GithubSchema = new Schema({
//   title: String,
//   desc: String,
//   live: String,
//   hasPage: Boolean,
//   lastRepoUpdate: Date,
//   lastServerUpdate: Date,
//   img: {
//       link: String,
//       name: String,
//   },
//   b1: {
//     link: String,
//     name: String,
//   },
//   b2: {
//     link: String,
//     name: String,
//   },
// });

// export = conn.model("repositories", GithubSchema);
