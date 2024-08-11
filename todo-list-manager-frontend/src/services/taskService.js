import axios from 'axios';

const API_URL = 'http://localhost:5000/api/tasks';

export const getTasks = () => {
  return axios.get(API_URL);
};

export const addTask = (task) => {
  return axios.post(API_URL, task);
};

export const updateTask = (task) => {
  return axios.patch(`${API_URL}/${task._id}`, task);
};

export const deleteTask = (id) => {
  return axios.delete(`${API_URL}/${id}`);
};

export const undoDeleteTask = (id) => axios.post(`${API_URL}/undo/${id}`);
