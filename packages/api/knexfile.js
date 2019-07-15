// import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";

// hack for esm
const DIR_NAME = dirname(fileURLToPath(import.meta.url));

const databaseName = "hnk_dev";

const connectionUrl = process.env.DATABASE_URL || {
  host: "localhost",
  user: "postgres",
  password: "test",
  port: "5434",
  database: databaseName
};

const connection = {
  client: "pg",
  connection: connectionUrl,
  migrations: {
    directory: `${DIR_NAME}/db/migrations`
  }
};

export default connection;
