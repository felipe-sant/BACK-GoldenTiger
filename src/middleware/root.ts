import { NextFunction, Request, Response } from "express";

async function root(req: Request, res: Response, next: NextFunction) {
    try {
        req.body = { username: "root", name: "Administrator", password: "root" }
        next();
    } catch (error: any) {
        res.status(500).json({ message: "Internal server error", error: error.message });
    }
}

export default root