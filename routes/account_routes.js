import express from "express";
import { createUser, getUsers, loginUser } from "../controllers/company_account_controller.js";
import { check } from 'express-validator';

const router = express.Router();

router.post("/create", createUser);
router.post("/login", [
  check('email', 'Invalid email').isEmail(),
  check('password', 'Password must be at least 8 characters long and include at least one number').matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/)
], loginUser);
router.get("/", getUsers);

export default router;