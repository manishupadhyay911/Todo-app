const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  description: { type: String, required: true },
  dueDate: { type: Date },
  status: { 
    type: String, 
    enum: ['pending', 'completed'],
    default: 'pending' 
  },
  tags: { type: [String] },
  deleted: { type: Boolean, default: false }
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
