import React from 'react';

import './styles.css';
import AdminNavBar from '../../../components/admin_navbar/AdminNavBar';

function ControlPanel() {
  return (
    <div className='admin-page-container'>
      <AdminNavBar />

      <div>
        <h1>Painel de controle</h1>
      </div>
    </div>
  );
}

export default ControlPanel;