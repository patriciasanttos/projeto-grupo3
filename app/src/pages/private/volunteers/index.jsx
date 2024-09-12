import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalVolunteers from "../../../components/modal/modalVolunteersAdmin/ModalVolunteers";


import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";

function Volunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  // To do: Trazer lista do back-end
  const [volunteersList, setVolunteersList] = useState([
    {
      id: 1,
      name: "Pessoa",
      email: "pessoa@gmail.com",
      phoneNumber: "(11) 970707-7070",
      address: "Rua dos bobos",
      availability: "8 horas - semana",
      nameResponsible: "Responsável 1",
      occupation: "Profissão 1",
      studyTime: "Manhã",
      sector: "Design",
      startDate: "10/09/24",
      volunteersInfo: "Nada a declarar 1",
    },
    {
      id: 2,
      name: "Pessoa 2",
      email: "pessoa2@gmail.com",
      phoneNumber: "(22) 970707-7070",
      address: "Rua dos bobos, 02",
      availability: "5 horas - semana",
      nameResponsible: "Responsável 2",
      occupation: "Profissão 2",
      studyTime: "Tarde",
      sector: "Não defino",
      startDate: "10/08/24",
      volunteersInfo: "Nada a declarar 2",
    },
    {
      id: 3,
      name: "Pessoa 3",
      email: "pessoa3@gmail.com",
      phoneNumber: "(33) 970707-7070",
      address: "Rua dos bobos, 03",
      availability: "3 horas - semana",
      nameResponsible: "Responsável 3",
      occupation: "Profissão 3",
      studyTime: "Noite",
      sector: "Rede social",
      startDate: "10/07/24",
      volunteersInfo: "Nada a declarar 3",
    },
  ]);

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

  // To do: Enviar para o back-end
  const updateVolunteersList = (volunteer) => {
    let volunteers = [...volunteersList];
    volunteers[volunteer.id - 1] = {
      ...volunteer,
    };
    setVolunteersList(volunteers);
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const createVolunteersList = (volunteer) => {
    let volunteers = [...volunteersList];
    volunteers.push({
      ...volunteer,
      id: volunteersList.length + 1,
    });
    setVolunteersList(volunteers);
    setIsModalOpen(false);
  };

  const onClickEditVolunteer = (volunteer) => {
    setIsModalOpen(true);
    setSelectedVolunteer(volunteer);
  };

  const onClickNewVolunteer = () => {
    setIsModalOpen(true);
    setSelectedVolunteer(null);
  };

  return (
    <>
      <AdminNavBar headerTitle="Voluntários">
        {/* substituir o button pelo ícone de adicionar*/}
        <button onClick={onClickNewVolunteer}>Adicionar</button>
        <AdminList
          columns={columns}
          rows={volunteersList}
          onClickRow={onClickEditVolunteer}
        />
      </AdminNavBar>
      <ModalVolunteers
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        selectedVolunteer={selectedVolunteer}
        updateVolunteersList={updateVolunteersList}
        createVolunteersList={createVolunteersList}
      />
    </>
  );
}

export { Volunteers };
