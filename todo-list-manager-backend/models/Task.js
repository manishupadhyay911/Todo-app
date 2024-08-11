const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    description: { type: String, required: true },
    dueDate: { type: Date },
    status: { type: String, enum: ['pending', 'completed'], default: 'pending' },
    tags: [String]
});

module.exports = mongoose.model('Task', TaskSchema);
