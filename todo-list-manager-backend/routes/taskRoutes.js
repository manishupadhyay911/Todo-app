const express = require('express');
const Task = require('../models/Task');
const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/', async (req, res) => {
    const task = new Task(req.body);
    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.patch('/:id', async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) return res.status(404).json({ message: 'Task not found' });

        Object.assign(task, req.body);
        const updatedTask = await task.save();
        res.json(updatedTask);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, { deleted: true }, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found' });
      }
      res.json({ message: 'Task deleted successfully', task });
    } catch (error) {
      console.error('Error deleting task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  router.post('/undo/:id', async (req, res) => {
    try {
      const task = await Task.findByIdAndUpdate(req.params.id, { deleted: false }, { new: true });
      if (!task) {
        return res.status(404).json({ message: 'Task not found or already restored' });
      }
      res.json({ message: 'Task restored successfully', task });
    } catch (error) {
      console.error('Error restoring task:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
