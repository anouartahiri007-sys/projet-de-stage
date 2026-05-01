import { useState } from 'react';
import { FileText, Search, Filter, Download, Plus, Folder, File } from 'lucide-react';

const mockDocs = [
  { id: 1, name: 'قرار التعيين - ياسين بومدين', category: 'قرارات إدارية', date: '2024-05-10', size: '1.2 MB', type: 'PDF' },
  { id: 2, name: 'شهادة العمل - خديجة أمزال', category: 'شهادات', date: '2024-05-08', size: '450 KB', type: 'PDF' },
  { id: 3, name: 'عقد التوظيف - سفيان الرويسي', category: 'عقود', date: '2024-05-01', size: '2.4 MB', type: 'DOCX' },
  { id: 4, name: 'قرار ترقية - مريم الحاجي', category: 'قرارات إدارية', date: '2024-04-25', size: '1.1 MB', type: 'PDF' },
];

const AdminDocuments = () => {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-6 animate-slide-up">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">الوثائق الإدارية</h1>
          <p className="text-sm text-gray-500 mt-1">الرئيسية / الوثائق والإشعارات / مستودع الوثائق</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-5 py-2.5 rounded-xl font-bold flex items-center gap-2 transition-all shadow-md text-sm">
            <Plus size={18} />
            رفع وثيقة جديدة
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Categories */}
        <div className="lg:col-span-1 space-y-6">
          <div className="gov-card p-6">
            <h3 className="font-bold text-gray-800 mb-6 flex items-center gap-2 uppercase text-xs tracking-widest text-emerald-700">
              <Folder size={16} />
              التصنيفات
            </h3>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 bg-emerald-50 text-emerald-700 rounded-lg font-bold text-sm cursor-pointer border border-emerald-100 transition-all">
                <span>كل الوثائق</span>
                <span className="text-[10px] bg-white px-2 py-0.5 rounded-full border border-emerald-100">42</span>
              </div>
              <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 text-gray-600 rounded-lg font-bold text-sm cursor-pointer transition-all">
                <span>قرارات إدارية</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">15</span>
              </div>
              <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 text-gray-600 rounded-lg font-bold text-sm cursor-pointer transition-all">
                <span>شهادات العمل</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">12</span>
              </div>
              <div className="flex items-center justify-between p-2.5 hover:bg-gray-50 text-gray-600 rounded-lg font-bold text-sm cursor-pointer transition-all">
                <span>عقود التوظيف</span>
                <span className="text-[10px] bg-gray-100 px-2 py-0.5 rounded-full">08</span>
              </div>
            </div>
          </div>
        </div>

        {/* Documents List */}
        <div className="lg:col-span-3">
          <div className="gov-card p-0 overflow-hidden">
            <div className="p-4 border-b border-gray-100 flex flex-col md:flex-row gap-4 justify-between items-center bg-gray-50/30">
              <div className="relative w-full md:w-80">
                <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="ابحث عن وثيقة..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-4 pr-10 py-2.5 border border-gray-200 rounded-xl outline-none focus:border-emerald-500 text-sm bg-white shadow-sm"
                />
              </div>
              <button className="flex items-center gap-2 border border-gray-200 bg-white px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 hover:bg-gray-50">
                <Filter size={16} />
                تصفية
              </button>
            </div>

            <div className="divide-y divide-gray-100">
              {mockDocs.filter(d => d.name.includes(searchTerm)).map((doc) => (
                <div key={doc.id} className="p-5 hover:bg-emerald-50/20 transition-all flex items-center justify-between group">
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border transition-all group-hover:scale-110 ${
                      doc.type === 'PDF' ? 'bg-rose-50 text-rose-600 border-rose-100' : 'bg-blue-50 text-blue-600 border-blue-100'
                    }`}>
                      <FileText size={22} />
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-800 text-sm mb-1">{doc.name}</h3>
                      <div className="flex items-center gap-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
                        <span>{doc.category}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{doc.date}</span>
                        <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                        <span>{doc.size}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-2 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50 rounded-lg transition-all" title="تحميل">
                      <Download size={18} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDocuments;
