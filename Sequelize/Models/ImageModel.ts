// import mongoose from "mongoose";
// import config from "../config";
// import "colors";

// let { user, pwd, db } = config.mongoPics;
// let conn = mongoose.createConnection(`mongodb://${ user }:${ pwd }@localhost/${ db }`, 
// { useNewUrlParser: true, useFindAndModify: true, useUnifiedTopology: true })

// conn.on('connected', () => {
//   console.log('Connected to picsDB'.blue);
// });

// conn.on('connecting', () => {
//   console.log('Connecting to picsDB'.yellow);
// });

// conn.on('disconnected', () => {
//   console.log('Disconnected from picsDB'.red);
// });

// const ImageSchema = new mongoose.Schema({
//   name: String,
//   type: String,
//   file: Buffer,
// });

// export = conn.model("screenshots", ImageSchema);
