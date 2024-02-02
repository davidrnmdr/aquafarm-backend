"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
require("dotenv/config");
exports.sequelize = new sequelize_1.Sequelize({
    logging: true,
    database: "aquafarm",
    username: "postgres",
    password: "aquafarm",
    host: "postgresql.cf4yiym6abpi.us-east-2.rds.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    ssl: false,
    dialectOptions: {
        ssl: {
            rejectUnauthorized: false,
        },
    },
});
async function test() {
    try {
        await exports.sequelize.authenticate();
        console.log("Connection has been established successfully.");
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
    }
}
test();
