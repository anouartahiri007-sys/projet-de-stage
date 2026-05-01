import { useState, useEffect } from 'react';
import { 
  Users, Search, Filter, Plus, Mail, Phone, 
  MapPin, ChevronRight, MoreHorizontal, UserCheck,
  Download, RefreshCw, AlertCircle, Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const EmployeeList = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [gradeFilter, setGradeFilter] = useState('all');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newEmployee, setNewEmployee] = useState({ name: '', cin: '', grade: 'Médecin', department: '', email: '' });
  const [isAdding, setIsAdding] = useState(false);
  const [addError, setAddError] = useState('');

  const { data: employees = [], isLoading, isError, refetch } = useQuery({
    queryKey: ['employees'],
    queryFn: async () => {
      try {
        const res = await axios.get('http://localhost:8000/api/fonctionnaires');
        return res.data;
      } catch (err) {
        console.error('API Error:', err);
        return [];
      }
    },
    retry: 1
  });

  const handleAddEmployee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAdding(true);
    setAddError('');
    try {
      await axios.post('http://localhost:8000/api/fonctionnaires', newEmployee);
      toast.success('Agent ajouté avec succès !');
      setShowAddModal(false);
      refetch();
    } catch (err: any) {
      setAddError(err?.response?.data?.message || 'Erreur lors de l\'ajout. Vérifiez les champs.');
    } finally {
      setIsAdding(false);
    }
  };

  const grades = ['all', 'Médecin', 'Infirmier', 'Vétérinaire', 'Technicien', 'Administrateur'];

  const filtered = employees.filter((emp: any) => {
    const matchesSearch = emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          emp.cin?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || emp.status === statusFilter;
    const matchesGrade = gradeFilter === 'all' || emp.grade === gradeFilter;
    return matchesSearch && matchesStatus && matchesGrade;
  });

  return (
    <div className="animate-slide-up space-y-6 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-[#152C4D] font-heading">Répertoire du Personnel</h1>
          <p className="text-slate-500 mt-1">Gérez l'ensemble du personnel médical, technique et administratif.</p>
        </div>
        <div className="flex gap-3">
          <button onClick={() => refetch()} className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-blue-600 hover:border-blue-200 transition-all shadow-sm">
            <RefreshCw size={20} className={isLoading ? 'animate-spin' : ''} />
          </button>
          <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2 px-6 py-2.5 shadow-xl shadow-blue-900/10">
            <Plus size={20} /> Ajouter un agent
          </button>
        </div>
      </div>

      <div className="gov-card p-6">
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
            <input 
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Rechercher par nom, CIN, département..."
              className="form-input w-full pl-12 h-12"
            />
          </div>
          <div className="flex gap-3">
            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-2xl px-4 py-2">
              <Filter size={18} className="text-slate-400" />
              <span className="text-[10px] font-black uppercase text-slate-400 tracking-widest mr-2">Filtres avancés</span>
              <select 
                value={statusFilter} 
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
              >
                <option value="all">Tous les statuts</option>
                <option value="active">Actif</option>
                <option value="conge">En congé</option>
                <option value="retired">Retraité</option>
              </select>
              <div className="w-[1px] h-4 bg-slate-200 mx-2"></div>
              <select 
                value={gradeFilter} 
                onChange={(e) => setGradeFilter(e.target.value)}
                className="bg-transparent text-xs font-bold text-slate-600 outline-none cursor-pointer"
              >
                {grades.map(g => (
                  <option key={g} value={g}>
                    {g === 'all' ? 'Tous les grades' : g}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {isLoading ? (
          <div className="py-20 flex flex-col items-center justify-center">
            <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
            <p className="text-[#152C4D] font-bold">Chargement des données...</p>
          </div>
        ) : isError ? (
          <div className="py-12 flex flex-col items-center justify-center text-center bg-rose-50/50 rounded-3xl border-2 border-dashed border-rose-100">
            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-rose-500 shadow-sm mb-6">
              <AlertCircle size={32} />
            </div>
            <p className="text-rose-600 font-bold mb-1">Impossible de charger les données</p>
            <p className="text-slate-400 text-sm mb-4 font-medium italic">Vérifiez que le serveur API est démarré.</p>
            <button onClick={() => refetch()} className="btn-primary">Réessayer</button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="border-b border-slate-100">
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Agent</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">CIN</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Grade</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Département</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Statut</th>
                  <th className="px-6 py-4 text-xs font-bold text-[#152C4D] uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-50">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400 font-bold italic">
                      Aucun agent trouvé.
                    </td>
                  </tr>
                ) : filtered.map((emp: any) => (
                  <tr key={emp.id} className="group hover:bg-slate-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center font-bold text-slate-400 text-sm">
                          {emp.name?.charAt(0)}
                        </div>
                        <div>
                          <p className="font-bold text-[#152C4D] group-hover:text-blue-600 transition-colors">{emp.name}</p>
                          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{emp.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-slate-600">{emp.cin}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{emp.grade}</td>
                    <td className="px-6 py-4 text-sm font-medium text-slate-500">{emp.department || 'Non défini'}</td>
                    <td className="px-6 py-4">
                      <span className={`text-[10px] font-black uppercase px-3 py-1 rounded-full border ${
                        emp.status === 'active' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                        emp.status === 'conge' ? 'bg-amber-50 text-amber-700 border-amber-100' :
                        'bg-slate-50 text-slate-500 border-slate-100'
                      }`}>
                        {emp.status === 'active' ? '● Actif' : emp.status === 'conge' ? '● En congé' : '● Retraité'}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button onClick={() => navigate(`/rh/employees/${emp.id}`)} className="p-2 hover:bg-white rounded-lg text-slate-400 hover:text-blue-600 hover:shadow-sm transition-all">
                          <ChevronRight size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
        
        <div className="p-4 border-t border-slate-50 text-xs font-bold text-slate-400 flex justify-between items-center bg-slate-50/30">
          <span>{filtered.length} agent(s) affiché(s)</span>
          <div className="flex gap-2">
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">Précédent</button>
            <button className="px-3 py-1 bg-white border border-slate-200 rounded-lg hover:bg-slate-100 transition-colors">Suivant</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
