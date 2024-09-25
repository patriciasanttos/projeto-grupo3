import React, { useEffect, useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdoptionsAdmin from "../../../components/modal/modalAdoptionsAdmin/ModalAdoptionsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";

import "./styles.scss";
import Input from "../../../components/input/Input";
import { createAdoption, deleteAdoption, getAllAdoptions, updateAdoption } from "../../../services/api/adoptions";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";

function Adoptions() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    phoneNumber: null,
    address: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedTutor, setSelectedTutor] = useState(null);

  const [ userHasPermission, setUserHasPermission ] = useState(false);
  const [tutorsList, setTutorsList] = useState([]);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions('adoptions', navigate)
        .then(response => {
          setUserHasPermission(response);
        })
    }
    
    checkUserPermission();
  }, []);

  useEffect(() => {
    getAllAdoptions()
      .then(async data => {
        let adoptionsList = [];
        await data.forEach(adoption => {
          adoptionsList.push({
            id: adoption.id,
            tutors_name: adoption.tutors_name,
            email: adoption.email,
            phone: adoption.phone,
            address: adoption.address,
            animal_name: adoption.animal_name,
            animal_id: adoption.animal_id,
            observation: adoption.observation
          });
        });

        setTutorsList(adoptionsList);
      });
  }, []);

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

  const updateTutorsList = async (tutor) => {
    let tutors = [...tutorsList];
    tutors[tutor.id - 1] = {
      ...tutor,
    };

    await updateAdoption({
      ...tutor,
      phone: Number(tutor.phone.replace(/[()\-\s]/g, ''))
    })
      .catch(error => console.log(error));

    setTutorsList(tutors);
    setIsModalOpen(false);
  };

  const deleteTutorsList = async (tutor) => {
    await deleteAdoption(tutor.animal_id)

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
      .then(() => {
        setTutorsList(tutors);
        setIsModalOpen(false);
      })
      .catch(({ response }) => {
        if (response.data.error === 'Animal not found')
          return alert("Animal não encontrado.");
      });
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

  const columns = [
    {
      title: "ID",
      rowKey: "id",
    },
    {
      title: "Nome",
      rowKey: "tutors_name",
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
      title: "Adotou",
      rowKey: "animal_name",
    },
  ];

  return (
    <>
      <AdminNavBar headerTitle="Adoções">
      <div className="tutor-filter-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Nome"
              value={getFilterState("tutors_name")}
              onChange={(e) => setFilter({ ...filter, tutors_name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Contato"
              value={getFilterState("phone")}
              onChange={(e) => setFilter({ ...filter, phone: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Endereço"
              value={getFilterState("address")}
              onChange={(e) => setFilter({ ...filter, address: e.target.value })}
            />
          </div>

          {userHasPermission && (
            <div className="add-icon">
              Adicionar
              <img
                className="pointer"
                src={CreateIcon}
                onClick={onClickNewTutor}
                alt=""
              />
            </div>
          )}
        </div>
        <div className="adoptions-list-container">
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            onClickEditRow={onClickEditTutor}
            onClickDeleteRow={onClickDeleteTutor}
            userHasPermission={userHasPermission}
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
