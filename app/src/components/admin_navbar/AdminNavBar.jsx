import React, { Children } from 'react';

import logo from '../../assets/images/logo.svg';
import animals_icon from '../../assets/icons/animals_icon.svg';
import sponsorships_icon from '../../assets/icons/sponsorships_icon.svg';
import adoptions_icon from '../../assets/icons/adoptions_icon.svg';
import volunteers_icon from '../../assets/icons/volunteers_icon.svg';
import admin_icon from "../../assets/icons/admin_icon.svg";

import './styles.scss';
import { Link } from 'react-router-dom';

function AdminNavBar({ headerTitle, children }) {
  return (
    <div className="admin-page-container">
      <aside className="admin-aside">
        <Link to="/admin/control_panel" className="logo">
          <img src={logo} alt="Logo" />
        </Link>

        <nav className="admin-nav">
          <Link to="/admin/animals">
            <button className="admin-navbar-btn">
              <img src={animals_icon} alt="Logo" />
              <p>Animais</p>
            </button>
          </Link>
          <Link to="/admin/sponsorships">
            <button className="admin-navbar-btn">
              <img src={sponsorships_icon} alt="Logo" />
              <p>Apadrinhamento</p>
            </button>
          </Link>
          <Link to="/admin/adoptions">
            <button className="admin-navbar-btn">
              <img src={adoptions_icon} alt="Logo" />
              <p>Adoções</p>
            </button>
          </Link>
          <Link to="/admin/volunteers">
            <button className="admin-navbar-btn">
              <img
                src={volunteers_icon}
                alt="Logo"
                style={{ paddingLeft: "15%" }}
              />
              <p>Voluntários</p>
            </button>
          </Link>
          <Link to="/admin/admin_page">
            <button className="admin-navbar-btn">
              <img
                src={admin_icon}
                alt="Logo"
              />
              <p>Administrador</p>
            </button>
          </Link>
        </nav>
      </aside>

      <div className="admin-page-content">
        <header className="admin-header">
          <h1>{headerTitle}</h1>
        </header>

        <main className="admin-main-container">{children}</main>
      </div>
    </div>
  );
}

export default AdminNavBar;