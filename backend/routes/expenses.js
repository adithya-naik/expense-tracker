const express = require('express');

const router = express.Router();

const isAuth = require('../middlewares/authMiddleware');
const { getExpenses, addExpense, deleteExpense } = require('../controllers/expenseController');

router.get('/', isAuth, getExpenses);
router.post('/', isAuth, addExpense);
router.delete('/:id', isAuth, deleteExpense);

module.exports = router;
