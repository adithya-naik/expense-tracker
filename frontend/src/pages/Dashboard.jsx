import { useState } from "react";
import { addExpense } from "../api/expenseApi";
function Dashboard() {
  const [formData, setFormData] = useState({
    title: "",
    amount: "",
    category: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await addExpense(formData);

      console.log(data);

      setFormData({
        title: "",
        amount: "",
        category: "",
      });
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
    </div>
  );
}

export default Dashboard;
