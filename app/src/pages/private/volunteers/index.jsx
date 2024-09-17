import React, { useState } from "react";
import createIcon from '../../../assets/icons/create_icon.svg'
import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalVolunteers from "../../../components/modal/modalVolunteersAdmin/ModalVolunteers";

import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'

function Volunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  //Filtro de Pesquisa
  const initialFilter = {
    name: null,
    email: null,
    phoneNumber: null,
    nameAnimal: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const getFilteredItems = () => {
    let results = [...volunteersList];

    Object.keys(filter).forEach((filterName) => {
      if (filter[filterName]) {
        results = results.filter(
          (item) =>
            item[filterName]
              .toLowerCase()
              .indexOf(filter[filterName].toLowerCase()) !== -1
        );
      }
    });

    return results;
  };

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  // To do: Trazer lista do back-end
  const [volunteersList, setVolunteersList] = useState([
    {
      id: 1,
      name: "Jorge",
      email: "jorge@gmail.com",
      phoneNumber: "(11) 91234-5678",
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
      name: "Lais",
      email: "lais@gmail.com",
      phoneNumber: "(22) 99876-5432",
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
      name: "Gabriel",
      email: "gabriel@gmail.com",
      phoneNumber: "(33) 98527-4196",
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
  const deleteVolunteersList = (volunteer) => {
    setVolunteersList(volunteersList.filter((volunteers) => volunteers.id !== volunteer.id));
    setIsModalOpen(false);
  }

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

  const onClickDeleteVolunteer = (volunteer) => {
    setIsModalOpen(true);
    setSelectedVolunteer(volunteer);
    setModalAction(ModalActionsEnum.DELETE)
  };

  const onClickNewVolunteer = () => {
    setIsModalOpen(true);
    setSelectedVolunteer(null);
  };

  return (
    <>
      <AdminNavBar headerTitle="Voluntários">
        <div className="admin-voluunters-input">
          <div className="admin-volunteers-text">
            <input type="text" 
            placeholder="Nome"
            value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
              />
            <input type="text" 
            placeholder="Contato"
            value={getFilterState("phoneNumber")}
              onChange={(e) => setFilter({ ...filter, phoneNumber: e.target.value })}
            />
            <input type="text" 
            placeholder="Disponibilidade"
            value={getFilterState("availability")}
            onChange={(e) => setFilter({ ...filter, availability: e.target.value })}
            />
          </div>
          <div className="admin-volunteers-btn">
            <label htmlFor="">Adicionar</label>
            <button onClick={onClickNewVolunteer}><img className="pointer" src={createIcon} alt="" /></button>
          </div>

        </div>
        <div className="volunteers-list-container">
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            onClickEditRow={onClickEditVolunteer}
            onClickDeleteRow={onClickDeleteVolunteer}
          />
        </div>
      </AdminNavBar>
      <ModalVolunteers
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedVolunteer={selectedVolunteer}
        updateVolunteersList={updateVolunteersList}
        createVolunteersList={createVolunteersList}
        deleteVolunteersList={deleteVolunteersList}
      />
    </>
  );
}

export { Volunteers };
