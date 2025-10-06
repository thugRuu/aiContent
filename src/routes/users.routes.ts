import { Router } from "express";
import {
  loginUser,
  registerUser,
  getUser,
} from "../controllers/user.controller";

const router:Router = Router()

router.post("/login",loginUser)
router.post("/register", registerUser);
router.get("/", getUser);


export default router