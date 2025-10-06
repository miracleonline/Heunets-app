import { Link } from 'react-router-dom';

const ContributorDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contributor Dashboard</h2>
      <p>Welcome! You can manage and post tasks here.</p>
      <div style={{ marginTop: '1rem' }}>
        <Link to="/tasks">
          <button>View All Tasks</button>
        </Link>
        <Link to="/tasks/new" style={{ marginLeft: '1rem' }}>
          <button>Create New Task</button>
        </Link>
      </div>
    </div>
  );
};

export default ContributorDashboard;
