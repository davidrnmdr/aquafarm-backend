import { Sequelize } from "sequelize";
require("dotenv/config");

export const sequelize = new Sequelize({
  logging: true,
  database: "aquafarm",
  username: "postgres",
  password: "aquafarm",
  host: "postgresql.cf4yiym6abpi.us-east-2.rds.amazonaws.com",
  port: 5432,
  dialect: "postgres",
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function test() {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
}

test();
