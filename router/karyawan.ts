import express, { NextFunction, Request, Response } from "express";
import { prisma } from "../init";
import { z } from "zod";

const router = express.Router();

//middleware
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use((req: Request, res: Response, next: NextFunction) => {
    res.setHeader("Content-Type", "application/json");
    next();
});

//get all the data of karyawan
router.get("/karyawan", async (req: Request, res: Response) => {
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

//add one karyawan instance to database
router.post("/karyawan", async (req: Request, res: Response) => {
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
router.put("/karyawan/:id", async (req: Request, res: Response) => {
    try {
        //get id by the url
        const id: number = parseInt(req.params["id"]);

        //parsing inputed data to the appropriate schema
        const data = KaryawanSchema.parse(req.body);

        //update the data on the database
        await prisma.karyawan.update({ where: { id: id }, data: data });

        res.status(201);
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
export const karyawanRouter = router;
