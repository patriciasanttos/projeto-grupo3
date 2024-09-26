import React from 'react';

import './styles.scss';
import { useNavigate } from 'react-router-dom';

function LogoutModal({ isOpen, onClose }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem('login');
    navigate('/admin/login');
  }

  return isOpen && (
    <div className="logout-modal">
      <h2 className='logout-title'>Deseja sair?</h2>

      <button className='logout-btn' onClick={() => logout()}>Sim</button>
      <button className='logout-btn' onClick={() => onClose()}>Não</button>
    </div>
  );
}

export default LogoutModal;