import pg from "pg";
import { dirname } from "path";
import { fileURLToPath } from "url";

// hack for esm
const __dirname = dirname(fileURLToPath(import.meta.url));

const databaseName = "hnk_dev";

const connection_url = process.env.DATABASE_URL || {
  host: "localhost",
  user: "postgres",
  password: "test",
  port: "5434",
  database: databaseName
};

const connection = {
  client: "pg",
  connection: connection_url,
  migrations: {
    directory: __dirname + "/db/migrations"
  }
};

export default connection;
