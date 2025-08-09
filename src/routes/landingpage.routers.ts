import { Router } from "express";
import {
  getLandingPage,
  upsertLandingPage,
} from "../controllers/landingpage.controller";
import { protect, adminOnly } from "../services/middleware";

const router:Router = Router();

router.get("/", getLandingPage);
router.post("/", protect, adminOnly, upsertLandingPage);

export default router;
