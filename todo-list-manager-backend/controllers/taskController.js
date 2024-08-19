const taskService = require('../services/taskService');
const undoRedoService = require('../services/undoRedoService');
const logger = require('../utils/logger');

exports.createTask = async (req, res, next) => {
    try {
        const task = await taskService.createTask(req.body);
        undoRedoService.saveState();
        res.status(201).json(task);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

exports.getTasks = async (req, res, next) => {
    try {
        const filter = req.query.status ? { status: req.query.status } : {};
        const tasks = await taskService.getTasks(filter);
        res.status(200).json(tasks);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

exports.updateTask = async (req, res, next) => {
    try {
        const task = await taskService.updateTask(req.params.id, req.body);
        undoRedoService.saveState();
        res.status(200).json(task);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

exports.deleteTask = async (req, res, next) => {
    try {
        await taskService.deleteTask(req.params.id);
        undoRedoService.saveState();
        res.status(204).send();
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

exports.undo = async (req, res, next) => {
    try {
        const state = undoRedoService.undo();
        res.status(200).json(state);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};

exports.redo = async (req, res, next) => {
    try {
        const state = undoRedoService.redo();
        res.status(200).json(state);
    } catch (error) {
        logger.error(error.message);
        next(error);
    }
};
