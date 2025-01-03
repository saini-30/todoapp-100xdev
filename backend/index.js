const express = require('express');
const { todoSchema, updatetodo } = require('./types');
const { todo } = require('./db');
const cors = require("cors");
const app = express();

app.use(express.json());

// Allow requests from localhost:5173 (frontend)
app.use(cors({
    origin: 'http://localhost:5173', // Allow frontend origin
}));

// Route to create a new todo
app.post('/todo', async (req, res) => {
    const createpayload = req.body;
    const parsedpayload = todoSchema.safeParse(createpayload);
    if (!parsedpayload.success) {
        res.status(400).json({
            error: 'You sent an invalid payload',
        });
        return;
    }

    await todo.create({
        title: createpayload.title,
        description: createpayload.description,
        completed: false,
    });

    res.json({ 
        msg: 'Todo created successfully',
    });
});

// Route to get all todos
app.get('/todos', async (req, res) => {
    const todos = await todo.find({});
    res.json({ todos });
});

// Route to update todo completion status
app.put('/completed', async (req, res) => {
    const updatepayload = req.body;
    console.log('Received update payload:', updatepayload);

    if (!updatepayload.id) {
        return res.status(400).json({ error: 'Missing todo id' });
    }

    const todoToUpdate = await todo.findOne({ _id: updatepayload.id });
    if (!todoToUpdate) {
        return res.status(404).json({ error: 'Todo not found' });
    }

    await todo.updateOne({ _id: updatepayload.id }, { $set: { completed: true } });
    console.log('Todo marked as complete:', updatepayload.id);

    res.json({ msg: 'Todo updated successfully' });
});

// Start the server and listen on a specific port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
