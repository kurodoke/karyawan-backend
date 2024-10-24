import express, { NextFunction, Response } from "express";
import { prisma } from "../init";
import { z } from "zod";
import { Request } from "../types/request";
import { authenticateToken } from "../middleware/authenticateToken";

interface KaryawanBody {
    nama: string;
    jabatan: string;
    gaji: number;
    tanggal_masuk: Date;
}

const KaryawanSchema = z.object({
    nama: z.string(),
    jabatan: z.string(),
    gaji: z.preprocess((arg) => {
        if (typeof arg === "string") return parseInt(arg);
    }, z.number()),
    tanggal_masuk: z.preprocess((arg) => {
        if (typeof arg === "string" || arg instanceof Date) {
            return new Date(arg);
        }
    }, z.date()),
});

const router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
});
router.use(authenticateToken);

//get all the data of karyawan
router.get("/", async (req: Request, res: Response) => {
    try {
        const result = await prisma.karyawan.findMany();
        res.status(200);
        res.send({
            success: true,
            message: "Sucessfully get all data of karyawan",
            data: result,
        });
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

//get one data karyawan
router.get("/:id", async (req: Request, res: Response) => {
    try {
        const id: number = parseInt(req.params["id"]);

        const result = await prisma.karyawan.findFirst({ where: { id: id } });

        if (result === null) {
            res.status(404);
            res.send({
                success: false,
                error_code: 404,
                message: "Data karyawan not found",
                data: result,
            });
        } else {
            res.status(200);
            res.send({
                success: true,
                message: "Sucessfully get data of one karyawan",
                data: result,
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

//add one karyawan instance to database
router.post("/", async (req: Request, res: Response) => {
    try {
        //parsing inputed data to the appropriate schema
        const data = KaryawanSchema.parse(req.body);

        //store the data to database
        await prisma.karyawan.create({
            data: data,
        });

        res.status(201);
        res.send({
            success: true,
            message: "Sucessfully add create data of karyawan",
            data: {},
        });
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

//update one data karyawan
router.put("/:id", async (req: Request, res: Response) => {
    try {
        //get id by the url
        const id: number = parseInt(req.params["id"]);

        //parsing inputed data to the appropriate schema
        const data = KaryawanSchema.parse(req.body);

        //update the data on the database
        await prisma.karyawan.update({ where: { id: id }, data: data });

        res.status(200);
        res.send({
            success: true,
            message: "Sucessfully update one data of karyawan",
            data: {},
        });
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

//delete one karyawan
router.delete("/:id", async (req: Request, res: Response) => {
    try {
        //get id by the url
        const id: number = parseInt(req.params["id"]);

        await prisma.karyawan.delete({ where: { id: id } });
        res.status(200);
        res.send({
            success: true,
            message: "Sucessfully deleted a data of karyawan",
            data: {},
        });
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

export { router as karyawanRouter };
