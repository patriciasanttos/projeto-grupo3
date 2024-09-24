import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdoptionsAdmin from "../../../components/modal/modalAdoptionsAdmin/ModalAdoptionsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";

import "./styles.scss";
import Input from "../../../components/input/Input";
import { createAdoption } from "../../../services/api/adoptions";

function Adoptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const initialFilter = {
    name: null,
    phoneNumber: null,
    address: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  // To do: Trazer lista do back-end
  const [tutorsList, setTutorsList] = useState([
    {
      id: 1,
      name: "Tutor 1",
      email: "turo1@gmail.com",
      phoneNumber: "(11) 11111-1111",
      address: "Rua tutor 1",
      nameAnimal: "Hector",
      sex: "Macho",
      temperament: "Ansioso",
      castrated: "Sim",
      healthHistory: "Dúvida",
      adoptionDate: "13/09/2024",
      tutorsInfo: "Nada a declarar",
    },
    {
      id: 2,
      name: "Tutor 2",
      email: "turo2@gmail.com",
      phoneNumber: "(22) 22222-2222",
      address: "Rua tutor 2",
      nameAnimal: "Júlia",
      sex: "Fêmea",
      temperament: "Ansiosa",
      castrated: "Sim",
      healthHistory: "Dúvida",
      adoptionDate: "13/09/2024",
      tutorsInfo: "Nada a declarar",
    },
    {
      id: 3,
      name: "Tutor 3",
      email: "turo3@gmail.com",
      phoneNumber: "(33) 33333-3333",
      address: "Rua tutor 3",
      nameAnimal: "Andressa",
      sex: "Fêmea",
      temperament: "Ansiosa",
      castrated: "Sim",
      healthHistory: "Dúvida",
      adoptionDate: "13/09/2024",
      tutorsInfo: "Nada a declarar",
    },
  ]);

  const columns = [
    {
      title: "ID",
      rowKey: "id",
    },
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
      title: "Adotou",
      rowKey: "nameAnimal",
    },
  ];

  const getFilteredItems = () => {
    let results = [...tutorsList];

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

  // To do: Enviar para o back-end
  const updateTutorsList = (tutor) => {
    let tutors = [...tutorsList];
    tutors[tutor.id - 1] = {
      ...tutor,
    };
    setTutorsList(tutors);
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const deleteTutorsList = (tutor) => {
    setTutorsList(
      tutorsList.filter((tutors) => tutors.id !== tutor.id)
  );
    setIsModalOpen(false);
  };

  const createTutorsList = async (tutor) => {
    let tutors = [...tutorsList];
    tutors.push({
      ...tutor,
      id: tutorsList.length + 1,
    });

    await createAdoption({
      ...tutor,
      phone: Number(tutor.phone.replace(/[()\-\s]/g, ''))
    })
      .then(res => console.log(res))
      .catch(error => {
        console.log(error);
      });

    setTutorsList(tutors);
    setIsModalOpen(false);
  };

  const onClickEditTutor = (tutor) => {
    setIsModalOpen(true);
    setSelectedTutor(tutor);
    setModalAction(ModalActionsEnum.UPDATE);
  };

  const onClickDeleteTutor = (tutor) => {
    setIsModalOpen(true);
    setSelectedTutor(tutor);
    setModalAction(ModalActionsEnum.DELETE);
  };

  const onClickNewTutor = () => {
    setIsModalOpen(true);
    setSelectedTutor(null);
    setModalAction(ModalActionsEnum.CREATE);
  };

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  return (
    <>
      <AdminNavBar headerTitle="Adoções">
      <div className="tutor-filter-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Nome"
              value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Contato"
              value={getFilterState("phoneNumber")}
              onChange={(e) => setFilter({ ...filter, phoneNumber: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Endereço"
              value={getFilterState("address")}
              onChange={(e) => setFilter({ ...filter, address: e.target.value })}
            />
          </div>

          <div className="add-icon">
            Adicionar
            <img
              className="pointer"
              src={CreateIcon}
              onClick={onClickNewTutor}
              alt=""
            />
          </div>
        </div>
        <div className="adoptions-list-container">
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            onClickEditRow={onClickEditTutor}
            onClickDeleteRow={onClickDeleteTutor}
          />
        </div>
      </AdminNavBar>

      <ModalAdoptionsAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedTutor={selectedTutor}
        updateTutorsList={updateTutorsList}
        createTutorsList={createTutorsList}
        deleteTutorsList={deleteTutorsList}
      />
    </>
  );
}

export default Adoptions;
