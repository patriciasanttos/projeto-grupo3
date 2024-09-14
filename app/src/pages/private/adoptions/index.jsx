import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdoptionsAdmin from "../../../components/modal/modalAdoptionsAdmin/ModalAdoptionsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";

import "./styles.scss";

function Adoptions() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);

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
    setTutorsList(tutorsList.filter((tutors) => tutors.id !== tutor.id));
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const createTutorsList = (tutor) => {
    let tutors = [...tutorsList];
    tutors.push({
      ...tutor,
      id: tutorsList.length + 1,
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

  return (
    <>
      <AdminNavBar headerTitle="Adoções">
        {/* substituir o button pelo ícone de adicionar*/}
        <button onClick={onClickNewTutor}>Adicionar</button>
        <div className="adoptions-list-container">
          <AdminList
            columns={columns}
            rows={tutorsList}
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
