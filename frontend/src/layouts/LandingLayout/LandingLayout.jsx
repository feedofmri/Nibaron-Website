import React from 'react';
import { Outlet } from 'react-router-dom';
import LandingHeader from './components/LandingHeader/LandingHeader';
import LandingFooter from './components/LandingFooter/LandingFooter';
import './LandingLayout.css';

const LandingLayout = ({ children }) => {
  return (
    <div className="landing-layout">
      <LandingHeader />

      <main className="landing-main">
        {children || <Outlet />}
      </main>

      <LandingFooter />
    </div>
  );
};

export default LandingLayout;
