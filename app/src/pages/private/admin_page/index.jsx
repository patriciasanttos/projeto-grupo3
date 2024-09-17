import React, { useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdmin from "../../../components/modal/modalAdmin/ModalAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";
import Input from "../../../components/input/Input";

import "./styles.scss";

function AdminPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const initialFilter = {
    name: null,
    email: null,
    phoneNumber: null,
    nameAnimal: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  // To do: Trazer lista do back-end
  const [adminsList, setAdminsList] = useState([
    {
      id: 1,
      name: "Integrante 1",
      email: "integrante1@gmail.com",
      phoneNumber: "(11) 11111-1111",
      password: "123456",
      permissions: ["Nível 1"],
      adminsInfo: "Nada",
    },
    {
      id: 2,
      name: "Integrante 2",
      email: "integrante2@gmail.com",
      phoneNumber: "(22) 22222-2222",
      password: "123456",
      permissions: ["Nível 2"],
      adminsInfo: "Nada",
    },
    {
      id: 3,
      name: "Integrante 3",
      email: "integrante3@gmail.com",
      phoneNumber: "(33) 33333-3333",
      password: "123456",
      permissions: ["Nível 3"],
      adminsInfo: "Nada",
    },
    {
      id: 4,
      name: "Integrante 4",
      email: "integrante@gmail.com",
      phoneNumber: "(44) 44444-4444",
      password: "123456",
      permissions: ["Nível 4"],
      adminsInfo: "Nada",
    },
    {
      id: 5,
      name: "Integrante 5",
      email: "integrante5@gmail.com",
      phoneNumber: "(55) 55555-5555",
      password: "123456",
      permissions: ["Nível 5"],
      adminsInfo: "Nada",
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
      title: "Contato",
      rowKey: "phoneNumber",
    },
    {
      title: "Permissão",
      rowKey: "permissions",
    },
  ];

  const getFilteredItems = () => {
    let results = [...adminsList];

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
  const updateAdminsList = (admin) => {
    let admins = [...adminsList];
    admins[admin.id - 1] = {
      ...admin,
    };
    console.log('>>> admin', admin)
    setAdminsList(admins);
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const deleteAdminsList = (admin) => {
    setAdminsList(adminsList.filter((admins) => admins.id !== admin.id));
    setIsModalOpen(false);
  };

  // To do: Enviar para o back-end
  const createAdminsList = (admin) => {
    let admins = [...adminsList];
    admins.push({
      ...admin,
      id: adminsList.length + 1,
    });
    setAdminsList(admins);
    setIsModalOpen(false);
  };

  const onClickDeleteAdmin = (admin) => {
    setIsModalOpen(true);
    setSelectedAdmin(admin);
    setModalAction(ModalActionsEnum.DELETE);
  };

  const onClickEditAdmin = (admin) => {
    setIsModalOpen(true);
    setSelectedAdmin(admin);
    setModalAction(ModalActionsEnum.UPDATE);
  };

  const onClickNewAdmin = () => {
    setIsModalOpen(true);
    setSelectedAdmin(null);
    setModalAction(ModalActionsEnum.CREATE);
  };

  const getFilterState = (field) => {
    return filter && filter[field] ? filter[field] : "";
  };

  return (
    <>
      <AdminNavBar headerTitle="Administrador">
        <div className="admin-filter-container">
          <div className="filters">
            <Input
              type="text"
              placeholder="Nome"
              value={getFilterState("name")}
              onChange={(e) => setFilter({ ...filter, name: e.target.value })}
            />

            <Input
              type="text"
              placeholder="Permissão"
              value={getFilterState("permission")}
              onChange={(e) =>
                setFilter({ ...filter, permission: e.target.value })
              }
            />
          </div>

          <div className="add-icon">
            Adicionar
            <img
              className="pointer"
              src={CreateIcon}
              onClick={onClickNewAdmin}
              alt=""
            />
          </div>
        </div>

        <div className="admin-list-container">
          <AdminList
            columns={columns}
            rows={getFilteredItems()}
            onClickEditRow={onClickEditAdmin}
            onClickDeleteRow={onClickDeleteAdmin}
          />
        </div>
      </AdminNavBar>
      <ModalAdmin
        isOpen={isModalOpen}
        modalAction={modalAction}
        onModalClose={() => setIsModalOpen(false)}
        selectedAdmin={selectedAdmin}
        updateAdminsList={updateAdminsList}
        createAdminsList={createAdminsList}
        deleteAdminsList={deleteAdminsList}
      />
    </>
  );
}

export default AdminPage;
