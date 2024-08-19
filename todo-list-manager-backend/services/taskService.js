const Task = require('../models/task');

class TaskService {
    async createTask(taskData) {
        const task = new Task(taskData);
        return await task.save();
    }

    async getTasks(filter) {
        return await Task.find(filter);
    }

    async updateTask(id, updateData) {
        return await Task.findByIdAndUpdate(id, updateData, { new: true });
    }

    async deleteTask(id) {
        return await Task.findByIdAndDelete(id);
    }
}

module.exports = new TaskService();
