import { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contact = () => {
  return (
    <div className="max-w-[1400px] mx-auto px-4 md:px-8 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-[#0d5e3f] mb-4">اتصل بنا</h1>
        <div className="w-20 h-1 bg-yellow-500 rounded mx-auto mb-4"></div>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg">
          نحن هنا للإجابة على استفساراتكم وملاحظاتكم. لا تترددوا في التواصل معنا عبر النموذج أو المعلومات أدناه.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-8 md:p-10">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">أرسل رسالة</h2>
          <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">الاسم الكامل</label>
                <input type="text" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f]" placeholder="أدخل اسمك" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">البريد الإلكتروني</label>
                <input type="email" className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f]" placeholder="example@email.com" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">نص الرسالة</label>
              <textarea rows={6} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:border-[#0d5e3f] resize-none" placeholder="كيف يمكننا مساعدتك؟"></textarea>
            </div>
            <button className="bg-[#0d5e3f] text-white px-8 py-3.5 rounded-lg font-bold text-lg hover:bg-[#0a4a31] transition-colors w-full md:w-auto">
              إرسال الرسالة
            </button>
          </form>
        </div>

        {/* Info & Map */}
        <div className="space-y-8">
          <div className="bg-[#0d5e3f] text-white rounded-2xl shadow-sm p-8 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-x-1/2 -translate-y-1/2"></div>
            <h3 className="text-xl font-bold mb-8 relative z-10">معلومات التواصل</h3>
            
            <div className="space-y-6 relative z-10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><MapPin size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">العنوان</h4>
                  <p className="text-sm opacity-80 leading-relaxed">مقر الجماعة الترابية، شارع محمد الخامس، المدينة، المغرب</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Phone size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">الهاتف</h4>
                  <p className="text-sm opacity-80 leading-relaxed" dir="ltr">+212 5 37 23 45 67</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Mail size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">البريد الإلكتروني</h4>
                  <p className="text-sm opacity-80 leading-relaxed">contact@commune.ma</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center shrink-0"><Clock size={20} /></div>
                <div>
                  <h4 className="font-bold mb-1 opacity-90">أوقات العمل</h4>
                  <p className="text-sm opacity-80 leading-relaxed">الإثنين - الجمعة: 08:30 إلى 16:30</p>
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
