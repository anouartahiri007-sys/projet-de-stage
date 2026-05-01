import { User, Mail, Phone, MapPin, Briefcase, Calendar, Shield, Edit2, Camera } from 'lucide-react';
import { useAuthStore } from '../../lib/auth';

const Profile = () => {
  const { user } = useAuthStore();

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-slide-up pb-12">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">ملفي الشخصي</h1>
        <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50 transition-all shadow-sm">
          <Edit2 size={16} className="text-emerald-600" />
          تعديل الملف
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Profile Card */}
        <div className="lg:col-span-4 space-y-6">
           <div className="gov-card p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-24 bg-emerald-600 opacity-10"></div>
              <div className="relative z-10">
                <div className="relative inline-block">
                  <img 
                    src={user?.role === 'doctor' ? 'https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80' : 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=150&q=80'} 
                    alt={user?.name} 
                    className="w-32 h-32 rounded-3xl object-cover border-4 border-white shadow-xl mx-auto" 
                  />
                  <button className="absolute bottom-0 right-0 p-2 bg-emerald-600 text-white rounded-xl shadow-lg border-2 border-white hover:bg-emerald-700 transition-all">
                    <Camera size={16} />
                  </button>
                </div>
                <h2 className="text-xl font-bold text-gray-800 mt-6">{user?.name || 'د. أحمد يسعيد'}</h2>
                <p className="text-xs font-black text-emerald-600 uppercase tracking-widest mt-1">طبيب عام - مصلحة الصحة الجماعية</p>
                <div className="flex items-center justify-center gap-2 mt-4 text-xs font-bold text-gray-400">
                   <MapPin size={14} />
                   جماعة مدينة المستقبل
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-gray-100 grid grid-cols-2 gap-4">
                 <div className="text-right">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">رقم الوظيفة</p>
                    <p className="text-sm font-bold text-gray-700">#{user?.id || '450'}MED</p>
                 </div>
                 <div className="text-left">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">تاريخ الالتحاق</p>
                    <p className="text-sm font-bold text-gray-700">12 ماي 2015</p>
                 </div>
              </div>
           </div>

           <div className="gov-card p-6">
              <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2">
                 <Shield size={18} className="text-emerald-600" />
                 الصلاحيات
              </h3>
              <div className="flex flex-wrap gap-2">
                 <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase border border-emerald-100">فحص طبي</span>
                 <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase border border-emerald-100">إصدار شواهد</span>
                 <span className="px-2.5 py-1 bg-emerald-50 text-emerald-700 rounded-lg text-[10px] font-black uppercase border border-emerald-100">تحويل الحالات</span>
              </div>
           </div>
        </div>

        {/* Details Section */}
        <div className="lg:col-span-8 space-y-6">
           <div className="gov-card p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-8 border-b border-gray-100 pb-4">المعلومات الشخصية والمهنية</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl"><Mail size={20} /></div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">البريد الإلكتروني</p>
                       <p className="font-bold text-gray-700">{user?.email || 'doctor@example.com'}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl"><Phone size={20} /></div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">رقم الهاتف</p>
                       <p className="font-bold text-gray-700">{user?.phone || '+212 661-000000'}</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl"><Briefcase size={20} /></div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">التخصص</p>
                       <p className="font-bold text-gray-700">الطب العام</p>
                    </div>
                 </div>
                 <div className="flex items-start gap-4">
                    <div className="p-3 bg-gray-50 text-gray-400 rounded-2xl"><Calendar size={20} /></div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">تاريخ الميلاد</p>
                       <p className="font-bold text-gray-700">10 أبريل 1980</p>
                    </div>
                 </div>
              </div>
           </div>

           <div className="gov-card p-8">
              <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                 <Briefcase size={20} className="text-emerald-600" />
                 الخلفية المهنية
              </h3>
              <div className="relative border-r-2 border-emerald-100 pr-8 mr-4 space-y-8">
                 <div className="relative">
                    <div className="absolute -right-[41px] top-0 w-5 h-5 rounded-full border-4 border-white bg-emerald-500 shadow-sm"></div>
                    <h4 className="font-bold text-gray-800 text-sm">طبيب من الدرجة الممتازة</h4>
                    <p className="text-xs text-gray-500 mt-1">جماعة مدينة المستقبل | 2018 - الحالي</p>
                 </div>
                 <div className="relative">
                    <div className="absolute -right-[41px] top-0 w-5 h-5 rounded-full border-4 border-white bg-gray-300 shadow-sm"></div>
                    <h4 className="font-bold text-gray-800 text-sm">طبيب بالمركز الصحي</h4>
                    <p className="text-xs text-gray-500 mt-1">وزارة الصحة | 2010 - 2018</p>
                 </div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
