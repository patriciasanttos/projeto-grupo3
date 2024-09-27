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
} from "../../../services/api/volunteers";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";
import Input from "../../../components/input/Input";

function Volunteers() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    email: null,
    phone: null,
  };
  const [filter, setFilter] = useState(initialFilter);

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

  useEffect(() => {
    getAllVolunteers(localStorage.getItem("login")).then((data) =>
      setVolunteersList(data)
    );

    getAllVolunteersForms(localStorage.getItem("login")).then((data) => 
      setVolunteersFormsList(data)
    );
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
    let volunteers = volunteersList.map((volunt) => {
      if (volunt.id === volunteer.id) return volunteer;

      return volunt;
    });

    if (volunteer.phone)
      volunteer.phone = Number(volunteer.phone.replace(/[()\-\s]/g, ""));

    await updateVolunteer(volunteer, localStorage.getItem("login")).catch(
      (error) => {
        console.log(error);
      }
    );

    setVolunteersList(volunteers);
    setIsModalOpen(false);
  };

  const deleteVolunteersList = async (volunteer) => {
    await deleteVolunteer(volunteer.id, localStorage.getItem("login")).catch(
      (error) => {
        console.log(error);
      }
    );

    setVolunteersList(
      volunteersList.filter((volunteers) => volunteers.id !== volunteer.id)
    );
    setIsModalOpen(false);
  };

  const createVolunteersList = async (volunteer) => {
    let volunteers = [...volunteersList];
    volunteers.push({
      ...volunteer,
      id: volunteersList.length + 1,
    });

    await createVolunteer(
      {
        ...volunteer,
        phone: Number(volunteer.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    ).catch((error) => console.log(error));

    setVolunteersList(volunteers);
    setIsModalOpen(false);
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
        <section className="btn-show-form-container">
          <div>
            <button className="btn-show-form" onClick={created}>
              Voluntários
            </button>
          </div>
          <div>
            <button className="btn-show-form" onClick={requested}>
              Formulários
            </button>
          </div>
        </section>
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
          {userHasPermission && (
            <div className="admin-volunteers-btn">
              <label htmlFor="">Adicionar</label>
              <button onClick={onClickNewVolunteer}>
                <img className="pointer" src={createIcon} alt="" />
              </button>
            </div>
          )}
        </div>
        <div className="volunteers-list-container">
          {isFormViewSelected ? (
            <AdminList
              columns={columns}
              rows={getFilteredItems('forms')}
              onClickEditRow={onClickEditVolunteer}
              onClickDeleteRow={onClickDeleteVolunteer}
              userHasPermission={userHasPermission}
              isFormActions={true}
            />
          ) : (
            <AdminList
              columns={columns}
              rows={getFilteredItems('volunteers')}
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
