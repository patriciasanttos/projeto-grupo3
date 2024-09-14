import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalSponsorshipsAdmin from "../../../components/modal/modalSponsorshipsAdmin/ModalSponsorshipsAdmin";
import AdminList from "../../../components/admin_list/AdminList";

import "./styles.scss";

function Sponsorships() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSponsor, setSelectedSponsor] = useState(null);

  // To do: Trazer lista do back-end
  const [sponsorsList, setSponsorsList] = useState([
    {
      id: 1,
      name: "Padrinho 1",
      email: "padrinho1@gmail.com",
      phoneNumber: "(11) 11111-1111",
      sponsorDate: "14/09/24",
      nameAnimal: "Hector",
      sex: "Macho",
      temperament: "Ansioso",
      castrated: "Sim",
      healthHistory: "Bom",
      adoptionStatus: "",
      sponsorsInfo: "",
    },
    {
      id: 2,
      name: "Padrinho ",
      email: "padrinho2@gmail.com",
      phoneNumber: "(22) 22222-2222",
      sponsorDate: "14/09/24",
      nameAnimal: "Hector",
      sex: "Macho",
      temperament: "Ansioso",
      castrated: "Sim",
      healthHistory: "Bom",
      adoptionStatus: "",
      sponsorsInfo: "",
    },
    {
      id: 3,
      name: "Padrinho 3",
      email: "padrinho3@gmail.com",
      phoneNumber: "(33) 33333-3333",
      sponsorDate: "14/09/24",
      nameAnimal: "Hector",
      sex: "Macho",
      temperament: "Ansioso",
      castrated: "Sim",
      healthHistory: "Bom",
      adoptionStatus: "",
      sponsorsInfo: "",
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
      title: "Apadrinhou",
      rowKey: "nameAnimal",
    },
    {
      title: "Status",
      rowKey: "adoptionStatus",
    },
  ];

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
  const createSponsorsList = (sponsor) => {
    let sponsors = [...sponsorsList];
    sponsors.push({
      ...sponsor,
      id: sponsorsList.length + 1,
    });
    setSponsorsList(sponsors);
    setIsModalOpen(false);
  };

  const onClickEditSponsor = (sponsor) => {
    setIsModalOpen(true);
    setSelectedSponsor(sponsor);
  };

  const onClickNewSponsor = () => {
    setIsModalOpen(true);
    setSelectedSponsor(null);
  };
  return (
    <>
      <AdminNavBar headerTitle="Apadrinhamento">
        {/* substituir o button pelo ícone de adicionar*/}
        <button onClick={onClickNewSponsor}>Adicionar</button>
        <AdminList
          columns={columns}
          rows={sponsorsList}
          onClickRow={onClickEditSponsor}
        />
      </AdminNavBar>
      <ModalSponsorshipsAdmin
        isOpen={isModalOpen}
        onModalClose={() => setIsModalOpen(false)}
        selectedSponsor={selectedSponsor}
        updateSponsorsList={updateSponsorsList}
        createSponsorsList={createSponsorsList}
      />
    </>
  );
}

export default Sponsorships;
