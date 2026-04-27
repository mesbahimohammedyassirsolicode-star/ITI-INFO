import { Suspense, lazy } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import CursorAura from './components/CursorAura';
import { pageLoad } from './animations/motionVariants';

const Home = lazy(() => import('./pages/Home'));
const Formations = lazy(() => import('./pages/Formations'));
const FormationDetails = lazy(() => import('./pages/FormationDetails'));
const Contact = lazy(() => import('./pages/Contact'));
const Inscription = lazy(() => import('./pages/Inscription'));
const Login = lazy(() => import('./pages/Login'));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard'));
const AdminFormations = lazy(() => import('./pages/AdminFormations'));
const AdminAnalytics = lazy(() => import('./pages/AdminAnalytics'));

const RouteLoader = () => (
  <div className="flex items-center justify-center min-h-[60vh]">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
);

function AppContent() {
  const location = useLocation();
  const prefersReducedMotion = useReducedMotion();
  const isAdminPath = location.pathname.startsWith('/admin');
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      {!isAdminPath && !isLoginPage && <CursorAura />}
      {!isAdminPath && !isLoginPage && <Navbar />}
      <motion.main
        className={`flex-grow ${!isAdminPath && !isLoginPage ? 'pt-20' : ''}`}
        key={location.pathname}
        variants={pageLoad}
        initial={prefersReducedMotion ? false : 'hidden'}
        animate="show"
      >
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/formations" element={<Formations />} />
            <Route path="/formations/:id" element={<FormationDetails />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/inscription" element={<Inscription />} />
            <Route path="/login" element={<Login />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/admin/formations" element={
              <ProtectedRoute>
                <AdminFormations />
              </ProtectedRoute>
            } />
            <Route path="/admin/analytics" element={
              <ProtectedRoute>
                <AdminAnalytics />
              </ProtectedRoute>
            } />
          </Routes>
        </Suspense>
      </motion.main>
      {!isAdminPath && !isLoginPage && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
