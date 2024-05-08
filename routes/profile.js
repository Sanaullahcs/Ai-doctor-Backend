import { Router } from "express";
import multer from "multer";
import {
  getCurrentProfileInfo,
  updateProfileInfo,
} from "../controllers/profileController.js";
const router = Router();
const upload = multer({ dest: "uploads/" });
import requireAuth from "../middleware/requireAuth.js";

router.use(requireAuth);
// get the profile information of currently registered user
router.get("/", getCurrentProfileInfo);

// update the profile information of currently registered user
router.patch("/", upload.single("image"), updateProfileInfo);

export default router;
