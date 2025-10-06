import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getApplicationsForTask } from '../api/tasks';

interface Application {
  _id: string;
  applicantName: string;
  course: string;
  status: string;
  message: string;
  appliedAt: string;
  userId?: { name?: string; email?: string };
}

export default function TaskApplications() {
  const { id } = useParams();
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    getApplicationsForTask(id)
      .then(res => setApplications(res.data))
      .catch(err => setError(err.response?.data?.message || 'Failed to load applications.'))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p>Loading applications...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;
  if (!applications.length) return <p>No one has applied for this task yet.</p>;

  return (
    <div style={{ padding: '2rem' }}>
      <h2>Applications for Task</h2>
      <table border={1} cellPadding={10} style={{ borderCollapse: 'collapse', width: '100%', marginTop: '1rem' }}>
        <thead>
          <tr>
            <th>Applicant Name</th>
            <th>Course</th>
            <th>Message</th>
            <th>Status</th>
            <th>Applied At</th>
          </tr>
        </thead>
        <tbody>
          {applications.map(app => (
            <tr key={app._id}>
              <td>{app.applicantName}</td>
              <td>{app.course}</td>
              <td>{app.message}</td>
              <td>{app.status}</td>
              <td>{new Date(app.appliedAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
