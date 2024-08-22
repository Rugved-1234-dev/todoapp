import mongoose from "mongoose";


export const dbConnection = async () => {
  try {
    console.log(process.env.DB_URL)
    const dbConnectionInstance = await mongoose.connect(
      `${process.env.DB_URL}`
    );
    console.log(
      `The database has connected!! DB HOSTED: ${dbConnectionInstance.connection.host}`
    );
  } catch (error) {
    console.log("The DB Connection Failed:", error);
    process.exit(1);
  }
};