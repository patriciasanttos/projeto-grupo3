import React, { useState } from "react";
import { Link } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from 'react-router-dom';
import Popup from "reactjs-popup";

import logo from "../../assets/images/logo.svg";
import animals_icon from "../../assets/icons/navbar_admin/animals_icon.svg";
import sponsorships_icon from "../../assets/icons/navbar_admin/sponsorships_icon.svg";
import adoptions_icon from "../../assets/icons/navbar_admin/adoptions_icon.svg";
import volunteers_icon from "../../assets/icons/navbar_admin/volunteers_icon.svg";
import admin_icon from "../../assets/icons/navbar_admin/admin_icon.svg";
import logoutIcon from "../../assets/icons/navbar_admin/logout.svg";
import user_icon from "../../assets/icons/navbar_admin/user_icon.svg";
import ModalLogoutConfirm from "../../components/modal/modalDeleteConfirm/ModalDeleteConfirm";

import "./styles.scss";

function AdminNavBar({ headerTitle, children }) {
  const navigate = useNavigate();

  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const userCookie = jwtDecode(localStorage.getItem("login"));

  const contentStyle = { background: 'white', width: '100px' };
  const overlayStyle = { };
  const arrowStyle = { color: 'white' }; // style for an svg element


  const openMenu = () => {
    setMenuIsOpen(!menuIsOpen);
  };

  const logout = () => {
    localStorage.removeItem('login');
    navigate('/admin/login');
  }

  const logoutItem = (
    <div
    className="menu-logout"
    onClick={() => setLogoutModalOpen(true)}
  >
    <img src={logoutIcon} alt="" />
    {" "}
    Sair 
  </div>
  )

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
              <img src={admin_icon} alt="Logo" />
              <p>Administrador</p>
            </button>
          </Link>
        </nav>
      </aside>

      <div className="admin-page-content">
        <header className="admin-header">
          <h1>{headerTitle}</h1>

          <div className="admin-header-user-container">
            <Popup
              trigger={
                <button
                  onClick={openMenu}
                  className="admin-header-user-btn"
                  style={{ position: "relative", right: "18px" }}
                >
                  {userCookie.name} <img src={user_icon} alt="User Icon" />
                </button>
              }
              position="bottom right "
              {...{ contentStyle, overlayStyle, arrowStyle }}
            >
             {logoutItem}
            </Popup>
          </div>
        </header>

        <main className="admin-main-container">{children}</main>
      </div>


      <ModalLogoutConfirm
        isOpen={logoutModalOpen}
        onModalClose={() => setLogoutModalOpen(false)}
        onDeleteConfirm={logout}
        message="Deseja sair?"
      />
    </div>
  );
}

export default AdminNavBar;
