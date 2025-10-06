import { Link } from 'react-router-dom';

const VolunteerDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Volunteer Dashboard</h2>
      <p>Welcome! Browse and apply for available tasks below.</p>
      <Link to="/tasks">
        <button>View Tasks</button>
      </Link>
    </div>
  );
};

export default VolunteerDashboard;
