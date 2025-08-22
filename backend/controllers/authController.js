// backend/controllers/authController.js
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

function sign(user) {
  return jwt.sign(
    { uid: user._id, username: user.username, role: user.role }, // ← role dahil
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES || '7d' }
  );
}

exports.register = async (req, res) => {
  try {
    const { username, password, email } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username ve password zorunlu' });

    const exists = await User.findOne({ username });
    if (exists) return res.status(409).json({ error: 'username kullanılıyor' });

    const passwordHash = await bcrypt.hash(password, 10);
    // rol gönderilse bile güvenlik için görmezden geliyoruz (herkes user doğar)
    const user = await User.create({ username, email, passwordHash, role: 'user' });
    const token = sign(user);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body || {};
    if (!username || !password) return res.status(400).json({ error: 'username ve password zorunlu' });

    const user = await User.findOne({ username });
    if (!user) return res.status(401).json({ error: 'Geçersiz bilgiler' });

    const ok = await user.comparePassword(password);
    if (!ok) return res.status(401).json({ error: 'Geçersiz bilgiler' });

    const token = sign(user);
    res.json({ token, user: { id: user._id, username: user.username, email: user.email, role: user.role } });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

exports.me = async (req, res) => {
  const user = req.user; // middleware’den gelir
  res.json({ user });
};
