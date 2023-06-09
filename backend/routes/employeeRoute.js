import express from "express";
import {
  getEmployee,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.js";

const router = express.Router();

router.get("/api/employee", getEmployee);
router.get("/api/employee/:id", getEmployeeById);
router.post("/api/employee", createEmployee);
router.patch("/api/employee/:id", updateEmployee);
router.delete("/api/employee/:id", deleteEmployee);

export default router;
