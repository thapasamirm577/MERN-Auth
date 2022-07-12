import { Sequelize } from "sequelize";
const database = "firstTestSqlze";
const username = "root";
const password = "YourPassword";
const sequelize = new Sequelize(database, username, password, {
    host: "localhost",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000,
    },
});

export default sequelize;

export const dbInit = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        console.log("Connection has been established successfully.");
    } catch (error) {
        console.log("Connection has not been established." + error);
    }
};
