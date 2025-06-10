import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function getAllLoans(req, res) {
  try {
    const loans = await prisma.peminjamanBuku.findMany({
      include: {
        buku: true,
        anggota: true,
      },
    });
    res.json(loans);
  } catch (error) {
    console.error("Gagal mengambil data peminjaman:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

export async function getLoanById(req, res) {
  const { id } = req.params;

  try {
    const loan = await prisma.peminjamanBuku.findUnique({
      where: { id: parseInt(id) },
      include: {
        buku: true,
        anggota: true,
      },
    });

    if (!loan) {
      return res.status(404).json({ error: "Data peminjaman tidak ditemukan" });
    }

    res.json(loan);
  } catch (error) {
    console.error("Gagal mengambil data peminjaman:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

export async function createLoan(req, res) {
  const { anggotaId, bukuId, tglPinjam, tglJatuhTempo } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Cek stok buku
      const book = await tx.buku.findUnique({ where: { id: bukuId } });
      if (!book || book.jumlahTersedia < 1) {
        throw new Error("Stok buku tidak tersedia");
      }

      // Kurangi jumlahTersedia buku
      await tx.buku.update({
        where: { id: bukuId },
        data: { jumlahTersedia: { decrement: 1 } },
      });

      // Buat data peminjaman
      const newLoan = await tx.peminjamanBuku.create({
        data: {
          anggota: { connect: { id: anggotaId } },
          buku: { connect: { id: bukuId } },
          tglPinjam: tglPinjam ? new Date(tglPinjam) : undefined,
          tglJatuhTempo: tglJatuhTempo ? new Date(tglJatuhTempo) : undefined,
          status: "dipinjam",
        },
        include: {
          buku: true,
          anggota: true,
        },
      });

      return newLoan;
    });

    res.status(201).json(result);
  } catch (error) {
    console.error("Gagal membuat data peminjaman:", error);
    if (error.message === "Stok buku tidak tersedia") {
      return res.status(400).json({ error: "Stok buku tidak tersedia" });
    }
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

export async function updateLoan(req, res) {
  const { id } = req.params;
  const { anggotaId, bukuId, tanggalPinjam, tanggalKembali } = req.body;

  try {
    const updatedLoan = await prisma.peminjamanBuku.update({
      where: { id: parseInt(id) },
      data: {
        anggota: { connect: { id: anggotaId } },
        buku: { connect: { id: bukuId } },
        tanggalPinjam: new Date(tanggalPinjam),
        tanggalKembali: new Date(tanggalKembali),
      },
      include: {
        buku: true,
        anggota: true,
      },
    });
    res.json(updatedLoan);
  } catch (error) {
    console.error("Gagal memperbarui data peminjaman:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
