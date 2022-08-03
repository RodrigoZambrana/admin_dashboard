import { DataSource } from "typeorm";
import { Admin } from "./entity/Admin";
import { Category } from "./entity/Category";
import { SubCategory } from "./entity/SubCategory";
import { Product } from "./entity/Product";
import { Customer } from "./entity/Customer";
import { Address } from "./entity/Address";
import { Budget } from "./entity/Budget";
import { Budget_Entry } from "./entity/Budget_Entry";

export const AppDataSource = new DataSource({
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "password",
  database: "urucortinas_dev",
  synchronize: true,
  logging: true,
  entities: [
    Admin,
    Category,
    SubCategory,
    Product,
    Customer,
    Address,
    Budget,
    Budget_Entry,
  ],
});
