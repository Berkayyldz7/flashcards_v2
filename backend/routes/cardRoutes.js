const express = require('express');
const {
  getCards,
  createCard,
  updateCard,
  deleteCard,
  importCardsFromJson,
  exportCardsToJson
} = require('../controllers/cardController');

const router = express.Router();
const auth = require('../middleware/auth');
const requireRole = require("../middleware/requireRole");

// Mevcut endpointler
router.get('/', getCards);
router.post('/', auth, requireRole("admin"), createCard);
router.put('/:id', auth, requireRole("admin"), updateCard);
router.delete('/:id', auth, requireRole("admin"), deleteCard);

// JSON'dan toplu ekleme
router.post('/import', auth, requireRole("admin"), importCardsFromJson);

// JSON export
router.get('/export', requireRole("admin"), exportCardsToJson);

module.exports = router;
