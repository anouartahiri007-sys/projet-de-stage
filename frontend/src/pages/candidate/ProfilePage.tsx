import React, { useState } from 'react';
import { User, Mail, Phone, MapPin, Camera, Save, Upload, Trash2, FileText, Download } from 'lucide-react';
import { useAuthStore } from '../../lib/auth';
import { useLang } from '../../context/LangContext';
import { toast } from 'react-hot-toast';

export default function ProfilePage() {
  const { user } = useAuthStore();
  const { t, lang } = useLang();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    email: user?.email || '',
    phone: '06 12 34 56 78',
    cin: 'L123456',
    address: 'شارع محمد الخامس، العرائش',
  });

  const handleSave = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success(t('success'));
    }, 1000);
  };

  return (
    <div className="animate-fade-in space-y-8 pb-20">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-black text-[#002352] tracking-tight">{t('myProfile')}</h1>
          <p className="text-slate-500 font-bold mt-2">{t('editInfo')}</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={loading}
          className="flex items-center gap-2 px-8 py-3.5 bg-[#002352] text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-900/20 hover:scale-[1.03] transition-all disabled:opacity-50"
        >
          {loading ? <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div> : <Save size={18} />}
          {t('save')}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-800 mb-8 border-b border-slate-50 pb-6">{t('generalInfo')}</h3>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t('firstName')}</label>
                   <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={formData.firstName}
                        onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t('lastName')}</label>
                   <div className="relative">
                      <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={formData.lastName}
                        onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t('email')}</label>
                   <div className="relative">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="email" 
                        value={formData.email}
                        readOnly
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm text-slate-400 outline-none cursor-not-allowed"
                      />
                   </div>
                </div>
                <div className="space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t('phone')}</label>
                   <div className="relative">
                      <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                   </div>
                </div>
                <div className="md:col-span-2 space-y-2">
                   <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">{t('address') || 'Adresse'}</label>
                   <div className="relative">
                      <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input 
                        type="text" 
                        value={formData.address}
                        onChange={(e) => setFormData({...formData, address: e.target.value})}
                        className="w-full pr-12 pl-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl font-bold text-sm focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                      />
                   </div>
                </div>
             </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
             <h3 className="text-xl font-black text-slate-800 mb-8 border-b border-slate-50 pb-6">{t('diplomas')}</h3>
             <div className="space-y-4">
                <div className="p-6 bg-slate-50 border border-slate-100 rounded-[2rem] flex items-center justify-between group hover:border-blue-200 transition-all">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                         <FileText size={24} />
                      </div>
                      <div>
                         <p className="font-black text-slate-800">Diplôme d'Ingénieur d'État</p>
                         <p className="text-xs font-bold text-slate-400 mt-1 uppercase tracking-widest">Génie Informatique - 2021</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-2">
                      <button className="p-2 text-slate-300 hover:text-blue-600 hover:bg-white rounded-xl transition-all"><Download size={18} /></button>
                      <button className="p-2 text-slate-300 hover:text-rose-600 hover:bg-white rounded-xl transition-all"><Trash2 size={18} /></button>
                   </div>
                </div>
                <button className="w-full py-6 border-2 border-dashed border-slate-100 rounded-[2rem] text-slate-400 font-bold hover:border-blue-200 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-2">
                   <Upload size={24} />
                   <span>{t('addDiploma')}</span>
                </button>
             </div>
          </div>
        </div>

        {/* Right: Docs */}
        <div className="space-y-8">
           <div className="bg-[#002352] rounded-[2.5rem] p-10 text-white shadow-xl shadow-blue-900/40 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2"></div>
              <div className="relative z-10 flex flex-col items-center">
                 <div className="relative group mb-6">
                    <div className="w-28 h-28 rounded-[2rem] bg-white/10 flex items-center justify-center text-white/50 overflow-hidden border-2 border-white/20">
                       <User size={64} />
                    </div>
                    <button className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-500 text-white rounded-xl flex items-center justify-center shadow-lg border-2 border-[#002352] hover:scale-110 transition-all">
                       <Camera size={18} />
                    </button>
                 </div>
                 <h4 className="text-lg font-black">{user?.name}</h4>
                 <p className="text-xs font-bold text-blue-300/60 uppercase tracking-widest mt-1">CAND-2024-8842</p>
              </div>
           </div>

           <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
              <h3 className="text-lg font-black text-slate-800 mb-6">{t('myCV')}</h3>
              <div className="p-8 border-2 border-dashed border-slate-100 rounded-[2rem] text-center group hover:border-blue-200 transition-all cursor-pointer">
                 <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-4 group-hover:scale-110 transition-all">
                    <Upload size={32} />
                 </div>
                 <p className="text-sm font-black text-slate-800">{t('uploadCV')}</p>
                 <p className="text-[10px] font-bold text-slate-400 mt-2 uppercase tracking-widest">{t('pdfFormat')}</p>
              </div>
              <div className="mt-6 p-4 bg-emerald-50 border border-emerald-100 rounded-2xl flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <FileText className="text-emerald-600" size={20} />
                    <div>
                       <p className="text-xs font-black text-emerald-800">CV_Modern.pdf</p>
                       <p className="text-[10px] font-bold text-emerald-600/60 uppercase tracking-widest">{t('lastUpdated')} 12/04/2024</p>
                    </div>
                 </div>
                 <button className="p-2 text-emerald-600 hover:bg-white rounded-xl transition-all">
                    <Trash2 size={16} />
                 </button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
