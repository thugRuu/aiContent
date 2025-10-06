import { Response, NextFunction } from "express";

import { verifyJwtToken } from "./jwt";
import prisma from "../lib/prisma";

export const protect = async (req: any, res: Response, next: NextFunction) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    console.log(req.headers.authorization);
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = verifyJwtToken(token);
      console.log("token", decoded);
      const email = decoded?.email;

      const user = await prisma.user.findUnique({
        where: { email: email! },
        select: {
          id: true,
          email: true,
          role: true,
        },
      });
      if (!user) {
        return res
          .status(401)
          .json({ message: "Not authorized, user not found" });
      }
      req.user = user;
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
  if ((req.user && req.user.role === "admin") || "ADMIN") {
    next();
  } else {
    res.status(403).json({ message: "Access denied: Admins only" });
  }
};
