// backend/middleware/auth.js
const jwt = require('jsonwebtoken');

module.exports = function auth(req, res, next) {
  const hdr = req.headers.authorization || '';
  const token = hdr.startsWith('Bearer ') ? hdr.slice(7) : null;
  if (!token) return res.status(401).json({ error: 'Auth gerekli' });
  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.uid, username: payload.username, role: payload.role }; // ← role
    next();
  } catch (e) {
    return res.status(401).json({ error: 'Geçersiz/expired token' });
  }
};
