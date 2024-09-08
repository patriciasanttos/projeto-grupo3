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

        <main className="admin-main-container">
          <h1>Adicione o conteúdo nesta main</h1>
        </main>
      </div>
    </AdminNavBar>
  );
}

export default ControlPanel;
