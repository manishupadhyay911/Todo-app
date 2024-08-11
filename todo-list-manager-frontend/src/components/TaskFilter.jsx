import React from 'react';

function TaskFilter({ setFilter }) {
  return (
    <div className="btn-group mb-3">
      <button onClick={() => setFilter('all')} className="btn btn-secondary">All</button>
      <button onClick={() => setFilter('pending')} className="btn btn-secondary">Pending</button>
      <button onClick={() => setFilter('completed')} className="btn btn-secondary">Completed</button>
    </div>
  );
}

export default TaskFilter;
