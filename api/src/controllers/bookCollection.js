import prisma from "../prisma.js";

/**
 * Ambil semua data buku beserta totalnya
 */
export async function getAllBooks(req, res) {
  try {
    const books = await prisma.buku.findMany();
    const total = await prisma.buku.count();
    res.json({ total, books });
  } catch (error) {
    console.error("Gagal mengambil data buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Ambil detail buku berdasarkan ID
 */
export async function getBookById(req, res) {
  const { id } = req.params;
  try {
    const book = await prisma.buku.findUnique({
      where: { id: parseInt(id, 10) },
    });
    if (!book) {
      return res.status(404).json({ error: "Buku tidak ditemukan" });
    }
    res.json(book);
  } catch (error) {
    console.error("Gagal mengambil detail buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Tambah data buku baru
 */
export async function addBook(req, res) {
  const {
    judul,
    penulis,
    penerbit,
    tglTerbit,
    isbn,
    rak,
    jumlah,
    jumlahTersedia,
    format,
    urlFile,
    urlSampul,
    kategoriIds, // array of DDC string, e.g. ["001", "005"]
  } = req.body;
  try {
    const newBook = await prisma.buku.create({
      data: {
        judul,
        penulis,
        penerbit,
        tglTerbit: new Date(tglTerbit),
        isbn,
        rak,
        jumlah,
        jumlahTersedia,
        format,
        urlFile,
        urlSampul,
        kategori:
          kategoriIds && Array.isArray(kategoriIds)
            ? {
                create: kategoriIds.map((ddc) => ({
                  kategori: { connect: { ddc } },
                })),
              }
            : undefined,
      },
      include: { kategori: true },
    });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Gagal menambah buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Update data buku berdasarkan ID
 */
export async function updateBook(req, res) {
  const { id } = req.params;
  const {
    judul,
    penulis,
    penerbit,
    tglTerbit,
    isbn,
    rak,
    jumlah,
    jumlahTersedia,
    format,
    urlFile,
    urlSampul,
    kategoriIds, // array of DDC string
  } = req.body;
  try {
    const updatedBook = await prisma.buku.update({
      where: { id: parseInt(id, 10) },
      data: {
        judul,
        penulis,
        penerbit,
        tglTerbit: tglTerbit ? new Date(tglTerbit) : undefined,
        isbn,
        rak,
        jumlah,
        jumlahTersedia,
        format,
        urlFile,
        urlSampul,
        // Untuk update kategori, hapus relasi lama lalu tambahkan yang baru
        ...(kategoriIds && Array.isArray(kategoriIds)
          ? {
              kategori: {
                deleteMany: {},
                create: kategoriIds.map((ddc) => ({
                  kategori: { connect: { ddc } },
                })),
              },
            }
          : {}),
      },
      include: { kategori: true },
    });
    res.json(updatedBook);
  } catch (error) {
    console.error("Gagal memperbarui data buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Hapus data buku berdasarkan ID
 */
export async function deleteBook(req, res) {
  const { id } = req.params;
  try {
    await prisma.buku.delete({
      where: { id: parseInt(id, 10) },
    });
    res.status(204).send();
  } catch (error) {
    console.error("Gagal menghapus buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}

/**
 * Cari buku berdasarkan query (judul, penulis, penerbit)
 */
export async function searchBooks(req, res) {
  const { query } = req.query;
  try {
    const books = await prisma.buku.findMany({
      where: {
        OR: [
          { judul: { contains: query, mode: "insensitive" } },
          { penulis: { contains: query, mode: "insensitive" } },
          { penerbit: { contains: query, mode: "insensitive" } },
        ],
      },
    });
    res.json(books);
  } catch (error) {
    console.error("Gagal mencari buku:", error);
    res.status(500).json({ error: "Terjadi kesalahan pada server" });
  }
}
