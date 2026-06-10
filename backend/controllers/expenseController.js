const expenses = [];

const getExpenses = async (req, res) => {
  res.status(200).json(expenses);
};

const addExpense = async (req, res) => {

  const { title, amount, category } = req.body;

  // validation
  if (!title || !amount || !category) {
    return res.status(400).json({
      message: 'All fields are required'
    });
  }

  const newExpense = {
    id: Date.now(),
    title,
    amount,
    category
  };

  expenses.push(newExpense);

  res.status(201).json({
    message: 'Expense added successfully',
    expense: newExpense
  });
};

module.exports = {
  getExpenses,
  addExpense
};