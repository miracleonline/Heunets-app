import React, { useState } from 'react';
import { createTask } from '../api/tasks';
import { useNavigate } from 'react-router-dom';

export default function CreateTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createTask({ title, description, dueDate });
      navigate('/tasks');
    } catch (err) {
      alert('Error creating task');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Create New Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Title"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />
        <input
          placeholder="Description"
          value={description}
          onChange={e => setDescription(e.target.value)}
          required
        />
        <input
          type="date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
}
