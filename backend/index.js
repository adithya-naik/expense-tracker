const express = require('express');
require('dotenv').config();

const app = express();


// Health check
app.get('/', (req, res) => res.json({ status: 'Expense API running' }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

