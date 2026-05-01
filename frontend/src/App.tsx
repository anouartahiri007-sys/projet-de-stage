import React, { useEffect, Suspense } from 'react';
import { Routes, Route, Navigate, Outlet, Link } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { Loader2, AlertCircle, Home } from 'lucide-react';

import MainLayout from './layouts/MainLayout'
import { useAuthStore } from './lib/auth'
import { useSettingsStore } from './lib/settingsStore'

// Pages
import Dashboard from './pages/Dashboard'
import EmployeeProfile from './features/employees/EmployeeProfile'
import Recruitment from './pages/Recruitment'
import Settings from './pages/Settings'

// RH Pages
import EmployeeList from './pages/rh/EmployeeList'
import AddEmployee from './pages/rh/AddEmployee'
import RolesPermissions from './pages/rh/RolesPermissions'
import Organigramme from './pages/rh/Organigramme'
import Grades from './pages/rh/Grades'
import AdminStatus from './pages/rh/AdminStatus'
import Promotions from './pages/rh/Promotions'
import PerformanceEval from './pages/rh/PerformanceEval'
import EvalHistory from './pages/rh/EvalHistory'
import CareerPath from './pages/rh/CareerPath'
import Salaries from './pages/rh/Salaries'
import Bonuses from './pages/rh/Bonuses'
import PaymentHistory from './pages/rh/PaymentHistory'
import LeaveRequests from './pages/rh/LeaveRequests'
import LeaveBalance from './pages/rh/LeaveBalance'
import LeaveCalendar from './pages/rh/LeaveCalendar'
import AdminDocuments from './pages/rh/AdminDocuments'
import CreateDocument from './pages/rh/CreateDocument'
import NotificationsPage from './pages/rh/NotificationsPage'
import HRReports from './pages/rh/HRReports'
import Statistics from './pages/rh/Statistics'

// Veterinary Pages
import VetDashboard from './pages/veterinary/Dashboard'
import Animals from './pages/veterinary/Animals'
import AddAnimal from './pages/veterinary/AddAnimal'
import HealthSituations from './pages/veterinary/HealthSituations'
import RegisterHealthCase from './pages/veterinary/RegisterHealthCase'
import Vaccinations from './pages/veterinary/Vaccinations'
import RegisterVaccination from './pages/veterinary/RegisterVaccination'
import Certificates from './pages/veterinary/Certificates'
import IssueCertificate from './pages/veterinary/IssueCertificate'
import Epidemics from './pages/veterinary/Epidemics'
import VetReports from './pages/veterinary/VetReports'
import VetProfile from './pages/veterinary/Profile'
import VetAdminStatus from './pages/veterinary/AdminStatus'
import VetSalary from './pages/veterinary/Salary'
import VetEvaluations from './pages/veterinary/Evaluations'
import VetPromotions from './pages/veterinary/Promotions'
import VetLeaves from './pages/veterinary/Leaves'
import VetDocuments from './pages/veterinary/Documents'
import VetNotifications from './pages/veterinary/Notifications'

// Medical Pages
import MedDashboard from './pages/medical/Dashboard'
import Patients from './pages/medical/Patients'
import AddPatient from './pages/medical/AddPatient'
import MedAppointments from './pages/medical/Appointments'
import Diagnosis from './pages/medical/Diagnosis'
import MedCertificates from './pages/medical/Certificates'
import MedIssueCertificate from './pages/medical/IssueCertificate'
import FollowUp from './pages/medical/FollowUp'
import MedProfile from './pages/medical/Profile'
import MedAdminStatus from './pages/medical/AdminStatus'
import MedSalary from './pages/medical/Salary'
import MedEvaluations from './pages/medical/Evaluations'
import MedPromotions from './pages/medical/Promotions'
import MedLeaves from './pages/medical/Leaves'
import MedDocuments from './pages/medical/Documents'
import MedNotifications from './pages/medical/Notifications'

// Nurse Pages
import NurseDashboard from './pages/nurse/Dashboard'
import NursePatients from './pages/nurse/Patients'
import NurseFollowUp from './pages/nurse/FollowUp'
import NurseTreatments from './pages/nurse/Treatments'
import AddTreatment from './pages/nurse/AddTreatment'
import NurseVitalSigns from './pages/nurse/VitalSigns'
import RegisterVitalSign from './pages/nurse/RegisterVitalSign'
import NurseHealthReports from './pages/nurse/HealthReports'
import NurseAppointments from './pages/nurse/Appointments'
import NurseProfile from './pages/nurse/Profile'
import NurseAdminStatus from './pages/nurse/AdminStatus'
import NurseSalary from './pages/nurse/Salary'
import { NurseEvaluations, NursePromotions, NurseLeaves, NurseDocuments, NurseNotifications } from './pages/nurse/PersonalSpace'

import CandidatePortal from './pages/CandidatePortal'
import FonctionnairePortal from './pages/FonctionnairePortal'

// Auth
import Login from './pages/auth/Login'
import CandidatLogin from './pages/auth/CandidatLogin'
import Register from './pages/auth/Register'

