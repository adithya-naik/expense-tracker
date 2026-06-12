import { useState, useEffect } from "react";
import {
  addExpense,
  getExpenses,
  updateExpense,
  deleteExpense,
} from "../api/expenseApi";

function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
    description: "",
  });

  const [expenses, setExpenses] = useState([]);
  const [editingId, setEditingId] = useState(null);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editingId) {
        await updateExpense(editingId, formData);
        setEditingId(null);
      } else {
        await addExpense(formData);
      }

      setFormData({
        title: "",
        amount: "",
        category: "",
        description: "",
      });

      fetchExpenses();
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  const handleEdit = (expense) => {
    setEditingId(expense.id);

    setFormData({
      title: expense.title,
      amount: expense.amount,
      category: expense.category,
      description: expense.description || "",
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);

    setFormData({
      title: "",
      amount: "",
      category: "",
      description: "",
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this expense?")) {
      try {
        await deleteExpense(id);
        fetchExpenses();
      } catch (error) {
        console.log(error.response?.data || error.message);
      }
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    window.location.href = "/login";
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-IN");
  };

  return (
    <div className="min-h-screen bg-slate-100">
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-800">
              Expense Dashboard
            </h1>
            <p className="text-slate-500 mt-1">
              Manage and track your expenses
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-lg font-medium transition"
          >
            Logout
          </button>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-6 text-slate-800">
            {editingId ? "Edit Expense" : "Add New Expense"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Title
              </label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Amount
              </label>

              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Category
              </label>

              <input
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label className="block mb-2 font-medium text-slate-700">
                Description
              </label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="3"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="flex flex-wrap gap-3 pt-2">
              <button
                type="submit"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition"
              >
                {editingId ? "Update Expense" : "Add Expense"}
              </button>

              {editingId && (
                <button
                  type="button"
                  onClick={handleCancelEdit}
                  className="bg-slate-500 hover:bg-slate-600 text-white px-6 py-2 rounded-lg font-medium transition"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Expense List */}
        <div>
          <h2 className="text-2xl font-semibold text-slate-800 mb-6">
            Expense List
          </h2>

          {expenses.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-md p-10 text-center">
              <p className="text-slate-500 text-lg">
                No expenses added yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {expenses.map((expense) => (
                <div
                  key={expense.id}
                  className="bg-white rounded-2xl shadow-md p-6 hover:shadow-lg transition"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-slate-800">
                      {expense.title}
                    </h3>

                    <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                      {expense.category}
                    </span>
                  </div>

                  <p className="text-3xl font-bold text-green-600 mb-3">
                    ₹{expense.amount}
                  </p>

                  <p className="text-slate-500 mb-2">
                    Date: {formatDate(expense.date)}
                  </p>

                  {expense.description && (
                    <p className="text-slate-700 mb-4">
                      {expense.description}
                    </p>
                  )}

                  <div className="flex gap-3">
                    <button
                      onClick={() => handleEdit(expense)}
                      className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => handleDelete(expense.id)}
                      className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
