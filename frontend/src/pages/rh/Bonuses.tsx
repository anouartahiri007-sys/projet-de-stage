import { useState } from 'react';
import { Gift, Search, Plus, Filter, CreditCard, Award } from 'lucide-react';

const mockBonuses = [
  { id: 1, name: 'أحمد العلوي', type: 'منحة الأداء السنوية', amount: '2,500', date: '2024-05-01', status: 'paid' },
  { id: 2, name: 'فاطمة الزهراء بنعلي', type: 'تعويض عن الساعات الإضافية', amount: '850', date: '2024-04-28', status: 'pending' },
  { id: 3, name: 'محمد أمين الناصري', type: 'منحة خاصة (مشروع التلقيح)', amount: '1,500', date: '2024-04-15', status: 'paid' },
  { id: 4, name: 'رضوان الوهابي', type: 'منحة التنقل', amount: '400', date: '2024-05-05', status: 'pending' },
];

const Bonuses = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">التعويضات والمنح</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / التعويضات والأجور / التعويضات</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <Plus size={18} />
          إضافة تعويض جديد
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* List of Bonuses */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex justify-between items-center bg-gray-50/30">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <Gift size={20} className="text-emerald-600" />
                سجل التعويضات الأخيرة
              </h2>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="pr-9 pl-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 text-xs bg-white"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-100">
              {mockBonuses.map((item) => (
                <div key={item.id} className="p-6 hover:bg-emerald-50/20 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                      <CreditCard size={18} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{item.name}</h3>
                      <p className="text-xs text-gray-500 font-medium">{item.type}</p>
                    </div>
                  </div>
                  <div className="text-left flex items-center gap-6">
                    <div>
                      <span className="block text-sm font-black text-emerald-700">{item.amount} درهم</span>
                      <span className="text-[10px] text-gray-400 font-bold">{item.date}</span>
                    </div>
                    <span className={`px-2.5 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      item.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-amber-50 text-amber-700 border-amber-100'
                    }`}>
                      {item.status === 'paid' ? 'تم الدفع' : 'قيد الانتظار'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Categories / Sidebar */}
        <div className="space-y-6">
          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 border-b border-gray-100 pb-2">تصنيفات التعويضات</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <Award size={18} className="text-amber-500" />
                  <span className="text-sm font-bold text-gray-700">منح الأداء</span>
                </div>
                <span className="text-xs font-black text-gray-400">12</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <CreditCard size={18} className="text-blue-500" />
                  <span className="text-sm font-bold text-gray-700">ساعات إضافية</span>
                </div>
                <span className="text-xs font-black text-gray-400">08</span>
              </div>
              <div className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-xl cursor-pointer transition-all">
                <div className="flex items-center gap-3">
                  <Gift size={18} className="text-emerald-500" />
                  <span className="text-sm font-bold text-gray-700">منح استثنائية</span>
                </div>
                <span className="text-xs font-black text-gray-400">04</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bonuses;
