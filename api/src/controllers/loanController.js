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
    console.error("Error fetching loans:", error);
    res.status(500).json({ error: "Internal server error" });
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
      return res.status(404).json({ error: "Loan not found" });
    }

    res.json(loan);
  } catch (error) {
    console.error("Error fetching loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}

export async function createLoan(req, res) {
  const { anggotaId, bukuId, tglPinjam, tglJatuhTempo } = req.body;

  try {
    const result = await prisma.$transaction(async (tx) => {
      // Kurangi jumlahTersedia buku
      const updatedBook = await tx.buku.update({
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
    console.error("Error creating loan:", error);
    res.status(500).json({ error: "Internal server error" });
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
    console.error("Error updating loan:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
