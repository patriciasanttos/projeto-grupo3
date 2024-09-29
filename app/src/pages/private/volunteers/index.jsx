import React, { useEffect, useState } from "react";
import createIcon from "../../../assets/icons/create_icon.svg";
import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalVolunteers from "../../../components/modal/modalVolunteersAdmin/ModalVolunteers";

import "./styles.scss";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import {
  createVolunteer,
  deleteVolunteer,
  getAllVolunteers,
  getAllVolunteersForms,
  updateVolunteer,
  acceptVolunteerForm,
  denyVolunteerForm
} from "../../../services/api/volunteers";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";
import LoadingPaw from "../../../components/loadingPaw";


function Volunteers() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    email: null,
    phone: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [loading, setLoading] = useState(true);
  const [loadingFormList, setLoadingFormList] = useState(true);
  const isLoading = loading || loadingFormList;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedVolunteer, setSelectedVolunteer] = useState(null);

  const [volunteersList, setVolunteersList] = useState([]);
  const [volunteersFormsList, setVolunteersFormsList] = useState([]);
  const [userHasPermission, setUserHasPermission] = useState(false);

  const [isFormViewSelected, setIsFormViewSelected] = useState(false);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions("volunteers", navigate).then((response) => {
        setUserHasPermission(response);
      });
    }

    checkUserPermission();
  }, []);

  
  const refreshVolunteersList = () => {
    setLoading(true);
    getAllVolunteers(localStorage.getItem("login")).then((data) => {
      setVolunteersList(data);
      setLoading(false);
    });
  };

  const refreshVolunteersFormList = () => {
    setLoadingFormList(true);
    getAllVolunteersForms(localStorage.getItem("login")).then((data) => {
      setVolunteersFormsList(data);
      setLoadingFormList(false);
    });
  };

  const refreshAllVolunteersList = () => {
    refreshVolunteersList()
    refreshVolunteersFormList()
  }

  useEffect(() => {
    refreshVolunteersList();
    refreshVolunteersFormList();
  }, []);

  const getFilteredItems = (type) => {
    if (type === "volunteers") {
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
    }

    if (type === "forms") {
      let results = [...volunteersFormsList];

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

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  const updateVolunteersList = async (volunteer) => {
    if (volunteer.phone)
      volunteer.phone = Number(volunteer.phone.replace(/[()\-\s]/g, ""));

    await updateVolunteer(volunteer, localStorage.getItem("login")).catch(
      (error) => {
        console.log(error);
      }
    );

    setIsModalOpen(false);
    refreshVolunteersList();
  };

  const deleteVolunteersList = async (volunteer) => {
    await deleteVolunteer(volunteer.id, localStorage.getItem("login")).catch(
      (error) => {
        console.log(error);
      }
    );

    setIsModalOpen(false);
    refreshVolunteersList();
  };

  const createVolunteersList = async (volunteer) => {
    await createVolunteer(
      {
        ...volunteer,
        state: "created",
        phone: Number(volunteer.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    ).catch((error) => console.log(error));

    setIsModalOpen(false);
    refreshVolunteersList();
  };

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

  const onClickEditVolunteer = (volunteer) => {
    setIsModalOpen(true);
    setSelectedVolunteer(volunteer);
    setModalAction(ModalActionsEnum.UPDATE);
  };

  const onClickDeleteVolunteer = (volunteer) => {
    setIsModalOpen(true);
    setSelectedVolunteer(volunteer);
    setModalAction(ModalActionsEnum.DELETE);
  };

  const onClickNewVolunteer = () => {
    setIsModalOpen(true);
    setSelectedVolunteer(null);
  };

  const requested = () => {
    setIsFormViewSelected(true);
  };

  const created = () => {
    setIsFormViewSelected(false);
  };

  return (
    <>
      <AdminNavBar headerTitle="Voluntários">
        <div className="admin-volunteers-input">
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
              value={getFilterState("phone")}
              onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
            />
            <Input
              type="text"
              placeholder="Disponibilidade"
              value={getFilterState("availability")}
              onChange={(e) =>
                setFilter({ ...filter, availability: e.target.value })
              }
            />
          </div>
          {userHasPermission && !isFormViewSelected && (
            <div className="admin-volunteers-btn">
              <label htmlFor="">Adicionar</label>
              <button onClick={onClickNewVolunteer}>
                <img className="pointer" src={createIcon} alt="" />
              </button>
            </div>
          )}
        </div>

        <div className="volunteers-list-container">
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

          {isLoading && <LoadingPaw />}

          {!isLoading && isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems("forms")}
              userHasPermission={userHasPermission}
              onClickDeleteRow={onClickDeleteVolunteer}
              isFormActions={true}
              formActionsFunction={{ 
                accept: acceptVolunteerForm, 
                deny: denyVolunteerForm, 
                refresh: refreshAllVolunteersList 
              }}
            />
          )}

          {!isLoading && !isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems("volunteers")}
              onClickEditRow={onClickEditVolunteer}
              onClickDeleteRow={onClickDeleteVolunteer}
              userHasPermission={userHasPermission}
            />
          )}
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
