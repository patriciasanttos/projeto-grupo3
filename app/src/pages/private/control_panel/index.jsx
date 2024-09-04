import React from 'react';

import AdminNavBar from '../../../components/admin_navbar/AdminNavBar';

import './styles.scss';

function ControlPanel() {
  return (
    <div className='admin-page-container'>
      <AdminNavBar />

      <div>
        <header className='admin-header'>
          <h1>Painel de controle</h1>
        </header>

        <main className='admin-main-container'>
          <h1>Conteúdo</h1>
        </main>
      </div>
    </div>
  );
}

export default ControlPanel;