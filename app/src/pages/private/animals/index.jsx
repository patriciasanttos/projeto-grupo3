import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import AdminList from "../../../components/admin_list/AdminList";
import ModalAnimalsAdmin from "../../../components/modal/modalAnimalsAdmin/ModalAnimalsAdmin";
<<<<<<< Updated upstream
import ModalActionsEnum from '../../../utils/ModalActionsEnum'
=======
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";
>>>>>>> Stashed changes

import "./styles.scss";
import Input from "../../../components/input/Input";

function Animals() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedAnimal, setSelectedAnimal] = useState(null);

  const initialFilter = {
    name: null,
    sex: null,
    race: null,
  };
  const [filter, setFilter] = useState(initialFilter);

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

  const getFilteredItems = () => {
    let results = [...animalsList];

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
<<<<<<< Updated upstream
    setModalAction(ModalActionsEnum.UPDATE)
  };

  const onClickDeleteAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.DELETE)
=======
    setModalAction(ModalActionsEnum.UPDATE);
>>>>>>> Stashed changes
  };

  const onClickNewAnimal = () => {
    setIsModalOpen(true);
    setSelectedAnimal(null);
<<<<<<< Updated upstream
    setModalAction(ModalActionsEnum.CREATE)
=======
    setModalAction(ModalActionsEnum.CREATE);
  };
  
  const onClickDeleteAnimal = (animal) => {
    setIsModalOpen(true);
    setSelectedAnimal(animal);
    setModalAction(ModalActionsEnum.DELETE);
  };

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
>>>>>>> Stashed changes
  };

  return (
    <>
      <AdminNavBar headerTitle="Animais">
<<<<<<< Updated upstream
        <button onClick={onClickNewAnimal}>Adicionar</button>
        <div className="animal-list-container">
          <AdminList
            columns={columns}
            rows={animalsList}
            onClickEditRow={onClickEditAnimal}
            onClickDeleteRow={onClickDeleteAnimal}
          />
        </div>
        
=======
        <div className="animal-list-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Animal"
              value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Sexo"
              value={getFilterState("sex")}
              onChange={(e) => setFilter({ ...filter, sex: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Raça"
              value={getFilterState("race")}
              onChange={(e) => setFilter({ ...filter, race: e.target.value })}
            />
          </div>

          <div className="add-icon">
            Adicionar
            <img
              className="pointer"
              src={CreateIcon}
              onClick={onClickNewAnimal}
              alt=""
            />
          </div>
        </div>

        <AdminList
          columns={columns}
          rows={getFilteredItems()}
          onClickEditRow={onClickEditAnimal}
          onClickDeleteRow={onClickDeleteAnimal}
        />
>>>>>>> Stashed changes
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
