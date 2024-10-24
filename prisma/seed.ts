import { prisma } from "../init";
import crypto from "node:crypto";

prisma;

async function main() {
    const Udin = await prisma.karyawan.upsert({
        where: { id: 1 },
        update: {},
        create: {
            nama: "Udin Yaeger Ayang Mikasa",
            gaji: 100000000,
            jabatan: "Pemimpin",
            tanggal_masuk: new Date(),
        },
    });

    const Supri = await prisma.karyawan.upsert({
        where: { id: 2 },
        update: {},
        create: {
            nama: "Supri Gomen Amanai",
            gaji: 5000000,
            jabatan: "Bawahan",
            tanggal_masuk: new Date(),
        },
    });

    const Admin = await prisma.admin.upsert({
        where: { id: 1 },
        update: {},
        create: {
            email: "admin@gmail.com",
            password: crypto.hash("sha256", "admin123"),
        },
    });
}

main()
    .then(async () => {
        await prisma.$disconnect();
    })
    .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        process.exit(1);
    });
