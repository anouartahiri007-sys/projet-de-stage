import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { api } from '../../lib/api';
import { User, Mail, Lock, Building, GraduationCap, Loader2, AlertTriangle } from 'lucide-react';

export default function Register() {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', role: 'candidat',
    cin: '', first_name: '', last_name: '', department: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError('');

    try {
      await api.post('/auth/register', formData);
      navigate('/login'); // Force user to login post registration to generate token properly
    } catch (err: any) {
      setError(err.response?.data || 'Inscription échouée.');
    } finally {
      setLoading(false);
    }
  };

  const isCandidat = formData.role === 'candidat';

  return (
    <div className="min-h-screen flex items-center justify-center bg-govBackground p-4 py-12">
      <div className="gov-card w-full max-w-xl p-8">
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold font-heading text-[#152C4D]">Créer un compte</h1>
          <p className="text-slate-500 text-sm mt-1">Rejoignez le portail e-RH Larache</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm rounded-xl border border-red-100 flex gap-3">
            <AlertTriangle size={18} className="shrink-0" />
            <p className="break-words">{JSON.stringify(error)}</p>
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          
          {/* Role Selection Blocks */}
          <div>
             <label className="block text-sm font-bold text-[#152C4D] mb-3">Sélectionnez votre profil :</label>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Option Candidat */}
                <div 
                   onClick={() => setFormData({...formData, role: 'candidat'})}
                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${isCandidat ? 'border-[#3B82F6] bg-blue-50/50' : 'border-slate-100 hover:border-blue-200'}`}
                >
                   <div className={`p-2 rounded-lg ${isCandidat ? 'bg-[#3B82F6] text-white' : 'bg-slate-100 text-slate-500'}`}><GraduationCap size={20} /></div>
                   <div>
                     <p className={`font-bold text-sm ${isCandidat ? 'text-[#152C4D]' : 'text-slate-600'}`}>Candidat</p>
                     <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Pour postuler aux concours</p>
                   </div>
                </div>

                {/* Option RH Admin */}
                <div 
                   onClick={() => setFormData({...formData, role: 'rh_admin'})}
                   className={`p-4 rounded-xl border-2 cursor-pointer transition-all flex items-center gap-4 ${!isCandidat ? 'border-[#152C4D] bg-primary-100/10' : 'border-slate-100 hover:border-primary-200'}`}
                >
                   <div className={`p-2 rounded-lg ${!isCandidat ? 'bg-[#152C4D] text-white' : 'bg-slate-100 text-slate-500'}`}><Building size={20} /></div>
                   <div>
                     <p className={`font-bold text-sm ${!isCandidat ? 'text-[#152C4D]' : 'text-slate-600'}`}>Admin RH</p>
                     <p className="text-[11px] text-slate-400 leading-tight mt-0.5">Gestion des ressources</p>
                   </div>
                </div>

             </div>
          </div>

          <div className="h-px w-full bg-slate-100"></div>

          {/* Account Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nom d'utilisateur</label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 outline-none text-sm" placeholder="john_doe" />
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Adresse Email</label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 outline-none text-sm" placeholder="email@exemple.com" />
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mot de passe</label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                  <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} className="w-full pl-10 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-600/20 outline-none text-sm" placeholder="••••••••" />
                </div>
              </div>
          </div>

          {/* Conditional Fields based on Role */}
          {isCandidat && (
             <div className="p-5 bg-[#F4F7FB]/50 rounded-2xl border border-slate-100 space-y-4">
                 <h3 className="text-xs font-bold uppercase tracking-wider text-[#3B82F6]">Dossier Candidat</h3>
                 <div className="grid grid-cols-2 gap-4">
                     <div className="col-span-2">
                         <label className="block text-xs font-medium text-slate-600 mb-1">CIN (Numéro de carte d'identité)</label>
                         <input type="text" required={isCandidat} value={formData.cin} onChange={e => setFormData({...formData, cin: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white" placeholder="ex: L123456" />
                     </div>
                     <div>
                         <label className="block text-xs font-medium text-slate-600 mb-1">Prénom</label>
                         <input type="text" required={isCandidat} value={formData.first_name} onChange={e => setFormData({...formData, first_name: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white" placeholder="Youssef" />
                     </div>
                     <div>
                         <label className="block text-xs font-medium text-slate-600 mb-1">Nom</label>
                         <input type="text" required={isCandidat} value={formData.last_name} onChange={e => setFormData({...formData, last_name: e.target.value})} className="w-full px-3 py-2.5 rounded-xl border border-slate-200 bg-white" placeholder="Tazi" />
                     </div>
                 </div>
             </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#152C4D] hover:bg-[#1E3E6E] text-white font-bold py-3.5 rounded-xl shadow-lg shadow-[#152C4D]/20 hover:shadow-xl transition-all flex items-center justify-center mt-2 group"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : "Créer le compte"}
          </button>
        </form>

        <p className="text-center text-sm text-slate-500 mt-6 font-medium">
          Déjà un compte ? <Link to="/login" className="text-blue-600 hover:underline">Connectez-vous</Link>
        </p>
      </div>
    </div>
  );
}
