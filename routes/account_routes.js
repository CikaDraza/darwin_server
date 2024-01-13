import express from "express";
import { createUser } from "../controllers/company_account_controller.js";

const router = express.Router();

router.post("/", createUser);

export default router;