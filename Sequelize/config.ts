import { Dialect, Sequelize } from 'sequelize'
import dotenv from "dotenv";
dotenv.config();
const { host, user, pass, dbname, dialect } = process.env;

const sequelizeConnection = new Sequelize(
  dbname as string, 
  user as string, 
  pass as string, 
  {
    host: host as string,
    dialect: dialect as Dialect
  });

export default sequelizeConnection