const databaseName = "hnk_dev";

const connectionUrl = process.env.DATABASE_URL || {
  host: "localhost",
  user: "postgres",
  password: "test",
  port: "5434",
  database: databaseName
};

module.exports = {
  client: "pg",
  connection: connectionUrl,
  migrations: {
    directory: `${__dirname}/db/migrations`
  }
};
