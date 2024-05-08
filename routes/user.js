import { Router } from "express";
import {
  deleteUser,
  getAllUsers,
  getRegistrationInfo,
  loginUser,
  registerUser,
  updateRegistrationInfo,
} from "../controllers/userController.js";
import rateLimitMiddleware from "../middleware/rateLimiter.js";
const router = Router();
router.use(rateLimitMiddleware);
import requireAuth from "../middleware/requireAuth.js";

router.post("/login", loginUser);
router.post("/register", registerUser);

router.use(requireAuth);

router.delete("/delete", deleteUser);
export default router;
