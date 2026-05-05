import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useLang } from '../../context/LangContext';

const Contact = () => {
  const { t, lang } = useLang();

  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12" dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#0d5e3f] mb-4">{t('contactTitle')}</h1>
        <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-4"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          {t('contactSubtitle')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className={`lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>
          <h2 className="text-2xl font-bold text-gray-800 mb-8">{t('sendBtn').split(' ')[0]} {t('message')}</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('fullName')}</label>
                <input type="text" className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f] ${lang === 'ar' ? 'text-right' : 'text-left'}`} placeholder="" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">{t('email')}</label>
                <input type="email" className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f] text-left`} placeholder="example@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">{t('message')}</label>
              <textarea rows={6} className={`w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f] resize-none ${lang === 'ar' ? 'text-right' : 'text-left'}`} placeholder=""></textarea>
            </div>
            <button className="bg-[#0d5e3f] text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-[#0a4a31] transition-colors w-full md:w-auto">
              {t('sendBtn')}
            </button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="bg-[#0d5e3f] text-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            <h3 className={`text-xl font-bold mb-8 relative z-10 ${lang === 'ar' ? 'text-right' : 'text-left'}`}>{t('contactInfo')}</h3>
            
            <div className="space-y-6 relative z-10">
              <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><MapPin size={20} /></div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold mb-1 opacity-90">{t('address').split('،')[0]}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">{t('address')}</p>
                </div>
              </div>
              <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Phone size={20} /></div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold mb-1 opacity-90">{t('contactUs')}</h4>
                  <p className="text-sm opacity-80 leading-relaxed" dir="ltr">+212 5 39 91 23 45</p>
                </div>
              </div>
              <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Mail size={20} /></div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold mb-1 opacity-90">{t('email')}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">contact@larache.ma</p>
                </div>
              </div>
              <div className={`flex items-start gap-4 ${lang === 'ar' ? 'flex-row' : 'flex-row-reverse'}`}>
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Clock size={20} /></div>
                <div className={lang === 'ar' ? 'text-right' : 'text-left'}>
                  <h4 className="font-bold mb-1 opacity-90">{t('workingHours')}</h4>
                  <p className="text-sm opacity-80 leading-relaxed">{t('monFri')}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-200 rounded-2xl h-64 overflow-hidden border border-gray-100 flex items-center justify-center text-gray-500 font-bold shadow-sm">
             Google Map Placeholder
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;
