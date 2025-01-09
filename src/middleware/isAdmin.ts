import { NextFunction, Request, Response } from "express";
import UserType from "../types/database/User.type";

async function isAdmin(req: Request, res: Response, next: NextFunction) {
    try {
        const user = (req as any).user as UserType;
        if (user.type !== "admin") {
            return res.status(403).json({ message: "The user must be of the admin type" });
        }
        next();
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error" });
    }
}

export default isAdmin;