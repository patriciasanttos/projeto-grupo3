import React, { useEffect, useState } from 'react'
import './styles.scss';

import Logo from "../../../assets/images/logo.svg"
import { loginAdmin } from '../../../services/api/admins';
import { Navigate } from 'react-router-dom';

function Admin() {
  const [ userState, setUserState ] = useState({
    user: '',
    password: ''
  });
  const [ logged, setLogged ] = useState(false);

  useEffect(() => {
    if (window.localStorage.getItem('login'))
      return setLogged(true);
  }, []);

  const login = () => {
    loginAdmin(userState)
      .then(res => {
        window.alert('Logged in: ' + JSON.stringify(res));
        window.localStorage.setItem('login', JSON.stringify(res))
        return setLogged(true);
      })
      .catch(error => {
        window.alert(JSON.stringify(error.message));
      });
  }

  if (logged)
    return <Navigate to='/admin/control_panel' />

  return (
    <div className='admin'>
        <img src={Logo} alt="ong-logo" />
        <div className='admin-container'>
            <label htmlFor=""> Nome de usuário ou e-mail</label>
            <input 
              className='admin-entrie' 
              type="text" 
              placeholder='Usuário ou e-mail' 
              onChange={e => setUserState({ ...userState, user: e.target.value })}
            />
            <label htmlFor="">Senha</label>
            <input 
              className='admin-entrie' 
              type="password" 
              placeholder='Senha'
              onChange={e => setUserState({ ...userState, password: e.target.value })}
            />
            <input className='admin-btn' type="submit" value='Acessar' onClick={() => login()} />
        </div>
    </div>
  )
}

export default Admin