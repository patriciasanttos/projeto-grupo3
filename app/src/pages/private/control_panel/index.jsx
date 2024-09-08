import React from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";

import "./styles.scss";

function ControlPanel() {
  return (
    <AdminNavBar>
      <div>
        <header className="admin-header">
          <h1>Painel de controle</h1>
        </header>
    
        <main className='admin-main-container'>
          <h2>Escolha uma opção no menu lateral e consiga ter mais controle no seu dia a dia!</h2>
          <h3>Animais</h3>
          <p>Nesse campo é possível visualizar todos os animais que estão na ONG, assim como:
          Adicionar e editar cada um.</p>
          <h3>Apadrinhamento</h3>
          <p>Nesse campo é possível visualizar todos os padrinhos dos animais, assim como:
          Adicionar e editar cada um.</p>
          <h3>Adoções</h3>
          <p>Nesse campo é possível visualizar todos as pessoas que adotaram algum animal, assim como:
          Adicionar e editar cada um.</p>
          <h3>Voluntários</h3>
          <p>Nesse campo é possível visualizar todos os voluntários, assim como:
          Adicionar e editar cada um.</p>
        </main>
      </div>
    </AdminNavBar>
  );
}

export default ControlPanel;
