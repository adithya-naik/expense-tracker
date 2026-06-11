import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api'
});

// Add new expense
export const addExpense = async (expenseData) => {
  const token = localStorage.getItem('token');
  const response = await API.post('/expenses', expenseData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Get all expenses
export const getExpenses = async () => {
  const token = localStorage.getItem('token');
  const response = await API.get('/expenses', {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Update expense (by id)
export const updateExpense = async (id, expenseData) => {
  const token = localStorage.getItem('token');
  const response = await API.put(`/expenses/${id}`, expenseData, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

// Delete expense (by id)
export const deleteExpense = async (id) => {
  const token = localStorage.getItem('token');
  const response = await API.delete(`/expenses/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};