import React, { useState, useEffect } from 'react';

export function Todos() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
        async function fetchTodos() {
            const response = await fetch('http://localhost:3000/todos');
            const data = await response.json();
            setTodos(data.todos);
        }

        fetchTodos();
    }, []);

    const handleMarkComplete = async (todoId) => {
        console.log(`Marking todo ${todoId} as complete...`);
        
        const todoToUpdate = todos.find(todo => todo._id === todoId);
        
        if (todoToUpdate.completed) {
            console.log('Todo already completed');
            return; // Avoid unnecessary API call if it's already completed
        }

        const response = await fetch('http://localhost:3000/completed', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: todoId }),
        });

        if (response.ok) {
            console.log(`Todo ${todoId} successfully updated`);
            const updatedTodos = todos.map(todo =>
                todo._id === todoId ? { ...todo, completed: true } : todo
            );
            setTodos(updatedTodos);
        } else {
            const result = await response.json();
            console.error(result.error); // Show error message from the backend
        }
    };

    return (
        <div>
            {todos.map((todo) => (
                <div key={todo._id}>
                    <h1>{todo.title}</h1>
                    <h2>{todo.description}</h2>
                    <button onClick={() => handleMarkComplete(todo._id)}>
                        {todo.completed ? "Completed" : "Mark as Complete"}
                    </button>
                </div>
            ))}
        </div>
    );
}
