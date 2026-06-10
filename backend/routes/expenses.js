const express = require('express');

const router = express.Router();

const isAuth = require('../middleware/authMiddleware');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');

router.get('/', isAuth, getExpenses);
router.post('/', isAuth, addExpense);
router.delete('/:id', protect, deleteExpense);

module.exports = router;