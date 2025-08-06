import React from 'react';
import Navbar from './Navbar';


function Layout({children }) {
  return (
    <div className="layout">
      <div className="layout-body">
        <Navbar />

        <main className="layout-content">
          {children}
        </main>
      </div>
    </div>
  );
}

export default Layout;
