import { useAuth } from '../context/useAuth';

function Dashboard() {
  const { role } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Logged-in role: {role}</p>
    </div>
  );
}

export default Dashboard;