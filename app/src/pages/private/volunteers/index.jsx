import React from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";

import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";

function Volunteers() {

  const volunteersList = [
    {
      name: "Pessoa",
      email: "pessoa@gmail.com",
      phoneNumber: "(11) 970707-7070",
      address: "Rua dos bobos",
      availability: "8 horas - semana",
    },
  ];

  const columns = [
    {
      title: "Nome",
      rowKey: "name",
    },
    {
      title: "E-mail",
      rowKey: "email",
    },
    {
      title: "Celular",
      rowKey: "phoneNumber",
    },
    {
      title: "Endereço",
      rowKey: "address",
    },
    {
      title: "Disponibilidade",
      rowKey: "availability",
    },
  ];

    const onClickVolunteer = (volunteer) => {
      // Substituir o alert para exibir o modal de edição
      alert(JSON.stringify(volunteer));
    };

  return (
    <AdminNavBar headerTitle="Voluntários">
      <AdminList
        columns={columns}
        rows={volunteersList}
        onClickRow={onClickVolunteer}
      />
    </AdminNavBar>
  );
}

export { Volunteers };
