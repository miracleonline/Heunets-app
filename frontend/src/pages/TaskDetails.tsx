import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getTask, applyToTask } from '../api/tasks';

export default function TaskDetails() {
  const { id } = useParams();
  const [task, setTask] = useState<any>(null);

  useEffect(() => {
    if (id) getTask(id).then(res => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>
      <button onClick={() => applyToTask(task._id)}>Apply</button>
    </div>
  );
}