// Public Pages
import PublicLayout from './layouts/PublicLayout'
import Landing from './pages/Landing'
import About from './pages/public/About'
import News from './pages/public/News'
import Services from './pages/public/Services'
import Projects from './pages/public/Projects'
import Announcements from './pages/public/Announcements'
import PublicDocuments from './pages/public/PublicDocuments'
import Contact from './pages/public/Contact'

const ProtectedRoute = ({ children, allowedRoles }: { children?: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case 'rh': return <Navigate to="/dashboard" replace />;
      case 'veterinarian': return <Navigate to="/dashboard" replace />;
      case 'doctor': return <Navigate to="/dashboard" replace />;
      case 'nurse': return <Navigate to="/dashboard" replace />;
      case 'candidat': return <Navigate to="/portail/candidat" replace />;
      default: return <Navigate to="/portail/fonctionnaire" replace />;
    }
  }
  return children ? <>{children}</> : <Outlet />
}

const DashboardSelector = () => {
  const { user } = useAuthStore();
  if (user?.role === 'veterinarian') return <VetDashboard />;
  if (user?.role === 'doctor') return <MedDashboard />;
  if (user?.role === 'nurse') return <NurseDashboard />;
  return <Dashboard />;
}

// --- Robustness Components ---
const LoadingFallback = () => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50">
    <div className="flex flex-col items-center gap-4">
      <Loader2 className="w-12 h-12 text-emerald-600 animate-spin" />
      <p className="text-emerald-700 font-bold animate-pulse">جاري التحميل...</p>
    </div>
  </div>
);

const NotFound = () => (
  <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6" dir="rtl">
    <div className="max-w-md w-full bg-white p-12 rounded-[2.5rem] shadow-xl border border-gray-100 text-center">
      <div className="w-24 h-24 bg-rose-50 text-rose-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-inner">
        <AlertCircle size={48} />
      </div>
      <h1 className="text-4xl font-black text-gray-800 mb-4">404</h1>
      <p className="text-gray-500 font-bold mb-8">عذراً، الصفحة التي تبحث عنها غير موجودة.</p>
      <Link to="/" className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-200">
        <Home size={18} />
        العودة للرئيسية
      </Link>
    </div>
  </div>
);

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() { return { hasError: true }; }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center p-6 text-center" dir="rtl">
           <div className="max-w-lg bg-white p-10 rounded-3xl shadow-xl border border-rose-100">
              <AlertCircle size={64} className="text-rose-600 mx-auto mb-6" />
              <h2 className="text-2xl font-black text-gray-800 mb-2">حدث خطأ مفاجئ</h2>
              <p className="text-gray-500 font-bold mb-6">وقع خطأ تقني في عرض هذه الصفحة. يرجى المحاولة مرة أخرى أو الاتصال بالدعم الفني.</p>
              <button onClick={() => window.location.reload()} className="px-8 py-3 bg-rose-600 text-white rounded-xl font-bold">تحديث الصفحة</button>
           </div>
        </div>
      );
    }
    return this.props.children;
  }
}

