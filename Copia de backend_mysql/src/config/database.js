const mysql = require("mysql");
const { database } = require("./keys");
const { promisify } = require("util");
const pool = mysql.createPool(database);

pool.getConnection((err, connection) => {
  if (err) {
    if (err.code === "PROTOCOL_CONNECTION_LOST") {
      console.error("DATABSE  CONNECTION WAS CLOSED");
    }
    if (err.code === "ER_CON_COUNT_ERORR") {
      console.error("DATABASE HAS TOO MANY CONNECTIONS");
    }

    if (err.code === "ECONNREFUSED") {
      console.error("CONNECTION REFUSED");
    }
  }
  if (connection) connection.release();
  console.log("DB is connected");
  return;
});

promisify(pool.query);
module.exports = pool;
