import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

/**
 * Ambil semua data kategori buku
 */
export async function getCategories(req, res) {
  try {
    const categories = await prisma.kategori.findMany();
    res.json(categories);
  } catch (error) {
    console.error("Gagal mengambil data kategori buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Tambah kategori buku baru
 * - Field wajib: ddc (kode DDC, unik), nama (unik)
 */
export async function addCategory(req, res) {
  const { ddc, nama } = req.body;
  // Validasi input
  if (!ddc || !nama) {
    return res.status(400).json({ error: "DDC dan nama kategori wajib diisi" });
  }
  try {
    const newCategory = await prisma.kategori.create({
      data: { ddc, nama },
    });
    res.status(201).json(newCategory);
  } catch (error) {
    // Penanganan error untuk DDC atau nama yang sudah ada
    if (
      error.code === "P2002" &&
      error.meta &&
      (error.meta.target.includes("ddc") || error.meta.target.includes("nama"))
    ) {
      return res
        .status(400)
        .json({ error: "DDC atau nama kategori sudah terdaftar" });
    }
    console.error("Gagal menambahkan kategori buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
