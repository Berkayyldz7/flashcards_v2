// backend/models/User.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, sparse: true },
  username: { type: String, unique: true, required: true },
  passwordHash: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' }, // ← EKLENDİ
}, { timestamps: true });

userSchema.methods.comparePassword = async function (plain) {
  return bcrypt.compare(plain, this.passwordHash);
};

module.exports = mongoose.model('User', userSchema);
