import { useState, useEffect } from "react";
import { addExpense, getExpenses, updateExpense, deleteExpense } from "../api/expenseApi";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null); // null = adding mode, otherwise expense id

  // fetch all expenses
  const fetchExpenses = async () => {
    try {
      const data = await getExpenses();
      setExpenses(data);
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Add or Update expense
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        // Update existing expense
        await updateExpense(editingId, formData);
        setEditingId(null);
      } else {
        // Add new expense
        await addExpense(formData);
      }

      // Reset form
      setFormData({
        title: "",
        amount: "",
        category: "",
        description: "",
      });

      // Refresh list
      fetchExpenses();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  // Edit button click - populate form with expense data
  const handleEdit = (expense) => {
    setEditingId(expense.id);
    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || "",
    });
  };

  // Cancel edit
  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  // Delete expense
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        fetchExpenses(); // refresh list
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div>
      <h1>Expense Dashboard</h1>
      <button>Logout</button>
      <hr />

      <h2>{editingId ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description (optional)</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="2"
            style={{ width: "100%" }}
          />
        </div>
        <button type="submit">{editingId ? "Update Expense" : "Add Expense"}</button>
        {editingId && <button type="button" onClick={handleCancelEdit}>Cancel</button>}
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
            <p>Date: {formatDate(expense.date)}</p>
            {expense.description && <p>Description: {expense.description}</p>}
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
            <hr />
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;