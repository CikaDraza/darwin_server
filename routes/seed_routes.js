import express from "express";
import { seed } from "../controllers/seed.js";

const router = express.Router();

router.get("/", seed);

export default router;