import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import { Link } from 'react-router-dom';

export default function TaskList() {
  const [tasks, setTasks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getTasks()
      .then(res => setTasks(res.data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading tasks...</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Available Tasks</h2>
      <ul>
        {tasks.map(task => (
          <li key={task._id}>
            <Link to={`/tasks/${task._id}`}>{task.title}</Link> - Due: {new Date(task.dueDate).toLocaleDateString()}
          </li>
        ))}
      </ul>
    </div>
  );
}
