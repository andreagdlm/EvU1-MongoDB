const Task = require('../models/tasks');

async function getAllTasks(userId) {
    try {
        const tasks = await Task.find({ userId }); // Filtrar por userId
        return tasks;
    } catch (error) {
        throw new Error('Error al obtener las tareas');
    }
}

async function createTask(title, description, userId) {
    try {
        const newTask = new Task({ title, description, userId });
        await newTask.save();
        return newTask;
    } catch (error) {
        throw new Error('Error al crear la tarea');
    }
}

async function deleteTask(id) {
    try {
        const deletedTask = await Task.findByIdAndDelete(id);
        return deletedTask;
    } catch (error) {
        throw new Error('Error al eliminar la tarea');
    }
}

async function putTask(id, title, description) {
    try {
        const updatedTask = await Task.findByIdAndUpdate(id, { title, description }, { new: true });
        return updatedTask;
    } catch (error) {
        throw new Error('Error al actualizar la tarea');
    }
}

async function getTaskById(id) {
    try {
        const task = await Task.findById(id);
        return task;
    } catch (error) {
        throw new Error('Error al obtener la tarea');
    }
}

module.exports = {
    getAllTasks,
    createTask,
    deleteTask,
    putTask,
    getTaskById
};