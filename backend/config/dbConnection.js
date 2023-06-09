import mysql from "mysql";

const db = mysql.createConnection({
  host: "localhost",
  port: "3307",
  user: "root",
  password: "",
  database: "test_pgn_db",
});

db.connect(function (error) {
  if (error) {
    console.error(error);
  } else {
    console.info("Connected to Database");
  }
});

export default db;
