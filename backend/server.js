const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const cardRoutes = require('./routes/cardRoutes');
const authRoutes = require('./routes/authRoutes');



dotenv.config();
connectDB();

const app = express();
app.use(cors());

app.use(express.json());

app.use('/api/cards', cardRoutes);

app.get('/', (req, res) => res.send('Backend API çalışıyor 🚀'));
app.use('/api/auth', authRoutes);

app.get('/healthz', (req, res) => res.type('text').send('ok'));

const PORT = process.env.PORT || 5001;
app.listen(PORT, "0.0.0.0", () => console.log(`🚀 Server running on port ${PORT}`));
