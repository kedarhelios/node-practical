import { Dialect, Sequelize } from "sequelize";

export const dbName = process.env.DB_NAME!,
    dbUser = process.env.DB_USER!,
    dbHost = process.env.DB_HOST!,
    dbDriver = process.env.DB_DRIVER! as Dialect,
    dbPassword = process.env.DB_PASSWORD!,
    dbPort = parseInt(process.env.DB_PORT!, 10),
    sequelizeConnection = new Sequelize(dbName, dbUser, dbPassword, {
        host: dbHost,
        dialect: dbDriver,
        port: dbPort,
        logging: console.log,
    });

export default sequelizeConnection;
