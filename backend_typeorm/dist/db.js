"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 5432,
    username: "root",
    password: "password",
    database: "urucortinas_dev",
    synchronize: true,
    logging: true,
    entities: [],
});