const App = () => {
  const isDarkMode = useSettingsStore(s => s.isDarkMode)

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [isDarkMode])

  return (
    <ErrorBoundary>
      <Suspense fallback={<LoadingFallback />}>
        <Toaster position="top-right" toastOptions={{ className: 'dark:bg-slate-800 dark:text-white' }} />
        <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/news" element={<News />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/announcements" element={<About />} />
          <Route path="/documents" element={<PublicDocuments />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
        
        <Route path="/login" element={<Login />} />
        <Route path="/candidat-login" element={<CandidatLogin />} />
        <Route path="/register" element={<Register />} />

        {/* Backoffice Layout (RH, Vet, Doctor, Nurse) */}
        <Route path="/" element={
          <ProtectedRoute allowedRoles={['rh', 'veterinarian', 'doctor', 'nurse', 'admin']}>
            <MainLayout />
          </ProtectedRoute>
        }>
          <Route path="dashboard" element={<DashboardSelector />} />
          
          {/* Common Profile View */}
          <Route path="personnel/:id" element={<EmployeeProfile />} />

          {/* RH Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['rh', 'admin']} />}>
            <Route path="rh/employees" element={<EmployeeList />} />
            <Route path="rh/employees/add" element={<AddEmployee />} />
            <Route path="rh/roles" element={<RolesPermissions />} />
            <Route path="rh/organigramme" element={<Organigramme />} />
            <Route path="rh/grades" element={<Grades />} />
            <Route path="rh/admin-status" element={<AdminStatus />} />
            <Route path="rh/promotions" element={<Promotions />} />
            <Route path="rh/performance" element={<PerformanceEval />} />
            <Route path="rh/eval-history" element={<EvalHistory />} />
            <Route path="rh/career-path" element={<CareerPath />} />
            <Route path="rh/salaries" element={<Salaries />} />
            <Route path="rh/bonuses" element={<Bonuses />} />
            <Route path="rh/payment-history" element={<PaymentHistory />} />
            <Route path="rh/leave-requests" element={<LeaveRequests />} />
            <Route path="rh/leave-balance" element={<LeaveBalance />} />
            <Route path="rh/leave-calendar" element={<LeaveCalendar />} />
            <Route path="rh/documents" element={<AdminDocuments />} />
            <Route path="rh/documents/create" element={<CreateDocument />} />
            <Route path="rh/notifications" element={<NotificationsPage />} />
            <Route path="rh/reports" element={<HRReports />} />
            <Route path="rh/statistics" element={<Statistics />} />
          </Route>

          {/* Veterinary Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['veterinarian', 'admin']} />}>
            <Route path="veterinaire/animals" element={<Animals />} />
            <Route path="veterinaire/animals/add" element={<AddAnimal />} />
            <Route path="veterinaire/health" element={<HealthSituations />} />
            <Route path="veterinaire/health/register" element={<RegisterHealthCase />} />
            <Route path="veterinaire/vaccinations" element={<Vaccinations />} />
            <Route path="veterinaire/vaccinations/add" element={<RegisterVaccination />} />
            <Route path="veterinaire/certificates" element={<Certificates />} />
            <Route path="veterinaire/certificates/issue" element={<IssueCertificate />} />
            <Route path="veterinaire/epidemics" element={<Epidemics />} />
            <Route path="veterinaire/reports" element={<VetReports />} />
            <Route path="veterinaire/profile" element={<VetProfile />} />
            <Route path="veterinaire/admin-status" element={<VetAdminStatus />} />
            <Route path="veterinaire/salary" element={<VetSalary />} />
            <Route path="veterinaire/evaluations" element={<VetEvaluations />} />
            <Route path="veterinaire/promotions" element={<VetPromotions />} />
            <Route path="veterinaire/leaves" element={<VetLeaves />} />
            <Route path="veterinaire/documents" element={<VetDocuments />} />
            <Route path="veterinaire/notifications" element={<VetNotifications />} />
          </Route>

          {/* Medical Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['doctor', 'admin']} />}>
            <Route path="medical/patients" element={<Patients />} />
            <Route path="medical/patients/add" element={<AddPatient />} />
            <Route path="medical/appointments" element={<MedAppointments />} />
            <Route path="medical/diagnosis" element={<Diagnosis />} />
            <Route path="medical/certificates" element={<MedCertificates />} />
            <Route path="medical/certificates/issue" element={<MedIssueCertificate />} />
            <Route path="medical/follow-up" element={<FollowUp />} />
            <Route path="medical/profile" element={<MedProfile />} />
            <Route path="medical/admin-status" element={<MedAdminStatus />} />
            <Route path="medical/salary" element={<MedSalary />} />
            <Route path="medical/evaluations" element={<MedEvaluations />} />
            <Route path="medical/promotions" element={<MedPromotions />} />
            <Route path="medical/leaves" element={<MedLeaves />} />
            <Route path="medical/documents" element={<MedDocuments />} />
            <Route path="medical/notifications" element={<MedNotifications />} />
          </Route>

          {/* Nurse Specific Routes */}
          <Route element={<ProtectedRoute allowedRoles={['nurse', 'admin']} />}>
            <Route path="nurse/patients" element={<NursePatients />} />
            <Route path="nurse/follow-up" element={<NurseFollowUp />} />
            <Route path="nurse/treatments" element={<NurseTreatments />} />
            <Route path="nurse/treatments/add" element={<AddTreatment />} />
            <Route path="nurse/vitals" element={<NurseVitalSigns />} />
            <Route path="nurse/vitals/register" element={<RegisterVitalSign />} />
            <Route path="nurse/reports" element={<NurseHealthReports />} />
            <Route path="nurse/appointments" element={<NurseAppointments />} />
            <Route path="nurse/profile" element={<NurseProfile />} />
            <Route path="nurse/admin-status" element={<NurseAdminStatus />} />
            <Route path="nurse/salary" element={<NurseSalary />} />
            <Route path="nurse/evaluations" element={<NurseEvaluations />} />
            <Route path="nurse/promotions" element={<NursePromotions />} />
            <Route path="nurse/leaves" element={<NurseLeaves />} />
            <Route path="nurse/documents" element={<NurseDocuments />} />
            <Route path="nurse/notifications" element={<NurseNotifications />} />
          </Route>

          <Route path="recrutement" element={<Recruitment />} />
          <Route path="parametres"  element={<Settings />} />
        </Route>

        {/* Other Specific Portals */}
        <Route path="/portail/candidat" element={
          <ProtectedRoute allowedRoles={['candidat']}>
            <CandidatePortal />
          </ProtectedRoute>
        } />

        <Route path="/portail/fonctionnaire" element={
          <ProtectedRoute allowedRoles={['doctor', 'nurse', 'veterinarian', 'rh', 'admin', 'fonctionnaire']}>
            <FonctionnairePortal />
          </ProtectedRoute>
        } />

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  </ErrorBoundary>
  )
}

export default App;
