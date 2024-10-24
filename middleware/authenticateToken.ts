import { NextFunction, Response } from "express";
import { verify } from "jsonwebtoken";
import { Request } from "../types/request";

export function authenticateToken(
    req: Request,
    res: Response,
    next: NextFunction
): void {
    const authHeader = req.headers["authorization"];

    if (!authHeader) {
        res.sendStatus(401);
        return;
    }

    const token = authHeader.split(" ")[1];

    if (!token) {
        res.sendStatus(401);
        return;
    }

    verify(
        token,
        process.env.JWT_PRIVATE_KEY as string,
        (err: any, user: any) => {
            if (err) {
                console.log(err);
                return res.sendStatus(403);
            }

            req.user = user;

            next();
        }
    );
}
