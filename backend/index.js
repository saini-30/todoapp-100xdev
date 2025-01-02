const express = require('express');
const { todoSchema, updatetodo } = require('./types');
const { todo } = require('./db');
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());

// Route to create a new todo
app.post('/todo', async (req, res) => {
    const createpayload = req.body;
    const parsedpayload = todoSchema.safeParse(createpayload);

    // just to check if the data came is invalide syntax or not  is 
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
    const parsedpayload = updatetodo.safeParse(updatepayload);
    if (!parsedpayload.success) {
        res.status(400).json({
            error: 'You sent an invalid input',
        });
        return;
    }

    await todo.update(
        { _id: req.body.id }, 
     { completed: true } 
    );

    res.json({
        msg: 'Todo updated successfully',
    });
});

// Start the server and listen on a specific port
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
