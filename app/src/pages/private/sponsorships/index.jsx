import React, { useState, useEffect } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalSponsorshipsAdmin from "../../../components/modal/modalSponsorshipsAdmin/ModalSponsorshipsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import { getAllAnimals } from "../../../services/api/animals";
import { getAllSponsorshipships } from "../../../services/api/sponsorships";

import CreateIcon from "../../../assets/icons/create_icon.svg";

import "./styles.scss";
import Input from "../../../components/input/Input";

function Sponsorships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedSponsor, setSelectedSponsor] = useState(null);
  const [animalsList, setAnimalsList] = useState([]);
  const [sponsorsList, setSponsorsList] = useState([]);

  const initialFilter = {
    name: null,
    email: null,
    phoneNumber: null,
    nameAnimal: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  useEffect(() => {
    getAllSponsorshipships().then(setSponsorsList);
    getAllAnimals().then(setAnimalsList);
  }, []);

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
      title: "Apadrinhou",
      rowKey: "nameAnimal",
    },
    {
      title: "Status",
      rowKey: "adoptionStatus",
    },
  ];

  const getFilteredItems = () => {
    let results = [...sponsorsList];

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
  const updateSponsorsList = (sponsor) => {
    let sponsors = [...sponsorsList];
    sponsors[sponsor.id - 1] = {
      ...sponsor,
    };
    setSponsorsList(sponsors);
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const deleteSponsorsList = (sponsor) => {
    setSponsorsList(
      sponsorsList.filter((sponsors) => sponsors.id !== sponsor.id)
    );
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const createSponsorsList = (sponsor) => {
    let sponsors = [...sponsorsList];
    sponsors.push({
      ...sponsor,
      id: sponsorsList.length + 1,
    });
    setSponsorsList(sponsors);
    setIsModalOpen(false);
  };

  const onClickDeleteSponsor = (tutor) => {
    setIsModalOpen(true);
    setSelectedSponsor(tutor);
    setModalAction(ModalActionsEnum.DELETE);
  };

  const onClickEditSponsor = (sponsor) => {
    setIsModalOpen(true);
    setSelectedSponsor(sponsor);
    setModalAction(ModalActionsEnum.UPDATE);
  };

  const onClickNewSponsor = () => {
    setIsModalOpen(true);
    setSelectedSponsor(null);
    setModalAction(ModalActionsEnum.CREATE);
  };

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  return (
    <>
      <AdminNavBar headerTitle="Apadrinhamento">
        <div className="sponsorship-filter-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Nome do Padrinho"
              value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="E-mail"
              value={getFilterState("email")}
              onChange={(e) => setFilter({ ...filter, email: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Celular"
              value={getFilterState("phoneNumber")}
              onChange={(e) => setFilter({ ...filter, phoneNumber: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Apadrinhou"
              value={getFilterState("nameAnimal")}
              onChange={(e) => setFilter({ ...filter, nameAnimal: e.target.value })}
            />
          </div>

          <div className="add-icon">
            Adicionar
            <img
              className="pointer"
              src={CreateIcon}
              onClick={onClickNewSponsor}
              alt=""
            />
          </div>
        </div>

        <div className="sponsorship-list-container">
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            onClickEditRow={onClickEditSponsor}
            onClickDeleteRow={onClickDeleteSponsor}
          />
        </div>
      </AdminNavBar>
      <ModalSponsorshipsAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedSponsor={selectedSponsor}
        updateSponsorsList={updateSponsorsList}
        createSponsorsList={createSponsorsList}
        deleteSponsorsList={deleteSponsorsList}
      />
    </>
  );
}

export default Sponsorships;
