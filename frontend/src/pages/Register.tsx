import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthProvider';
import { useNavigate, Link } from 'react-router-dom';

export default function Register() {
  const { register } = useContext(AuthContext);
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'volunteer' });
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await register(form);
    navigate('/dashboard');
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: '2rem' }}>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <input placeholder="Password" type="password" value={form.password} onChange={e => setForm({ ...form, password: e.target.value })} />
        <select value={form.role} onChange={e => setForm({ ...form, role: e.target.value })}>
          <option value="volunteer">Volunteer</option>
          <option value="contributor">Contributor</option>
        </select>
        <button type="submit">Register</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
