import React, { useEffect, useState } from "react";

import AdminNavBar from "../../../components/admin_navbar/AdminNavBar";
import ModalAdmin from "../../../components/modal/modalAdmin/ModalAdmin";
import AdminList from "../../../components/admin_list/AdminList";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import CreateIcon from "../../../assets/icons/create_icon.svg";
import Input from "../../../components/input/Input";
import LoadingPaw from "../../../components/loadingPaw";

import "./styles.scss";
import {
  createAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
} from "../../../services/api/admins";
import checkPermissions from "../../../utils/checkPermissions";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

function AdminPage() {
  const navigate = useNavigate();

  const initialFilter = {
    name: null,
    email: null,
    phoneNumber: null,
  };
  const [filter, setFilter] = useState(initialFilter);

  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalAction, setModalAction] = useState(null);
  const [selectedAdmin, setSelectedAdmin] = useState(null);

  const [userHasPermission, setUserHasPermission] = useState(false);
  const [adminsList, setAdminsList] = useState([]);

  useEffect(() => {
    async function checkUserPermission() {
      await checkPermissions("admins", navigate).then((response) => {
        setUserHasPermission(response);
      });
    }

    checkUserPermission();
  }, []);

  useEffect(() => {
    setLoading(true);
    getAllAdmins(localStorage.getItem("login"))
      .then((data) => {
        setAdminsList(data.map(admin => ({
          ...admin,
          phone: admin.phone.length === 11
            ? `(${admin.phone.slice(0, 2)}) ${admin.phone.slice(2, 7)}-${admin.phone.slice(7)}`
            : `(${admin.phone.slice(0, 2)}) ${admin.phone.slice(2, 6)}-${admin.phone.slice(6)}`
        })));
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });
  }, []);

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

  const updateAdminsList = async (admin) => {
    await updateAdmin(
      {
        ...admin,
        phone: Number(admin.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    )
      .then((res) => {
        localStorage.setItem("login", JSON.stringify(res));
        const cookies = jwtDecode(res);

        let admins = adminsList.map((adm) => {
          if (adm.id === res.id)
            return {
              ...admin,
              permissions: cookies.permission,
            };

          return adm;
        });

        setAdminsList(admins);
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const deleteAdminsList = async (admin) => {
    await deleteAdmin(admin.id, localStorage.getItem("login")).catch(
      (error) => {
        console.log(error);
      }
    );

    setAdminsList(adminsList.filter((admins) => admins.id !== admin.id));
    setIsModalOpen(false);
  };

  const createAdminsList = async (admin) => {
    let admins = [...adminsList];
    admins.push(
      {
        ...admin,
        id: adminsList.length + 1,
      },
      localStorage.getItem("login")
    );

    await createAdmin(
      {
        ...admin,
        phone: Number(admin.phone.replace(/[()\-\s]/g, "")),
      },
      localStorage.getItem("login")
    ).catch((error) => console.log(error));

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
      rowKey: "phone",
    },
    {
      title: "Permissão",
      rowKey: "permissions",
    },
  ];

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
              value={getFilterState("permissions")}
              onChange={(e) =>
                setFilter({ ...filter, permission: e.target.value })
              }
            />
          </div>

          {userHasPermission && (
            <div className="add-icon">
              Adicionar
              <img
                className="pointer"
                src={CreateIcon}
                onClick={onClickNewAdmin}
                alt=""
              />
            </div>
          )}
        </div>

        <div className="admin-list-container">
          {loading ? (
            <LoadingPaw />
          ) : (
            <AdminList
              columns={columns}
              rows={getFilteredItems()}
              onClickEditRow={onClickEditAdmin}
              onClickDeleteRow={onClickDeleteAdmin}
              userHasPermission={userHasPermission}
            />
          )}
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
