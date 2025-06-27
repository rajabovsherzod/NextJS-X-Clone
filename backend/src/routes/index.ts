import { Router } from "express";
import authRouter from "../api/auth/auth.route.js";

const router = Router();

router.use("/auth", authRouter);


export default router;