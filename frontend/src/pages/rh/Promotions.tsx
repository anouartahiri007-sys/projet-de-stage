import { useState } from 'react';
import { TrendingUp, ArrowUpRight, Search, Filter, Calendar } from 'lucide-react';

const mockPromotions = [
  { id: 1, name: 'ياسين بومدين', from: 'السلم 9', to: 'السلم 10', date: '2024-05-15', type: 'ترقية في السلم' },
  { id: 2, name: 'خديجة أمزال', from: 'الدرجة 2', to: 'الدرجة الممتازة', date: '2024-03-10', type: 'ترقية في الدرجة' },
  { id: 3, name: 'يوسف المراكشي', from: 'المصلحة الصحية', to: 'المصلحة البيطرية', date: '2023-12-01', type: 'تنقل داخلي' },
  { id: 4, name: 'مريم الحاجي', from: 'السلم 10', to: 'السلم 11', date: '2023-10-20', type: 'ترقية في السلم' },
];

const Promotions = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الترقيات والتنقلات</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الحالة الإدارية / الترقيات والتنقلات</p>
        </div>
        <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
          <TrendingUp size={18} />
          تسجيل ترقية جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Timeline / Recent List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="gov-card p-0 overflow-hidden">
            <div className="p-6 border-b border-gray-100 bg-gray-50/30 flex justify-between items-center">
              <h2 className="font-bold text-gray-800 flex items-center gap-2">
                <TrendingUp size={20} className="text-emerald-600" />
                سجل الترقيات الأخيرة
              </h2>
              <div className="relative">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                <input 
                  type="text" 
                  placeholder="بحث..." 
                  className="pr-9 pl-4 py-2 border border-gray-200 rounded-lg outline-none focus:border-emerald-500 text-xs bg-white w-48"
                />
              </div>
            </div>

            <div className="divide-y divide-gray-50">
              {mockPromotions.map((promo) => (
                <div key={promo.id} className="p-6 hover:bg-emerald-50/20 transition-colors flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white border border-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center shadow-sm">
                      <ArrowUpRight size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm">{promo.name}</h3>
                      <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                        <span className="text-slate-400">{promo.from}</span>
                        <span className="text-emerald-600 font-black">←</span>
                        <span className="font-bold text-emerald-700">{promo.to}</span>
                      </p>
                    </div>
                  </div>
                  <div className="text-left">
                    <span className="block text-[10px] font-black text-emerald-600 uppercase tracking-widest mb-1">{promo.type}</span>
                    <span className="flex items-center gap-1 text-[11px] text-gray-400 font-bold">
                      <Calendar size={12} />
                      {promo.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar / Stats */}
        <div className="space-y-6">
          <div className="gov-card p-6 bg-emerald-900 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
            <h3 className="text-lg font-bold mb-4 relative z-10">إحصائيات السنة</h3>
            <div className="space-y-4 relative z-10">
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-sm font-medium">إجمالي الترقيات</span>
                <span className="text-xl font-black">42</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-white/10 rounded-xl">
                <span className="text-sm font-medium">تنقلات المصالح</span>
                <span className="text-xl font-black">15</span>
              </div>
            </div>
            <p className="text-[10px] text-emerald-300 mt-6 leading-relaxed">
              * تم تحديث البيانات تلقائياً بناءً على آخر القرارات الإدارية الموقعة.
            </p>
          </div>
          
          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-4">تنبيهات الاستحقاق</h3>
            <div className="space-y-4">
              <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl">
                <p className="text-xs font-bold text-amber-800 mb-1">موظفون يستوفون الشروط</p>
                <p className="text-[10px] text-amber-600">8 موظفين لديهم أقدمية كافية للترقية القادمة.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
