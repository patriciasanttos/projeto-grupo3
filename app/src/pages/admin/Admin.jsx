import React from 'react'
import styles from './styles.module.scss';

import Logo from "../../assets/images/logo.svg"

const Admin = () => {
  return (
    <div className={styles.admin}>
        <img src={Logo} alt="ong-logo" />
        <div className={styles.adminContainer}>
            <label htmlFor=""> Nome de usuário ou e-mail</label>
            <input className={styles.adminEntrie} type="text" placeholder='Usuário ou e-mail'/>
            <label htmlFor="">Senha</label>
            <input className={styles.adminEntrie} type="password" placeholder='Senha'/>
            <input className={styles.adminBtn} type="submit" value='Acessar'/>
        </div>
    </div>
  )
}

export default Admin