import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdoptionsAdmin from "../../../components/modal/modalAdoptionsAdmin/ModalAdoptionsAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";
import LoadingPaw from "../../../components/loadingPaw";

import "./styles.scss";
import Input from "../../../components/input/Input";
import {
  createAdoption,
  deleteAdoption,
  getAllAdoptions,
  getAllAdoptionForms,
  updateAdoption,
  acceptAdoptionForm,
  denyAdoptionForm,
} from "../../../services/api/adoptions";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";
import { getAllAnimals } from "../../../services/api/animals";

function Adoptions() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    phoneNumber: null,
    address: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [loading, setLoading] = useState(true);
  const [modalLoading, setModalLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [isFormViewSelected, setIsFormViewSelected] = useState(false);

  const [selectedTutor, setSelectedTutor] = useState(null);

  const [userHasPermission, setUserHasPermission] = useState(false);
  const [tutorsList, setTutorsList] = useState([]);
  const [tutorFormsList, setTutorFormsList] = useState([]);
  const [animalsList, setAnimalsList] = useState([]);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions("adoptions", navigate).then((response) => {
        setUserHasPermission(response);
      });
    }

    checkUserPermission();
  }, []);

  const loadAnimals = async () => {
    await getAllAnimals().then(async (animals) => {
      const gettedAnimalsList = animals.map((animal) => ({
        id: animal.id,
        name: animal.name,
      }));

      setAnimalsList(gettedAnimalsList);
      loadForms(gettedAnimalsList);
    });
  };

  const loadForms = async (animals) => {
    await getAllAdoptionForms(localStorage.getItem("login")).then(
      async (data) => {
        let adoptionFormsList = [];
        await data.forEach((form) => {
          const animal = animals.filter(
            (animal) => animal.id === form.animal_id
          )[0];
          adoptionFormsList.push({
            id: form.id,
            tutors_name: form.tutors_name,
            email: form.email,
            phone:
              form.phone.length === 11
                ? `(${form.phone.slice(0, 2)}) ${form.phone.slice(
                    2,
                    7
                  )}-${form.phone.slice(7)}`
                : `(${form.phone.slice(0, 2)}) ${form.phone.slice(
                    2,
                    6
                  )}-${form.phone.slice(6)}`,
            address: form.address,
            cpf: form.cpf,
            animal_name: animal?.name,
            animal_id: animal?.id,
          });
        });

        setTutorFormsList(adoptionFormsList);
      }
    );
  };

  const loadContent = async () => {
    setLoading(true);

    await loadAnimals().then(async () => {
      await getAllAdoptions(localStorage.getItem("login")).then(
        async (data) => {
          let adoptionsList = [];
          await data.forEach((adoption) => {
            adoptionsList.push({
              id: adoption.id,
              tutors_name: adoption.tutors_name,
              email: adoption.email,
              phone:
                adoption.phone.length === 11
                  ? `(${adoption.phone.slice(0, 2)}) ${adoption.phone.slice(
                      2,
                      7
                    )}-${adoption.phone.slice(7)}`
                  : `(${adoption.phone.slice(0, 2)}) ${adoption.phone.slice(
                      2,
                      6
                    )}-${adoption.phone.slice(6)}`,
              address: adoption.address,
              cpf: adoption.cpf,
              animal_name: adoption.animal_name,
              animal_id: adoption.animal_id,
              observation: adoption.observation,
            });
          });

          setTutorsList(adoptionsList);
        }
      );
    });

    return setLoading(false);
  };

  useEffect(() => {
    loadContent();
  }, []);

  const getFilteredItems = (type) => {
    if (type === "adoptions") {
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
    }

    if (type === "forms") {
      let results = [...tutorFormsList];

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

  const updateTutorsList = async (tutor) => {
    let tutors = [...tutorsList];
    tutors[tutor.id - 1] = {
      ...tutor,
    };

    await updateAdoption(
      {
        ...tutor,
        phone: Number(tutor.phone.replace(/[()\-\s]/g, "")),
        cpf: Number(tutor.cpf.replace(/[-.]/g, "")),
      },
      localStorage.getItem("login")
    ).catch((error) => {
      console.log(error);
      toast.error("Erro ao atualizar. Tente novamente.");
    });

    setTutorsList(tutors);
    setIsModalOpen(false);
  };

  const deleteTutorsList = async (tutor) => {
    setModalLoading(true);
    deleteAdoption(tutor.id, localStorage.getItem("login"))
      .then(() => {
        setModalLoading(false);

        loadContent();
        setIsModalOpen(false);
        toast.success("Apagado com sucesso");
      })
      .catch((error) => {
        setModalLoading(false);

        console.log(error);
        toast.error("Erro ao apagar. Tente novamente.");
      });
  };

  const createTutorsList = async (tutor) => {
    let tutors = [...tutorsList];
    const ids = tutors.map((i) => i.id);

    tutors.push({
      ...tutor,
      id: tutors.length ? Math.max(...ids) + 1 : 1,
    });

    await createAdoption(
      {
        ...tutor,
        phone: Number(tutor.phone.replace(/[()\-\s]/g, "")),
        cpf: Number(tutor.cpf.replace(/[-.]/g, "")),
      },
      localStorage.getItem("login")
    )
      .then(() => {
        setTutorsList(tutors);
        setIsModalOpen(false);
      })
      .catch(({ response }) => {
        if (response.data.error === "Animal not found")
          return toast.error("Animal não encontrado.");
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

  const requested = () => {
    setIsFormViewSelected(true);
  };

  const created = () => {
    setIsFormViewSelected(false);
  };

  return (
    <>
      <AdminNavBar headerTitle="Adoções">
        <div className="tutor-filter-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Nome"
              value={getFilterState("tutors_name")}
              onChange={(e) =>
                setFilter({ ...filter, tutors_name: e.target.value })
              }
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
              onChange={(e) =>
                setFilter({ ...filter, address: e.target.value })
              }
            />
          </div>

          {userHasPermission && !isFormViewSelected && (
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
          <section className="btn-show-form-container">
            <div>
              <button
                className={`btn-show-form ${
                  isFormViewSelected ? "" : "btn-show-form-active"
                }`}
                onClick={created}
              >
                Adoções
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

          {loading && <LoadingPaw />}

          {!loading && isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems("forms")}
              onClickEditRow={onClickEditTutor}
              onClickDeleteRow={onClickDeleteTutor}
              userHasPermission={userHasPermission}
              isFormActions={true}
              formActionsFunction={{
                accept: acceptAdoptionForm,
                deny: denyAdoptionForm,
                refresh: loadContent,
              }}
            />
          )}

          {!loading && !isFormViewSelected && (
            <AdminList
              columns={columns}
              rows={getFilteredItems("adoptions")}
              onClickEditRow={onClickEditTutor}
              onClickDeleteRow={onClickDeleteTutor}
              userHasPermission={userHasPermission}
            />
          )}
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
        animalsList={animalsList}
        loading={modalLoading}
      />
    </>
  );
}

export default Adoptions;
