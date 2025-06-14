import prisma from "../prisma.js";

/**
 * Ambil semua data anggota beserta totalnya
 */
export async function getAllUsers(req, res) {
  try {
    const users = await prisma.anggota.findMany({
      select: {
        id: true,
        nama: true,
        jenisKelamin: true,
        peran: true,
        tglDaftar: true,
      },
    });
    res.json(users);
  } catch (error) {
    console.error("Gagal mengambil data anggota:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Ambil detail anggota berdasarkan ID
 */
export async function getUserById(req, res) {
  const { id } = req.params;
  try {
    const user = await prisma.anggota.findUnique({
      where: { id: parseInt(id, 10) },
      select: {
        id: true,
        nama: true,
        jenisKelamin: true,
        peran: true,
        tglDaftar: true,
      },
    });
    if (!user) {
      return res.status(404).json({ error: "Anggota tidak ditemukan" });
    }
    res.json(user);
  } catch (error) {
    console.error("Gagal mengambil detail anggota:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
