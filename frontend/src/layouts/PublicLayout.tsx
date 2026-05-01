import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User as Facebook, 
  Camera as Instagram, 
  Play as Youtube, 
  Phone, 
  Globe
} from 'lucide-react';

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const navLinks = [
    { title: 'الرئيسية', path: '/' },
    { title: 'عن الجماعة', path: '/about' },
    { title: 'أخبار الجماعة', path: '/news' },
    { title: 'الخدمات الرقمية', path: '/services' },
    { title: 'مشاريع وأنشطة', path: '/projects' },
    { title: 'الإعلانات', path: '/announcements' },
    { title: 'الوثائق', path: '/documents' },
    { title: 'اتصل بنا', path: '/contact' },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans" dir="rtl">
      
      {/* Top Bar */}
      <div className="bg-[#0d5e3f] text-white py-2 px-4 md:px-8 flex justify-between items-center text-sm">
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <Phone size={14} />
            <span dir="ltr">+212 5 37 23 45 67</span>
          </div>
          <div className="flex items-center gap-4">
            <Facebook size={16} className="cursor-pointer hover:text-yellow-400 transition-colors" />
            <Instagram size={16} className="cursor-pointer hover:text-yellow-400 transition-colors" />
            <Youtube size={16} className="cursor-pointer hover:text-yellow-400 transition-colors" />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 cursor-pointer hover:text-yellow-400 transition-colors">
            <Globe size={14} />
            <span>Français</span>
          </div>
          <Link to="/login" className="bg-yellow-500 hover:bg-yellow-600 text-[#0d5e3f] px-4 py-1 rounded font-bold transition-colors">
            فضاء الموظف
          </Link>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-gray-100 shadow-sm">
        <nav className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          
          {/* Logo Section */}
          <Link to="/" className="flex items-center gap-3">
             <div className="w-12 h-14 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded flex items-center justify-center font-bold text-white text-xs shadow-md">
                شعار
             </div>
             <div className="hidden sm:block text-right">
                <h1 className="text-[#0d5e3f] font-extrabold text-lg leading-tight uppercase">الجماعة الترابية</h1>
                <h2 className="text-gray-500 font-bold text-sm leading-tight tracking-wider">مدينة المستقبل</h2>
             </div>
          </Link>

          {/* Desktop Nav */}
          <ul className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`px-4 py-2 rounded-md font-bold transition-all text-sm ${
                    location.pathname === link.path 
                    ? 'text-[#0d5e3f] bg-emerald-50 shadow-sm' 
                    : 'text-gray-600 hover:text-[#0d5e3f] hover:bg-gray-50'
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Actions */}
          <div className="flex items-center gap-3">
             <button 
               onClick={() => navigate('/?search=focus')}
               className="p-2 text-gray-500 hover:text-[#0d5e3f] transition-colors"
             >
               <Search size={22} />
             </button>
             <button 
               className="lg:hidden p-2 text-gray-500"
               onClick={() => setIsMenuOpen(!isMenuOpen)}
             >
               {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
             </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-100 py-4 px-6 shadow-xl absolute top-20 left-0 right-0 animate-fade-in">
            <ul className="space-y-4">
              {navLinks.map((link) => (
                <li key={link.path}>
                  <Link 
                    to={link.path}
                    className={`block py-2 font-bold ${
                      location.pathname === link.path ? 'text-[#0d5e3f]' : 'text-gray-600'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
              <li className="pt-4 border-t border-gray-50">
                 <Link to="/login" className="block w-full bg-[#0d5e3f] text-white text-center py-3 rounded-lg font-bold">
                    فضاء الموظف
                 </Link>
              </li>
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0d5e3f] text-white pt-16 pb-8 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
               <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-12 bg-white/10 rounded flex items-center justify-center font-bold text-white text-[10px]">شعار</div>
                  <h3 className="font-extrabold text-lg leading-tight uppercase">الجماعة الترابية</h3>
               </div>
               <p className="text-emerald-100/70 text-sm leading-relaxed mb-6">
                  البوابة الرسمية للجماعة الترابية، نهدف من خلالها إلى تقريب الخدمات من المواطنين وتكريس مبدأ الإدارة الرقمية والشفافية.
               </p>
               <div className="flex gap-4">
                 <Facebook size={20} className="hover:text-yellow-400 cursor-pointer transition-colors" />
                 <Instagram size={20} className="hover:text-yellow-400 cursor-pointer transition-colors" />
                 <Youtube size={20} className="hover:text-yellow-400 cursor-pointer transition-colors" />
               </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-r-4 border-yellow-500 pr-3">روابط سريعة</h4>
              <ul className="space-y-3 text-emerald-100/70 text-sm font-medium">
                <li><Link to="/about" className="hover:text-white transition-colors">عن الجماعة</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">الخدمات الإلكترونية</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">آخر الأخبار</Link></li>
                <li><Link to="/announcements" className="hover:text-white transition-colors">الإعلانات والطلبات</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-r-4 border-yellow-500 pr-3">مشاريع</h4>
              <ul className="space-y-3 text-emerald-100/70 text-sm font-medium">
                <li><Link to="/projects" className="hover:text-white transition-colors">مشاريع التهيئة</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">الفضاءات الخضراء</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">الإنارة العمومية</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">البنية التحتية</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6 border-r-4 border-yellow-500 pr-3">اتصل بنا</h4>
              <ul className="space-y-4 text-emerald-100/70 text-sm font-medium">
                <li className="flex items-center gap-3">
                   <Phone size={18} className="text-yellow-500" />
                   <span dir="ltr">+212 5 37 23 45 67</span>
                </li>
                <li className="flex items-center gap-3">
                   <Globe size={18} className="text-yellow-500" />
                   <span>contact@commune.ma</span>
                </li>
                <li className="flex items-start gap-3">
                   <MapPin size={18} className="text-yellow-500 shrink-0" />
                   <span>شارع محمد الخامس، مركز المدينة</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs font-bold text-emerald-100/50 uppercase tracking-widest">
             <p>© 2024 الجماعة الترابية - جميع الحقوق محفوظة</p>
             <div className="flex gap-6">
                <span className="cursor-pointer hover:text-white transition-colors">سياسة الخصوصية</span>
                <span className="cursor-pointer hover:text-white transition-colors">شروط الاستخدام</span>
                <span className="cursor-pointer hover:text-white transition-colors">خريطة الموقع</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

const MapPin = ({ size, className }: { size: number, className?: string }) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width={size} 
    height={size} 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    className={className}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
    <circle cx="12" cy="10" r="3"/>
  </svg>
);
