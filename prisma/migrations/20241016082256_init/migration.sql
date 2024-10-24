-- CreateTable
CREATE TABLE "karyawan" (
    "id" SERIAL NOT NULL,
    "nama" TEXT NOT NULL,
    "jabatan" TEXT NOT NULL,
    "gaji" INTEGER NOT NULL,
    "tanggal_masuk" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "karyawan_pkey" PRIMARY KEY ("id")
);
