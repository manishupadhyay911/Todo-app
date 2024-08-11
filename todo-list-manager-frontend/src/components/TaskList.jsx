import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask } from '../services/taskService';
import TaskFilter from './TaskFilter';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    setTasks(tasks.filter(task => task._id !== id));
  };

  const handleToggleComplete = async (task) => {
    task.status = task.status === 'pending' ? 'completed' : 'pending';
    await updateTask(task);
    fetchTasks();
  };

  const filteredTasks = tasks.filter(task => filter === 'all' || task.status === filter);

  return (
    <div className="container">
      <TaskFilter setFilter={setFilter} />
      {filteredTasks.length === 0 ? (
        <p className="text-center mt-4">No tasks available.</p>
      ) : (
        <ul className="list-group">
          {filteredTasks.map(task => (
            <li key={task._id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  checked={task.status === 'completed'}
                  onChange={() => handleToggleComplete(task)}
                  className="form-check-input me-2"
                />
                {task.description}
              </div>
              <button className="btn btn-danger btn-sm" onClick={() => handleDelete(task._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default TaskList;
