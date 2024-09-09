import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import Modal from "../../../components/modal";

import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";

function Volunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false)

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
      setIsModalOpen(true)
    };

  return (
    <>
      <AdminNavBar headerTitle="Voluntários">
        <AdminList
          columns={columns}
          rows={volunteersList}
          onClickRow={onClickVolunteer}
        />
      </AdminNavBar>
      <Modal
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        title="Adicione um novo voluntário"
      >
        <form action="" className="modal-volunteers-form">
          <input type="text" name="name" placeholder="Nome do Voluntário" />
          <input type="text" name="email" placeholder="E-mail" />
        </form>
      </Modal>
    </>
  );
}

export { Volunteers };
