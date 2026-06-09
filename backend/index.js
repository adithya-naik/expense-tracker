const express = require('express');
const authRoutes = require('./routes/auth');
require('dotenv').config();

const app = express();

// middlewares
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/', (req, res) => res.json({ status: 'Expense API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

