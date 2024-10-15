import express, { Request, Response } from "express";

const router = express.Router();

router.get("/karyawan", async (req: Request, res: Response) => {
    res.send("Karyawan");
});
router.post("/karyawan");

export const karyawanRouter = router;
