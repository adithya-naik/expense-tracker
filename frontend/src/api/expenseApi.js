import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:8000/api'
});

export const addExpense = async (expenseData) => {

  const token = localStorage.getItem('token');

  const response = await API.post(
    '/expenses',
    expenseData,
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const getExpenses = async () => {

  const token = localStorage.getItem('token');

  const response = await API.get(
    '/expenses',
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};