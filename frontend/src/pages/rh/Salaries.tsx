import { useState, useEffect } from 'react';
import { DollarSign, Search, Filter, Download, PieChart as PieIcon, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { api } from '../../lib/api';
import toast from 'react-hot-toast';

const Salaries = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [payrolls, setPayrolls] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPayrolls();
  }, []);

  const fetchPayrolls = async () => {
    try {
      setLoading(true);
      const { data } = await api.get('/payrolls');
      setPayrolls(data);
    } catch (error) {
      toast.error('Erreur lors du chargement des salaires');
    } finally {
      setLoading(false);
    }
  };

  // Calculate totals
  const totalBase = payrolls.reduce((acc, p) => acc + Number(p.base_salary), 0);
  const totalBonuses = payrolls.reduce((acc, p) => acc + Number(p.bonuses), 0);
  const totalDeductions = payrolls.reduce((acc, p) => acc + Number(p.deductions), 0);
  const totalNet = payrolls.reduce((acc, p) => acc + Number(p.net_salary), 0);

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الأجور</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / التعويضات والأجور / إدارة الأجور</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm shadow-sm">
            <Download size={18} className="text-emerald-600" />
            تحميل كشف الأجور العام
          </button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="gov-card p-6 bg-white border-b-4 border-emerald-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">كتلة الأجور الشهرية</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-800">{totalNet.toLocaleString()} <span className="text-sm font-bold text-gray-400">درهم</span></h3>
            <span className="text-xs font-black text-emerald-600 bg-emerald-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight size={14} />
              +0%
            </span>
          </div>
        </div>
        <div className="gov-card p-6 bg-white border-b-4 border-blue-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">إجمالي التعويضات</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-800">{totalBonuses.toLocaleString()} <span className="text-sm font-bold text-gray-400">درهم</span></h3>
            <span className="text-xs font-black text-blue-600 bg-blue-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowUpRight size={14} />
              +0%
            </span>
          </div>
        </div>
        <div className="gov-card p-6 bg-white border-b-4 border-rose-500">
          <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">إجمالي الاقتطاعات</p>
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-black text-gray-800">{totalDeductions.toLocaleString()} <span className="text-sm font-bold text-gray-400">درهم</span></h3>
            <span className="text-xs font-black text-rose-600 bg-rose-50 px-2 py-1 rounded-lg flex items-center gap-1">
              <ArrowDownRight size={14} />
              -0%
            </span>
          </div>
        </div>
      </div>

      <div className="gov-card p-0 overflow-hidden">
        <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
          <div className="relative w-full md:w-80">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="ابحث عن موظف..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white"
            />
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all">
              <Filter size={16} />
              تصفية
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse text-sm">
            <thead>
              <tr className="bg-gray-50/80 text-gray-600 text-[10px] font-black uppercase tracking-[0.15em]">
                <th className="p-4 border-b border-gray-100">الموظف</th>
                <th className="p-4 border-b border-gray-100">الراتب الأساسي</th>
                <th className="p-4 border-b border-gray-100">التعويضات (+)</th>
                <th className="p-4 border-b border-gray-100">الاقتطاعات (-)</th>
                <th className="p-4 border-b border-gray-100 text-emerald-800 font-black">صافي الأجر</th>
                <th className="p-4 border-b border-gray-100 text-center">الإجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {loading ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">جاري التحميل...</td></tr>
              ) : payrolls.length === 0 ? (
                <tr><td colSpan={6} className="p-8 text-center text-gray-500">لا توجد بيانات للأجور حاليا.</td></tr>
              ) : (
                payrolls.filter(p => p.fonctionnaire?.user?.name?.includes(searchTerm) || '').map((item) => (
                  <tr key={item.id} className="hover:bg-gray-50/50 transition-colors group">
                    <td className="p-4">
                      <span className="font-bold text-gray-800">{item.fonctionnaire?.user?.name}</span>
                    </td>
                    <td className="p-4 font-medium text-gray-600">{Number(item.base_salary).toLocaleString()} درهم</td>
                    <td className="p-4 font-bold text-emerald-600">+{Number(item.bonuses).toLocaleString()} درهم</td>
                    <td className="p-4 font-bold text-rose-500">-{Number(item.deductions).toLocaleString()} درهم</td>
                    <td className="p-4">
                      <span className="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-lg font-black text-base border border-emerald-100">
                        {Number(item.net_salary).toLocaleString()} درهم
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      <button className="p-2 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                        <Download size={16} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Salaries;
