import React from 'react';
import { Link } from 'react-router-dom';

const ContributorDashboard = () => {
  return (
    <div style={{ padding: '2rem' }}>
      <h2>Contributor Dashboard</h2>
      <p>Welcome! You can manage and post tasks here.</p>
      <Link to="/tasks/1">View Sample Task</Link>
    </div>
  );
};

export default ContributorDashboard;
