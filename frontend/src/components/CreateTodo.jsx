import { useState } from 'react';

export function CreateTodo(props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  return (
    <div>
      <input
        type="text"
        placeholder="enter the title"
        value={title}
        onChange={(e) => setTitle(e.target.value)} // Update the title state
      />
      <br />
      <input
        type="text"
        placeholder="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)} // Update the description state
      />
      <br />
      <button
        onClick={() => {
          fetch("http://localhost:3000/todo", {
            method: "POST",
            headers: {
              "Content-Type": "application/json", // Fixed the typo
            },
            body: JSON.stringify({
              title: title,
              description: description, // Corrected the key name
            }),
          })
            .then(async (res) => {
              if (res.ok) {
                const json = await res.json();
                alert("Todo added successfully");
              }
            })
         
        }}
      >
        Create a Todo
      </button>
    </div>
  );
}
