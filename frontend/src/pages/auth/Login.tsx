import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { useAuthStore } from '../../lib/auth';
import { Lock, Mail, AlertTriangle, Loader2 } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const setAuth = useAuthStore((state: any) => state.setAuth);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await api.post('/auth/login', { email, password });
      const { access_token, user } = response.data;
      
      setAuth(user, access_token);

      // Route users dynamically based on role
      if (user.role === 'rh_admin') navigate('/dashboard');
      else if (user.role === 'candidat') navigate('/portail/candidat');
      else if (user.role === 'fonctionnaire') navigate('/portail/fonctionnaire');

    } catch (err: any) {
      setError(err.response?.data?.error || 'Authentification échouée. Veuillez vérifier vos identifiants.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-govBackground p-4">
      <div className="gov-card w-full max-w-md p-8 relative overflow-hidden">
        
        {/* Soft background pattern */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary-600/5 rounded-bl-full pointer-events-none"></div>

        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-primary-900 rounded-2xl mx-auto flex items-center justify-center shadow-lg shadow-primary-900/20 mb-4 transform -rotate-3">
             <span className="text-white font-serif font-bold text-2xl">A</span>
          </div>
          <h1 className="text-2xl font-bold font-heading text-primary-900">Connexion</h1>
          <p className="text-slate-500 text-sm mt-1">Plateforme RH - Commune de Larache</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex items-center gap-3">
            <AlertTriangle size={18} />
            <p>{error}</p>
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Adresse Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600/20 outline-none transition-all"
                placeholder="votre@email.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1.5">Mot de passe</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-primary-600/20 outline-none transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-primary-900 hover:bg-primary-800 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-primary-900/20 hover:shadow-xl transition-all flex items-center justify-center mt-2 group disabled:opacity-70"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Se Connecter'}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-8 font-medium">
          Vous n'avez pas de compte ? <Link to="/register" className="text-blue-600 hover:underline">Inscrivez-vous</Link>
        </p>
      </div>
    </div>
  );
}
