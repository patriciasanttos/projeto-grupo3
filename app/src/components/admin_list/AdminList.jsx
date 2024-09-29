import "./AdminList.scss";
import Tooltip from "../tooltip";
import EditIcon from "../../assets/icons/edit_icon.svg";
import DeleteIcon from "../../assets/icons/delete_icon.svg";
import PopupMenu from "../popupMenu";
import ActionsForm from "../actionsForm/ActionsForm";
import { jwtDecode } from "jwt-decode";

const permissions = {
  animals: "Animais",
  sponsorships: "Apadrinhamentos",
  adoptions: "Adoções",
  volunteers: "Voluntários",
  admins: "Administradores",
  all: "Tudo",
  1: "Animais",
  2: "Apadrinhamentos",
  3: "Adoções",
  4: "Voluntários",
  5: "Administradores",
  6: "Tudo",
};

function AdminList({
  columns,
  rows,
  onClickEditRow,
  onClickDeleteRow,
  userHasPermission,
  popupMenuActions,
  isFormActions,
  formActionsFunction
}) {
  const getCell = (value) => {
    if (Array.isArray(value)) {
      const userPerms = value.map((perm) => {
        return permissions[perm?.name] || permissions[perm]
      });
      
      return userPerms.join(", ");
    }

    return value;
  };

  const getActions = (row) => {
    if (popupMenuActions) 
      return (
        <td className="flex-row">
          <PopupMenu menuActions={popupMenuActions} row={row} />
        </td>
      );

      if (isFormActions)
        return (
          <ActionsForm 
            selectedItem={row} 
            accept={formActionsFunction.accept} 
            deny={formActionsFunction.deny} 
            refresh={formActionsFunction.refresh}
          />
      )

      return (
        ( //-----If admin has full permission, but the admin on the line is another admin with full permission
          row.permissions.filter(perm => perm.id === 6)[0] &&
          row.id === jwtDecode(localStorage.getItem('login')).userId
        ) ||
        //-----If admin has full permission, but the admin on the line not
        (!row.permissions.filter(perm => perm.id === 6)[0])
      ) && (
        <td className="flex-row">
          <Tooltip text="Editar">
            <img
              className="edit-icon"
              src={EditIcon}
              alt=""
              onClick={() => onClickEditRow(row)}
            />
          </Tooltip>
          <Tooltip text="Deletar">
            <img
              className="delete-icon"
              src={DeleteIcon}
              alt=""
              onClick={() => onClickDeleteRow(row)}
            />
          </Tooltip>
        </td>
      );
  };

  return (
    <div className="admin-list-container">
      <table className="admin-list">
        <thead>
          <tr className="header">
            {columns.map((column, index) => (
              <td key={`${column.title} - ${index}`}>{column.title}</td>
            ))}
            {(userHasPermission || (onClickEditRow || onClickDeleteRow)) && <td>Ações</td>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => {
            return (
              <tr key={row.id} className="row">
              {columns.map((column, i) => (
                <td key={`${index} - ${i}`}>{getCell(row[column.rowKey])}</td>
              ))}
              {userHasPermission && getActions(row)}
            </tr>
            )
          })}
        </tbody>
      </table>
      {(!rows || (rows && rows.length === 0)) && (
        <div className="no-items">Sem itens na lista</div>
      )}
    </div>
  );
}

export default AdminList;
