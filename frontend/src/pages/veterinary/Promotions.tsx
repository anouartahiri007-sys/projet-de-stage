import { TrendingUp, Route, Award, Calendar } from 'lucide-react';

const Promotions = () => {
  const history = [
    { date: '2021-06-15', title: 'ترقية إلى طبيب بيطري أول', type: 'promotion', desc: 'الترقية في الدرجة بناءً على امتحان الكفاءة المهنية.' },
    { date: '2018-05-12', title: 'ترسيم في الإدارة', type: 'official', desc: 'ترسيم في رتبة طبيب بيطري من الدرجة الثالثة.' },
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto animate-slide-up">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">ترقياتي المهنية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الفضاء الشخصي / المسار الإداري</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
           <div className="gov-card p-6 text-center">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center mx-auto mb-4 border border-emerald-100 shadow-sm">
                 <Award size={32} />
              </div>
              <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">الرتبة الحالية</h3>
              <p className="font-bold text-gray-800">طبيب أول</p>
              <div className="mt-6 pt-6 border-t border-gray-100">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">الوضعية القادمة</p>
                 <p className="text-xs font-bold text-emerald-600 mt-1">طبيب ممتاز (2026)</p>
              </div>
           </div>
        </div>

        <div className="md:col-span-3">
           <div className="gov-card p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-8 flex items-center gap-2">
                 <Route size={22} className="text-emerald-600" />
                 سجل التطور المهني
              </h3>
              
              <div className="relative border-r-2 border-emerald-100 pr-8 mr-4 space-y-12">
                 {history.map((item, idx) => (
                    <div key={idx} className="relative">
                       <div className="absolute -right-[41px] top-0 w-5 h-5 rounded-full border-4 border-white bg-emerald-500 shadow-sm"></div>
                       <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-black text-emerald-700">{item.date.split('-')[0]}</span>
                          <span className={`px-2 py-0.5 rounded-full text-[8px] font-black uppercase tracking-widest border ${
                             item.type === 'promotion' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' : 'bg-blue-50 text-blue-700 border-blue-100'
                          }`}>
                             {item.type === 'promotion' ? 'ترقية' : 'ترسيم'}
                          </span>
                       </div>
                       <h4 className="font-bold text-gray-800 text-sm mb-1">{item.title}</h4>
                       <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Promotions;
