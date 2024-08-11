import React, { useEffect, useState } from 'react';
import { getTasks, deleteTask, updateTask, undoDeleteTask } from '../services/taskService';
import TaskFilter from './TaskFilter';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [deletedTask, setDeletedTask] = useState(null);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    const response = await getTasks();
    setTasks(response.data);
  };

  const handleDelete = async (id) => {
    try {
      const response = await deleteTask(id);
      setDeletedTask(response.data.task); // Store the deleted task
      setTasks(tasks.filter(task => task._id !== id)); // Update the state to remove the deleted task
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  const handleUndo = async () => {
    if (deletedTask) {
      try {
        await undoDeleteTask(deletedTask._id); // Restore the deleted task
        setDeletedTask(null); // Clear the deleted task state
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error('Error restoring task:', error);
      }
    }
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
       {deletedTask && (
        <div className="alert alert-warning">
          Task deleted. <button onClick={handleUndo} className="btn btn-link">Undo</button>
        </div>
      )}
    </div>
  );
}

export default TaskList;
