import "./AdminList.scss";
import Tooltip from '../tooltip'
import EditIcon from "../../assets/icons/edit_icon.svg";
import DeleteIcon from "../../assets/icons/delete_icon.svg";

function AdminList({ columns, rows, onClickEditRow, onClickDeleteRow }) {
  return (
    <div className="admin-list-container">
      <table className="admin-list">
        <thead>
          <tr className="header">
            {columns.map((column) => (
              <td key={column.title}>{column.title}</td>
            ))}
            <td>Ações</td>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="row">
              {columns.map((column, i) => (
                <td key={`${index} - ${i}`}>{row[column.rowKey]}</td>
              ))}
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
            </tr>
          ))}
        </tbody>
      </table>
      {(!rows || (rows && rows.length === 0)) && (
        <div className="no-items">Sem itens na lista</div>
      )}
    </div>
  );
}

export default AdminList;
