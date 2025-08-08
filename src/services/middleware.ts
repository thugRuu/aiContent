import { Request, Response, NextFunction } from "express";
const jwt = require('jsonwebtoken')

import User from "../types/user.type";
import { verifyJwtToken } from "./jwt";


export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = verifyJwtToken(token)
            console.log("token",decoded)

      req.user = await User.findOne({email:decoded?.email}).select("-password");

      next();
    } catch (err) {
      return res.status(401).json({ message: "Not authorized, token failed" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, no token" });
  }
};
export const adminOnly = (req: any, res: any, next: any) => {
  if (req.user && req.user.roles === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};

