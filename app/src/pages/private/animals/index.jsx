import React from 'react';

import AdminNavBar from '../../../components/admin_navbar/AdminNavBar';

import './styles.scss';

function Animals() {
  return (
    <div className='admin-page-container'>
      <AdminNavBar />

      <div>
        <header className='admin-header'>
          <h1>Animais</h1>
        </header>

        <main className='admin-main-container'>
          <h1>Adicione o conteúdo nesta main</h1>
        </main>
      </div>
    </div>
  );
}

export default Animals;