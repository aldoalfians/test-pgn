import express from "express";
import {
  getHome,
  getSpending,
  getSpendingById,
  createSpending,
  updateSpending,
  deleteSpending,
} from "../controllers/spending.js";

const router = express.Router();

router.get("/api/home", getHome);
router.get("/api/spending", getSpending);
router.get("/api/spending/:id", getSpendingById);
router.post("/api/spending", createSpending);
router.patch("/api/spending/:id", updateSpending);
router.delete("/api/spending/:id", deleteSpending);

export default router;
