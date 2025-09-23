const User = require('../models/User.Model');

const getAllTodos = async (req, res) => {

    const { id } = req.params;

    try {
        const todoList = await User.findOne({ id }).select("todoList -_id");
        res.status(200).json({ message: "fetched todod from db", todoList });
    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }

};

const addTodo = async (req, res) => {
    const { id } = req.params;
    const { task, status } = req.body;

    if (!task) return res.status(400).json({ message: "Task is required" });
    try {

        const user = await User.findOne({ id });

        if (!user) return res.status(404).json({ message: "User not found" });

        if (!user.todoList) return res.status(500).json({ message: "Not found" });
        const alreadyExist = user.todoList.find(list => list.task === task);

        if (alreadyExist) return res.status(409).json({ message: "This task was already added" })
        user.todoList.push({ task, status, createdAt: new Date().toISOString().split('T')[0] });

        await user.save();
        const addedTask = user.todoList[user.todoList.length - 1];

        res.status(200).json({ message: "Task added", addedTask });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
};


const updateTodoStatus = async (req, res) => {
    const { id } = req.params;
    const { task, status } = req.body;

    if (!task) return res.status(400).json({ message: "task is required" });
    if (!status) return res.status(400).json({ message: "Status is required" });

    try {
        const user = await User.findOne({ id });
        const todoList = user.todoList;
        const todo = todoList.find(todo => todo.task === task);

        if (!todo) return res.status(404).json({ message: "todo with this task name didn't exist" });

        // update the todo status
        todo.status = status;
        await user.save();

        res.status(200).json({ message: "Task updated", todo });

    }
    catch (err) {
        res.status(500).json({ message: err.message });
    }
}

const deleteTodo = async (req, res) => {
    const { id } = req.params;
    const { task } = req.query;

    if (!task) return res.status(400).json({ message: "task is required" });

    try {
        const user = await User.findOne({ id });
        if (!user) return res.status(404).json({ message: "User not found" });
        const todoList = user.todoList;
        const todo = todoList.find(todo => todo.task === task);

        if (!todo) return res.status(404).json({ message: "todo not found with the task name" });

        const filteredArray = todoList.filter(todo => todo.task !== task);
        user.todoList = filteredArray
        await user.save();
        res.status(200).json({ message: "Task removed ", removedTask: todo });

        //   User.findByIdAndDelete(id, { $pull: { todoList: { task } } }, { new: true });

    }
    catch (err) {
        res.status(500).json({ message: err.message });

    }
}

module.exports = { getAllTodos, addTodo, updateTodoStatus, deleteTodo };