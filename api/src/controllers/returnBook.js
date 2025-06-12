import prisma from "../prisma.js";

/**
 * Proses pengembalian buku:
 * - Update jumlahTersedia pada buku (+1)
 * - Update status peminjaman menjadi "dikembalikan" dan isi tglKembali
 */
export async function returnBook(req, res) {
  const { loanId } = req.body;

  try {
    // Cari data peminjaman berdasarkan loanId
    const loan = await prisma.peminjamanBuku.findUnique({
      where: { id: loanId },
    });

    // Jika data peminjaman tidak ditemukan
    if (!loan) {
      return res.status(404).json({ error: "Data peminjaman tidak ditemukan" });
    }

    // Jalankan transaksi: update stok buku & status peminjaman
    await prisma.$transaction([
      prisma.buku.update({
        where: { id: loan.bukuId },
        data: { jumlahTersedia: { increment: 1 } },
      }),
      prisma.peminjamanBuku.update({
        where: { id: loanId },
        data: {
          tglKembali: new Date(),
          status: "dikembalikan",
        },
      }),
    ]);

    res.json({ message: "Buku berhasil dikembalikan" });
  } catch (error) {
    console.error("Gagal memproses pengembalian buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
