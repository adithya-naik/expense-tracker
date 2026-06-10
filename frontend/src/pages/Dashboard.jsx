import { useState, useEffect } from "react";

import { addExpense, getExpenses } from "../api/expenseApi";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const [expenses, setExpenses] = useState([]);

  // fetch all expenses
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();

      setExpenses(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // load expenses on page load
  useEffect(() => {
    fetchExpenses();
  }, []);

  // handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // add expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addExpense(formData);

      // reset form
      setFormData({
        title: "",
        amount: "",
        category: "",
      });

      // refresh expenses
      fetchExpenses();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div>
      <h1>Expense Dashboard</h1>

      <button>Logout</button>

      <hr />

      <h2>Add Expense</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>

          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Amount</label>

          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Category</label>

          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>

        <button type="submit">Add Expense</button>
      </form>

      <hr />

      <h2>Expense List</h2>

      {expenses.length === 0 ? (
        <p>No expenses added yet</p>
      ) : (
        expenses.map((expense) => (
          <div key={expense.id}>
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount}</p>

            <p>Category: {expense.category}</p>

            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;
