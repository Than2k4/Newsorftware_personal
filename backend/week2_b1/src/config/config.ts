import { Dialect } from "sequelize";

interface DBConfig {
  username: string;
  password: string | null;
  database: string;
  host: string;
  dialect: Dialect;
}

interface Config {
  development: DBConfig;
  test: DBConfig;
  production: DBConfig;
}

const config: Config = {
  development: {
    username: "root",
    password: "100104",
    database: "node_fullstack",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  test: {
    username: "root",
    password: null,
    database: "database_test",
    host: "127.0.0.1",
    dialect: "mysql",
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

export default config;
