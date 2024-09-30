import React from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";

import "./styles.scss";
import { jwtDecode } from "jwt-decode";

function ControlPanel() {
  const userCookie = jwtDecode(localStorage.getItem('login'));

  return (
    <AdminNavBar headerTitle="Painel de controle">
        <main className='admin-main-container'>
          <div className="admin-control-panel">
            <h2 className="control-panel-username">Olá {userCookie.name}!</h2>

            <h2 className="control-panel-title">Escolha uma opção no menu lateral e consiga ter mais controle no seu dia a dia!</h2>

            <h3 className="control-panel-about-page-title">Animais</h3>
            <p className="control-panel-about-page-info">Nesse campo é possível visualizar todos os animais que estão na ONG, assim como:
            Adicionar e editar cada um.</p>

            <h3 className="control-panel-about-page-title">Apadrinhamento</h3>
            <p className="control-panel-about-page-info">Nesse campo é possível visualizar todos os padrinhos dos animais, assim como:
            Adicionar e editar cada um.</p>

            <h3 className="control-panel-about-page-title">Adoções</h3>
            <p className="control-panel-about-page-info">Nesse campo é possível visualizar todos as pessoas que adotaram algum animal, assim como:
            Adicionar e editar cada um.</p>
            
            <h3 className="control-panel-about-page-title">Voluntários</h3>
            <p className="control-panel-about-page-info">Nesse campo é possível visualizar todos os voluntários, assim como:
            Adicionar e editar cada um.</p>
          </div>
        </main>
    </AdminNavBar>
  );
}

export default ControlPanel;
