import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  Search, 
  User as Facebook, 
  Camera as Instagram, 
  Play as Youtube, 
  Share2 as Twitter,
  Phone, 
  Globe,
  Bell,
  Mail,
  User
} from 'lucide-react';
import { useLang } from '../context/LangContext';

const PublicLayout = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { lang, setLang, t } = useLang();
  const location = useLocation();
  const navigate = useNavigate();

  const toggleLang = () => {
    const newLang = lang === 'ar' ? 'fr' : 'ar';
    setLang(newLang);
  };

  const navLinks = [
    { title: t('home'), path: '/' },
    { title: t('about'), path: '/about' },
    { title: t('news'), path: '/news' },
    { title: t('services'), path: '/services' },
    { title: t('projects'), path: '/projects' },
    { title: t('announcements'), path: '/announcements' },
    { title: t('documents'), path: '/documents' },
    { title: t('contact'), path: '/contact' },
  ];

  useEffect(() => {
    setIsMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className={`min-h-screen bg-white flex flex-col font-sans`} dir={lang === 'ar' ? 'rtl' : 'ltr'}>
      
      {/* Top Bar - Matching Image */}
      <div className="bg-white border-b border-gray-100 py-2 px-4 md:px-8 flex justify-between items-center text-sm text-[#003366]">
        <div className="flex items-center gap-4">
          <Link to="/login" className="bg-[#003366] text-white px-4 py-1.5 rounded-md font-bold transition-all hover:bg-[#004b93]">
            {t('employeePortal')}
          </Link>
          <button 
            onClick={toggleLang} 
            className="flex items-center gap-2 cursor-pointer hover:text-[#004b93] transition-colors border border-gray-200 px-3 py-1 rounded-md bg-gray-50"
          >
            <Globe size={14} />
            <span className="font-bold">{t('langSwitch')}</span>
          </button>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-4 border-l border-gray-200 pl-4 h-6">
            <button className="text-[#003366] hover:text-[#004b93] transition-colors"><Search size={18} /></button>
            <button className="text-[#003366] hover:text-[#004b93] transition-colors"><Bell size={18} /></button>
            <button className="text-[#003366] hover:text-[#004b93] transition-colors"><Mail size={18} /></button>
            <button className="text-[#003366] hover:text-[#004b93] transition-colors"><User size={18} /></button>
          </div>
          <div className="flex items-center gap-2 font-bold text-sm">
            <Phone size={16} className="text-[#004b93]" />
            <span dir="ltr">+212 5 39 91 23 45</span>
          </div>
        </div>
      </div>

      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-white shadow-sm">
        <nav className="max-w-[1400px] mx-auto px-4 md:px-8 h-20 flex justify-between items-center">
          
          {/* Desktop Nav - Left in RTL */}
          <ul className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <li key={link.path}>
                <Link 
                  to={link.path}
                  className={`px-4 py-2 font-bold transition-all text-[15px] border-b-2 ${
                    location.pathname === link.path 
                    ? 'text-[#004b93] border-[#004b93]' 
                    : 'text-gray-600 border-transparent hover:text-[#004b93]'
                  }`}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>

          {/* Logo Section - Right in RTL */}
          <Link to="/" className="flex items-center gap-4">
             <div className={`${lang === 'ar' ? 'text-right' : 'text-left'}`}>
                <h1 className="text-[#004b93] font-black text-xl leading-tight">{t('communeName')}</h1>
                <h2 className="text-gray-500 font-bold text-sm leading-tight">{t('communeCity')}</h2>
             </div>
             <div className="w-14 h-14 flex items-center justify-center overflow-hidden">
                <img src="/logo_commune.jpg" alt="Logo Larache" className="w-full h-full object-contain" />
             </div>
          </Link>

          {/* Mobile Toggle */}
          <button 
            className="lg:hidden p-2 text-[#003366]"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
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
                      location.pathname === link.path ? 'text-[#004b93]' : 'text-gray-600'
                    }`}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Footer - Matching Image */}
      <footer className="bg-[#002d5a] text-white pt-16 pb-6 px-4 md:px-8">
        <div className="max-w-[1400px] mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            
            <div className="md:col-span-1">
               <h4 className="font-bold text-lg mb-6">{t('communeName')}</h4>
               <p className="text-gray-300 text-sm leading-relaxed mb-8">
                  {t('footerDesc')}
               </p>
               <div className="flex gap-4">
                 {[
                   { Icon: Facebook, color: 'hover:bg-blue-600', label: 'Facebook' },
                   { Icon: Instagram, color: 'hover:bg-pink-600', label: 'Instagram' },
                   { Icon: Youtube, color: 'hover:bg-red-600', label: 'Youtube' },
                   { Icon: Twitter, color: 'hover:bg-blue-400', label: 'Twitter' }
                 ].map((social, idx) => (
                   <div 
                    key={idx}
                    className={`w-10 h-10 rounded-full bg-white/10 flex items-center justify-center cursor-pointer transition-all duration-300 ${social.color} hover:scale-110 hover:shadow-lg`}
                    title={social.label}
                   >
                     <social.Icon size={18} />
                   </div>
                 ))}
               </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">{t('projectsFooter')}</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><Link to="/projects" className="hover:text-white transition-colors">{t('devProjects')}</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">{t('greenSpaces')}</Link></li>
                <li><Link to="/projects" className="hover:text-white transition-colors">{t('infrastructure')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">{t('quickLinks')}</h4>
              <ul className="space-y-3 text-gray-300 text-sm">
                <li><Link to="/about" className="hover:text-white transition-colors">{t('aboutLink')}</Link></li>
                <li><Link to="/services" className="hover:text-white transition-colors">{t('eServices')}</Link></li>
                <li><Link to="/news" className="hover:text-white transition-colors">{t('latestNews')}</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">{t('contactUs')}</h4>
              <ul className="space-y-4 text-gray-300 text-sm">
                <li className="flex items-center gap-3">
                   <Phone size={18} className="text-blue-400" />
                   <span dir="ltr">+212 5 39 91 23 45</span>
                </li>
                <li className="flex items-center gap-3">
                   <Mail size={18} className="text-blue-400" />
                   <span>contact@larache.ma</span>
                </li>
                <li className="flex items-start gap-3">
                   <User size={18} className="text-blue-400 shrink-0" />
                   <span>شارع محمد الخامس، العرائش</span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[13px] text-gray-400">
             <p>© {new Date().getFullYear()} الجماعة الترابية - جميع الحقوق محفوظة</p>
             <div className="flex gap-6">
                <span className="cursor-pointer hover:text-white transition-colors">خريطة</span>
                <span className="cursor-pointer hover:text-white transition-colors">سياسة الخصوصية</span>
                <span className="cursor-pointer hover:text-white transition-colors">شروط الاستخدام</span>
             </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;

