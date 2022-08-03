import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "urucortinas_dev",
  synchronize: true,
  logging: true,
  entities: [Admin],
});
