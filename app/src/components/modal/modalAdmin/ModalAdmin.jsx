import { useEffect, useState, useCallback } from "react";
import Modal from "../index";
import { IMaskInput } from "react-imask";
import ModalActionsEnum from "../../../utils/ModalActionsEnum";
import ModalDeleteConfirm from "../modalDeleteConfirm/ModalDeleteConfirm";

const ModalAdmin = ({
  isOpen,
  modalAction,
  onModalClose,
  selectedAdmin,
  updateAdminsList,
  createAdminsList,
  deleteAdminsList,
}) => {
  const initialFormAdmins = {
    name: "",
    email: "",
    phone: "",
    password: "",
    permissions: [],
    observation: "",
  };
  const [formAdmins, setFormAdmins] = useState(initialFormAdmins);
  const [ emptyInput, setEmptyInput ] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    permissions: [],
  });

  const listLevelOption = {
    animals: "Animais",
    sponsorships: "Apadrinhamentos",
    adoptions: "Adoções",
    volunteers: "Voluntários",
    admins: "Administradores",
    all: "Tudo",
  };

  useEffect(() => {
    const getAdminPerms = (admin) => {
      const adminPerms = admin.permissions.map(perm => perm?.id || listLevelOption[perm]);

      return adminPerms;
    }

    setFormAdmins({
      ...selectedAdmin,
      permissions: isOpen && selectedAdmin ? getAdminPerms(selectedAdmin) : []
    });
  }, [selectedAdmin, isOpen]);

  const onClickSave = () => {
    setEmptyInput({
      name: false,
      email: false,
      phone: false,
      password: false,
      permissions: [],
    });

    let hasError = false;

    if (!formAdmins.name) {
      setEmptyInput(prev => ({ ...prev, name: true }));
      hasError = true;
    }
    if (!formAdmins.email) {
      setEmptyInput(prev => ({ ...prev, email: true }));
      hasError = true;
    }
    if (!formAdmins.phone) {
      setEmptyInput(prev => ({ ...prev, phone: true }));
      hasError = true;
    }
    if (formAdmins.permissions.length === 0) {
      setEmptyInput(prev => ({ ...prev, permissions: true }));
      hasError = true;
    }
    if (!selectedAdmin && !formAdmins.password) {
      setEmptyInput(prev => ({ ...prev, password: true }));
      hasError = true;
    }
    
    if (hasError) 
      return;

    if (selectedAdmin) {
      updateAdminsList(formAdmins);
    } else {
      createAdminsList(formAdmins);
    }
  };

  const onClickModalClose = () => {
    setEmptyInput({
      name: false,
      email: false,
      phone: false,
      password: false,
      permissions: [],
      observation: false,
    });

    onModalClose();
    setFormAdmins(initialFormAdmins);
  };

  const onClickDelete = () => {
    setEmptyInput({
      name: false,
      email: false,
      phone: false,
      animal_id: false,
    });

    if (selectedAdmin) {
      deleteAdminsList(formAdmins);
    }
  };

  const getFormState = (field) => {
    return formAdmins && formAdmins[field] ? formAdmins[field] : "";
  };

  const onChangeCheckbox = useCallback((isChecked, id) => {
    let currentPermissions = [...formAdmins.permissions];

    if (isChecked) {
      currentPermissions.push(id);
    } else {
      currentPermissions = currentPermissions.filter(
        (permission) => permission !== id
      );
    }

    setFormAdmins({ ...formAdmins, permissions: currentPermissions });
  }, [formAdmins]);

  return modalAction === ModalActionsEnum.DELETE ? (
    <ModalDeleteConfirm
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      onDeleteConfirm={onClickDelete}
      message={`Deseja apagar o integrante: ${selectedAdmin.name}`}
    />
  ) : (
    <Modal
      isOpen={isOpen}
      onModalClose={onClickModalClose}
      title={
        selectedAdmin
          ? "Edite os dados do integrante"
          : "Adicione um novo integrante"
      }
    >
      <form action="" className="modal-admins-form modal-form">
        <div className="al-modal-form">
          <input
            type="text"
            name="name"
            placeholder="Nome"
            value={getFormState("name")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, name: e.target.value })
            }
            className={emptyInput.name ? 'input-required' : ''}
          />

          <input
            type="text"
            name="email"
            placeholder="E-mail"
            value={getFormState("email")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, email: e.target.value })
            }
            className={emptyInput.name ? 'input-required' : ''}
          />
        </div>

        <div className="al-modal-form">
          <IMaskInput
            type="text"
            name="Celular"
            placeholder="Contato"
            value={getFormState("phone")}
            onAccept={(value, maskRef, e) =>
              setFormAdmins({ ...formAdmins, phone: value })
            }
            mask={"(00) 00000-0000"}
            className={emptyInput.name ? 'input-required' : ''}
          />

          <input
            type="text"
            name="password"
            placeholder="Senha"
            value={getFormState("password")}
            onChange={(e) =>
              setFormAdmins({ ...formAdmins, password: e.target.value })
            }
            className={emptyInput.name ? 'input-required' : ''}
          />
        </div>

        <div>
          <p className={emptyInput.name ? 'input-permissions-required' : ''}>Selecionar níveis:</p>
          <div className="list-checkbox-container">
            {Object.entries(listLevelOption).map(([ key, permissionName ], index) => {
              const permId = Number(Object.keys(listLevelOption).indexOf(key) + 1);
              const isChecked = formAdmins.permissions.includes(permId)
              
              return (
                <div className="checkbox" key={index}>
                  <input
                    type="checkbox"
                    name={permissionName}
                    onChange={(e) => onChangeCheckbox(e.target.checked, permId)}
                    checked={isChecked}
                  />
                  <label htmlFor={permId}>{permissionName}</label>
                </div>
              )
            })}
          </div>
        </div>

        <textarea
          rows="8"
          cols="10"
          name="observation"
          placeholder="Adicione informações importantes"
          value={getFormState("observation")}
          onChange={(e) =>
            setFormAdmins({
              ...formAdmins,
              observation: e.target.value,
            })
          }
        />
      </form>
      <div className="align-btn-modal">
        <button onClick={onClickSave} className="btn-modal">
          {selectedAdmin ? "Editar" : "Adicionar"}
        </button>
        <button onClick={onModalClose} className="btn-modal grey-btn">
          Cancelar
        </button>
      </div>
    </Modal>
  );
};

export default ModalAdmin;
