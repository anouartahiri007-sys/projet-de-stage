import { useState, useEffect } from 'react';
import { useLang } from '../context/LangContext';
import { useAuthStore } from '../lib/auth';
import { api } from '../lib/api';
import { User, LogOut, ChevronRight, Calendar, DollarSign } from 'lucide-react';

const FonctionnairePortal = () => {
  const { user, logout } = useAuthStore();
  const { t, lang } = useLang();
  const [activeTab, setActiveTab] = useState('profile');
  const [leaves, setLeaves] = useState([]);

  useEffect(() => {
    if (activeTab === 'leaves') fetchLeaves();
  }, [activeTab]);

  const fetchLeaves = async () => {
    try {
      const { data } = await api.get('/leaves/my');
      setLeaves(data);
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="gov-card p-8">
            <h2 className={`text-2xl font-bold text-gray-800 mb-6 border-b pb-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('profile')}</h2>
            <div className={`space-y-4 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
              <div><span className="font-bold text-gray-500">{t('nameLabel')}:</span> {user?.name}</div>
              <div><span className="font-bold text-gray-500">{t('emailLabel')}:</span> {user?.email}</div>
              <div><span className="font-bold text-gray-500">{t('roleLabel')}:</span> {user?.role}</div>
            </div>
          </div>
        );
      case 'leaves':
        return (
          <div className="gov-card p-8">
            <div className={`flex justify-between items-center mb-6 border-b pb-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
              <h2 className="text-2xl font-bold text-gray-800">{t('leaves')}</h2>
              <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-bold transition-colors active:scale-95">{t('requestLeave')}</button>
            </div>
            {leaves.length === 0 ? <p className={`text-gray-500 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('noLeaveRequests')}</p> : (
              <ul className="space-y-3">
                {leaves.map((l: any) => (
                  <li key={l.id} className={`p-4 border rounded-xl flex justify-between ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                    <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                      <span className="font-bold">{l.type}</span> - {l.start_date} {lang === 'ar' ? 'إلى' : 'à'} {l.end_date}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">{l.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#F4F7FB]" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      {/* Header */}
      <header className={`bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
            <h1 className="font-bold text-gray-800 leading-none">{t('employeePortal')}</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">{t('communeLarache')}</p>
          </div>
        </div>
        <button onClick={() => logout()} className={`flex items-center gap-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg font-bold transition-colors ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
          {t('logout')} <LogOut size={18} className={lang === 'ar' ? 'rotate-180' : ''} />
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3 space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent'}`}>
            <span className="flex items-center gap-3"><User size={20} /> {t('profile')}</span>
            <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
          <button onClick={() => setActiveTab('leaves')} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === 'leaves' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent'}`}>
            <span className="flex items-center gap-3"><Calendar size={20} /> {t('leaves')}</span>
            <ChevronRight size={16} className={lang === 'ar' ? 'rotate-180' : ''} />
          </button>
        </aside>

        {/* Content */}
        <section className="md:col-span-9 animate-fade-in">
          {renderContent()}
        </section>
      </main>
    </div>
  );
};

export default FonctionnairePortal;
