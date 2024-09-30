import React, { useState } from "react";
import "./styles.scss";
import { toast } from "react-toastify";

import Logo from "../../../assets/images/logo.svg";
import { loginAdmin } from "../../../services/api/admins";
import { useNavigate } from "react-router-dom";
import Button from "../../../components/button";

function Admin() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [userState, setUserState] = useState({
    user: "",
    password: "",
  });

  const login = () => {
    setLoading(true);
    loginAdmin(userState)
      .then((res) => {
        setLoading(false);
        window.localStorage.setItem("login", res.token);

        return navigate("/admin/control_panel");
      })
      .catch((error) => {
        setLoading(false);

        toast.error(
          <div>
            <span>Erro ao realizar login:</span>
            <p>
              {JSON.stringify(
                error.response.data.error ??
                  error.response.data.message ??
                  error.message
              )}
            </p>
          </div>,
          { theme: "colored" }
        );
      });
  };

  return (
    <div className="admin">
      <img src={Logo} alt="ong-logo" />
      <div
        className="admin-container"
        onKeyDown={(e) => e.key === "Enter" && login()}
      >
        <label>Nome de usuário ou e-mail</label>
        <input
          className="admin-entrie"
          type="text"
          placeholder="Usuário ou e-mail"
          onChange={(e) => setUserState({ ...userState, user: e.target.value })}
        />
        <label>Senha</label>
        <input
          className="admin-entrie"
          type="password"
          placeholder="Senha"
          onChange={(e) =>
            setUserState({ ...userState, password: e.target.value })
          }
        />
        <Button
          loading={loading}
          className="admin-btn"
          type="submit"
          onClick={login}
        >
          Acessar
        </Button>
      </div>
    </div>
  );
}

export default Admin;
