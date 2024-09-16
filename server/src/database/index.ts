import { Sequelize } from "sequelize";

/* Conexão usando as credenciais .env (postgres local ou staging)
//import dbConfig from "./config/database"

const connection = new Sequelize(String(dbConfig.database), String(dbConfig.username), dbConfig.password, {
    dialect: 'postgres',
    host: dbConfig.host,
    port: dbConfig.port,
    define: dbConfig.define,
    logging: false,
    dialectOptions: {
        ssl: {
          require: true,
        },
      }
})*/

// Conexão usando sqlite (arquivo db local)
const connection = new Sequelize({
  dialect: "sqlite",
  storage: "./src/database/database.sqlite",
});

export default connection;