import { Router } from "express";
import { adminCheck } from "../controllers/adminCheck.controler";

const router:Router = Router()

router.post("/",adminCheck)

export default router