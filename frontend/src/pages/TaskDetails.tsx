import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTask, applyToTask } from '../api/tasks';

export default function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState<any>(null);

  const user = JSON.parse(localStorage.getItem('user') || '{}'); 

  // Form fields
  const [applicantName, setApplicantName] = useState('');
  const [course, setCourse] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (id) getTask(id).then(res => setTask(res.data));
  }, [id]);

  if (!task) return <p>Loading...</p>;

  const handleApply = async () => {
    setError('');
    setSuccess('');
    if (!applicantName.trim() || !course.trim() || !message.trim()) {
      setError('Please fill out all fields before applying.');
      return;
    }
    setLoading(true);
    try {
      console.log('Submitting application:', { applicantName, course, message });
      await applyToTask(task._id, { applicantName, course, message });
      setSuccess('Application submitted successfully!');
      setApplicantName('');
      setCourse('');
      setMessage('');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to apply for task.');
    } finally {
      setLoading(false);
    }
  };

  const handleViewApplications = () => {
    navigate(`/tasks/${task._id}/applications`);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p><strong>Due:</strong> {new Date(task.dueDate).toLocaleDateString()}</p>

      {/* For contributors */}
      {user?.role === 'contributor' && (
        <div style={{ marginTop: '1rem' }}>
          <button onClick={handleViewApplications}>
            View Applications
          </button>
        </div>
      )}

      {/* For volunteers */}
      {user?.role === 'volunteer' && (
        <div style={{ marginTop: '1rem' }}>
          <input
            type="text"
            placeholder="Your Name"
            value={applicantName}
            onChange={e => setApplicantName(e.target.value)}
            disabled={loading}
            style={{ display: 'block', marginBottom: '0.5rem', width: '300px' }}
          />
          <input
            type="text"
            placeholder="Your Course"
            value={course}
            onChange={e => setCourse(e.target.value)}
            disabled={loading}
            style={{ display: 'block', marginBottom: '0.5rem', width: '300px' }}
          />
          <textarea
            placeholder="Write a message to the contributor"
            value={message}
            onChange={e => setMessage(e.target.value)}
            rows={4}
            cols={50}
            disabled={loading}
            style={{ display: 'block', marginBottom: '0.5rem' }}
          />
          <button onClick={handleApply} disabled={loading}>
            {loading ? 'Applying...' : 'Apply'}
          </button>
          {error && <p style={{ color: 'red' }}>{error}</p>}
          {success && <p style={{ color: 'green' }}>{success}</p>}
        </div>
      )}
    </div>
  );
}
