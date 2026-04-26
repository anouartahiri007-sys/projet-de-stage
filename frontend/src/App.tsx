import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import { useAuthStore } from './lib/auth'

// Pages
import Dashboard from './pages/Dashboard'
import EmployeeList from './features/employees/EmployeeList'
import EmployeeProfile from './features/employees/EmployeeProfile'
import Documents from './pages/Documents'
import Recruitment from './pages/Recruitment'
import Settings from './pages/Settings'
import Reports from './pages/Reports'
import Career from './pages/Career'
import Training from './pages/Training'
import Health from './pages/Health'
import Veterinary from './pages/Veterinary'

// Auth
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

const ProtectedRoute = ({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) => {
  const { isAuthenticated, user } = useAuthStore()
  if (!isAuthenticated || !user) return <Navigate to="/login" replace />
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    if (user.role === 'candidat') return <Navigate to="/portail/candidat" replace />
    if (user.role === 'fonctionnaire') return <Navigate to="/portail/fonctionnaire" replace />
    return <Navigate to="/login" replace />
  }
  return <>{children}</>
}

const App = () => {
  return (
    <Routes>
      {/* Public */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* RH Admin Backoffice */}
      <Route path="/" element={
        <ProtectedRoute allowedRoles={['rh_admin']}>
          <MainLayout />
        </ProtectedRoute>
      }>
        <Route path="dashboard"   element={<Dashboard />} />
        <Route path="personnel"   element={<EmployeeList />} />
        <Route path="personnel/:id" element={<EmployeeProfile />} />
        <Route path="recrutement" element={<Recruitment />} />
        <Route path="carriere"    element={<Career />} />
        <Route path="documents"   element={<Documents />} />
        <Route path="formation"   element={<Training />} />
        <Route path="sante"       element={<Health />} />
        <Route path="veterinaire" element={<Veterinary />} />
        <Route path="rapports"    element={<Reports />} />
        <Route path="parametres"  element={<Settings />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Route>

      {/* Candidat Portal */}
      <Route path="/portail/candidat" element={
        <ProtectedRoute allowedRoles={['candidat']}>
          <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-10">
            <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-blue-100 max-w-xl w-full">
              <h1 className="text-4xl mb-4 text-[#152C4D] font-extrabold">Espace Candidat</h1>
              <p className="text-slate-500">Bienvenue sur votre portail sécurisé. Les concours disponibles s'afficheront ici prochainement.</p>
            </div>
          </div>
        </ProtectedRoute>
      } />

      {/* Fonctionnaire Portal */}
      <Route path="/portail/fonctionnaire" element={
        <ProtectedRoute allowedRoles={['fonctionnaire']}>
          <div className="min-h-screen bg-[#F4F7FB] flex items-center justify-center p-10">
            <div className="text-center p-12 bg-white rounded-3xl shadow-xl border border-emerald-100 max-w-xl w-full">
              <h1 className="text-4xl mb-4 text-emerald-800 font-extrabold">Espace Fonctionnaire</h1>
              <p className="text-slate-500">Ici vous pourrez télécharger vos arrêtés et attestations de service.</p>
            </div>
          </div>
        </ProtectedRoute>
      } />

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  )
}

export default App
