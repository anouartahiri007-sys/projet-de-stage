import { useState } from 'react';
import { FilePlus, FileText, User, Download, Send, AlertCircle } from 'lucide-react';

const CreateDocument = () => {
  const [docType, setDocType] = useState('');
  const [employee, setEmployee] = useState('');

  return (
    <div className="space-y-6 animate-slide-up max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">إنشاء وثيقة إدارية</h1>
        <p className="text-sm text-gray-500 mt-1">الرئيسية / الوثائق والإشعارات / مولد الوثائق</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Form Section */}
        <div className="lg:col-span-2">
          <div className="gov-card p-8">
            <form className="space-y-8" onSubmit={e => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">نوع الوثيقة *</label>
                  <select 
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-sm font-bold text-gray-700 shadow-sm"
                  >
                    <option value="">اختر نوع الوثيقة</option>
                    <option value="work_cert">شهادة العمل (Attestation de travail)</option>
                    <option value="salary_cert">شهادة الأجر (Attestation de salaire)</option>
                    <option value="leave_decision">قرار عطلة (Décision de congé)</option>
                    <option value="admin_decision">قرار إداري (Décision administrative)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">الموظف المعني *</label>
                  <div className="relative">
                    <User className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                      type="text" 
                      placeholder="ابحث عن الموظف..." 
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pr-10 pl-4 py-3 outline-none focus:border-emerald-500 text-sm font-bold shadow-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-bold text-gray-700">معلومات إضافية (اختياري)</label>
                <textarea 
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 outline-none focus:border-emerald-500 text-sm min-h-[120px] shadow-sm"
                  placeholder="أضف أي ملاحظات أو تفاصيل إضافية للوثيقة..."
                ></textarea>
              </div>

              <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-xl flex gap-3">
                <AlertCircle className="text-emerald-600 shrink-0" size={20} />
                <p className="text-[11px] text-emerald-800 leading-relaxed font-medium">
                  سيتم إنشاء الوثيقة بصيغة PDF قابلة للتحميل. تتضمن الوثيقة تلقائياً الترويسة الرسمية للجماعة، معلومات الموظف من قاعدة البيانات، والتوقيع الرقمي المعتمد.
                </p>
              </div>

              <div className="flex gap-4 pt-4 border-t border-gray-100">
                <button className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-100 active:scale-95">
                  <FilePlus size={20} />
                  توليد الوثيقة (PDF)
                </button>
                <button className="px-6 bg-gray-100 hover:bg-gray-200 text-gray-700 py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-all active:scale-95">
                  <Send size={20} />
                  إرسال عبر الإيميل
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Preview Section */}
        <div className="lg:col-span-1">
          <div className="gov-card p-6 bg-slate-100 flex flex-col items-center justify-center border-dashed border-2 border-slate-300 min-h-[400px]">
            <div className="text-center space-y-4 opacity-40">
              <FileText size={64} className="mx-auto text-slate-400" />
              <p className="text-sm font-bold text-slate-500">معاينة الوثيقة</p>
              <p className="text-[10px] text-slate-400 max-w-[150px] mx-auto">اختر نوع الوثيقة والموظف لمشاهدة المعاينة الفورية هنا.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateDocument;
