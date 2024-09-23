import { DataSource } from "typeorm";
import config from "./config";
const AppDataSource = new DataSource({
  type: "postgres",
  host: config.database.host,
  port: +config.database.port,
  username: config.database.user,
  password: config.database.password,
  database: config.database.name,
  entities: ["src/entities/*{.ts,.js}"],
  synchronize: true,
});

export default AppDataSource;
