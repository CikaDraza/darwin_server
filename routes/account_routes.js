import express from "express";
import { createUser, getUser } from "../controllers/company_account_controller.js";

const router = express.Router();

router.post("/", createUser);
router.post("/", getUser);

export default router;