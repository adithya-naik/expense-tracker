const express = require('express');
const router = express.Router();

const isAuth = require('../middlewares/authMiddleware');

const {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
} = require('../controllers/expenseController');

router.get('/', isAuth, getExpenses);
router.post('/', isAuth, addExpense);
router.put('/:id', isAuth, updateExpense);
router.delete('/:id', isAuth, deleteExpense);

module.exports = router;