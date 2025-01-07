import { NextFunction, Request, Response } from "express";
import revokedTokens from "../constants/revokedTokens";
import jwt from 'jsonwebtoken';

async function authenticateToken(req: Request, res: Response, next: NextFunction) {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ message: "Token is required" });
        }

        if (revokedTokens.has(token)) {
            return res.status(403).json({ message: "Token is revoked" });
        }

        const SECRET_KEY = process.env.JWT_KEY || "";
        jwt.verify(token, SECRET_KEY, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Unauthorized access" });
            }
            (req as any).user = user;
            next();
        });
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default authenticateToken;