import { useState, useEffect } from 'react';
import { useAuthStore } from '../lib/auth';
import { Calendar, DollarSign, FileText, User, ChevronRight, LogOut, Briefcase } from 'lucide-react';
import { api } from '../lib/api';

const FonctionnairePortal = () => {
  const { user, logout } = useAuthStore();
  const [activeTab, setActiveTab] = useState('profile');
  const [leaves, setLeaves] = useState([]);
  const [payrolls, setPayrolls] = useState([]);

  useEffect(() => {
    if (activeTab === 'leaves') fetchLeaves();
    if (activeTab === 'salary') fetchPayrolls();
  }, [activeTab]);

  const fetchLeaves = async () => {
    try {
      const { data } = await api.get('/leaves/my');
      setLeaves(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchPayrolls = async () => {
    try {
      const { data } = await api.get('/payroll/my');
      setPayrolls(data);
    } catch (err) {
      console.error(err);
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return (
          <div className="gov-card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">الملف الشخصي</h2>
            <div className="space-y-4 text-right">
              <div><span className="font-bold text-gray-500">الاسم:</span> {user?.name}</div>
              <div><span className="font-bold text-gray-500">البريد الإلكتروني:</span> {user?.email}</div>
              <div><span className="font-bold text-gray-500">الدور:</span> {user?.role}</div>
            </div>
          </div>
        );
      case 'leaves':
        return (
          <div className="gov-card p-8">
            <div className="flex justify-between items-center mb-6 border-b pb-4">
              <h2 className="text-2xl font-bold text-gray-800">العطل</h2>
              <button className="bg-emerald-600 text-white px-4 py-2 rounded-lg font-bold">طلب عطلة</button>
            </div>
            {leaves.length === 0 ? <p className="text-gray-500">لا توجد طلبات عطل حاليا.</p> : (
              <ul className="space-y-3">
                {leaves.map((l: any) => (
                  <li key={l.id} className="p-4 border rounded-xl flex justify-between">
                    <div>
                      <span className="font-bold">{l.type}</span> - {l.start_date} إلى {l.end_date}
                    </div>
                    <span className="px-3 py-1 bg-gray-100 rounded-full text-xs font-bold">{l.status}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        );
      case 'salary':
        return (
          <div className="gov-card p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-4">الأجور</h2>
            {payrolls.length === 0 ? <p className="text-gray-500">لا توجد بيانات أجور.</p> : (
              <ul className="space-y-3">
                {payrolls.map((p: any) => (
                  <li key={p.id} className="p-4 border rounded-xl flex justify-between">
                    <div>
                      <span className="font-bold text-emerald-600">{Number(p.net_salary).toLocaleString()} درهم</span>
                      <p className="text-xs text-gray-400">تاريخ الدفع: {p.payment_date}</p>
                    </div>
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
    <div className="min-h-screen bg-[#F4F7FB] rtl" dir="rtl">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between sticky top-0 z-50 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center text-white">
            <User size={20} />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 leading-none">فضاء الموظف</h1>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mt-1">جماعة العرائش</p>
          </div>
        </div>
        <button onClick={() => logout()} className="flex items-center gap-2 text-rose-500 hover:bg-rose-50 px-4 py-2 rounded-lg font-bold transition-colors">
          تسجيل الخروج <LogOut size={18} />
        </button>
      </header>

      <main className="max-w-7xl mx-auto p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Sidebar */}
        <aside className="md:col-span-3 space-y-2">
          <button onClick={() => setActiveTab('profile')} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === 'profile' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent'}`}>
            <span className="flex items-center gap-3"><User size={20} /> الملف الشخصي</span>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setActiveTab('leaves')} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === 'leaves' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent'}`}>
            <span className="flex items-center gap-3"><Calendar size={20} /> العطل</span>
            <ChevronRight size={16} />
          </button>
          <button onClick={() => setActiveTab('salary')} className={`w-full flex items-center justify-between p-4 rounded-xl font-bold transition-all ${activeTab === 'salary' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-white hover:bg-gray-50 text-gray-600 border border-transparent'}`}>
            <span className="flex items-center gap-3"><DollarSign size={20} /> الأجور</span>
            <ChevronRight size={16} />
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
