import React, { useEffect, useState } from "react";
import createIcon from '../../../assets/icons/create_icon.svg'
import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalVolunteers from "../../../components/modal/modalVolunteersAdmin/ModalVolunteers";

import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
import { createVolunteer, deleteVolunteer, getAllVolunteers, updateVolunteer } from "../../../services/api/volunteers";

function Volunteers() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  //Filtro de Pesquisa
  const initialFilter = {
    name: null,
    email: null,
    phone: null
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

  const [volunteersList, setVolunteersList] = useState([]);

  useEffect(() => {
    getAllVolunteers()
      .then(data => setVolunteersList(data));
  }, []);

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
      rowKey: "phone",
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

  const updateVolunteersList = async (volunteer) => {
    let volunteers = volunteersList.map((volunt) => {
      if (volunt.id === volunteer.id)
        return volunteer;

      return volunt;
    });

    if (volunteer.phone)
      volunteer.phone = Number(volunteer.phone.replace(/[()\-\s]/g, ''));

    await updateVolunteer(volunteer)
      .catch(error => {
        console.log(error);
      });

    setVolunteersList(volunteers);
    setIsModalOpen(false);
  };

  const deleteVolunteersList = async (volunteer) => {
    await deleteVolunteer(volunteer.id)
      .catch(error => {
        console.log(error);
      });

    setVolunteersList(volunteersList.filter((volunteers) => volunteers.id !== volunteer.id));
    setIsModalOpen(false);
  }

  const createVolunteersList = async (volunteer) => {
    let volunteers = [...volunteersList];
    volunteers.push({
      ...volunteer,
      id: volunteersList.length + 1,
    });

    await createVolunteer({
      ...volunteer,
      phone: Number(volunteer.phone.replace(/[()\-\s]/g, '')),
    })
      .catch(error => console.log(error));

    setVolunteersList(volunteers);
    setIsModalOpen(false);
  };

  const onClickEditVolunteer = (volunteer) => {
    setIsModalOpen(true);
    setSelectedVolunteer(volunteer);
    setModalAction(ModalActionsEnum.UPDATE);
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
            value={getFilterState("phone")}
              onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
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
