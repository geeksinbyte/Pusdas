export function getProfile(req, res) {
  // req.user diisi oleh verifyJWT
  res.json({ user: req.user });
}
