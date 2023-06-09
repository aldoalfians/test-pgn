import express from "express";
import {
  getDepartement,
  getDepartementById,
  createDepartement,
  updateDepartement,
  deleteDepartement,
} from "../controllers/departement.js";

const router = express.Router();

router.get("/api/departement", getDepartement);
router.get("/api/departement/:id", getDepartementById);
router.post("/api/departement", createDepartement);
router.patch("/api/departement/:id", updateDepartement);
router.delete("/api/departement/:id", deleteDepartement);

export default router;
