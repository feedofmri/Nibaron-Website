import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

// Layout Components
import MainLayout from '../layouts/MainLayout/MainLayout';
import PublicLayout from '../layouts/PublicLayout/PublicLayout';
import AuthLayout from '../layouts/AuthLayout/AuthLayout';

// Page Components
import Landing from '../pages/Home/Home';
import Login from '../pages/Auth/Login/Login';
import Signup from '../pages/Auth/Signup/Signup';
import Dashboard from '../pages/Dashboard/Dashboard';
import NotFound from '../pages/NotFound/NotFound';
import Marketplace from '../pages/Marketplace/Marketplace.jsx';
import PreOrders from '../pages/PreOrders/PreOrders.jsx';
import Orders from '../pages/Orders/Orders.jsx';
import Community from '../pages/Community/Community.jsx';
import Settings from '../pages/Settings/Settings.jsx';

// Route Guards
const PrivateRoute = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

const PublicRoute = ({ children }) => {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
};

// Mixed Route - accessible to both logged-in and logged-out users
const MixedRoute = ({ children, requireAuth = false }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  if (requireAuth && !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Use appropriate layout based on authentication
  const Layout = isAuthenticated ? MainLayout : PublicLayout;

  return (
    <Layout>
      {children}
    </Layout>
  );
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] }
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: { duration: 0.3 }
  }
};

const AppRoutes = () => {
  return (
    <AnimatePresence mode="wait">
      <Routes>
        {/* Landing/Home Page - accessible to all */}
        <Route
          path="/"
          element={
            <MixedRoute>
              <motion.div
                variants={pageVariants}
                initial="initial"
                animate="enter"
                exit="exit"
                className="homepage-content" // Add homepage-specific class
              >
                <Landing />
              </motion.div>
            </MixedRoute>
          }
        />

        {/* Authentication Routes - only for logged-out users */}
        <Route path="/login" element={
          <PublicRoute>
            <AuthLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Login />
              </motion.div>
            </AuthLayout>
          </PublicRoute>
        } />

        <Route path="/signup" element={
          <PublicRoute>
            <AuthLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Signup />
              </motion.div>
            </AuthLayout>
          </PublicRoute>
        } />

        {/* Marketplace - accessible to all, but with restrictions for logged-out users */}
        <Route
          path="/marketplace"
          element={
            <MixedRoute>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Marketplace />
              </motion.div>
            </MixedRoute>
          }
        />

        {/* Pre-Orders - accessible to all, but content restricted for logged-out users */}
        <Route
          path="/pre-orders"
          element={
            <MixedRoute>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <PreOrders />
              </motion.div>
            </MixedRoute>
          }
        />

        {/* About Page - accessible to all */}
        <Route
          path="/about"
          element={
            <MixedRoute>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <div>About Page (Create this page)</div>
              </motion.div>
            </MixedRoute>
          }
        />

        {/* Protected Routes - only for authenticated users */}
        <Route path="/dashboard" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Dashboard />
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/community" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Community />
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/orders" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Orders />
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/settings" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <Settings />
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Profile and other user-specific routes */}
        <Route path="/profile" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <div>Profile Page (Create this page)</div>
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/wishlist" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <div>Wishlist Page (Create this page)</div>
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        <Route path="/help" element={
          <PrivateRoute>
            <MainLayout>
              <motion.div variants={pageVariants} initial="initial" animate="enter" exit="exit">
                <div>Help & Support Page (Create this page)</div>
              </motion.div>
            </MainLayout>
          </PrivateRoute>
        } />

        {/* Catch all route */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

export default AppRoutes;
