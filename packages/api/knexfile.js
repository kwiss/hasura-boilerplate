const { join } = require("path");
require("dotenv").config({ path: `${__dirname}/../../.env` });

const databaseName = process.env.POSTGRES_DB;

const connectionUrl = process.env.DATABASE_URL || {
  host: "localhost",
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  port: "5434",
  database: databaseName
};

const connection = {
  client: "postgresql",
  connection: connectionUrl,
  migrations: {
    directory: join(__dirname, "db/migrations")
  }
};

module.exports = connection;
