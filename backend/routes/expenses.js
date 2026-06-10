const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/authMiddleware');
const { getExpenses, addExpense } = require('../controllers/expenseController');

router.get('/', isAuth, getExpenses);

router.post('/', isAuth, addExpense);

module.exports = router;