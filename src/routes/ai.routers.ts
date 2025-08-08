import { Router } from "express";
import { getAiContent } from "../controllers/ai.controller";


const router:Router = Router()

router.post("/",getAiContent)

export default router