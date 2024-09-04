import React from 'react'
import './styles.scss';

import Logo from "../../../assets/images/logo.svg"

const Admin = () => {
  return (
    <div className='admin'>
        <img src={Logo} alt="ong-logo" />
        <div className='admin-container'>
            <label htmlFor=""> Nome de usuário ou e-mail</label>
            <input className='admin-entrie' type="text" placeholder='Usuário ou e-mail'/>
            <label htmlFor="">Senha</label>
            <input className='admin-entrie' type="password" placeholder='Senha'/>
            <input className='admin-btn' type="submit" value='Acessar'/>
        </div>
    </div>
  )
}

export default Admin