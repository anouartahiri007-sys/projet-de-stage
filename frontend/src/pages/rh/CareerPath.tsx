import { useState } from 'react';
import { Route, TrendingUp, Calendar, ChevronLeft, MapPin } from 'lucide-react';

const CareerPath = () => {
  const [selectedEmployee, setSelectedEmployee] = useState('أحمد العلوي');

  const careerSteps = [
    { year: '2024', event: 'ترقية إلى السلم 11', type: 'promotion', desc: 'بناءً على نتائج تقييم الأداء المتميزة.' },
    { year: '2022', event: 'تغيير المصلحة', type: 'transfer', desc: 'الانتقال من قسم الكتابة العامة إلى المصلحة الصحية.' },
    { year: '2021', event: 'ترقية في الدرجة', type: 'promotion', desc: 'اجتياز امتحان الكفاءة المهنية بنجاح.' },
    { year: '2020', event: 'التوظيف الرسمي', type: 'entry', desc: 'الالتحاق بالجماعة بصفة متصرف من الدرجة الثالثة.' },
  ];

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">المسار المهني</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / إدارة الأداء / المسار المهني</p>
        </div>
        <div className="flex gap-2">
          <select 
            value={selectedEmployee}
            onChange={(e) => setSelectedEmployee(e.target.value)}
            className="bg-white border border-gray-200 text-gray-700 px-4 py-2.5 rounded-xl font-bold text-sm outline-none focus:border-emerald-500 shadow-sm min-w-[200px]"
          >
            <option value="أحمد العلوي">أحمد العلوي</option>
            <option value="فاطمة الزهراء بنعلي">فاطمة الزهراء بنعلي</option>
            <option value="محمد أمين الناصري">محمد أمين الناصري</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-6 text-center">
            <div className="w-24 h-24 bg-emerald-50 rounded-3xl flex items-center justify-center mx-auto mb-4 border-4 border-white shadow-md text-emerald-600">
              <TrendingUp size={40} />
            </div>
            <h2 className="text-xl font-bold text-gray-800">{selectedEmployee}</h2>
            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-1">موظف رسمي منذ 2020</p>
            
            <div className="mt-8 pt-8 border-t border-gray-100 text-right space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">الرتبة الحالية</span>
                <span className="text-sm font-black text-emerald-700">السلم 11</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-400 font-bold uppercase tracking-wider">الأقدمية</span>
                <span className="text-sm font-black text-gray-700">4 سنوات</span>
              </div>
            </div>
          </div>
        </div>

        {/* Career Timeline */}
        <div className="lg:col-span-3">
          <div className="gov-card p-8">
            <h3 className="text-lg font-bold text-gray-800 mb-10 flex items-center gap-2">
              <Route size={22} className="text-emerald-600" />
              المخطط الزمني للمسار المهني
            </h3>

            <div className="relative border-r-2 border-emerald-100 pr-8 mr-4 space-y-12">
              {careerSteps.map((step, idx) => (
                <div key={idx} className="relative">
                  {/* Timeline Dot */}
                  <div className={`absolute -right-[41px] top-0 w-5 h-5 rounded-full border-4 border-white shadow-sm z-10 ${
                    step.type === 'promotion' ? 'bg-emerald-500' :
                    step.type === 'transfer' ? 'bg-blue-500' : 'bg-gray-400'
                  }`}></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
                    <span className="text-lg font-black text-emerald-800">{step.year}</span>
                    <span className={`w-fit px-2.5 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${
                      step.type === 'promotion' ? 'bg-emerald-50 text-emerald-700 border-emerald-100' :
                      step.type === 'transfer' ? 'bg-blue-50 text-blue-700 border-blue-100' : 
                      'bg-gray-100 text-gray-600 border-gray-200'
                    }`}>
                      {step.type === 'promotion' ? 'ترقية' : step.type === 'transfer' ? 'تنقل' : 'تعيين'}
                    </span>
                  </div>
                  
                  <h4 className="text-base font-bold text-gray-800 mb-2">{step.event}</h4>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CareerPath;
