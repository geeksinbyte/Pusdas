import jwt from "jsonwebtoken";

export default function verifyJWT(req, res, next) {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Token tidak ditemukan" });
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Token tidak valid" });
    }
    req.user = decoded; // Simpan data user ke request
    next(); // Lanjutkan ke middleware/route berikutnya
  });
}
