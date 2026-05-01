import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, Users, UserPlus, Shield, Network, 
  List, Briefcase, TrendingUp, Star, History, 
  Route, DollarSign, Gift, ScrollText, Calendar, 
  CalendarDays, CalendarCheck, FileText, FilePlus, 
  Bell, BarChart3, PieChart, Menu, ChevronDown,
  PawPrint, Activity, Syringe, AlertTriangle, User as UserIcon, LogOut,
  ClipboardList
} from 'lucide-react';
import { useAuthStore } from '../lib/auth';

const MainLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuthStore();

  useEffect(() => {
    document.documentElement.dir = 'rtl';
    document.documentElement.lang = 'ar';
    return () => {
      document.documentElement.dir = 'ltr'; 
      document.documentElement.lang = 'fr';
    };
  }, []);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const rhMenu = [
    {
      title: '',
      items: [
        { title: 'الرئيسية', icon: <Home size={20} />, path: '/dashboard' }
      ]
    },
    {
      title: 'إدارة الموظفين',
      items: [
        { title: 'الموظفون', icon: <Users size={20} />, path: '/rh/employees' },
        { title: 'إضافة موظف جديد', icon: <UserPlus size={20} />, path: '/rh/employees/add' },
        { title: 'الأدوار والصلاحيات', icon: <Shield size={20} />, path: '/rh/roles' },
        { title: 'الهيكل التنظيمي', icon: <Network size={20} />, path: '/rh/organigramme' },
      ]
    },
    {
      title: 'الحالة الإدارية',
      items: [
        { title: 'الدرجات والسلم', icon: <List size={20} />, path: '/rh/grades' },
        { title: 'الوضعيات الإدارية', icon: <Briefcase size={20} />, path: '/rh/admin-status' },
        { title: 'الترقيات والتنقلات', icon: <TrendingUp size={20} />, path: '/rh/promotions' },
      ]
    },
    {
      title: 'إدارة الأداء',
      items: [
        { title: 'تقييم الأداء', icon: <Star size={20} />, path: '/rh/performance' },
        { title: 'تاريخ التقييمات', icon: <History size={20} />, path: '/rh/eval-history' },
        { title: 'المسار المهني', icon: <Route size={20} />, path: '/rh/career-path' },
      ]
    },
    {
      title: 'التعويضات والأجور',
      items: [
        { title: 'الأجور', icon: <DollarSign size={20} />, path: '/rh/salaries' },
        { title: 'التعويضات', icon: <Gift size={20} />, path: '/rh/bonuses' },
        { title: 'سجل الأداءات', icon: <ScrollText size={20} />, path: '/rh/payment-history' },
      ]
    },
    {
      title: 'إدارة العطل',
      items: [
        { title: 'طلبات العطل', icon: <CalendarDays size={20} />, path: '/rh/leave-requests' },
        { title: 'رصيد العطل', icon: <CalendarCheck size={20} />, path: '/rh/leave-balance' },
        { title: 'تقويم العطل', icon: <Calendar size={20} />, path: '/rh/leave-calendar' },
      ]
    },
    {
      title: 'الوثائق والإشعارات',
      items: [
        { title: 'الوثائق الإدارية', icon: <FileText size={20} />, path: '/rh/documents' },
        { title: 'إنشاء وثيقة', icon: <FilePlus size={20} />, path: '/rh/documents/create' },
        { title: 'الإشعارات', icon: <Bell size={20} />, path: '/rh/notifications' },
      ]
    },
    {
      title: 'التقارير والإحصائيات',
      items: [
        { title: 'تقارير الموارد البشرية', icon: <BarChart3 size={20} />, path: '/rh/reports' },
        { title: 'الإحصائيات', icon: <PieChart size={20} />, path: '/rh/statistics' },
      ]
    }
  ];

  const vetMenu = [
    {
      title: '',
      items: [
        { title: 'الرئيسية', icon: <Home size={20} />, path: '/dashboard' }
      ]
    },
    {
      title: 'الصحة الحيوانية',
      items: [
        { title: 'الحيوانات', icon: <PawPrint size={20} />, path: '/veterinaire/animals' },
        { title: 'الحالات الصحية', icon: <Activity size={20} />, path: '/veterinaire/health' },
        { title: 'التلقيحات', icon: <Syringe size={20} />, path: '/veterinaire/vaccinations' },
        { title: 'الشهادات البيطرية', icon: <FilePlus size={20} />, path: '/veterinaire/certificates' },
        { title: 'الأوبئة والأمراض', icon: <AlertTriangle size={20} />, path: '/veterinaire/epidemics' },
        { title: 'التقارير البيطرية', icon: <BarChart3 size={20} />, path: '/veterinaire/reports' },
      ]
    },
    {
      title: 'الفضاء الشخصي',
      items: [
        { title: 'ملفي الشخصي', icon: <UserIcon size={20} />, path: '/veterinaire/profile' },
        { title: 'حالتي الإدارية', icon: <Briefcase size={20} />, path: '/veterinaire/admin-status' },
        { title: 'الأجر والتعويضات', icon: <DollarSign size={20} />, path: '/veterinaire/salary' },
        { title: 'التقييمات', icon: <Star size={20} />, path: '/veterinaire/evaluations' },
        { title: 'الترقيات', icon: <TrendingUp size={20} />, path: '/veterinaire/promotions' },
        { title: 'العطل والغيابات', icon: <CalendarDays size={20} />, path: '/veterinaire/leaves' },
        { title: 'الوثائق', icon: <FileText size={20} />, path: '/veterinaire/documents' },
        { title: 'الإشعارات', icon: <Bell size={20} />, path: '/veterinaire/notifications' },
      ]
    }
  ];

  const medicalMenu = [
    {
      title: '',
      items: [
        { title: 'الرئيسية', icon: <Home size={20} />, path: '/dashboard' }
      ]
    },
    {
      title: 'الملف الطبي',
      items: [
        { title: 'المرضى والملفات الطبية', icon: <Users size={20} />, path: '/medical/patients' },
        { title: 'المواعيد', icon: <Calendar size={20} />, path: '/medical/appointments' },
        { title: 'التشخيصات والملاحظات', icon: <ClipboardList size={20} />, path: '/medical/diagnosis' },
        { title: 'الشواهد الطبية', icon: <FileText size={20} />, path: '/medical/certificates' },
        { title: 'متابعة الحالات', icon: <Activity size={20} />, path: '/medical/follow-up' },
      ]
    },
    {
      title: 'الفضاء الشخصي',
      items: [
        { title: 'ملفي الشخصي', icon: <UserIcon size={20} />, path: '/medical/profile' },
        { title: 'الحالة الإدارية', icon: <Briefcase size={20} />, path: '/medical/admin-status' },
        { title: 'الأجر والتعويضات', icon: <DollarSign size={20} />, path: '/medical/salary' },
        { title: 'التقييمات', icon: <Star size={20} />, path: '/medical/evaluations' },
        { title: 'الترقيات', icon: <TrendingUp size={20} />, path: '/medical/promotions' },
        { title: 'العطل والغيابات', icon: <CalendarDays size={20} />, path: '/medical/leaves' },
        { title: 'الوثائق', icon: <FileText size={20} />, path: '/medical/documents' },
        { title: 'الإشعارات', icon: <Bell size={20} />, path: '/medical/notifications' },
      ]
    }
  ];

  const nurseMenu = [
    {
      title: '',
      items: [
        { title: 'الرئيسية', icon: <Home size={20} />, path: '/dashboard' }
      ]
    },
    {
      title: 'الملف الطبي',
      items: [
        { title: 'المرضى', icon: <Users size={20} />, path: '/nurse/patients' },
        { title: 'متابعة الحالات', icon: <Activity size={20} />, path: '/nurse/follow-up' },
        { title: 'العلاجات المقدمة', icon: <Syringe size={20} />, path: '/nurse/treatments' },
        { title: 'المؤشرات الصحية', icon: <Activity size={20} />, path: '/nurse/vitals' },
        { title: 'التقارير الصحية', icon: <FileText size={20} />, path: '/nurse/reports' },
        { title: 'المواعيد', icon: <Calendar size={20} />, path: '/nurse/appointments' },
      ]
    },
    {
      title: 'الفضاء الشخصي',
      items: [
        { title: 'ملفي الشخصي', icon: <UserIcon size={20} />, path: '/nurse/profile' },
        { title: 'الحالة الإدارية', icon: <Briefcase size={20} />, path: '/nurse/admin-status' },
        { title: 'الأجر والتعويضات', icon: <DollarSign size={20} />, path: '/nurse/salary' },
        { title: 'التقييمات', icon: <Star size={20} />, path: '/nurse/evaluations' },
        { title: 'الترقيات', icon: <TrendingUp size={20} />, path: '/nurse/promotions' },
        { title: 'العطل', icon: <CalendarDays size={20} />, path: '/nurse/leaves' },
        { title: 'الوثائق', icon: <FileText size={20} />, path: '/nurse/documents' },
        { title: 'الإشعارات', icon: <Bell size={20} />, path: '/nurse/notifications' },
      ]
    }
  ];

  const menuSections = 
    user?.role === 'nurse' ? nurseMenu :
    user?.role === 'veterinarian' ? vetMenu : 
    user?.role === 'doctor' ? medicalMenu : 
    rhMenu;

  return (
    <div className="flex h-screen bg-slate-50 text-gray-800 font-sans overflow-hidden" dir="rtl">
      
      {/* ── Sidebar ─────────────────────────────── */}
      <aside className={`bg-white border-l border-gray-200 flex flex-col transition-all duration-300 z-30 flex-shrink-0 shadow-sm ${sidebarOpen ? 'w-72' : 'w-0 overflow-hidden'}`}>
        
        {/* Brand */}
        <div className="bg-[#0d5e3f] h-20 flex items-center px-4 gap-3 text-white flex-shrink-0">
          <div className="w-10 h-12 bg-gradient-to-b from-yellow-400 to-yellow-600 rounded flex items-center justify-center font-bold text-sm shadow-md">
            شعار
          </div>
          <div>
            <h1 className="font-extrabold text-sm leading-tight">الجماعة الترابية</h1>
            <h2 className="font-bold text-sm leading-tight text-green-100">مدينة المستقبل</h2>
          </div>
        </div>

        {/* Menu */}
        <div className="flex-1 overflow-y-auto py-4 px-3 custom-scrollbar">
          {menuSections.map((section, idx) => (
            <div key={idx} className="mb-4">
              {section.title && (
                <h3 className="text-emerald-700 text-[11px] font-extrabold mb-2 px-4">{section.title}</h3>
              )}
              <ul className="space-y-1">
                {section.items.map((item, i) => {
                  const isActive = location.pathname === item.path || (item.path !== '/dashboard' && location.pathname.startsWith(item.path));
                  return (
                    <li key={i}>
                      <Link 
                        to={item.path}
                        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-bold transition-all ${
                          isActive 
                            ? 'bg-emerald-50 text-emerald-700 border-r-4 border-emerald-600' 
                            : 'text-gray-600 hover:bg-gray-50 hover:text-emerald-700 border-r-4 border-transparent'
                        }`}
                      >
                        <span className={`${isActive ? 'text-emerald-600' : 'text-gray-400'}`}>{item.icon}</span>
                        {item.title}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          
          <div className="mt-8 pt-4 border-t border-gray-100">
             <button 
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-2.5 w-full text-sm font-bold text-rose-600 hover:bg-rose-50 rounded-lg transition-all"
             >
                <LogOut size={20} />
                تسجيل الخروج
             </button>
          </div>
        </div>
      </aside>

      {/* ── Main Area ───────────────────────────── */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        
        {/* Topbar */}
        <header className="h-20 bg-white border-b border-gray-200 px-8 flex items-center justify-between shadow-sm z-20 flex-shrink-0">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 hover:text-emerald-700">
              <Menu size={24} />
            </button>
            <div>
              <h2 className="text-lg font-extrabold text-gray-800 flex items-center gap-2">
                👋 مرحباً {user?.name || 'سعاد الإدريسي'}
              </h2>
              <p className="text-sm text-gray-500 font-medium">
                {user?.role === 'rh' ? 'موارد بشرية' : user?.role === 'doctor' ? 'طبيب عام' : user?.role === 'nurse' ? 'ممرضة' : 'طبيب بيطري'} - جماعة مدينة المستقبل
              </p>
            </div>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-gray-500 text-sm font-bold bg-gray-50 px-4 py-2 rounded-lg border border-gray-100">
              <Calendar size={16} />
              الأحد 19 ماي 2024
              <ChevronDown size={14} className="ml-2" />
            </div>

            <button className="relative text-gray-500 hover:text-emerald-700 transition-colors">
              <Bell size={22} />
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white">5</span>
            </button>

            <div className="flex items-center gap-3 cursor-pointer group">
              <div className="text-left hidden md:block">
                <h3 className="text-sm font-bold text-gray-800 group-hover:text-emerald-700 transition-colors">{user?.name || 'سعاد الإدريسي'}</h3>
                <p className="text-xs text-gray-500 font-medium">
                  {user?.role === 'rh' ? 'مسؤولة الموارد البشرية' : user?.role === 'doctor' ? 'طبيب عام - مصلحة الصحة' : user?.role === 'nurse' ? 'ممرضة - مصلحة الصحة' : 'طبيب بيطري ممارس'}
                </p>
              </div>
              <img 
                src={
                  user?.role === 'doctor' ? "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80" :
                  user?.role === 'nurse' ? "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=150&q=80" :
                  user?.role === 'veterinarian' ? "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=150&q=80" : 
                  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&q=80"
                } 
                alt="Profile" 
                className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 group-hover:border-emerald-500 transition-colors" 
              />
            </div>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 overflow-y-auto bg-slate-50 p-8 custom-scrollbar">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default MainLayout;
