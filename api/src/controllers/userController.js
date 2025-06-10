import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
const prisma = new PrismaClient();

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
    res.status(500).json({ error: error.message });
  }
}

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
      return res.status(404).json({ error: "User not found" });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createUser(req, res) {
  const { nama, sandi, jenisKelamin, peran } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(sandi, 10);
    const newUser = await prisma.anggota.create({
      data: {
        nama,
        sandi: hashedPassword,
        jenisKelamin,
        peran, // pastikan value-nya sesuai enum di schema (siswa/guru/pustakawan)
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
