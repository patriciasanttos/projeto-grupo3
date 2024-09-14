import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import AdminList from "../../../components/admin_list/AdminList";
import ModalAnimalsAdmin from "../../../components/modal/modalAnimalsAdmin/ModalAnimalsAdmin";
import ModalActionsEnum from '../../../utils/ModalActionsEnum'

import "./styles.scss";

function Animals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);
  
  // To do: Trazer lista do back-end
  const [animalsList, setAnimalsList] = useState([
    {
      id: 1,
      name: "Hector",
      linkImg: "hectorporhector",
      sex: "Macho",
      size: "Médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      temperament: "ansioso",
      sponsor: "Não",
      status: "Disponível",
      stageLife: "Filhote",
      healthHistory: "",
      castrated: "",
      animalsInfo: "",
    },
    {
      id: 2,
      name: "Júlia",
      linkImg: "juliaporjulia",
      sex: "Fêmea",
      size: "Médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      temperament: "ansiosa",
      sponsor: "Sim",
      status: "Disponível",
      stageLife: "Filhote",
      healthHistory: "",
      castrated: "",
      animalsInfo: "",
    },
    {
      id: 3,
      name: "Andressa",
      linkImg: "andressaporandressa",
      sex: "Fêmea",
      size: "Médio",
      race: "SRD",
      local: "Setor A - Baia 01",
      temperament: "ansiosa",
      sponsor: "Não",
      status: "Disponível",
      stageLife: "Filhote",
      healthHistory: "",
      castrated: "",
      animalsInfo: "",
    },
  ]);

  // Coluna: title o que será exibido e rowKey pega a propriedade que será exibida
  const columns = [
    {
      title: "Nome",
      rowKey: "name",
    },
    {
      title: "Sexo",
      rowKey: "sex",
    },
    {
      title: "Porte",
      rowKey: "size",
    },
    {
      title: "Raça",
      rowKey: "race",
    },
    {
      title: "Local",
      rowKey: "local",
    },
    {
      title: "Padrinho",
      rowKey: "sponsor",
    },
    {
      title: "Status",
      rowKey: "status",
    },
  ];

  // To do: Enviar para o back-end
  const updateAnimalsList = (animal) => {
    let animals = [...animalsList];
    animals[animal.id - 1] = {
      ...animal,
    };
    setAnimalsList(animals);
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const deleteAnimalsList = (animal) => {
    setAnimalsList(animalsList.filter((animals) => animals.id !== animal.id));
    setIsModalOpen(false);
  }

  // To do: Enviar para o back-end
  const createAnimalsList = (animal) => {
    let animals = [...animalsList];
    animals.push({
      ...animal,
      id: animalsList.length + 1,
    });
    setAnimalsList(animals);
    setIsModalOpen(false);
  };

  const onClickEditAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.UPDATE)
  };

  const onClickDeleteAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.DELETE)
  };

  const onClickNewAnimal = () => {
    setIsModalOpen(true);
    setSelectedAnimal(null);
    setModalAction(ModalActionsEnum.CREATE)
  };

  return (
    <>
      <AdminNavBar headerTitle="Animais">
        <button onClick={onClickNewAnimal}>Adicionar</button>
        <div className="animal-list-container">
          <AdminList
            columns={columns}
            rows={animalsList}
            onClickEditRow={onClickEditAnimal}
            onClickDeleteRow={onClickDeleteAnimal}
          />
        </div>
        
      </AdminNavBar>
      <ModalAnimalsAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedAnimal={selectedAnimal}
        updateAnimalsList={updateAnimalsList}
        createAnimalsList={createAnimalsList}
        deleteAnimalsList={deleteAnimalsList}
      />
    </>
  );
}

export default Animals;
