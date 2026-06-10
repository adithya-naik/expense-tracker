const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/authMiddleware');

// test protected expense route
router.get('/', isAuth, (req, res) => {
  res.json({
    message: 'Expense route working'
  });
});

module.exports = router;