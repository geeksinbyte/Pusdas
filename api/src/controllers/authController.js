import prisma from "../prisma.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

/**
 * Login Anggota
 * - id: id anggota (angka)
 * - password: sandi (hash bcrypt)
 * - return: token JWT dan data anggota (tanpa sandi)
 */
export async function login(req, res) {
  const { id, password } = req.body;

  // Validasi input
  if (!id || !password) {
    return res.status(400).json({ error: "ID anggota dan sandi wajib diisi" });
  }

  try {
    // Cari anggota berdasarkan id
    const anggota = await prisma.anggota.findUnique({
      where: { id: Number(id) },
    });

    // Jika anggota tidak ditemukan
    if (!anggota) {
      return res.status(404).json({ error: "Anggota tidak ditemukan" });
    }

    // Verifikasi sandi (bcrypt)
    const isPasswordValid = await bcrypt.compare(password, anggota.sandi);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Sandi salah" });
    }

    // Buat token JWT
    const token = jwt.sign(
      {
        id: anggota.id,
        nama: anggota.nama,
        peran: anggota.peran,
      },
      process.env.JWT_SECRET, // Ganti dengan env di production
      { expiresIn: "1d" }
    );

    // Login berhasil, kembalikan token dan data anggota (tanpa sandi)
    const { sandi, ...anggotaData } = anggota;
    res.json({ token, anggota: anggotaData });
  } catch (error) {
    console.error("Gagal login:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
