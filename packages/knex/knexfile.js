// Update with your config settings.

const databaseName = "hnk_dev";
const pg = require("pg");

const connection_url = process.env.DATABASE_URL || {
  host: "localhost",
  user: "postgres",
  password: "test",
  port: "5434",
  database: databaseName,
};

module.exports = {
  client: "pg",
  connection: connection_url,
  migrations: {
    directory: __dirname + "/db/migrations",
  },
};
