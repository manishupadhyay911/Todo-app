import React, { useState } from 'react';
import { addTask } from '../services/taskService';

function AddTask() {
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTask = {
      description,
      dueDate: dueDate ? new Date(dueDate) : undefined,
      status: 'pending',
      tags: tags ? tags.split(',') : []
    };

    await addTask(newTask);

    setDescription('');
    setDueDate('');
    setTags('');
  };

  return (
    <form onSubmit={handleSubmit} className="container">
      <div className="mb-3">
        <label className="form-label">Task Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Due Date</label>
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="form-control"
        />
      </div>
      <div className="mb-3">
        <label className="form-label">Tags (comma-separated)</label>
        <input
          type="text"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          className="form-control"
        />
      </div>
      <button type="submit" className="btn btn-primary">Add Task</button>
    </form>
  );
}

export default AddTask;
