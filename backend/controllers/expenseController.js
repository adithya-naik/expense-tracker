const db = require('../config/db');

// Get all expenses for logged-in user
const getExpenses = async (req, res) => {
  try {
    const [expenses] = await db.query(
      'SELECT * FROM expenses WHERE user_id = ? ORDER BY created_at DESC',
      [req.user.id]
    );

    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to fetch expenses',
      error: error.message
    });
  }
};

// Add expense
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, description, date } = req.body;

    if (!title || !amount || !category || !date) {
      return res.status(400).json({
        message: 'Title, amount, category and date are required'
      });
    }

    const [result] = await db.query(
      `INSERT INTO expenses
      (user_id, title, amount, category, description, date)
      VALUES (?, ?, ?, ?, ?, ?)`,
      [
        req.user.id,
        title,
        amount,
        category,
        description || null,
        date
      ]
    );

    const [expense] = await db.query(
      'SELECT * FROM expenses WHERE id = ?',
      [result.insertId]
    );

    res.status(201).json({
      message: 'Expense added successfully',
      expense: expense[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add expense',
      error: error.message
    });
  }
};

// Update expense
const updateExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const { title, amount, category, description, date } = req.body;

    const [expenses] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [expenseId, req.user.id]
    );

    if (expenses.length === 0) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    await db.query(
      `UPDATE expenses
       SET title = ?, amount = ?, category = ?, description = ?, date = ?
       WHERE id = ? AND user_id = ?`,
      [
        title,
        amount,
        category,
        description,
        date,
        expenseId,
        req.user.id
      ]
    );

    const [updatedExpense] = await db.query(
      'SELECT * FROM expenses WHERE id = ?',
      [expenseId]
    );

    res.status(200).json({
      message: 'Expense updated successfully',
      expense: updatedExpense[0]
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update expense',
      error: error.message
    });
  }
};

// Delete expense
const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;

    const [expenses] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [expenseId, req.user.id]
    );

    if (expenses.length === 0) {
      return res.status(404).json({
        message: 'Expense not found'
      });
    }

    await db.query(
      'DELETE FROM expenses WHERE id = ? AND user_id = ?',
      [expenseId, req.user.id]
    );

    res.status(200).json({
      message: 'Expense deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to delete expense',
      error: error.message
    });
  }
};

module.exports = {
  getExpenses,
  addExpense,
  updateExpense,
  deleteExpense
};