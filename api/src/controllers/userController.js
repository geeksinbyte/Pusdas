import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

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
    const total = await prisma.anggota.count();
    res.json({ total, users });
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

/**
 * Tambah anggota baru
 */
export async function createUser(req, res) {
  const { nama, sandi, jenisKelamin, peran } = req.body;
  try {
    // Hash password sebelum disimpan
    const hashedPassword = await bcrypt.hash(sandi, 10);
    const newUser = await prisma.anggota.create({
      data: {
        nama,
        sandi: hashedPassword,
        jenisKelamin,
        peran, // Pastikan value sesuai enum di schema
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    console.error("Gagal menambah anggota:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
