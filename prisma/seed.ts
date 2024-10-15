import { prisma } from "../init";

prisma;

async function main() {
    const Udin = await prisma.karyawan.upsert({
        where: { id: 1 },
        update: {},
        create: {
            id: 1,
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
            id: 2,
            nama: "Supri Gomen Amanai",
            gaji: 5000000,
            jabatan: "Bawahan",
            tanggal_masuk: new Date(),
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
