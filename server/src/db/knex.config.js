/** @format */

require("dotenv").config();

let DATABASE = process.env.database;
let STAGING_DATABASE = process.env.staging_database;
let SERVER_DATABASE = process.env.LOCAL_SERVER_DB;
let USERNAME = process.env.dbUserName;
let PASSWORD = process.env.dbPassword;

const dbSocketPath = process.env.DB_SOCKET_PATH || process.env.DB_PATH;
const CLOUD_SQL_CONNECTION_NAME = process.env.CLOUD_SQL_CONNECTION_NAME;

module.exports = {
  //development credentials
  development: {
    client: "pg",
    connection: SERVER_DATABASE,
    ssl: {
      rejectUnauthorized: false,
    },
    pool: {
      min: 0,
      max: 10,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  //staging credentials
  staging: {
    client: "pg",
    connection: {
      host: `${dbSocketPath}/${CLOUD_SQL_CONNECTION_NAME}`,
      user: USERNAME,
      password: PASSWORD,
      database: STAGING_DATABASE,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
  //production credentials
  production: {
    client: "pg",
    connection: {
      host: `${dbSocketPath}/${CLOUD_SQL_CONNECTION_NAME}`,
      user: USERNAME,
      password: PASSWORD,
      database: DATABASE,
    },
    migrations: {
      directory: __dirname + "/db/migrations",
    },
    seeds: {
      directory: __dirname + "/db/seeds",
    },
  },
};
