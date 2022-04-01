import { BuildOptions, DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { gitRepos } from "../../Types/gitTypes";

export class GHRepo extends Model<gitRepos> {
  // name: string
  // repo: string
  // live: string
  // updated: Date
  // language: Text
}

  export default GHRepo.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    repo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    live: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    updated: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    language: {
      type: DataTypes.TEXT,
      allowNull: true,
    }
  }, {
    sequelize: sequelizeConnection,
    timestamps: true, // localized createdAt, updatedAt props
    freezeTableName: true, // Model tableName will be the same as the model name
    paranoid: true
  });

  // GHRepo.beforeCreate(function(model, options) {
        
        // json stringify languages array
  // })
  


/*
        Mongoose Example
*/
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
