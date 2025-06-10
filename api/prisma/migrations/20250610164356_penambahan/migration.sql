-- CreateEnum
CREATE TYPE "StatusPeminjaman" AS ENUM ('dipinjam', 'dikembalikan', 'terlambat');

-- AlterTable
ALTER TABLE "PeminjamanBuku" ADD COLUMN     "status" "StatusPeminjaman" NOT NULL DEFAULT 'dipinjam';
