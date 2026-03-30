import { Moon, Sun } from 'lucide-react';

const Navbar = ({ theme, toggleTheme }) => (
  <header className="flex items-center justify-between p-4 glass-card sticky top-4 z-30">
    <h1 className="text-xl font-bold text-emerald-400">KrishiAI</h1>
    <button onClick={toggleTheme} className="p-2 rounded-xl bg-emerald-500/20 text-emerald-300">
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  </header>
);

export default Navbar;
