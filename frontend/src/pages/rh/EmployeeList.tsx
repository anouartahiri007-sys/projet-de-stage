import { useState, useEffect } from 'react';
import { 
  Search, Filter, Plus, Eye, Edit, Trash2, 
  FileText, Download, MoreVertical, CheckCircle2, 
  Clock, AlertCircle, ChevronRight, User, Mail, 
  Briefcase, MapPin, ShieldCheck, ListFilter, Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useLang } from '../../context/LangContext';
import { api } from '../../lib/api';
import { toast } from 'react-hot-toast';

const EmployeeList = () => {
  const navigate = useNavigate();
  const { t, lang } = useLang();
  const [employees, setEmployees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('all');

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    setLoading(true);
    try {
      const res = await api.get('/fonctionnaires');
      setEmployees(res.data);
    } catch (err) {
      toast.error(t('fetchError'));
    } finally {
      setLoading(false);
    }
  };

  const getStatusStyle = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'active': 
        return { 
          bg: 'bg-emerald-50 text-emerald-700 border-emerald-100', 
          icon: <CheckCircle2 size={12} />,
          label: lang === 'ar' ? 'نشط' : 'Actif'
        };
      case 'onleave': 
        return { 
          bg: 'bg-amber-50 text-amber-700 border-amber-100', 
          icon: <Clock size={12} />,
          label: lang === 'ar' ? 'في رخصة' : 'En congé'
        };
      case 'inactive': 
        return { 
          bg: 'bg-rose-50 text-rose-700 border-rose-100', 
          icon: <AlertCircle size={12} />,
          label: lang === 'ar' ? 'غير نشط' : 'Inactif'
        };
      default: return { bg: 'bg-gray-50 text-gray-700 border-gray-100', icon: null, label: status };
    }
  };

  const filteredEmployees = employees.filter(emp => {
    const matchesSearch = 
      emp.name?.toLowerCase().includes(search.toLowerCase()) || 
      emp.matricule?.toLowerCase().includes(search.toLowerCase()) ||
      emp.email?.toLowerCase().includes(search.toLowerCase());
    
    const matchesTab = activeTab === 'all' || emp.status?.toLowerCase() === activeTab.toLowerCase();
    
    return matchesSearch && matchesTab;
  });

  const handleDelete = async (id: number) => {
    if (!window.confirm(lang === 'ar' ? 'هل أنت متأكد من حذف هذا الموظف؟' : 'Êtes-vous sûr de vouloir supprimer cet employé ?')) return;
    
    try {
      await api.delete(`/fonctionnaires/${id}`);
      setEmployees(prev => prev.filter(e => e.id !== id));
      toast.success(t('deleteSuccess'));
    } catch (err) {
      toast.error(t('error'));
    }
  };

  const handleExport = () => {
    // Basic CSV export for now
    const headers = ["Matricule", "Nom", "Email", "Direction", "Status"];
    const rows = employees.map(e => [
      e.matricule,
      `${e.prenom} ${e.nom}`,
      e.user?.email || e.email,
      e.direction || e.department,
      e.status
    ]);
    
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
      
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "employees_report.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="animate-premium-in space-y-10 pb-20" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8">
        <div>
            <h1 className="text-4xl font-black text-[#003366] tracking-tight uppercase">
              {t('employees')}
            </h1>
            <nav className="flex items-center gap-3 text-xs font-black text-slate-400 mt-3 uppercase tracking-widest">
              <span className="hover:text-[#006241] cursor-pointer transition-colors" onClick={() => navigate('/dashboard')}>{t('dashboard')}</span>
              <ChevronRight size={14} className={lang === 'ar' ? 'rotate-180' : ''} />
              <span className="text-[#C5A059]">{t('employees')}</span>
            </nav>
          </div>
          
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <button onClick={handleExport} className="flex-1 lg:flex-none btn-secondary">
               <Download size={18} />
               {lang === 'ar' ? 'تصدير' : 'Exporter'}
            </button>
            <button
              onClick={() => navigate('/rh/employees/add')}
              className="flex-1 lg:flex-none btn-primary"
            >
              <Plus size={20} />
              {t('addEmployee')}
            </button>
          </div>
        </div>
  
        {/* Stats Summary Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            { label: lang === 'ar' ? 'إجمالي الموظفين' : 'Total Effectif', count: employees.length, active: activeTab === 'all', id: 'all', color: 'blue' },
            { label: t('active'), count: employees.filter(e => e.status?.toLowerCase() === 'active').length, active: activeTab === 'active', id: 'active', color: 'emerald' },
            { label: t('onLeave'), count: employees.filter(e => e.status?.toLowerCase() === 'onleave').length, active: activeTab === 'onleave', id: 'onleave', color: 'amber' },
            { label: t('inactive'), count: employees.filter(e => e.status?.toLowerCase() === 'inactive').length, active: activeTab === 'inactive', id: 'inactive', color: 'rose' },
          ].map((tab) => (
            <button 
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-8 rounded-[2.5rem] border transition-all flex flex-col items-start gap-3 relative overflow-hidden group ${
                tab.active 
                ? 'bg-[#003366] border-[#003366] text-white shadow-2xl shadow-blue-900/20' 
                : 'bg-white border-gray-100 text-slate-500 hover:border-[#C5A059] hover:bg-gray-50'
              }`}
            >
              <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60 z-10">{tab.label}</span>
              <span className="text-3xl font-black z-10">{tab.count}</span>
              <div className={`absolute -right-4 -bottom-4 opacity-[0.05] group-hover:scale-110 transition-transform ${tab.active ? 'text-white' : 'text-[#003366]'}`}>
                 <Users size={80} />
              </div>
            </button>
          ))}
        </div>
  
        {/* Main Table Container */}
        <div className="gov-card overflow-hidden">
          
          {/* Table Controls */}
          <div className="p-10 border-b border-gray-50 bg-gray-50/30 flex flex-col lg:flex-row justify-between items-center gap-8">
             <div className="relative w-full lg:w-96 group">
                <Search className={`absolute ${lang === 'ar' ? 'right-6' : 'left-6'} top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-[#C5A059] transition-colors`} size={20} />
                <input 
                  type="text" 
                  placeholder={lang === 'ar' ? 'بحث عن موظف (الاسم، الرقم، البريد)...' : 'Rechercher un employé...'}
                  className={`w-full bg-white border-gray-100 rounded-2xl py-4 font-bold text-slate-700 focus:ring-2 focus:ring-[#C5A059] focus:border-transparent transition-all shadow-sm ${lang === 'ar' ? 'pr-14 pl-6 text-right' : 'pl-14 pr-6 text-left'}`}
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
             </div>
             
             <div className="flex items-center gap-4 w-full lg:w-auto">
                <p className="text-xs font-black text-slate-300 uppercase tracking-widest hidden lg:block">
                   {lang === 'ar' ? `تم العثور على ${filteredEmployees.length} نتيجة` : `${filteredEmployees.length} résultats trouvés`}
                </p>
             </div>
          </div>

        {/* Table Content */}
        <div className="overflow-x-auto custom-scrollbar">
          {loading ? (
            <div className="p-20 text-center space-y-4">
              <div className="w-12 h-12 border-4 border-[#003366] border-t-transparent rounded-full animate-spin mx-auto"></div>
              <p className="text-slate-400 font-black text-xs uppercase tracking-widest">{lang === 'ar' ? 'جاري التحميل...' : 'Chargement...'}</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-[#F8FAFC]">
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{lang === 'ar' ? 'الموظف' : 'Employé'}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('matricule')}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('department')}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('status')}</th>
                  <th className="px-10 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t('actions')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filteredEmployees.map((employee) => {
                  const statusStyle = getStatusStyle(employee.status);
                  return (
                    <tr key={employee.id} className="group hover:bg-emerald-50/5 transition-all">
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-6">
                          <div className="relative">
                             <div className="w-14 h-14 rounded-2xl bg-[#003366]/5 flex items-center justify-center text-[#003366] overflow-hidden">
                                {employee.nom_ar ? (
                                    <div className="w-full h-full flex items-center justify-center font-black text-xl bg-[#003366] text-white">
                                        {(employee.nom || "").charAt(0)}{(employee.prenom || "").charAt(0)}
                                    </div>
                                ) : (
                                    <img src={`https://i.pravatar.cc/150?u=${employee.id}`} className="w-full h-full object-cover" alt="" />
                                )}
                             </div>
                          </div>
                          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                            <h4 className="font-black text-[#003366] text-lg group-hover:text-[#006241] transition-colors">
                                {lang === 'ar' && employee.nom_ar ? `${employee.nom_ar} ${employee.prenom_ar}` : `${employee.prenom} ${employee.nom}`}
                            </h4>
                            <div className="flex items-center gap-2 mt-1 text-slate-400">
                               <Mail size={12} />
                               <span className="text-xs font-medium">{employee.user?.email || employee.email}</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className="px-4 py-2 bg-slate-50 text-slate-600 rounded-xl text-xs font-black tracking-widest">{employee.matricule}</span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex flex-col">
                          <span className="text-sm font-bold text-slate-700">{employee.direction || employee.department}</span>
                          <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mt-1">{employee.grade}</span>
                        </div>
                      </td>
                      <td className="px-10 py-8">
                        <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest border ${statusStyle.bg}`}>
                          {statusStyle.icon}
                          {statusStyle.label}
                        </span>
                      </td>
                      <td className="px-10 py-8">
                        <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all translate-x-4 group-hover:translate-x-0">
                          <button 
                            onClick={() => navigate(`/personnel/${employee.id}`)}
                            className="p-3 bg-white text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl shadow-sm transition-all border border-gray-100"
                          >
                            <Eye size={18} />
                          </button>
                          <button 
                            onClick={() => navigate(`/rh/employees/edit/${employee.id}`)}
                            className="p-3 bg-white text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-xl shadow-sm transition-all border border-gray-100"
                          >
                            <Edit size={18} />
                          </button>
                          <button 
                            onClick={() => handleDelete(employee.id)}
                            className="p-3 bg-white text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl shadow-sm transition-all border border-gray-100"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default EmployeeList;
