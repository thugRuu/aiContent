const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "1h";

export interface JwtPayload {
  username: string;
  email: string;
  password?: string;
  role: string;
}

export function generateJwtToken(payload: JwtPayload): string {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
}

export function verifyJwtToken(token: string): JwtPayload | null {
  try {
    return jwt.verify(token, JWT_SECRET);
    
  } catch {
    return null;
  }
}

