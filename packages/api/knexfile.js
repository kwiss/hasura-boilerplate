const databaseName = "hnk_dev";
const { join } = require("path");
require("dotenv").config({ path: `${__dirname}/../../.env` });

const connectionUrl = process.env.DATABASE_URL || {
  host: "localhost",
  user: "postgres",
  password: "test",
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
