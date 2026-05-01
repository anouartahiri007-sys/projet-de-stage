import { useState } from 'react';
import { FileText, Download, Upload, Search, File, Folder } from 'lucide-react';

const Documents = () => {
  const [docs, setDocs] = useState([
    { id: 1, name: 'قرار التعيين الرسمي', category: 'قرارات إدارية', date: '2018-05-12', size: '1.4 MB', type: 'PDF' },
    { id: 2, name: 'دبلوم دكتوراه في الطب البيطري', category: 'شهادات علمية', date: '2015-06-30', size: '2.1 MB', type: 'PDF' },
    { id: 3, name: 'شهادة ترقية طبيب أول', category: 'قرارات إدارية', date: '2021-06-15', size: '0.8 MB', type: 'PDF' },
    { id: 4, name: 'بطاقة التعريف الوطنية', category: 'وثائق شخصية', date: '2022-01-20', size: '450 KB', type: 'JPG' },
  ]);

  return (
    <div className="space-y-6 max-w-5xl mx-auto animate-slide-up">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">وثائقي الإدارية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الفضاء الشخصي / الأرشيف الشخصي</p>
        </div>
        <button className="bg-white border border-gray-200 text-gray-700 px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 hover:bg-gray-50 transition-all text-sm shadow-sm">
          <Upload size={18} className="text-emerald-600" />
          رفع وثيقة جديدة
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Categories Section */}
        <div className="lg:col-span-1 space-y-6">
           <div className="gov-card p-6">
              <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest text-emerald-700">
                 <Folder size={16} /> التصنيفات
              </h3>
              <div className="space-y-2">
                 <div className="p-3 bg-emerald-50 text-emerald-700 rounded-xl font-bold text-sm border border-emerald-100 flex justify-between items-center">
                    <span>الكل</span>
                    <span className="text-[10px] bg-white px-2 py-0.5 rounded-lg border border-emerald-100">08</span>
                 </div>
                 <div className="p-3 text-gray-500 hover:bg-gray-50 rounded-xl font-bold text-sm transition-all flex justify-between items-center cursor-pointer">
                    <span>إدارية</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-lg">04</span>
                 </div>
                 <div className="p-3 text-gray-500 hover:bg-gray-50 rounded-xl font-bold text-sm transition-all flex justify-between items-center cursor-pointer">
                    <span>شخصية</span>
                    <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-lg">02</span>
                 </div>
              </div>
           </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
           <div className="gov-card p-0 overflow-hidden">
              <div className="p-4 border-b border-gray-100 bg-gray-50/30">
                 <div className="relative">
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                    <input 
                       type="text" 
                       placeholder="ابحث في وثائقك..." 
                       className="w-full bg-white border border-gray-200 rounded-xl pr-10 pl-4 py-2.5 outline-none focus:border-emerald-500 text-sm shadow-sm"
                    />
                 </div>
              </div>
              <div className="divide-y divide-gray-50">
                 {docs.map((doc) => (
                    <div key={doc.id} className="p-5 hover:bg-emerald-50/10 transition-all flex items-center justify-between group">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
                             doc.type === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                          }`}>
                             <FileText size={22} />
                          </div>
                          <div>
                             <h4 className="font-bold text-gray-800 text-sm mb-1">{doc.name}</h4>
                             <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                                <span>{doc.category}</span>
                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                <span>{doc.date}</span>
                                <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                                <span>{doc.size}</span>
                             </div>
                          </div>
                       </div>
                       <button className="p-2 text-gray-400 hover:text-emerald-600 transition-all">
                          <Download size={18} />
                       </button>
                    </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default Documents;
