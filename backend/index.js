import express from "express";
import cors from "cors";
import db from "./config/dbConnection.js";

// Routes
import DepartementRoute from "./routes/departementRoute.js";
import EmployeeRoute from "./routes/employeeRoute.js";
import SpendingRoute from "./routes/spendingRoute.js";

// import models for create table
import Departemen from "./models/departementModel.js";
import Employee from "./models/emoloyeeModel.js";
import Spending from "./models/spendingModel.js";

// import dummy data for crud
// import { insertDepartemen } from "./data_dummy/crudDepertemen.js";
// import { insertEmployee } from "./data_dummy/crudEmployee.js";
import { insertSpending } from "./data_dummy/crudSpending.js";

// Create table
// db.query(Spending, function (err, result) {
//   if (err) throw err;
//   console.log("Table created");
// });

// Insert table
// db.query(insertSpending.sql, [insertSpending.values], function (err, result) {
//   if (err) throw err;
//   console.log("Number of records inserted: " + result.affectedRows);
// });

const app = express();

app.use(
  cors({
    credentials: true,
    origin: "*",
  })
);

app.use(express.json());

app.use(DepartementRoute);
app.use(EmployeeRoute);
app.use(SpendingRoute);

app.listen(5000, console.log("server running at port 5000"));
