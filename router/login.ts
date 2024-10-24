import express, { NextFunction, Request, Response } from "express";
import { z } from "zod";
import { prisma } from "../init";
import { generateToken } from "../util/generateToken";
import crypto from "node:crypto";

const router = express.Router();

export interface AdminBody {
    email: string;
    password: string;
}

const AdminSchema = z.object({
    email: z.string(),
    password: z.string(),
});

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

//login route
router.post("/login", async (req: Request, res: Response) => {
    try {
        //parse to appropriate data
        const data = AdminSchema.parse(req.body);

        const account = await prisma.admin.findFirst({
            where: { email: data.email },
        });

        //if the email is correct
        if (
            account &&
            crypto.hash("sha256", data.password) === account.password
        ) {
            res.status(200);
            res.send({
                success: true,
                message: "Loged-In Sucessfully",
                data: { token: generateToken(data.email) },
            });
        } else {
            res.status(401);
            res.send({
                success: false,
                message: "Invalid username or password",
                data: { token: {} },
            });
        }
    } catch (e) {
        console.log(e);
        res.status(500);
        res.send({
            success: false,
            error_code: 500,
            message: "Something went wrong in the server side",
            data: {},
        });
    }
});

export { router as loginRouter };
