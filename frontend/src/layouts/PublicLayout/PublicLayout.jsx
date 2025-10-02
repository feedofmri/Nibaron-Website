import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import CommonHeader from '../../components/CommonHeader/CommonHeader';
import Footer from '../MainLayout/components/Footer/Footer';
import './PublicLayout.css';

const PublicLayout = ({ children }) => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';

  return (
    <div className="public-layout">
      {/* Common Header for public pages */}
      <CommonHeader />

      {/* Page Content */}
      <main className={`public-content ${isHomepage ? 'homepage-content' : ''}`}>
        {children || <Outlet />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default PublicLayout;
