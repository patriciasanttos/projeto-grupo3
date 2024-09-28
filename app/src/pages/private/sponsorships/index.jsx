import React, { useState, useEffect } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalSponsorshipsAdmin from "../../../components/modal/modalSponsorshipsAdmin/ModalSponsorshipsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import {
  acceptSponsorshipForm,
  createSponsorship,
  deleteSponsorship,
  denySponsorshipForm,
  getAllSponsorshipsForms,
  getAllSponsorshipships,
  updateSponsorship,
} from "../../../services/api/sponsorships";
import { getAllAnimals } from "../../../services/api/animals";
import LoadingPaw from "../../../components/loadingPaw";

import CreateIcon from "../../../assets/icons/create_icon.svg";

import "./styles.scss";
import Input from "../../../components/input/Input";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";

function Sponsorships() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    email: null,
    phone: null,
    animal_name: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isFormViewSelected, setIsFormViewSelected] = useState(false);

  const [selectedSponsor, setSelectedSponsor] = useState(null);

  const [userHasPermission, setUserHasPermission] = useState(false);
  const [sponsorsList, setSponsorsList] = useState([]);
  const [sponsorsFormsList, setSponsorsFormsList] = useState([]);
  const [animalsList, setAnimalsList] = useState([]);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions("sponsorships", navigate).then((response) => {
        setUserHasPermission(response);
      });
    }

    checkUserPermission();
  }, []);

  const loadAnimals = async () => {
    await getAllAnimals()
      .then(async (animals) => {
        const gettedAnimalsList = animals.map((animal) => ({
          id: animal.id,
          name: animal.name
        }));

        setAnimalsList(gettedAnimalsList);
        loadForms(gettedAnimalsList)
      });
  }

  const loadForms = async (animals) => {
    await getAllSponsorshipsForms(localStorage.getItem("login"))
      .then(async data => {
        const sponsorshipsFormList = []
        await data.forEach(form => {
          const animal = animals.filter(animal => animal.id === form.animal_id)[0];

          return sponsorshipsFormList.push({
            id: form.id,
            name: form.name,
            email: form.email,
            phone: form.phone,
            animal_name: animal.name,
            animal_id: animal.id
          });
        });

        return setSponsorsFormsList(sponsorshipsFormList);
      })
      .catch(error => console.log(error))
  }

  const refreshSponsorshipships = async () => {
    setLoading(true);

    await loadAnimals()
      .then(async () => {
        await getAllSponsorshipships(localStorage.getItem("login"))
          .then(async (data) => {
            let sponsorshipsList = [];
            await data.forEach((sponsorhip) => {
              sponsorshipsList.push({
                id: sponsorhip.id,
                name: sponsorhip.name,
                email: sponsorhip.email,
                phone: sponsorhip.phone,
                animal_name: sponsorhip.Animals[0].name,
                animal_id: sponsorhip.Animals[0].id,
                observation: sponsorhip.observation,
              });
            });
  
            setSponsorsList(sponsorshipsList);
          })
          .catch(error => console.log(error));
      })

    return setLoading(false);
  };

  useEffect(() => {
    refreshSponsorshipships();
  }, []);

  const getFilteredItems = (type) => {
    if (type === "sponsorships") {
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
    }

    if (type === "forms") {
      let results = [...sponsorsFormsList];

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
    }
  };

  const updateSponsorsList = async (sponsor) => {
    await updateSponsorship(
      {
        ...sponsor,
        phone: Number(sponsor.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    ).catch((error) => console.log(error));

    setIsModalOpen(false);
    refreshSponsorshipships();
  };

  const deleteSponsorsList = async (sponsor) => {
    await deleteSponsorship(sponsor.id, localStorage.getItem("login")).catch(
      (error) => console.log(error)
    );

    setSponsorsList(
      sponsorsList.filter((sponsors) => sponsors.id !== sponsor.id)
    );
    setIsModalOpen(false);
  };

  const createSponsorsList = async (sponsor) => {
    await createSponsorship(
      {
        ...sponsor,
        phone: Number(sponsor.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    )
      .then(() => {
        setIsModalOpen(false);
        refreshSponsorshipships();
      })
      .catch(({ response }) => {
        if (response.data.error === "Animal not found")
          return alert("Animal não encontrado.");
      });
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

  const requested = () => {
    setIsFormViewSelected(true);
  };

  const created = () => {
    setIsFormViewSelected(false);
  };

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
      rowKey: "phone",
    },
    {
      title: "Apadrinhou",
      rowKey: "animal_name",
    },
  ];

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
              value={getFilterState("phone")}
              onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Apadrinhou"
              value={getFilterState("animal_name")}
              onChange={(e) =>
                setFilter({ ...filter, animal_name: e.target.value })
              }
            />
          </div>

          {userHasPermission && (
            <div className="add-icon">
              Adicionar
              <img
                className="pointer"
                src={CreateIcon}
                onClick={onClickNewSponsor}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="sponsorship-list-container">
          <section className="btn-show-form-container">
              <div>
                <button
                  className={`btn-show-form ${
                    isFormViewSelected ? "" : "btn-show-form-active"
                  }`}
                  onClick={created}
                >
                  Voluntários
                </button>
              </div>
              <div>
                <button
                  className={`btn-show-form ${
                    isFormViewSelected ? "btn-show-form-active" : ""
                  }`}
                  onClick={requested}
                >
                  Formulários
                </button>
              </div>
            </section>
          </div>

          {loading && <LoadingPaw /> } 

          {!loading && isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems('forms')}
              onClickEditRow={onClickEditSponsor}
              onClickDeleteRow={onClickDeleteSponsor}
              userHasPermission={userHasPermission}
              isFormActions={true}
              formActionsFunction={{ accept: acceptSponsorshipForm, deny: denySponsorshipForm }}
            />
          )}

          {!loading && !isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems('sponsorships')}
              onClickEditRow={onClickEditSponsor}
              onClickDeleteRow={onClickDeleteSponsor}
              userHasPermission={userHasPermission}
            />
          )}
      </AdminNavBar>
      <ModalSponsorshipsAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedSponsor={selectedSponsor}
        updateSponsorsList={updateSponsorsList}
        createSponsorsList={createSponsorsList}
        deleteSponsorsList={deleteSponsorsList}
        animalsList={animalsList}
      />
    </>
  );
}

export default Sponsorships;
