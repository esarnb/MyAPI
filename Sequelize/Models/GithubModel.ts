import { BuildOptions, DataTypes, Model, Optional } from 'sequelize'
import sequelizeConnection from '../config'
import { gitRepos } from "../../Types/gitTypes";

class GHRepo extends Model<gitRepos> {}

export default GHRepo.init({
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: 'column'
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