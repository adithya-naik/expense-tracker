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

    if (!title || !amount || !category) {
      return res.status(400).json({
        message: 'Title, amount and category are required'
      });
    }

    // Dynamic query: if date is provided, insert it; otherwise let MySQL use DEFAULT (CURRENT_DATE)
    let query, params;
    if (date) {
      query = `INSERT INTO expenses (user_id, title, amount, category, description, date)
               VALUES (?, ?, ?, ?, ?, ?)`;
      params = [req.user.id, title, amount, category, description || null, date];
    } else {
      query = `INSERT INTO expenses (user_id, title, amount, category, description)
               VALUES (?, ?, ?, ?, ?)`;
      params = [req.user.id, title, amount, category, description || null];
    }
    const [result] = await db.query(query, params);

    const [expense] = await db.query('SELECT * FROM expenses WHERE id = ?', [result.insertId]);

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
    const expenseId = req.params.id;    const { title, amount, category, description, date } = req.body;

    
    const [expenses] = await db.query(
      'SELECT * FROM expenses WHERE id = ? AND user_id = ?',
      [expenseId, req.user.id]
    );
    if (expenses.length === 0) {
      return res.status(404).json({ message: 'Expense not found' });
    }

    // Build dynamic SET clause
    let setClause = 'title = ?, amount = ?, category = ?, description = ?';
    let params = [title, amount, category, description || null];

    if (date) {
      setClause += ', date = ?';
      params.push(date);
    }

    params.push(expenseId, req.user.id);
    await db.query(`UPDATE expenses SET ${setClause} WHERE id = ? AND user_id = ?`, params);

    const [updatedExpense] = await db.query('SELECT * FROM expenses WHERE id = ?', [expenseId]);

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