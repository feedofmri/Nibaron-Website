import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import Footer from './components/Footer/Footer';
import NotificationDrawer from '../../components/features/NotificationDrawer/NotificationDrawer';
import './MainLayout.css';

const MainLayout = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="main-layout">
      {/* Main Content Area */}
      <div className="main-content">
        {/* Common Header for all users */}
        <CommonHeader />

        {/* Page Content */}
        <main className={`page-content ${isHomepage ? 'homepage-content' : ''}`}>
          {children || <Outlet />}
        </main>

        {/* Footer */}
        <Footer />
      </div>

      {/* Notification Drawer */}
      <NotificationDrawer />
    </div>
  );
};

export default MainLayout;
