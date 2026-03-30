import { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const AuthForm = () => {
  const { login, signup } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ name: '', email: '', password: '', language: 'hi' });

  const submit = async (e) => {
    e.preventDefault();
    if (isLogin) await login({ email: form.email, password: form.password });
    else await signup(form);
  };

  return (
    <form onSubmit={submit} className="glass-card p-5 space-y-3">
      {!isLogin && <input className="w-full p-2 rounded bg-slate-800" placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />}
      <input className="w-full p-2 rounded bg-slate-800" placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <input className="w-full p-2 rounded bg-slate-800" type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <button className="w-full p-2 rounded bg-emerald-500 text-black font-semibold">{isLogin ? 'Login' : 'Signup'}</button>
      <p className="text-sm cursor-pointer" onClick={() => setIsLogin(!isLogin)}>{isLogin ? 'Create account' : 'Already have account'}</p>
    </form>
  );
};

export default AuthForm;
