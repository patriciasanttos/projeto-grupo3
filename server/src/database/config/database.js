require('dotenv').config();

const db = {
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT),
  name: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD
}

/* Conexão usando as credenciais .env (postgres local ou staging)
const dbConfig = {
  dialect: "postgres",
  host: db.host,
  port: db.port,
  username: db.user,
  password: db.password,
  database: db.name,
  define: {
    underscored: true,
    timestamps: false,
  },
  dialectOptions: {
    ssl: {
      require: true,
    },
  },
};*/

// Conexão usando sqlite (arquivo db local)
const dbConfig = {
  dialect: "sqlite",
  storage: "./src/database/database.sqlite",
};

module.exports = dbConfig;