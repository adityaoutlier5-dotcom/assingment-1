import Navbar from '../components/Navbar';
import FeatureCards from '../components/FeatureCards';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../context/AuthContext';
import AuthForm from '../components/AuthForm';

const Dashboard = () => {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  return (
    <main className="min-h-screen p-4 md:p-8 bg-gradient-to-br from-slate-950 to-slate-800 text-white">
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <div className="mt-6 flex justify-between items-center">
        <h2 className="text-2xl font-semibold">Smart Farmer Decision System</h2>
        {user && <button className="px-3 py-2 rounded bg-red-500/70" onClick={logout}>Logout</button>}
      </div>
      {!user ? <div className="max-w-md mt-4"><AuthForm /></div> : <FeatureCards />}
    </main>
  );
};

export default Dashboard;
