import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export async function returnBook(req, res) {
  const { loanId } = req.body;

  try {
    // Cari data peminjaman
    const loan = await prisma.peminjamanBuku.findUnique({
      where: { id: loanId },
    });

    if (!loan) {
      return res.status(404).json({ error: "Loan not found" });
    }

    // Jalankan transaction
    await prisma.$transaction([
      prisma.buku.update({
        where: { id: loan.bukuId },
        data: { jumlahTersedia: { increment: 1 } },
      }),
      prisma.peminjamanBuku.delete({
        where: { id: loanId },
      }),
    ]);

    res.json({ message: "Book returned successfully" });
  } catch (error) {
    console.error("Error returning book:", error);
    res.status(500).json({ error: "Internal server error" });
  }
}
