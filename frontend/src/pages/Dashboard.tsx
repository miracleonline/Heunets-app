import { useContext } from 'react';
import { AuthContext } from '../context/AuthProvider';
import ContributorDashboard from '../components/ContributorDashboard';
import VolunteerDashboard from '../components/VolunteerDashboard';

export default function Dashboard() {
  const { user, logout } = useContext(AuthContext);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <header style={{ padding: '1rem', background: '#eee' }}>
        <h1>Welcome, {user.name}</h1>
        <button onClick={logout}>Logout</button>
      </header>

      {user.role === 'contributor' ? <ContributorDashboard /> : <VolunteerDashboard />}
    </div>
  );
}
