// import sequelize models
import GHRepo from "./Models/GithubModel";

/*
  The sync method accepts the force and alter options. 
  The force option forces the recreation of a table. 
  The alter option creates the table if it does not exist or 
  updates the table to match the attributes defined in the model.

  Reserve using force or alter for development environments 
  so you don’t accidentally recreate your production database, 
  losing all your data or applying changes to your
  database that might break your application.

  > I want: force false, alter true, then switch both to false when done
 */
  // const isDev = process.env.NODE_ENV === 'development'
  const isDev = true;

const dbInit = () => {
  GHRepo.sync({ alter: isDev });
};
export default dbInit 