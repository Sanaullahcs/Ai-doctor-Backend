import express from "express";
import tokenController from "../controllers/tokenController.js";

const router = express.Router();

router.get("/validate-token", tokenController.validate);

export default router;
